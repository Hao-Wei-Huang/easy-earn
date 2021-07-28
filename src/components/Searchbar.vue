<template>
  <div>
    <form
      class="position-relative"
      @submit.prevent="goStock(searchedStock)"
    >
      <input
        type="text"
        class="form-control text-center pr-12"
        placeholder="輸入台股代號 / 名稱"
        v-model="searchedStock"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @keydown.up="moveListItem('up'), scroll()"
        @keydown.down="moveListItem('down'), scroll()"
        @keydown.enter.prevent="searchedStock =
          `${searchedStocks[hoverStockIndex].stockNo} ${searchedStocks[hoverStockIndex].stockName}`"
      >
      <button
        class="icon-search position-absolute btn btn-primary"
      >
        <font-awesome-icon
          :icon="['fas', 'search']"
          class="h5"
        />
      </button>
      <ul
        v-show="searchedStocks.length && isFocus"
        class="hint-list position-absolute border rounded-bottom bg-white"
        ref="hintList"
      >
        <li
          v-for="item,index in searchedStocks"
          :key="item.stockNo"
        >
          <a
            href="#"
            class="d-block py-2 px-4"
            :class="{'bg-muted': hoverStockNo === item.stockNo}"
            @mousedown="searchedStock = `${item.stockNo}  ${item.stockName}`"
            @mouseenter="hoverStockNo = item.stockNo, hoverStockIndex = index"
          >
            <span class="mr-3">{{ item.stockNo }}</span>
            <span>{{ item.stockName }}</span>
          </a>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchedStock: '',
      searchedStocks: [],
      hoverStockNo: '',
      hoverStockIndex: 0,
      isFocus: false,
    };
  },
  methods: {
    searchStocks(term) {
      if (term === '') {
        this.searchedStocks = [];
        return;
      }
      const api = `${process.env.VUE_APP_API_PATH}search?term=${term}`;
      this.$http.get(api)
        .then((res) => {
          this.searchedStocks = res.data.data;
          if (this.searchedStocks.length) {
            this.hoverStockNo = this.searchedStocks[0].stockNo;
            this.hoverStockIndex = 0;
          }
        })
        .catch();
    },
    moveListItem(direction) {
      if (this.searchedStocks.length < 2) return;
      if (direction === 'up') {
        if (this.hoverStockIndex === 0) {
          this.hoverStockIndex = this.searchedStocks.length - 1;
        } else {
          this.hoverStockIndex -= 1;
        }
        this.hoverStockNo = this.searchedStocks[this.hoverStockIndex].stockNo;
      } else {
        if (this.hoverStockIndex === this.searchedStocks.length - 1) {
          this.hoverStockIndex = 0;
        } else {
          this.hoverStockIndex += 1;
        }
        this.hoverStockNo = this.searchedStocks[this.hoverStockIndex].stockNo;
      }
    },
    scroll() {
      const { hintList } = this.$refs;
      const itemHeight = hintList.querySelector('li').offsetHeight;
      const currentHeight = hintList.scrollTop;
      const listHeight = hintList.clientHeight;
      if (Math.abs(itemHeight * (this.hoverStockIndex + 1) - currentHeight)
        > listHeight + listHeight) {
        hintList.scrollTop = itemHeight * (this.hoverStockIndex + 1);
      }
      if (itemHeight * (this.hoverStockIndex + 1) > currentHeight + listHeight) {
        hintList.scrollTop += itemHeight;
      }
      if (itemHeight * (this.hoverStockIndex + 1) < currentHeight + itemHeight) {
        hintList.scrollTop -= itemHeight;
      }
    },
    goStock(stockNo) {
      this.$router.push(`/stock/${stockNo.replace(/[^\d]/g, '')}`);
      this.searchedStock = '';
    },
  },
  created() {

  },
  mounted() {

  },
  watch: {
    searchedStock() {
      this.searchStocks(this.searchedStock);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-search{
  top:0px;
  right:0px;
}
.hint-list{
  top: 100%;
  left: 1px;
  right: 1px;
  max-height: 200px;
  overflow: auto;
  z-index: 1000;
}
input:focus::-webkit-input-placeholder{
  text-indent: -999px
}
.bg-muted:hover{
  background-color: #dee2e6 !important;
}
.form-control:focus{
  border-color: #ced4da;
  box-shadow: 0 0 0 0;
}
</style>
