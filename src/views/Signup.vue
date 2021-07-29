<template>
  <div class="container py-md-10">
    <div class="row">
      <div class="col-md-8">
        <img
          src="@/../public/stock-chart.jpeg"
          alt="banner loading"
        >
      </div>
      <div class="col-md-4 align-self-center">
        <validation-observer v-slot="{ invalid }">
          <form
            @submit.prevent="signup()"
          >
            <h2 class="font-weight-bold mb-4">
              註冊
            </h2>
            <div
              class="alert alert-danger px-3"
              v-if="error"
            >
              {{ error }}
            </div>
            <div class="mb-4">
              <validation-provider
                rules="required"
                v-slot="{ errors, classes }"
              >
                <!-- 輸入框 -->
                <label
                  for="userName"
                  class="form-label"
                >使用者名稱<span class="text-danger">*</span></label>
                <input
                  type="text"
                  class="form-control"
                  :class="classes"
                  id="userName"
                  name="使用者名稱"
                  placeholder="使用者名稱"
                  v-model="user.name"
                >
                <!-- 錯誤訊息 -->
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="mb-4">
              <validation-provider
                rules="required|email"
                v-slot="{ errors, classes }"
              >
                <!-- 輸入框 -->
                <label
                  for="email"
                  class="form-label"
                >電子信箱<span class="text-danger">*</span></label>
                <input
                  type="email"
                  class="form-control"
                  :class="classes"
                  id="email"
                  name="電子信箱"
                  placeholder="email@example.com"
                  v-model="user.email"
                >
                <!-- 錯誤訊息 -->
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="mb-4">
              <validation-provider
                rules="required|min:8"
                v-slot="{ errors, classes }"
                vid="password"
              >
                <label
                  for="password"
                  class="form-label"
                >密碼<span class="text-danger">*</span></label>
                <input
                  type="password"
                  class="form-control"
                  :class="classes"
                  id="password"
                  name="密碼"
                  placeholder="請輸入密碼"
                  v-model="user.password"
                >
                <!-- 錯誤訊息 -->
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="mb-4">
              <validation-provider
                rules="required|confirmed:password"
                v-slot="{ errors, classes }"
              >
                <label
                  for="repeatPassword"
                  class="form-label"
                >請再輸入一次密碼<span class="text-danger">*</span></label>
                <input
                  type="password"
                  class="form-control"
                  :class="classes"
                  id="repeatPassword"
                  name="兩者密碼"
                  placeholder="確認密碼"
                  v-model="user.repeatPassword"
                >
                <!-- 錯誤訊息 -->
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </validation-provider>
            </div>
            <div class="text-right mb-md-0 mb-10">
              <button
                class="btn btn-primary w-100 mr-3"
                :disabled="invalid"
              >
                註冊帳號
              </button>
            </div>
          </form>
        </validation-observer>
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
        password: '',
        repeatPassword: '',
      },
      error: '',
    };
  },
  methods: {
    signup() {
      const apiPath = `${process.env.VUE_APP_API_PATH}auth/signup`;
      this.$http.post(apiPath, this.user)
        .then((res) => {
          this.$emit('auth', true, res.data.data.name);
          this.$router.push('/');
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.user.email = '';
          this.user.password = '';
          this.user.repeatPassword = '';
        });
    },
  },
  created() {

  },
  mounted() {

  },
  components: {

  },
};
</script>

<style lang="scss" scoped>

</style>
