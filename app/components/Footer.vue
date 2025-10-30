<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="left-content">
        <div class="Copyright">
          <p class="follow-section">
            {{ $t('follow_us') }}: 
            <span class="social">
              <a 
                v-for="(item, key) in socialConfig" 
                :key="key" 
                :href="item.url"
                :class="['social-link', key]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="social-icon">
                  <img :src="`/follow/${item.icon}`" :alt="key" />
                </span>
              </a>
            </span>
          </p>
        </div>
        <div class="business-contact">
          <p>{{ $t('business_consultation') }}: {{ $t('contact_number') }}</p>
        </div>
        <div class="time">
          <p>{{ $t('working_hours') }}: {{ $t('hours_details') }}</p>
        </div>
        <div class="address">
          <p>{{ $t('company_address') }}: {{ $t('address_details') }}</p>
        </div>
        <div class="Copyright">
          <p>Copyright © 2014 - {{ new Date().getFullYear() }}  JiuKu All Rights Reserved. 九酷公司 保留所有权利</p>
        </div>
      </div>
      <div class="right-content">
        <img src="~/assets/logo/colorful.png" alt="Logo" class="footer-logo" />
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      socialConfig: {}
    }
  },
  async mounted() {
    const response = await fetch('/follow/config.json')
    this.socialConfig = await response.json()
  }
}
</script>

<style scoped>
.site-footer { 
  background: #f8f9fa; 
  padding: 20px 0; 
  color: #666; 
  margin-top: 40px; 
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Center the logo vertically */
  max-width: 1200px; /* Optional: set max width for your footer */
  margin: 0 auto;
}

.left-content {
  flex: 1;
  text-align: left;
}

.right-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo {
  width: 150px; /* Adjust logo size */
  height: auto;
  margin-left: 20px;
}

.follow-section {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 8px;
}

.social {
  display: flex;
  justify-content: left;
  gap: 12px;
  align-items: center;
  margin: 0;
}

.social-link {
  text-decoration: none;
  display: inline-block;
}

.social-icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  font-size: 8px;
}

/* Hover effect */
.social-link:hover .social-icon {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
}
</style>
