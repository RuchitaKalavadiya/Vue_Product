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
    };
  },
  computed: {
    productId() {
      return Number(this.$route.params.id);
    },
    isCreate() {
      return this.productId === -1;
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
    fetchDataById() {
      fetch(`http://dignizant.com:4040/api/getOneProduct/${this.productId}`, {
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
          this.title = title || "Product";
          this.description = description || "description";
          this.price = price || 10;
          this.rating = rating || "4.5";
          this.stock = stock || 60;
          this.brand = brand || "brand";
          this.category = category || "caategory";
          this.images = images || [];
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
        if (this.isCreate) {
          fetch("http://dignizant.com:4040/api/addProduct", {
            method: "POST",
            body: JSON.stringify(payload),
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error("error", { error });
            });
        } else {
          fetch(
            `http://dignizant.com:4040/api/updateProduct/${this.productId}`,
            {
              method: "PUT",
              body: JSON.stringify(payload),
            }
          )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error("error", { error });
            });
        }
      } else {
        this.errorMsg = "Something is missing";
      }
    },
  },
});
</script>
