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
            @submit.prevent="login()"
          >
            <h2 class="font-weight-bold mb-4">
              登入
            </h2>
            <div
              class="alert alert-danger px-3"
              v-if="error"
            >
              {{ error }}
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
            <div class="text-right mb-md-0 mb-10">
              <button
                class="btn btn-primary w-100 mr-3"
                :disabled="invalid"
              >
                登入
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
        email: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    login() {
      const apiPath = `${process.env.VUE_APP_API_PATH}auth/login`;
      this.$http.post(apiPath, this.user, { withCredentials: true })
        .then((res) => {
          this.$emit('auth', true, res.data.data.name);
          this.$router.push('/');
        })
        .catch((err) => {
          this.error = err.response.data.message;
          this.user.password = '';
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
