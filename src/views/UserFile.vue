<template>
  <div class="bg-light">
    <div class="container py-10">
      <h2 class="text-center mb-4">
        個人檔案
      </h2>
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6">
          <validation-observer v-slot="{ invalid }">
            <form @submit.prevent="setUserInfo()">
              <div
                class="alert alert-success px-3"
                v-if="successMessage"
              >
                <font-awesome-icon
                  class="mr-2"
                  :icon="['fas', 'check-circle']"
                />{{ successMessage }}
              </div>
              <div
                class="alert alert-danger px-3"
                v-if="errorMessage"
              >
                {{ errorMessage }}
              </div>
              <div class="mb-5">
                <validation-provider
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <label for="userName">姓名</label>
                  <input
                    type="text"
                    class="form-control border-0"
                    :class="classes"
                    id="userName"
                    name="姓名"
                    v-model="user.name"
                  >
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="mb-5">
                <validation-provider
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <label for="userEmail">註冊信箱</label>
                  <input
                    type="email"
                    class="form-control border-0"
                    :class="classes"
                    id="userEmail"
                    v-model="user.email"
                    name="電子信箱"
                  >
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="mb-8">
                <label for="emailNotificationList">電子信箱通知篩選清單</label>
                <select
                  id="emailNotificationList"
                  class="form-control"
                  v-model="user.choseStockEmailNotification"
                >
                  <option value="">
                    無選擇
                  </option>
                  <option
                    v-for="list in choseStockLists"
                    :key="list.id"
                    :value="list.id"
                  >
                    {{ list.id }}：{{ list.title }}
                  </option>
                </select>
                <small class="text-danger">下午 4 : 30 將會發送通知</small>
              </div>
              <div class="text-center">
                <button
                  class="btn btn-primary"
                  :disabled="invalid"
                >
                  儲存設定
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        choseStockEmailNotification: '',
      },
      choseStockLists: [],
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    getUserInfo() {
      const api = `${process.env.VUE_APP_API_PATH}users/user/info`;
      this.$http.get(api)
        .then((res) => {
          this.user = res.data.data;
        })
        .catch({});
    },
    setUserInfo() {
      this.successMessage = '';
      this.errorMessage = '';
      const api = `${process.env.VUE_APP_API_PATH}users/user/info`;
      this.$http.post(api, this.user)
        .then(() => {
          this.getUserInfo();
          this.$emit('auth', true, this.user.name);
          this.successMessage = '修改成功';
        })
        .catch((err) => {
          this.errorMessage = err.response.data.message;
        });
    },
    getChoseStockLists() {
      const api = `${process.env.VUE_APP_API_PATH}chose-stock-lists`;
      this.$http.get(api)
        .then((res) => {
          this.choseStockLists = res.data.data;
        })
        .catch({});
    },
  },
  created() {
    this.getUserInfo();
    this.getChoseStockLists();
  },
  mounted() {

  },
  components: {

  },
};
</script>

<style lang="scss">

</style>
