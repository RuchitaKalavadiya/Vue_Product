<template>
  <div class="login-wrapper">
    <h1>Log in page</h1>
    <div>Email: <input placeholder="Email" v-model="email" /></div>
    <div class="mt-10">
      Password:
      <input placeholder="Password" v-model="password" type="password" />
    </div>
    <div class="mt-10">
      <button @click="onLogin" class="mr-5">Log in</button>
    </div>
    <div>
      <button @click="onRegister" class="mt-10">Register User</button>
    </div>
    <div class="error-msg mt-10">{{ errorMsg }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import ProductService from "../services/service.js";

export default Vue.extend({
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "",
      productService: new ProductService(),
    };
  },
  methods: {
    async onLogin() {
      if (this.email !== "" && this.password !== "") {
        try {
          await this.productService.loginUser({
            email: this.email,
            password: this.password,
          });
        } catch (error) {
          console.error({ error });
        } finally {
          this.$router.push("/listing");
        }
      } else {
        this.errorMsg = "Please enter email and password!";
      }
    },
    onRegister() {
      this.$router.push("/register");
    },
  },
});
</script>

<style>
.mt-10 {
  margin-top: 10px;
}

.mr-5 {
  margin-right: 5px;
}

.login-wrapper {
  text-align: center;
}

.error-msg {
  color: red;
}
</style>
