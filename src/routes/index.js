import VueRouter from 'vue-router'
import RegiterUser from '../components/RegisterUser.vue'
import LoginPage from '../components/LoginPage.vue'
import ListingProducts from '../components/ListingProducts.vue'
import ProductForm from '../components/ProductForm.vue'

const router = new VueRouter({
    // history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/', component: LoginPage, name: 'LoginPage' },
        { path: '/register', component: RegiterUser, name: 'RegisterPage' },
        { path: '/listing', component: ListingProducts, name: 'ListingProducts' },
        { path: '/product/:id', component: ProductForm, name: 'ProductForm' },
    ]
})

export default router