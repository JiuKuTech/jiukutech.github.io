export type ProductCategory = 'claw' | 'boutique' | 'retail' | 'support'
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
    id: 'overseas-claw', image: '/products/overseas-claw.webp', category: 'claw',
    name: { 'zh-cn': '海外款娃娃机', 'zh-tw': '海外款娃娃機', 'en-us': 'Overseas Claw Machine' },
    description: { 'zh-cn': '醒目灯效与大视窗设计，适配商场及海外娱乐场景。', 'zh-tw': '醒目燈效與大視窗設計，適配商場及海外娛樂場景。', 'en-us': 'Bright lighting and a wide display window for malls and overseas venues.' }
  },
  {
    id: 'red-claw', image: '/products/red-claw.webp', category: 'claw',
    name: { 'zh-cn': '经典红款娃娃机', 'zh-tw': '經典紅款娃娃機', 'en-us': 'Classic Red Claw Machine' },
    description: { 'zh-cn': '经典单机结构，运营维护简单，适合灵活组合投放。', 'zh-tw': '經典單機結構，營運維護簡單，適合靈活組合投放。', 'en-us': 'A dependable single-cabinet format for flexible, easy-to-maintain setups.' }
  },
  {
    id: 'island-claw', image: '/products/island-claw.webp', category: 'claw',
    name: { 'zh-cn': '海岛主题娃娃机', 'zh-tw': '海島主題娃娃機', 'en-us': 'Island Theme Claw Machine' },
    description: { 'zh-cn': '主题化外观与通透展示区，增强亲子场景吸引力。', 'zh-tw': '主題化外觀與通透展示區，增強親子場景吸引力。', 'en-us': 'A themed cabinet and open display designed to attract family audiences.' }
  },
  {
    id: 'purple-boutique', image: '/products/purple-boutique.webp', category: 'boutique',
    name: { 'zh-cn': '紫色精品机', 'zh-tw': '紫色精品機', 'en-us': 'Purple Boutique Machine' },
    description: { 'zh-cn': '适合潮玩、手办等精品礼品，支持主题外观定制。', 'zh-tw': '適合潮玩、手辦等精品禮品，支援主題外觀定制。', 'en-us': 'Built for collectibles and premium gifts with customizable themes.' }
  },
  {
    id: 'pink-boutique', image: '/products/pink-boutique.webp', category: 'boutique',
    name: { 'zh-cn': '粉色精品机', 'zh-tw': '粉色精品機', 'en-us': 'Pink Boutique Machine' },
    description: { 'zh-cn': '柔和配色结合高亮陈列，适合年轻消费场景。', 'zh-tw': '柔和配色結合高亮陳列，適合年輕消費場景。', 'en-us': 'Soft colors and bright merchandising for youth-focused locations.' }
  },
  {
    id: 'bakery-island', image: '/products/bakery-island.webp', category: 'boutique',
    name: { 'zh-cn': '烘焙岛主题机', 'zh-tw': '烘焙島主題機', 'en-us': 'Bakery Island Machine' },
    description: { 'zh-cn': '组合式主题设备，适用于门店中岛和主题专区。', 'zh-tw': '組合式主題設備，適用於門店中島和主題專區。', 'en-us': 'A modular themed setup for store islands and dedicated play zones.' }
  },
  {
    id: 'gift-clip', image: '/products/gift-clip.webp', category: 'boutique',
    name: { 'zh-cn': '剪刀礼品机', 'zh-tw': '剪刀禮品機', 'en-us': 'Gift Cutting Machine' },
    description: { 'zh-cn': '剪线玩法提升参与感，适配高价值礼品运营。', 'zh-tw': '剪線玩法提升參與感，適配高價值禮品營運。', 'en-us': 'A skill-based cutting game suited to higher-value prize operations.' }
  },
  {
    id: 'capsule-house', image: '/products/capsule-house.webp', category: 'retail',
    name: { 'zh-cn': '扭蛋小屋', 'zh-tw': '扭蛋小屋', 'en-us': 'Capsule House' },
    description: { 'zh-cn': '高密度扭蛋陈列与自助售卖，充分利用有限空间。', 'zh-tw': '高密度扭蛋陳列與自助售賣，充分利用有限空間。', 'en-us': 'High-density capsule retail that makes efficient use of compact spaces.' }
  },
  {
    id: 'candy-house', image: '/products/candy-house.webp', category: 'retail',
    name: { 'zh-cn': '糖果小屋', 'zh-tw': '糖果小屋', 'en-us': 'Candy House' },
    description: { 'zh-cn': '自助糖果售卖设备，适合亲子及休闲消费空间。', 'zh-tw': '自助糖果售賣設備，適合親子及休閒消費空間。', 'en-us': 'Self-service candy retail for family and leisure environments.' }
  },
  {
    id: 'coin-exchange', image: '/products/coin-exchange.webp', category: 'support',
    name: { 'zh-cn': '立式兑币机', 'zh-tw': '立式兌幣機', 'en-us': 'Floor Coin Exchanger' },
    description: { 'zh-cn': '支持门店自助兑币，减少高峰期人工服务压力。', 'zh-tw': '支援門店自助兌幣，減少高峰期人工服務壓力。', 'en-us': 'Self-service coin exchange that reduces staffing pressure at peak hours.' }
  },
  {
    id: 'counter-exchange', image: '/products/counter-exchange.webp', category: 'support',
    name: { 'zh-cn': '台式兑币机', 'zh-tw': '台式兌幣機', 'en-us': 'Countertop Coin Exchanger' },
    description: { 'zh-cn': '紧凑机身便于收银台部署，满足小型场地需求。', 'zh-tw': '緊湊機身便於收銀台部署，滿足小型場地需求。', 'en-us': 'A compact countertop format for smaller venues and cashier areas.' }
  }
]
