import axios from "axios";
import handleGetErrors from "../../helper/handleGetErrors.js";

const FAKESTORE_API_URL = import.meta.env.VITE_FAKESTORE_API;

const fakeStoreApi = {

    // Products section
    async getAllProducts(){
       const url = FAKESTORE_API_URL + "/products";
       try {
           const response = await axios.get(url);
           console.log(response.data);
           return response.data;
       } catch (error) {
           const errorInfo = handleGetErrors(error, url);
           console.error(errorInfo.message);
       }
    },

    // post request axios.post(url, data, config)
    async addNewProduct(id, title, price, description, category, image) {
        const url = FAKESTORE_API_URL + "/products";
        try {
            const response = await axios.post(url,
                {
                    "id": id,
                    "title": title,
                    "price": price,
                    "description": description,
                    "category": category,
                    "image": image
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    async getSingleProduct(productId) {
        const url = FAKESTORE_API_URL + "/products/" + productId;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            const errorInfo = handleGetErrors(error, url);
            console.error(errorInfo.message);
        }
    },


// TODO Check this updateProduct function
// If I can make a feeder instead of feeding everything as props then I'd be able to send only then changed fields and the rest would remain the same, API documentation says it's possible and ought to be done with that way, double check the veracity of this and otherwise nest inside an if where I check if the updated field is different from the original one and define a constant that can be fed as a prop while maintaining original values for unchanged fields
    async updateProduct(id, updatedTitle, updatedPrice, updatedDescription, updatedCategory, updatedImage) {
        const url = FAKESTORE_API_URL + "/products/" + productId;
        try {
            const response = await axios.put(url, {
                "id": id,
                "title": updatedTitle,
                "price": updatedPrice,
                "description": updatedDescription,
                "category": updatedCategory,
                "image": updatedImage
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    // TODO Check this deleteProduct function
    async deleteProduct(productId) {
        const url = FAKESTORE_API_URL + "/products/" + productId;
        try {
            const response = await axios.delete(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error
        }
    },


    // Carts section
    async getAllCarts(){
       const url = FAKESTORE_API_URL + "/carts";
       try {
           const response = await axios.get(url);
           console.log(response.data);
           return response.data;
       } catch (error) {
           const errorInfo = handleGetErrors(error, url);
           console.error(errorInfo.message);
       }
    },

    async getSingleCart(cartId){
        const url = FAKESTORE_API_URL + "/carts/" + cartId;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            const errorInfo = handleGetErrors(error, url);
            console.error(errorInfo.message);
        }
    },

    // Users section
    async getAllUsers(){
       const url = FAKESTORE_API_URL + "/users";
       try {
           const response = await axios.get(url);
           console.log(response.data);
           return response.data;
       } catch (error) {
           const errorInfo = handleGetErrors(error, url);
           console.error(errorInfo.message);
       }
    },

    async getSingleUser(userId){
        const url = FAKESTORE_API_URL + "/carts/" + userId;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            const errorInfo = handleGetErrors(error, url);
            console.error(errorInfo.message);
        }
    },

//     Authorization section
    async authenticateUser(username, password) {
        const url = FAKESTORE_API_URL + "/auth/login";
        try {
            let result = await axios.post(url,
                {
                    username: username,
                    password: password
                });
            result = result.data;
            console.log(result);
            return result;
        } catch (e) {
            console.error(e.response ? e.response.data : e.message);
        }
    }

}

export default fakeStoreApi