import { createRemoteJWKSet, jwtVerify } from "jose";
const keys = new Map();
export async function authenticate(request, env) {
  if (
    !env.ACCESS_TEAM_DOMAIN?.endsWith(".cloudflareaccess.com") ||
    !env.ACCESS_AUD ||
    !env.ADMIN_EMAILS ||
    env.ACCESS_TEAM_DOMAIN.startsWith("REPLACE")
  )
    throw Object.assign(Error("Administrator access is not configured"), {
      status: 503,
    });
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token)
    throw Object.assign(Error("Administrator sign-in required"), {
      status: 401,
    });
  const issuer = "https://" + env.ACCESS_TEAM_DOMAIN;
  if (!keys.has(issuer))
    keys.set(
      issuer,
      createRemoteJWKSet(new URL(issuer + "/cdn-cgi/access/certs")),
    );
  try {
    const { payload } = await jwtVerify(token, keys.get(issuer), {
      issuer,
      audience: env.ACCESS_AUD,
      algorithms: ["RS256"],
    });
    const allow = env.ADMIN_EMAILS.toLowerCase()
      .split(",")
      .map((x) => x.trim());
    if (
      typeof payload.email !== "string" ||
      !allow.includes(payload.email.toLowerCase())
    )
      throw Error("Not an administrator");
    return payload.email;
  } catch {
    throw Object.assign(Error("Administrator access denied"), { status: 403 });
  }
}
