import VueRouter from 'vue-router'
import RegiterUser from '../components/RegisterUser.vue'
import LoginPage from '../components/LoginPage.vue'
import ListingProducts from '../components/ListingProducts.vue'
import AddProduct from '../components/AddProduct.vue'
import UpdateProduct from '../components/UpdateProduct.vue'

const router = new VueRouter({
    // history: VueRouter.createWebHashHistory(),
    routes: [
        { path: '/', component: LoginPage, name: 'LoginPage' },
        { path: '/register', component: RegiterUser, name: 'RegisterPage' },
        { path: '/listing', component: ListingProducts, name: 'ListingProducts' },
        { path: '/add', component: AddProduct, name: 'AddProduct' },
        { path: '/update/:id', component: UpdateProduct, name: 'UpdateProduct' },


    ]
})

export default router