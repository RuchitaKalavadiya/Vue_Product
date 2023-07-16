<template>
  <div class="login-wrapper">
    <h1>Register User</h1>
    <div>Email: <input placeholder="Email" v-model="email" /></div>
    <div class="mt-10">
      Password:
      <input placeholder="Password" v-model="password" type="password" />
    </div>

    <div class="mt-10">
      Confirm Password:
      <input
        placeholder="Confirm Password"
        v-model="confirmPswd"
        type="password"
      />
    </div>
    <div class="mt-10">
      <button @click="onLogin" class="mr-5">Back to Login</button>
      <button @click="onRegiter">Register User</button>
    </div>
    <div class="error-msg mt-10">{{ errorMsg }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import ProductService from "../services/service.js";

export default Vue.extend({
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirmPswd: "",
      errorMsg: "",
      loading: false,
      productService: new ProductService(),
    };
  },
  methods: {
    onLogin() {
      this.$router.push("/");
    },
    async onRegiter() {
      console.log("regoster click");
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.confirmPswd !== ""
      ) {
        if (this.password !== this.confirmPswd) {
          this.errorMsg = "Password and confirm password should be same!";
        } else {
          this.loading = true;
          try {
            await this.productService.registerUser({
              email: this.email,
              password: this.password,
            });
          } catch (error) {
            console.error({ error });
          } finally {
            this.loading = false;
            this.$router.push("/listing");
          }
        }
      } else {
        this.errorMsg = "Please enter valid input!";
      }
    },
  },
});
</script>
