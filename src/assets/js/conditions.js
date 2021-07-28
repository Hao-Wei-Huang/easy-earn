export default {
  ascendingOrder: {
    type: '多頭排列',
    unit: '',
    content() {
      return '5 > 10 > 20 均線';
    },
  },
  descendingOrder: {
    type: '空頭排列',
    unit: '',
    content() {
      return '5 < 10 < 20 均線';
    },
  },
  capacity: {
    type: '當日成交量',
    unit: '%',
    content(tm) {
      return `比 ${tm} 日均量`;
    },
  },
  BIAS: {
    type: '乖離率',
    unit: '%',
    content(tm) {
      return `股價比 ${tm} 日均線`;
    },
  },
  K: {
    type: 'K 值 (日)',
    unit: '%',
    content() {
      return '當天數據';
    },
  },
  D: {
    type: 'D 值 (日)',
    unit: '%',
    content() {
      return '當天數據';
    },
  },
  KDGoldenCross: {
    type: 'KD 指標(日)',
    unit: '',
    content() {
      return '黃金交叉';
    },
  },
  RSI: {
    type: 'RSI',
    unit: '%',
    content(tm) {
      return `近 ${tm} 日數據`;
    },
  },
  RSIGoldenCross: {
    type: 'RSI 指標',
    unit: '',
    content() {
      return '黃金交叉';
    },
  },
  MACDGoldenCross: {
    type: 'MACD 指標',
    unit: '',
    content() {
      return '由負轉正';
    },
  },
  bollingerBand: {
    type: '布林通道',
    unit: '',
    content(tm) {
      return `近 ${tm} 日數據`;
    },
  },
  foreignInvestorCB: {
    type: '外資連續買超',
    unit: '',
    content(tm) {
      return `連 ${tm} 日`;
    },
  },
  investmentTrustCB: {
    type: '投信連續買超',
    unit: '',
    content(tm) {
      return `連 ${tm} 日`;
    },
  },
  dealerCB: {
    type: '自營商連續買超',
    unit: '',
    content(tm) {
      return `連 ${tm} 日`;
    },
  },
  foreignInvestorBS: {
    type: '外資買超',
    unit: '張',
    content(tm) {
      return `近 ${tm} 日`;
    },
  },
  investmentTrustBS: {
    type: '投信買超',
    unit: '張',
    content(tm) {
      return `近 ${tm} 日`;
    },
  },
  dealerBS: {
    type: '自營商買超',
    unit: '張',
    content(tm) {
      return `近 ${tm} 日`;
    },
  },
  monthlyRevenueYoY: {
    type: '月營收年增',
    unit: '％',
    content(tm) {
      return `連 ${tm} 個月`;
    },
  },
  monthlyRevenueMoM: {
    type: '月營收月增',
    unit: '％',
    content(tm) {
      return `連 ${tm} 個月`;
    },
  },
  threeRatio: {
    type: '三率三升',
    unit: '',
    content(tm) {
      return `連 ${tm} 季遞增`;
    },
  },
  epsGrowthRatio: {
    type: 'EPS 成長率',
    unit: '％',
    content(tm) {
      return `近 ${tm} 季數據`;
    },
  },
  dividendYield: {
    type: '殖利率',
    unit: '％',
    content() {
      return '目前數據';
    },
  },
  PER: {
    type: '本益比',
    unit: '倍',
    content() {
      return '目前數據';
    },
  },
};
