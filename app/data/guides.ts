import type { SiteLocale } from './products'

export const guideLabels: Record<SiteLocale, { title: string; intro: string; read: string; back: string; contact: string; quote: string }> = {
  'en-us': { title: 'Claw Machine Buying Guides', intro: 'Practical questions to help you compare machines, plan your space and prepare an equipment enquiry.', read: 'Read guide', back: 'All buying guides', contact: 'Discuss your venue with JiuKu', quote: 'View products' },
  'zh-cn': { title: '娃娃机采购指南', intro: '从设备比较、场地规划到询价准备，帮助您理清采购需求。', read: '阅读指南', back: '全部采购指南', contact: '与九酷沟通场地需求', quote: '浏览产品' },
  'zh-tw': { title: '娃娃機採購指南', intro: '從設備比較、場地規劃到詢價準備，幫助您釐清採購需求。', read: '閱讀指南', back: '全部採購指南', contact: '與九酷溝通場地需求', quote: '瀏覽產品' }
}

type GuideCopy = { title: string; summary: string; sections: { title: string; body: string }[] }
export const guides: { slug: string; copy: Record<SiteLocale, GuideCopy> }[] = [
  {
    slug: 'choose-a-claw-machine',
    copy: {
      'en-us': {
        title: 'How to Choose a Claw Machine for Your Venue',
        summary: 'Start with your space, prizes and daily service needs before comparing cabinet designs.',
        sections: [
          { title: 'Measure the usable space', body: 'Record the installation area and the delivery route, including doors, lifts and corners. Allow room for players, prize collection and staff access. Ask for a dimension drawing of the exact model rather than judging its size from a photo. A machine that fits the floor plan must also be able to reach its installation position.' },
          { title: 'Match the machine to the prizes', body: 'Prepare photos, dimensions and approximate weights of the prizes you intend to use. Ask the supplier to confirm the appropriate claw, prize bay and collection opening for that model. If possible, request a demonstration using comparable prizes. Cabinet appearance alone does not establish prize compatibility.' },
          { title: 'Confirm the operating requirements', body: 'Discuss the intended country, power supply, payment requirements and operating language before requesting a final quotation. Payment integration and language availability must be confirmed for the selected configuration. Ask how staff refill prizes, access service areas and obtain spare parts or support. Compare the written specifications and scope of supply before ordering.' }
        ]
      },
      'zh-cn': { title: '如何为场地选择娃娃机', summary: '先确认空间、礼品和日常维护需求，再比较外观。', sections: [
        { title: '测量可用空间', body: '记录摆放区域及运输路线，包括门、电梯和转角。预留玩家操作、取礼品和工作人员维护空间。向供应商索取具体型号的尺寸图，不能仅凭图片估算大小。设备既要摆得下，也要运得进去。' },
        { title: '确认礼品适配', body: '准备计划使用的礼品照片、尺寸和大致重量，逐项确认爪子、礼品仓和出礼口是否适配。条件允许时，要求用相近礼品演示。外观相似不代表礼品兼容范围相同。' },
        { title: '核对运营配置', body: '最终报价前说明使用国家、电源、支付需求和操作语言。支付接入和语言支持须按所选配置确认。同时询问补货、检修、备件和售后方式，按书面参数及供货范围比较方案。' }
      ] },
      'zh-tw': { title: '如何為場地選擇娃娃機', summary: '先確認空間、禮品和日常維護需求，再比較外觀。', sections: [
        { title: '測量可用空間', body: '記錄擺放區域及運輸路線，包括門、電梯和轉角。預留玩家操作、取禮品和工作人員維護空間。向供應商索取具體型號的尺寸圖，不能僅憑圖片估算大小。設備既要擺得下，也要運得進去。' },
        { title: '確認禮品適配', body: '準備計畫使用的禮品照片、尺寸和大致重量，逐項確認爪子、禮品倉和出禮口是否適配。條件允許時，要求用相近禮品演示。外觀相似不代表禮品相容範圍相同。' },
        { title: '核對營運配置', body: '最終報價前說明使用國家、電源、支付需求和操作語言。支付接入和語言支援須按所選配置確認。同時詢問補貨、檢修、備件和售後方式，按書面參數及供貨範圍比較方案。' }
      ] }
    }
  },
  {
    slug: 'single-vs-multi-station',
    copy: {
      'en-us': { title: 'Single vs. Multi-Station Claw Machines', summary: 'Compare access, layout and service needs alongside the number of play stations.', sections: [
        { title: 'Plan around the layout', body: 'A standalone cabinet can be placed individually or arranged with other machines. A multi-station format groups play positions in one installation. Compare the exact footprints and the space needed around each configuration. Do not assume that more play positions automatically mean a better use of the available floor area.' },
        { title: 'Check access for players and staff', body: 'For stacked or multi-station machines, check control heights, prize retrieval and access to every play position. Review the proposed arrangement with the venue team, including circulation and accessibility requirements. Confirm how staff refill each compartment and reach service doors without moving adjacent equipment.' },
        { title: 'Compare the complete configuration', body: 'Ask for the number of independent play areas, payment arrangements, electrical requirements and service access for the exact model. Compare total purchase and installation costs, not only a price per station. More stations do not guarantee more sales; venue demand, prize selection and day-to-day operation also affect results.' }
      ] },
      'zh-cn': { title: '单机与多操作区娃娃机如何选择', summary: '除了操作区数量，还要比较摆放、玩家使用和维护条件。', sections: [
        { title: '根据布局比较', body: '单机可以独立摆放或成组排列，多操作区机型将多个体验位置组合在一处。应按具体尺寸和周边预留空间比较，不应直接认定操作区越多就越节省场地。' },
        { title: '检查操作和维护空间', body: '双层或多操作区设备需要检查操作高度、取物位置和各区通道。与场地方一起确认动线及无障碍要求，并核对各仓补货和检修门能否在不移动邻近设备的情况下使用。' },
        { title: '按完整配置核价', body: '确认具体型号的独立操作区数量、支付安排、电源要求和维护方式。比较采购及安装总成本，不只看单个操作区价格。更多操作区不代表更高销量，需求、礼品和日常运营同样影响结果。' }
      ] },
      'zh-tw': { title: '單機與多操作區娃娃機如何選擇', summary: '除了操作區數量，還要比較擺放、玩家使用和維護條件。', sections: [
        { title: '根據佈局比較', body: '單機可以獨立擺放或成組排列，多操作區機型將多個體驗位置組合在一處。應按具體尺寸和周邊預留空間比較，不應直接認定操作區越多就越節省場地。' },
        { title: '檢查操作和維護空間', body: '雙層或多操作區設備需要檢查操作高度、取物位置和各區通道。與場地方一起確認動線及無障礙要求，並核對各倉補貨和檢修門能否在不移動鄰近設備的情況下使用。' },
        { title: '按完整配置核價', body: '確認具體型號的獨立操作區數量、支付安排、電源要求和維護方式。比較採購及安裝總成本，不只看單個操作區價格。更多操作區不代表更高銷量，需求、禮品和日常營運同樣影響結果。' }
      ] }
    }
  },
  {
    slug: 'quotation-checklist',
    copy: {
      'en-us': { title: 'What to Prepare Before Requesting a Claw Machine Quote', summary: 'A clear enquiry helps the supplier recommend a configuration and explain what the price includes.', sections: [
        { title: 'Share the project basics', body: 'Include the destination country and city, venue type, available space, preferred models and estimated quantity. Add a floor plan or measurements if you have them. State the target opening date and budget range as planning information; production and transport timing still need to be confirmed.' },
        { title: 'List the required configuration', body: 'Describe your intended prizes and payment method, local power requirements, operating language and any branding requests. Separate essential requirements from optional features. Ask the supplier to confirm each item in writing for the quoted model, including any extra cost or external integration needed.' },
        { title: 'Check the scope of the quotation', body: 'Ask for an itemized equipment quotation and clarification of packaging, transport, delivery terms, installation, spare parts and after-sales support. Establish which destination charges are included and which require a separate estimate. Confirm the quotation validity and agreed configuration before proceeding. For an initial JiuKu enquiry, send your destination, model or photo, quantity and venue measurements through the contact page.' }
      ] },
      'zh-cn': { title: '娃娃机询价前需要准备什么', summary: '清晰的需求有助于供应商推荐配置，并说明价格包含哪些内容。', sections: [
        { title: '提供项目基本信息', body: '说明目的国家和城市、场地类型、可用空间、意向型号及预计数量。有平面图或尺寸时可以一并提供。开业时间和预算用于规划，生产和运输时效仍须另行确认。' },
        { title: '列出配置需求', body: '说明礼品、支付方式、当地电源要求、操作语言和品牌定制需求，区分必需项与可选项。请供应商针对报价型号逐项书面确认，并说明额外费用或外部接入要求。' },
        { title: '核对报价范围', body: '要求列明设备费用，确认包装、运输、交付条款、安装、备件和售后范围，区分已包含及需另行估算的目的地费用。推进前核对有效期和约定配置。首次联系九酷时，可通过联系页发送目的地、型号或图片、数量与场地尺寸。' }
      ] },
      'zh-tw': { title: '娃娃機詢價前需要準備什麼', summary: '清晰的需求有助於供應商推薦配置，並說明價格包含哪些內容。', sections: [
        { title: '提供專案基本資訊', body: '說明目的國家和城市、場地類型、可用空間、意向型號及預計數量。有平面圖或尺寸時可以一併提供。開業時間和預算用於規劃，生產和運輸時效仍須另行確認。' },
        { title: '列出配置需求', body: '說明禮品、支付方式、當地電源要求、操作語言和品牌定制需求，區分必需項與可選項。請供應商針對報價型號逐項書面確認，並說明額外費用或外部接入要求。' },
        { title: '核對報價範圍', body: '要求列明設備費用，確認包裝、運輸、交付條款、安裝、備件和售後範圍，區分已包含及需另行估算的目的地費用。推進前核對有效期和約定配置。首次聯絡九酷時，可透過聯絡頁發送目的地、型號或圖片、數量與場地尺寸。' }
      ] }
    }
  }
]
