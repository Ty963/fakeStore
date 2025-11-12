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

    // async getSingleProduct(productId){
    //     const url = FAKESTORE_API_URL + "/products/" + productId;
    //     try {
    //         const response = await axios.get(url);
    //         return response.data;
    //     } catch (error) {
    //         const errorInfo = handleGetErrors(error, url);
    //         console.error(errorInfo.message);
    //     }
    // };


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

    // async getSingleCart(cartId){
    //     const url = FAKESTORE_API_URL + "/carts/" + cartId;
    //     try {
    //         const response = await axios.get(url);
    //         return response.data;
    //     } catch (error) {
    //         const errorInfo = handleGetErrors(error, url);
    //         console.error(errorInfo.message);
    //     }
    // }

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

    // async getSingleUser(userId){
    //     const url = FAKESTORE_API_URL + "/carts/" + userId;
    //     try {
    //         const response = await axios.get(url);
    //         return response.data;
    //     } catch (error) {
    //         const errorInfo = handleGetErrors(error, url);
    //         console.error(errorInfo.message);
    //     }
    // };

}

export default fakeStoreApi