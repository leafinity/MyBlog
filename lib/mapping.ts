export const categoryMap: Record<string, string> = {
  'sw': '瑞典旅遊',
  'no': '挪威旅遊',
  'eu': '歐洲旅遊',
  'life': '瑞典生活',
};

export const tagMap: Record<string, string> = {
  'explore': '小眾景點',
  'aurora': '極光',
  'road-trip': '自駕',
  'skiing': '滑雪',
  'ferry': '渡輪',
  'transportation': '交通',
  'trekking': '徒步健行',
  'adult-education': '成人教育',
  'language-study': '語言進修',
  'laugavegur-trail': 'Laugavegur Trail',
  'abisko': 'Abisko',
  'buying-property': '海外買房',
  'stockholm': '斯德哥爾摩',
  'bird-watching': '賞鳥',
  'spring-limited': '春季限定',
  'transport-guide': '交通攻略',
  'train': '火車',
  'compensation': '賠償申請',
  'whale-watching': '賞鯨',
  'azores': '亞速群島',
  'kungsleden': '國王小徑',
  'iceland': '冰島',
  'camping': '露營',
  'italy': '義大利'
};

export const reverseCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categoryMap).map(([key, value]) => [value, key])
);

export const reverseTagMap: Record<string, string> = Object.fromEntries(
  Object.entries(tagMap).map(([key, value]) => [value, key])
);