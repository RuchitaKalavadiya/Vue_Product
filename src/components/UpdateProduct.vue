<template>
  <div>
    <h4>Create Product</h4>
    <div><input placeholder="Title" v-model="title" /></div>
    <div>
      <textarea placeholder="Description" v-model="description" class="mt-10" />
    </div>
    <div class="mt-10">
      <input placeholder="Price" v-model="price" type="number" />
    </div>
    <div class="mt-10"><input placeholder="Rating" v-model="rating" /></div>
    <div class="mt-10">
      <input placeholder="Stock" type="number" v-model="stock" />
    </div>
    <div class="mt-10"><input placeholder="Brand" v-model="brand" /></div>
    <div class="mt-10"><input placeholder="Category" v-model="category" /></div>
    <div class="mt-10">
      <input placeholder="Images" type="file" multiple />
    </div>
    <div>
      <button class="mt-10 mr-5" @click="onBack">Back</button>
      <button class="mt-10" @click="onSave">Save</button>
    </div>
    {{ errorMsg }}
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "UpdateProduct",
  data() {
    return {
      title: "",
      description: "",
      price: 0,
      rating: "",
      stock: 0,
      brand: "",
      category: "",
      images: null,
      errorMsg: "",
    };
  },
  mounted() {
    this.fetchDataById();
  },
  methods: {
    fetchDataById() {
      const id = this.$route.params.id;
      fetch(`http://dignizant.com:4040/api/getOneProduct/${id}`, {
        method: "GET",
      })
        .then((response) => {
          const {
            title,
            description,
            price,
            rating,
            stock,
            brand,
            category,
            images,
          } = response;
          this.title = title;
          this.description = description;
          this.price = price;
          this.rating = rating;
          this.stock = stock;
          this.brand = brand;
          this.category = category;
          this.images = images;
          console.log(response);
        })
        .catch((error) => {
          console.error("error", { error });
        });
    },
    onSave() {
      if (
        this.title &&
        this.description &&
        this.price &&
        this.rating &&
        this.stock &&
        this.brand &&
        this.category
      ) {
        fetch(`http://dignizant.com:4040/api/updateProduct/${this.$props.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title: this.title,
            description: this.description,
            price: this.price,
            rating: this.rating,
            stock: this.stock,
            brand: this.brand,
            category: this.category,
            images: this.images,
          }),
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error("error", { error });
          });
      } else {
        this.errorMsg = "Something is missing";
      }
      //
    },
    onBack() {
      this.$router.push("/listing");
    },
  },
});
</script>
