
const requiredPayload = {
    "Content-Type": "application/json",
    headers: {
        authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGIxMmEzYTA2NDQzZjYzOTEzZjFmN2UiLCJpYXQiOjE2ODk0ODkzMTAsImV4cCI6MTY4OTU3NTcxMH0.k_HkjXQHW9zcKTB6CHnmK6TaYJ7pfjzhR8FCXxfMJKk",
    }

}

const nullAuthorization = {
    "Content-Type": "application/json",
    headers: {
        authorization: null
    }

}

export default class ProductService {
    constructor() {
        this.baseURL = 'http://dignizant.com:4040/api'
    }

    async loginUser(payload) {
        try {
            const response = await fetch(`${this.baseURL}/login`, {
                method: "POST",
                ...nullAuthorization,
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            return data
        } catch (error) {
            throw new Error({ error })
        }
    }

    async registerUser(payload) {
        try {
            const response = await fetch(`${this.baseURL}/registration`, {
                method: "POST",
                ...nullAuthorization,
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            return data
        } catch (error) {
            throw new Error({ error })
        }
    }

    async getAllProducts(page, limit) {
        try {
            const response = await fetch(`${this.baseURL}/getProduct?page=${page}&limit=${limit}`, {
                method: "GET",
                ...requiredPayload
            });
            const data = await response.json();
            return data
        } catch (error) {
            throw new Error({ error })
        }
    }

    async getProductById(id) {
        try {
            const response = await fetch(`${this.baseURL}/getOneProduct/${id}`, {
                method: "GET",
                ...requiredPayload
            });
            const data = await response.json();
            return data
        } catch (error) {
            throw new Error({ error })
        }
    }

    async createProduct(payload) {
        try {
            const response = await fetch(`${this.baseURL}/addProduct`, {
                method: "POST",
                ...requiredPayload,
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            return data
        } catch (error) {
            throw new Error({ error })
        }

    }

    async updateProduct(payload, id) {
        try {
            const response = await fetch(`${this.baseURL}/updateProduct/${id}`, {
                method: "PUT",
                ...requiredPayload,
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            return data
        } catch (error) {
            throw new Error({ error })
        }

    }

    async removeProduct(id) {
        try {
            const response = await fetch(`${this.baseURL}/deleteProduct/${id}`, {
                method: "DELETE",
                ...requiredPayload,
            });
            const data = await response.json();
            return data
        } catch (error) {
            throw new Error({ error })
        }

    }
}