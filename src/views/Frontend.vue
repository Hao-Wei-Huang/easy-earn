<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-white shadow-sm">
      <div class="container">
        <h1>
          <router-link
            to="/"
            class="logo d-block text-hide bg-cover"
          >
            Easy Earn
          </router-link>
        </h1>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          class="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link
                to="/stock/2330"
                class="nav-link hover-secondary"
              >
                個股資訊
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/screener"
                class="nav-link hover-secondary"
              >
                自訂選股
              </router-link>
            </li>
            <li
              class="nav-item input-group w-auto ml-5"
              v-if="!user.isAuth"
            >
              <div class="input-group-prepend">
                <router-link
                  to="/login"
                  class="nav-link btn btn-primary text-white px-4"
                >
                  登入
                </router-link>
              </div>
              <div class="input-group-append">
                <router-link
                  to="/signup"
                  class="nav-link btn btn-outline-primary px-4"
                >
                  註冊
                </router-link>
              </div>
            </li>
            <li
              class="nav-item ml-5"
              v-else
            >
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-white dropdown-toggle shadow-none"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <font-awesome-icon
                    class="mr-1"
                    :icon="['fas', 'user']"
                  /><span>{{ user.name }}</span>
                </button>
                <div class="dropdown-menu zindex-1200">
                  <router-link
                    class="dropdown-item"
                    to="/track"
                  >
                    追蹤股票
                  </router-link>
                  <router-link
                    class="dropdown-item"
                    to="/user-file"
                  >
                    個人檔案
                  </router-link>
                  <div class="dropdown-divider" />
                  <a
                    href="#"
                    class="dropdown-item"
                    @click.prevent="logout"
                  >
                    登出
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view
      class="sticky-footer"
      :is-auth="user.isAuth"
      @auth="auth"
    />
    <footer class="shadow-sm py-5">
      <div class="container">
        <div class="d-flex">
          <p class="align-self-center">
            本網站用於作品練習，僅提供股票篩選與查詢股票資料功能，<br>
            絕無任何推薦股票之意，請審慎評估。
          </p>
          <div class="ml-auto">
            <h6 class="mb-1">
              輕鬆賺服務
            </h6>
            <ul class="h7">
              <li>
                <router-link
                  to="/stock/2330"
                  class="d-block hover-secondary hover-text-underline py-1"
                >
                  個股分析
                </router-link>
              </li>
              <li>
                <router-link
                  to="/screener"
                  class="d-block hover-secondary hover-text-underline py-1"
                >
                  自訂選股
                </router-link>
              </li>
            </ul>
          </div>
          <div class="ml-6">
            <h6 class="mb-1">
              網站資料來源
            </h6>
            <ul class="h7">
              <li>
                <a
                  href="https://www.twse.com.tw/zh/"
                  target="_blank"
                  class="d-block hover-secondary hover-text-underline py-1"
                >台灣證券交易所</a>
              </li>
              <li>
                <a
                  href="https://www.tpex.org.tw/web/index.php?l=zh-tw"
                  target="_blank"
                  class="d-block hover-secondary hover-text-underline py-1"
                >櫃檯買賣中心</a>
              </li>
              <li>
                <a
                  href="https://mops.twse.com.tw/mops/web/index"
                  target="_blank"
                  class="d-block hover-secondary hover-text-underline py-1"
                >公開資訊觀測站</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        isAuth: false,
      },
    };
  },
  methods: {
    auth(isAuth, userName) {
      this.user.isAuth = isAuth;
      this.user.name = userName;
    },
    checkAuth() {
      const api = `${process.env.VUE_APP_API_PATH}auth/check`;
      this.$http.post(api)
        .then((res) => {
          this.user.name = res.data.data.name;
          this.user.isAuth = true;
        })
        .catch(() => {
          this.user.isAuth = false;
        });
    },
    logout() {
      const api = `${process.env.VUE_APP_API_PATH}auth/logout`;
      this.$http.post(api)
        .then(() => {
          this.user.isAuth = false;
          this.$router.push('/');
        })
        .catch(() => {});
    },
  },
  created() {
    this.checkAuth();
  },
  mounted() {

  },
};
</script>

<style lang="scss">
.logo{
  background-image: url('~@/../public/logo.png');
  width: 90px;
  height: 63px;
}
.sticky-footer{
  min-height: calc(100vh - 229px);
}
.active{
  color: #f6ab00
}
</style>
