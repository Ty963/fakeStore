import axios from "axios";
import handleGetErrors from "../../helpers/handleGetErrors.js";

const FAKESTORE_API_URL = import.meta.env.VITE_FAKESTORE_API;

const fakeStoreApi = {

    // Products section
    // Products Object = {category: category,
        // description: description,
        // id: 1,
        // image: image,
        // price: price,
        // rating: {
            // count: count,
            // rate: rate},
        // title: title }

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
        const url = FAKESTORE_API_URL + "/products/" + id;
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
    // Cart Object = {date: date,
        // id: id,
        // products: [product1, product2, ...],
        // userId: userId}

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

    // post request axios.post(url, data, config)
    // TODO Check how to feed products array of objects, if necessary create a feeder function that creates the array of objects from passed parameters
    async addNewCart(id, userId, products) {
        const url = FAKESTORE_API_URL + "/carts";
        try {
            const response = await axios.post(url,
                {
                    "id": id,
                    "userId": userId,
                    "products": products // array of product objects
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

    async updateCart(cartId, userId, products) {
        const url = FAKESTORE_API_URL + "/carts/" + cartId;
        try {
            const response = await axios.put(url, {
                "id": cartId,
                "userId": userId,
                "products": products // array of product objects
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
    async deleteCart(cartId) {
        const url = FAKESTORE_API_URL + "/carts/" + cartId;
        try {
            const response = await axios.delete(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    // Users section
    // User Object = {adress: {city: city,
        // geolocation: {lat: lat, lng: lng},
        // number: 7267,
        // street: street,
        // zipcode: zipcode}
    // },
    // email: email,
    // id: id,
    // name: {
    //  firstname: firstname,
    //  lastname: lastname },
    // password: password,
    // phone: phone,
    // username: username

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

    // post request axios.post(url, data, config)
    // TODO Check how to feed products array of objects, if necessary create a feeder function that creates the array of objects from passed parameters
    async addNewUser(username, email, password ) {
        const url = FAKESTORE_API_URL + "/users";
        try {
            const response = await axios.post(url,
                {
                    id: 0,
                    username: username, 
                    email: email, 
                    password: password
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

    async getSingleUser(userId){
        const url = FAKESTORE_API_URL + "/users/" + userId;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            const errorInfo = handleGetErrors(error, url);
            console.error(errorInfo.message);
        }
    },

    async updateUser(userId, username, email) {
        const url = FAKESTORE_API_URL + "/users/" + userId;
        try {
            const response = await axios.put(url, {
                    "username": username,
                    "email": email,
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
    async deleteUser(userId) {
        const url = FAKESTORE_API_URL + "/users/" + userId;
        try {
            const response = await axios.delete(url);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw error
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
            // console.error(e.response ? e.response.data : e.message);
            // console.error(e);
            throw e;
        }
    }

}

export default fakeStoreApi