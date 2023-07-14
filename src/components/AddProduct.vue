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
      <button class="mt-10 mr-5">Back</button>
      <button class="mt-10" @click="onSave">Save</button>
    </div>
    {{ errorMsg }}
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "AddProduct",
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
  methods: {
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
        fetch("http://dignizant.com:4040/api/addProduct", {
          method: "POST",
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
  },
});
</script>
