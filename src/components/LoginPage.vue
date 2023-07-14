<template>
  <div class="login-wrapper">
    <h1>Log in page</h1>
    <div>
      <input placeholder="Email" v-model="email" />
    </div>
    <div class="mt-10">
      <input placeholder="Password" v-model="password" />
    </div>
    <div class="mt-10">
      <button @click="onLogin" class="mr-5">Log in</button>
      <button @click="onRegister">Register</button>
    </div>
    <div class="error-msg mt-10"></div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "",
    };
  },
  methods: {
    onLogin() {
      if (this.email !== "" && this.password !== "") {
        fetch("http://dignizant.com:4040/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        })
          .then((response) => {
            console.log(response.message);
          })
          .catch((error) => {
            console.error("error", { error });
          });

        this.$router.push("/listing");
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
