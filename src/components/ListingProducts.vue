<template>
  <div>
    <h2 style="text-align: center">Product Listing</h2>
    <div style="text-align: end; padding-right: 120px">
      <button @click="onAddProduct">+ Add Product</button>
    </div>
    <div class="card-wrapper">
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

      <div v-if="loading">Loading products...</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ProductService from "../services/service.js";

export default Vue.extend({
  name: "ListingPage",
  data() {
    return {
      loading: false,
      products: [],
      page: 1,
      limit: 9,
      totalPage: 1,
      productService: new ProductService(),
    };
  },
  mounted() {
    this.getAllProducts();
    window.addEventListener("scroll", (event) => this.onWindowScroll(event));
  },
  methods: {
    async onWindowScroll() {
      const currentScrollHeight = window.scrollY;
      const totalPageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (currentScrollHeight > totalPageHeight - 30) {
        if (this.totalPage > this.page) {
          this.page = this.page + 1;
          await this.getAllProducts();
        }
      }
    },
    async getAllProducts() {
      this.loading = true;
      try {
        const response = await this.productService.getAllProducts(
          this.page,
          this.limit
        );
        this.totalPage = response.totalPages;
        this.products = [...response.products, ...this.products];
      } catch (error) {
        console.log("error", error);
      } finally {
        this.loading = false;
      }
    },
    onAddProduct() {
      this.$router.push(`/product/-1`);
    },
    onUpdate(itemId) {
      this.$router.push(`/product/${itemId}`);
    },
    async onRemove(itemId) {
      try {
        await this.productService.removeProduct(itemId);
      } catch (error) {
        console.error({ error });
      }
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
