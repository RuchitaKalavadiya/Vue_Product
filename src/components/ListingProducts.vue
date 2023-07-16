<template>
  <div>
    <h2 style="text-align: center">Product Listing</h2>
    <div style="text-align: end; padding-right: 120px">
      <button @click="onAddProduct">+ Add Product</button>
    </div>
    <div v-if="loading">Loading products...</div>
    <div v-else class="card-wrapper">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-card"
      >
        <img :src="product.images[0]" class="product-image" />
        <div class="product-data">
          <div class="product-title">{{ product.title }}</div>
          <div class="product-description">{{ product.description }}</div>
          <div class="product-price">{{ product.price }} RS</div>
          <div class="mt-10">
            <button @click="onUpdate(product._id)" class="mr-5">Update</button>
            <button @click="onRemove(product._id)">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { response } from "../assets/dummyResponse.js";
export default Vue.extend({
  name: "ListingPahe",
  data() {
    return {
      loading: true,
      products: [],
      page: 1,
    };
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      //   fetch("http://dignizant.com:4040/api/getProduct", {
      //     method: "GET",
      //     "Content-Type": "application/json",
      //   })
      //     .then((response) => {
      //       console.log("response", response);
      //     })
      //     .catch((error) => {
      //       console.log("error", error);
      //     });
      //   this.loading = false;

      setTimeout(() => {
        this.products = response.products;
        this.loading = false;
      }, 3000);
    },
    onAddProduct() {
      this.$router.push(`/product/-1`);
    },
    onUpdate(itemId) {
      this.$router.push(`/product/${itemId}`);
    },
    onRemove(itemId) {
      console.log(itemId);
      fetch(`http://dignizant.com:4040/api/deleteProduct/${itemId}`, {
        method: "DELETE",
        "Content-Type": "application/json",
      })
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
      this.loading = false;
    },
  },
});
</script>

<style scoped>
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.product-card {
  height: auto;
  width: 300px;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  margin: 10px;
}

.product-data {
  padding: 10px;
}
.product-image {
  height: 150px;
  width: 100%;
}

.product-title {
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 10px;
}
.product-price {
  font-weight: bold;
  font-size: 14px;
  padding-top: 12px;
}
</style>
