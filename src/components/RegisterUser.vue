<template>
  <div class="login-wrapper">
    <h1>Register User</h1>
    <div>
      <input placeholder="Email" v-model="email" />
    </div>
    <div class="mt-10">
      <input placeholder="Password" v-model="password" />
    </div>

    <div class="mt-10">
      <input placeholder="Confirm Password" v-model="confirmPswd" />
    </div>
    <div class="mt-10">
      <button @click="onRegiter" class="mr-5">Register User</button>
    </div>
    <div class="error-msg mt-10">{{ errorMsg }}</div>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirmPswd: "",
      errorMsg: "",
    };
  },
  methods: {
    onRegiter() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.confirmPswd !== ""
      ) {
        if (this.password !== this.confirmPswd) {
          this.errorMsg = "Password and confirm password should be same!";
        } else {
          fetch("http://dignizant.com:4040/api/registration", {
            method: "POST",
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error("error", { error });
            });
          this.$router.push("/listing");
        }
      } else {
        this.errorMsg = "Please enter valid input!";
      }
    },
  },
});
</script>
