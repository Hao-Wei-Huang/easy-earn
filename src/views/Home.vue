<template>
  <div>
    <section class="banner d-flex align-items-center bg-cover">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h2 class="mb-4 line-height-lg">
              輕鬆賺，<br>化被動收入為主動收入!
            </h2>
            <searchbar />
          </div>
        </div>
      </div>
    </section>
    <section class="py-14">
      <div class="container">
        <h2 class="text-center">
          自訂選股，一次滿足所有需求
        </h2>
        <div class="row mt-8">
          <div class="col-md-6">
            <img
              src="@/../public/screened-ui.png"
              alt="圖片載入中"
            >
          </div>
          <div class="col-md-6">
            <h3 class="h5 line-height-lg">
              你還在擔心選股不夠全面？<br>
              輕鬆賺採用<span class="h4 mx-1">3</span>個面向選股，選出攻守兼備的優質股票
            </h3>
            <ol class="h5 font-weight-normal mt-4 list-position-inside">
              <li class="py-2">
                技術面：掌握線型趨勢脈動
              </li>
              <li class="py-2">
                籌碼面：隨時觀察三大法人動向
              </li>
              <li class="py-2">
                基本面：公司營運狀況一把抓
              </li>
            </ol>
            <p class="mt-4">
              輕鬆選出優質股票，你還在等什麼？趕緊來選股。
            </p>
            <router-link
              to="/screener"
              class="btn btn-primary mt-4"
            >
              點我開始選股
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="py-14 bg-primary text-white">
      <div class="container">
        <h2 class="text-center">
          個股分析，優質股票一手掌握
        </h2>
        <div class="row mt-8">
          <div class="col-md-6 text-center">
            <img
              src="@/../public/analysis-ui.png"
              alt="圖片載入中"
            >
            <img
              src="@/../public/analysis-ui2.png"
              alt="圖片載入中"
              class="w-50 mt-2"
            >
          </div>
          <div class="col-md-6">
            <h3 class="h5">
              針對個股作詳細分析，清楚點出優勢條件
            </h3>
            <ol class="h5 font-weight-normal mt-4 list-position-inside">
              <li class="py-2">
                呈現優勢條件，讓股市新手也能簡單理解
              </li>
              <li class="py-2">
                搭配個股評分系統，判斷個股目前情況，給予客觀分析
              </li>
            </ol>
            <p class="mt-2">
              輕鬆挑選股票，趕緊來試試吧！
            </p>
            <router-link
              to="/stock/2330"
              class="btn btn-secondary mt-4"
            >
              點我個股分析
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style lang="scss" scoped>
.banner{
  background-image: url('~@/../public/home-banner.jpeg');
  height: calc(100vh - 80px);
}
</style>
