<template>
  <div
    v-if="isStockNo"
    class="bg-light"
  >
    <div class="container py-6">
      <div class="row">
        <div class="col-md-12">
          <div
            v-if="company.stockNo && price.data"
            class="bg-white border border-muted rounded p-4"
          >
            <div class="d-flex">
              <h2 class="h3">
                {{ company.stockName }}
                <span class="h4 ml-2">({{ company.stockNo }})</span>
              </h2>
              <searchbar class="ml-auto" />
              <button
                v-if="!isTrackStock"
                type="button"
                class="btn btn-primary ml-4"
                @click="addTrackedStock(stockNo)"
              >
                <font-awesome-icon :icon="['fas', 'plus']" /> 追蹤
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary ml-4"
                @click="deleteTrackedStock(stockNo)"
              >
                取消追蹤
              </button>
            </div>
            <ul class="d-flex text-center mt-4">
              <li class="pr-5 border-right border-muted">
                <span>股價</span>
                <span
                  class="d-block h5 font-weight-normal"
                  :class="{'text-danger': price.data[0].upDown > 0,
                           'text-success': price.data[0].upDown < 0}"
                >
                  {{ price.data[0].closingPrice | decimalFilter | thousandSeparatorFilter }}
                </span>
              </li>
              <li class="px-5 border-right border-muted">
                <span>漲跌</span>
                <span
                  class="d-block h5 font-weight-normal"
                  :class="{'text-danger': price.data[0].upDown > 0,
                           'text-success': price.data[0].upDown < 0}"
                >
                  <font-awesome-icon
                    v-if="price.data[0].upDown > 0"
                    :icon="['fas', 'arrow-up']"
                  />
                  <font-awesome-icon
                    v-if="price.data[0].upDown < 0"
                    :icon="['fas', 'arrow-down']"
                  />
                  {{ price.data[0].upDown | decimalFilter }}
                </span>
              </li>
              <li class="px-5 border-right border-muted">
                <span>漲幅</span>
                <span
                  class="d-block h5 font-weight-normal"
                  :class="{'text-danger': price.data[0].upDown > 0,
                           'text-success': price.data[0].upDown < 0}"
                >
                  {{ price.data[0].upDown /
                    (price.data[0].closingPrice - price.data[0].upDown) * 100 | decimalFilter }}%
                </span>
              </li>
              <li class="px-5 border-right border-muted">
                <span>成交量</span>
                <span class="d-block h5 font-weight-normal">
                  {{ price.data[0].capacity | thousandSeparatorFilter }}
                </span>
              </li>
              <li class="px-5 border-right border-muted">
                <span>產業</span>
                <span class="d-block h5 font-weight-normal">
                  {{ company.type }} - {{ company.industryCategory }}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-7 mt-4">
          <div
            v-if="chip.data"
            class="bg-white border border-muted rounded p-4 h-100"
          >
            <h3 class="h4">
              籌碼動態
            </h3>
            <table class="table mt-3 mb-0">
              <thead class="bg-primary text-white text-center">
                <tr>
                  <th
                    scope="col"
                    class="align-middle"
                  >
                    日期
                  </th>
                  <th scope="col">
                    外資<br>買賣超
                  </th>
                  <th scope="col">
                    投信<br>買賣超
                  </th>
                  <th scope="col">
                    自營商<br>買賣超
                  </th>
                  <th scope="col">
                    三大法人<br>合計
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in chip.data"
                  :key="item.date"
                  class="text-right"
                >
                  <td
                    scope="row"
                    class="text-center"
                  >
                    {{ item.date }}
                  </td>
                  <td>
                    {{ item.foreignInvestorsBS | thousandSeparatorFilter }}
                  </td>
                  <td>
                    {{ item.investmentTrustBS | thousandSeparatorFilter }}
                  </td>
                  <td>
                    {{ item.dealerBS | thousandSeparatorFilter }}
                  </td>
                  <td>
                    {{ item.institutionalInvestorsBS | thousandSeparatorFilter }}
                  </td>
                </tr>
                <tr class="text-right">
                  <td />
                  <td>
                    {{ chip.total.foreignInvestorsBS | thousandSeparatorFilter }}
                  </td>
                  <td>
                    {{ chip.total.investmentTrustBS | thousandSeparatorFilter }}
                  </td>
                  <td>
                    {{ chip.total.dealerBS | thousandSeparatorFilter }}
                  </td>
                  <td>
                    {{ chip.total.institutionalInvestorsBS | thousandSeparatorFilter }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-lg-5 mt-4">
          <div
            v-if="finance.data"
            class="bg-white border border-muted rounded p-4 h-100"
          >
            <h3 class="h4">
              營運資訊
            </h3>
            <ul
              v-if="finance.data[0].monthlyRevenue"
              class="row no-gutters mt-3 mx--2 text-center"
            >
              <li class="col-md-6 px-2">
                <div class="border border-muted rounded">
                  <div
                    class="bg-primary text-white py-2"
                  >
                    {{ finance.data[0].monthlyRevenue.date.slice(4) }}月營收 YoY
                  </div>
                  <p class="h5 font-weight-normal py-2">
                    {{ finance.data[0].monthlyRevenue.YoY }}%
                  </p>
                </div>
              </li>
              <li class="col-md-6 px-2">
                <div class="border border-muted rounded">
                  <div class="bg-primary text-white py-2">
                    {{ finance.data[0].monthlyRevenue.date.slice(4) }}月營收 MoM
                  </div>
                  <p class="h5 font-weight-normal py-2">
                    {{ finance.data[0].monthlyRevenue.MoM }}%
                  </p>
                </div>
              </li>
              <li class="col-md-6 px-2 mt-4">
                <div class="border border-muted rounded">
                  <div class="bg-primary text-white py-2">
                    本益比
                  </div>
                  <p class="h5 font-weight-normal py-2">
                    {{ finance.data[0].PER }}
                  </p>
                </div>
              </li>
              <li class="col-md-6 px-2 mt-4">
                <div class="border border-muted rounded">
                  <div class="bg-primary text-white py-2">
                    殖利率
                  </div>
                  <p class="h5 font-weight-normal py-2">
                    {{ finance.data[0].dividendYield }}%
                  </p>
                </div>
              </li>
              <li class="col-md-6 px-2 mt-4">
                <div class="border border-muted rounded">
                  <div class="bg-primary text-white py-2">
                    股價淨值比
                  </div>
                  <p class="h5 font-weight-normal py-2">
                    {{ finance.data[0].PBR }}
                  </p>
                </div>
              </li>
              <li class="col-md-6 px-2 mt-4">
                <div class="border border-muted rounded">
                  <div class="bg-primary text-white py-2">
                    近 4 季 EPS
                  </div>
                  <p class="h5 font-weight-normal py-2">
                    {{ finance.data[0].yearEPS }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-12 mt-4">
          <div
            v-if="analysis.data"
            class="bg-white border border-muted rounded p-4"
          >
            <h3 class="h4">
              個股分析
            </h3>
            <div
              v-if="analysis.data.length"
              class="row"
            >
              <div class="col-md-8">
                <ul class="mt-3">
                  <li
                    v-for="(item, index) in analysis.data"
                    :key="`${item.type}${item.tm}`"
                    class="d-flex align-items-center py-2"
                  >
                    {{ index + 1 }}.
                    <span class="flex-shrink-0 ml-1">{{ item.type | conditionTypeFilter }}</span>
                    <span class="flex-shrink-0">{{ item | conditionContentFilter }}</span>
                    <span
                      v-if="item.val !== ''"
                      class="ml-1"
                    >
                      {{ item.val | thousandSeparatorFilter }} {{ item.type | conditionUnitFilter }}
                    </span>
                    <span
                      v-if="item.note"
                      class="flex-shrink-0"
                    >
                      {{ item.note }}
                    </span>
                    <font-awesome-icon
                      :icon="['fas', 'arrow-right']"
                      class="h5 mx-3"
                    />
                    <p class="bg-light-secondary text-primary p-1">
                      {{ item.remark }}
                    </p>
                  </li>
                </ul>
              </div>
              <div class="col-md-4">
                <c3-chart :options="chartOptions" />
              </div>
            </div>
            <div
              v-else
              class="h5 mt-4"
            >
              個股目前無相關之分析
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="bg-light"
  >
    <div class="container d-flex justify-content-center py-8">
      <div class="bg-white border border-muted rounded p-6 mt-4">
        <span class="h3">查無股號：{{ stockNo }}，請確認此股號是否存在</span>
        <p class="mt-4">
          很抱歉，您查詢頁面不存在
        </p>
        <div class="mt-5 text-center">
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="$router.push('/')"
          >
            回首頁
          </button>
          <button
            type="button"
            class="btn btn-primary ml-3"
            @click="$router.push(`/stock/2330`)"
          >
            繼續查詢個股
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import C3Chart from '@/components/C3Chart.vue';

export default {
  data() {
    return {
      chartOptions: {
        data: {
          columns: [],
          colors: {},
          type: 'donut',
        },
        size: {
          width: undefined,
          height: undefined,
        },
        transition: {
          duration: 300,
        },
        donut: {
          title: '',
          width: 25,
          label: {
            show: false,
          },
          expand: false,
        },
        legend: {
          show: false,
        },
        tooltip: {
          show: false,
        },
      },
      stockNo: '',
      company: {},
      price: {},
      chip: {},
      finance: {},
      analysis: {},
      isStockNo: true,
      trackedStocks: [],
    };
  },
  components: {
    C3Chart,
  },
  methods: {
    getCompany(stockNo) {
      const api = `${process.env.VUE_APP_API_PATH}companies/${stockNo}`;
      this.$http.get(api)
        .then((res) => {
          this.company = res.data.data;
        })
        .catch();
    },
    getPrice(stockNo) {
      const api = `${process.env.VUE_APP_API_PATH}prices/${stockNo}?day=1`;
      this.$http.get(api)
        .then((res) => {
          this.price = res.data.data;
        })
        .catch();
    },
    getChip(stockNo) {
      const api = `${process.env.VUE_APP_API_PATH}chips/${stockNo}?day=5`;
      this.$http.get(api)
        .then((res) => {
          this.chip = res.data.data;
          const total = {
            foreignInvestorsBS: 0,
            investmentTrustBS: 0,
            dealerBS: 0,
            institutionalInvestorsBS: 0,
          };
          for (let i = 0; i < this.chip.data.length; i += 1) {
            total.foreignInvestorsBS += this.chip.data[i].foreignInvestorsBS;
            total.investmentTrustBS += this.chip.data[i].investmentTrustBS;
            total.dealerBS += this.chip.data[i].dealerBS;
            total.institutionalInvestorsBS += this.chip.data[i].institutionalInvestorsBS;
          }
          this.chip.total = total;
        })
        .catch();
    },
    getFinance(stockNo) {
      const api = `${process.env.VUE_APP_API_PATH}finances/${stockNo}`;
      this.$http.get(api)
        .then((res) => {
          this.finance = res.data.data;
        })
        .catch();
    },
    getAnalysis(stockNo) {
      const api = `${process.env.VUE_APP_API_PATH}analyses/${stockNo}`;
      const totalScore = 10;
      this.$http.get(api)
        .then((res) => {
          this.analysis = res.data.data;
          this.chartOptions.data.columns = [];
          this.chartOptions.data.colors = {};
          this.chartOptions = { ...this.chartOptions };
          this.chartOptions.data.columns.push(['data1', this.analysis.score]);
          this.chartOptions.data.colors.data1 = '#1c1d3e';
          if (this.analysis.score < totalScore / 2) {
            for (let i = 0; i < totalScore - this.analysis.score; i += 0.5) {
              this.chartOptions.data.columns.push([`data${(i + 1) * 2}`, 0.5]);
              this.chartOptions.data.colors[`data${(i + 1) * 2}`] = '#ffffff';
            }
          } else {
            this.chartOptions.data.columns.push(['data2', totalScore - this.analysis.score]);
            this.chartOptions.data.colors.data2 = '#ffffff';
          }
          this.chartOptions.donut.title = `${this.analysis.score} / 10`;
        })
        .catch();
    },
    checkStock(stockNo) {
      const api = `${process.env.VUE_APP_API_PATH}check/${stockNo}`;
      this.$http.get(api)
        .then((res) => {
          this.isStockNo = res.data.data.isStockNo;
        })
        .catch();
    },
    getTrackedStocks() {
      const api = `${process.env.VUE_APP_API_PATH}track`;
      this.$http.get(api)
        .then((res) => {
          this.trackedStocks = res.data.data;
        })
        .catch({});
    },
    addTrackedStock(stockNo) {
      const api = `${process.env.VUE_APP_API_PATH}track`;
      this.$http.post(api, { trackedStock: stockNo })
        .then(() => {
          this.getTrackedStocks();
        })
        .catch({});
    },
    deleteTrackedStock(stockNo) {
      const api = `${process.env.VUE_APP_API_PATH}track`;
      this.$http.delete(api, { data: { trackedStock: stockNo } })
        .then(() => {
          this.getTrackedStocks();
        })
        .catch({});
    },
  },
  created() {
    this.stockNo = this.$route.params.id;
    this.checkStock(this.stockNo);
    this.getCompany(this.stockNo);
    this.getPrice(this.stockNo);
    this.getChip(this.stockNo);
    this.getFinance(this.stockNo);
    this.getAnalysis(this.stockNo);
    this.getTrackedStocks();
  },
  computed: {
    isTrackStock() {
      return this.trackedStocks.some((item) => item.stockNo === this.stockNo);
    },
  },
  watch: {
    $route() {
      this.stockNo = this.$route.params.id;
      this.checkStock(this.stockNo);
      this.getCompany(this.stockNo);
      this.getPrice(this.stockNo);
      this.getChip(this.stockNo);
      this.getFinance(this.stockNo);
      this.getAnalysis(this.stockNo);
    },
  },
};
</script>

<style lang="scss">
.c3-target.c3-defocused{
  opacity: 1 !important;
}
.c3-chart-arcs-title{
  font-size: 2rem;
}
.c3-chart-arcs text{
  fill:#1c1d3e;
}
</style>
