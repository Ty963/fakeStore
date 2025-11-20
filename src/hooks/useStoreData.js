import { useState, useCallback } from 'react';
import fakeStoreApi from '../services/api/fakeStoreApi.js';

export function useStoreData() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const fetchAllProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fakeStoreApi.getAllProducts();
            return data;
        } catch (err) {
            setError(err.message || 'Error fetching products');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSingleProduct = useCallback(async (productId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fakeStoreApi.getSingleProduct(productId);
            return data;
        } catch (err) {
            setError(err.message || 'Error fetching product');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAllCarts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fakeStoreApi.getAllCarts();
            return data;
        } catch (err) {
            setError(err.message || 'Error fetching carts');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSingleCart = useCallback(async (cartId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fakeStoreApi.getSingleCart(cartId);
            return data;
        } catch (err) {
            setError(err.message || 'Error fetching cart');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAllUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fakeStoreApi.getAllUsers();
            return data;
        } catch (err) {
            setError(err.message || 'Error fetching carts');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSingleUser = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fakeStoreApi.getSingleUser(userId);
            return data;
        } catch (err) {
            setError(err.message || 'Error fetching user');
        } finally {
            setLoading(false);
        }
    }, []);
    
    return {
        error,
        isLoading,
        fetchAllProducts,
        fetchSingleProduct,
        fetchAllCarts,
        fetchSingleCart,
        fetchAllUsers,
        fetchSingleUser
    };
}

