<template>
  <div>
    <div>
      <button class="mt-10 mr-5" @click="onBack">Back to listing</button>
    </div>
    <h3>{{ isCreate ? "Create Product" : "Update product" }}</h3>
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
    <div class="mt-10">
      <input placeholder="Category" v-model="category" />
    </div>
    <div class="mt-10">
      <input placeholder="Images" type="file" multiple />
    </div>
    <div>
      <button class="mt-10" @click="onSave">Save</button>
    </div>
    {{ errorMsg }}
  </div>
</template>

<script>
import Vue from "vue";
import ProductService from "../services/service.js";
export default Vue.extend({
  name: "ProductForm",
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
      productService: new ProductService(),
    };
  },
  computed: {
    productId() {
      return this.$route.params.id;
    },
    isCreate() {
      return this.productId == -1;
    },
  },
  mounted() {
    if (!this.isCreate) {
      this.fetchDataById();
    }
  },
  methods: {
    onBack() {
      this.$router.push("/listing");
    },
    async fetchDataById() {
      try {
        const response = await this.productService.getProductById(
          this.productId
        );
        const product = response.products[0];
        const {
          title,
          description,
          price,
          rating,
          stock,
          brand,
          category,
          images,
        } = product;
        this.title = title;
        this.description = description;
        this.price = price;
        this.rating = rating;
        this.stock = stock;
        this.brand = brand;
        this.category = category;
        this.images = images;
      } catch (error) {
        console.error("error", { error });
      }
    },
    async onSave() {
      if (
        this.title &&
        this.description &&
        this.price &&
        this.rating &&
        this.stock &&
        this.brand &&
        this.category
      ) {
        const payload = {
          title: this.title,
          description: this.description,
          price: this.price,
          rating: this.rating,
          stock: this.stock,
          brand: this.brand,
          category: this.category,
          images: this.images,
        };

        try {
          if (this.isCreate) {
            await this.productService.createProduct(payload);
          } else {
            await this.productService.updateProduct(payload, this.productId);
          }
        } catch (error) {
          console.error("error", { error });
        }
      } else {
        this.errorMsg = "Something is missing";
      }
    },
  },
});
</script>
