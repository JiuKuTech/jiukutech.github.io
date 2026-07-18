export type ProductCategory = 'claw' | 'stacked' | 'multiplayer' | 'themed'
export type SiteLocale = 'zh-cn' | 'zh-tw' | 'en-us'

type LocalizedText = Record<SiteLocale, string>

export interface Product {
  id: string
  image: string
  category: ProductCategory
  name: LocalizedText
  description: LocalizedText
}

export const products: Product[] = [
  {
    id: 'community-claw', image: '/products-owned/community-claw.webp', category: 'claw',
    name: { 'zh-cn': '超燃酷爪社', 'zh-tw': '超燃酷爪社', 'en-us': 'Super Cool Claw Community' },
    description: { 'zh-cn': '高亮主题灯效与通透展示空间，适合商场、电玩城及潮玩集合店。', 'zh-tw': '高亮主題燈效與通透展示空間，適合商場、遊戲中心及潮玩集合店。', 'en-us': 'A high-visibility cabinet with vivid lighting for malls, arcades and collectible stores.' }
  },
  {
    id: 'aurora-claw', image: '/products-owned/aurora-claw.webp', category: 'claw',
    name: { 'zh-cn': '幻彩酷爪机', 'zh-tw': '幻彩酷爪機', 'en-us': 'Aurora Claw Machine' },
    description: { 'zh-cn': '幻彩镜面与环绕灯带增强陈列效果，支持品牌主题与面板定制。', 'zh-tw': '幻彩鏡面與環繞燈帶增強陳列效果，支援品牌主題與面板定制。', 'en-us': 'Iridescent panels and wraparound lighting create a strong display with customizable branding.' }
  },
  {
    id: 'cute-robot-claw', image: '/products-owned/cute-robot-claw.webp', category: 'claw',
    name: { 'zh-cn': '萌趣机器人娃娃机', 'zh-tw': '萌趣機器人娃娃機', 'en-us': 'Cute Robot Claw Machine' },
    description: { 'zh-cn': '高柜体、大礼品仓设计，兼顾抓取体验、陈列容量与日常补货。', 'zh-tw': '高櫃體、大禮品倉設計，兼顧抓取體驗、陳列容量與日常補貨。', 'en-us': 'A tall cabinet with generous prize capacity, built for visibility and easier replenishment.' }
  },
  {
    id: 'panorama-claw', image: '/products-owned/panorama-claw.webp', category: 'claw',
    name: { 'zh-cn': '全景酷爪机', 'zh-tw': '全景酷爪機', 'en-us': 'Panorama Claw Machine' },
    description: { 'zh-cn': '三面通透玻璃与大容量礼品区，让陈列和灯光从更多角度被看见。', 'zh-tw': '三面通透玻璃與大容量禮品區，讓陳列和燈光從更多角度被看見。', 'en-us': 'Three-sided glass and a large prize bay keep merchandise visible from more angles.' }
  },
  {
    id: 'moment-claw', image: '/products-owned/moment-claw.webp', category: 'themed',
    name: { 'zh-cn': '娃娃部落主题机', 'zh-tw': '娃娃部落主題機', 'en-us': 'Moment Theme Claw Machine' },
    description: { 'zh-cn': '蓝白机身配合动态灯牌，可按品牌或场地主题更换整机视觉。', 'zh-tw': '藍白機身配合動態燈牌，可按品牌或場地主題更換整機視覺。', 'en-us': 'A blue-and-white cabinet with programmable signage and adaptable venue branding.' }
  },
  {
    id: 'bubble-tea-claw', image: '/products-owned/bubble-tea-claw.webp', category: 'themed',
    name: { 'zh-cn': '茶饮主题娃娃机', 'zh-tw': '茶飲主題娃娃機', 'en-us': 'Bubble Tea Theme Claw Machine' },
    description: { 'zh-cn': '以茶饮视觉打造联名主题，适合餐饮、零售与娱乐空间跨界合作。', 'zh-tw': '以茶飲視覺打造聯名主題，適合餐飲、零售與娛樂空間跨界合作。', 'en-us': 'A beverage-inspired custom theme for crossover projects in food, retail and entertainment.' }
  },
  {
    id: 'cute-robot-pink', image: '/products-owned/cute-robot-pink.webp', category: 'themed',
    name: { 'zh-cn': '粉色萌趣机器人', 'zh-tw': '粉色萌趣機器人', 'en-us': 'Pink Cute Robot' },
    description: { 'zh-cn': '柔和粉色灯效与科技图形结合，适合女性向、亲子及潮玩场景。', 'zh-tw': '柔和粉色燈效與科技圖形結合，適合女性向、親子及潮玩場景。', 'en-us': 'Soft pink lighting and tech graphics for youth, family and lifestyle-focused venues.' }
  },
  {
    id: 'double-decker-claw', image: '/products-owned/double-decker-claw.webp', category: 'stacked',
    name: { 'zh-cn': '双层酷爪机', 'zh-tw': '雙層酷爪機', 'en-us': 'Double-Decker Claw Machine' },
    description: { 'zh-cn': '上下两层、四个操作位，在有限占地内提升设备数量与同时体验人数。', 'zh-tw': '上下兩層、四個操作位，在有限佔地內提升設備數量與同時體驗人數。', 'en-us': 'Two levels and four play positions increase capacity within a compact footprint.' }
  },
  {
    id: 'grabox-duo', image: '/products-owned/grabox-duo.webp', category: 'stacked',
    name: { 'zh-cn': 'Grabox 模块双层机', 'zh-tw': 'Grabox 模組雙層機', 'en-us': 'Grabox Modular Duo' },
    description: { 'zh-cn': '模块化双层结构，适合靠墙成组布置，也便于按门店空间扩展。', 'zh-tw': '模組化雙層結構，適合靠牆成組佈置，也便於按門店空間擴展。', 'en-us': 'A modular stacked format for wall-side installations and scalable venue layouts.' }
  },
  {
    id: 'modular-duo', image: '/products-owned/modular-duo.webp', category: 'stacked',
    name: { 'zh-cn': 'Gamer 模块双层机', 'zh-tw': 'Gamer 模組雙層機', 'en-us': 'Gamer Modular Duo' },
    description: { 'zh-cn': '独立双仓与统一灯光系统，方便分区运营、维护和礼品组合。', 'zh-tw': '獨立雙倉與統一燈光系統，方便分區營運、維護和禮品組合。', 'en-us': 'Two independent bays with unified lighting for flexible prizes, service and operations.' }
  },
  {
    id: 'happy-twist', image: '/products-owned/happy-twist.webp', category: 'stacked',
    name: { 'zh-cn': 'Happy Twist 双层礼品机', 'zh-tw': 'Happy Twist 雙層禮品機', 'en-us': 'Happy Twist Double Gift Machine' },
    description: { 'zh-cn': '旋钮式玩法与上下双层组合，适合小礼品和高频互动场景。', 'zh-tw': '旋鈕式玩法與上下雙層組合，適合小禮品和高頻互動場景。', 'en-us': 'A stacked twist-control format suited to small prizes and high-frequency play.' }
  },
  {
    id: 'cool-claw-duo', image: '/products-owned/cool-claw-duo.webp', category: 'stacked',
    name: { 'zh-cn': '酷爪四位双层机', 'zh-tw': '酷爪四位雙層機', 'en-us': 'Cool Claw Four-Player Duo' },
    description: { 'zh-cn': '双层四位独立操作，集中陈列并提高热门时段的接待能力。', 'zh-tw': '雙層四位獨立操作，集中陳列並提高熱門時段的接待能力。', 'en-us': 'Four independent play positions deliver dense merchandising and higher peak capacity.' }
  },
  {
    id: 'four-player-claw', image: '/products-owned/four-player-claw.webp', category: 'multiplayer',
    name: { 'zh-cn': '四人互动中心机', 'zh-tw': '四人互動中心機', 'en-us': 'Four-Player Interaction Center' },
    description: { 'zh-cn': '四面可同时体验，适合作为场地中心设备，形成围合式互动氛围。', 'zh-tw': '四面可同時體驗，適合作為場地中心設備，形成圍合式互動氛圍。', 'en-us': 'Four-sided simultaneous play makes this a strong centerpiece for busy venues.' }
  },
  {
    id: 'ricky-family', image: '/products-owned/ricky-family.webp', category: 'multiplayer',
    name: { 'zh-cn': '瑞奇家庭互动中心', 'zh-tw': '瑞奇家庭互動中心', 'en-us': "Ricky's Family Interaction Center" },
    description: { 'zh-cn': '双位宽体结构与大型展示区，面向亲子和家庭共同体验场景。', 'zh-tw': '雙位寬體結構與大型展示區，面向親子和家庭共同體驗場景。', 'en-us': 'A wide dual-play cabinet with a large display bay for family-oriented locations.' }
  }
]
