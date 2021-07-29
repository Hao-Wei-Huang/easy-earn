<template>
  <div class="bg-light">
    <div class="container py-6">
      <table class="table table-striped bg-white text-center">
        <thead class="text-white text-center">
          <tr>
            <th
              scope="col"
              class="sticky-top bg-primary align-middle"
              width="100px"
            >
              股票代碼
            </th>
            <th
              scope="col"
              class="sticky-top bg-primary align-middle"
              width="100px"
            >
              股票名稱
            </th>
            <th
              scope="col"
              class="sticky-top bg-primary align-middle"
            >
              當天收盤價
            </th>
            <th
              scope="col"
              class="sticky-top bg-primary align-middle"
            >
              漲跌
            </th>
            <th
              scope="col"
              class="sticky-top bg-primary align-middle"
            >
              成交量
            </th>
            <th
              scope="col"
              class="sticky-top bg-primary align-middle"
              width="120px"
            >
              取消追蹤
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in trackedStocks"
            :key="item.stockNo"
          >
            <td
              scope="row"
              class="align-middle"
            >
              <a
                href="#"
                class="text-info"
                @click.prevent="goBlankStock(item.stockNo)"
              >{{ item.stockNo }}</a>
            </td>
            <td class="align-middle">
              {{ item.stockName }}
            </td>
            <td class="text-right align-middle">
              {{ item.closingPrice | decimalFilter | thousandSeparatorFilter }}
            </td>
            <td
              class="text-right align-middle"
              :class="{
                'text-danger': item.upDown > 0,
                'text-success': item.upDown < 0
              }"
            >
              <span>
                <font-awesome-icon
                  v-if="item.upDown > 0"
                  :icon="['fas', 'arrow-up']"
                />
                <font-awesome-icon
                  v-if="item.upDown < 0"
                  :icon="['fas', 'arrow-down']"
                />
                {{ item.upDown }}
              </span><br>
              <span>
                {{ item.upDown / (item.closingPrice - item.upDown) * 100 | decimalFilter }}%
              </span>
            </td>
            <td class="text-right align-middle">
              {{ item.capacity | thousandSeparatorFilter }}
            </td>
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-primary border-0"
                @click="deleteTrackedStock(item.stockNo)"
              >
                <font-awesome-icon :icon="['fas', 'times']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trackedStocks: [],
    };
  },
  methods: {
    getTrackedStocks() {
      const api = `${process.env.VUE_APP_API_PATH}track`;
      this.$http.get(api)
        .then((res) => {
          this.trackedStocks = res.data.data;
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
    goBlankStock(stockNo) {
      const { href } = this.$router.resolve(`/stock/${stockNo}`);
      window.open(href, '_blank');
    },
  },
  created() {
    this.getTrackedStocks();
  },
  mounted() {

  },
  components: {

  },
};
</script>

<style lang="scss">

</style>
