// contexts/UserContext/UserContext.jsx
import { createContext, useEffect, useState } from "react";
import { getToken, saveToken, removeToken } from "../../services/storage/localStorage.js";
import { jwtDecode } from "jwt-decode";
import fakeStoreApi from "../../services/api/fakeStoreApi.js";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Auto-run on mount to check if user is logged in
    useEffect(() => {
        checkAuth();
    }, []); // Empty dependency array - runs ONCE on mount

    // ✅ Check authentication from localStorage token
    const checkAuth = async () => {
        setLoading(true);
        try {
            const token = getToken();
            console.log('[UserContext] Token exists:', !!token);

            if (token) {
                try {
                    // Decode JWT to get user ID
                    const decoded = jwtDecode(token);
                    console.log('[UserContext] Decoded token:', decoded);

                    const userId = decoded.sub; // FakeStore API uses 'sub' for user ID

                    if (!userId) {
                        console.error('[UserContext] No userId in token');
                        throw new Error('Invalid token structure');
                    }

                    // Fetch full user details from backend
                    console.log('[UserContext] Fetching user data for ID:', userId);
                    const userData = await fakeStoreApi.getSingleUser(userId);

                    console.log('[UserContext] User data:', userData);

                    // Store user data in state (memory only - NOT localStorage)
                    setUser({
                        id: userData.id,
                        username: userData.username,
                        email: userData.email,
                        name: userData.name, // { firstname, lastname }
                        phone: userData.phone,
                        address: userData.address
                    });

                    console.log('[UserContext] ✅ User authenticated');
                } catch (err) {
                    console.error('[UserContext] Auth check failed:', err);
                    // Token is invalid or expired
                    removeToken();
                    setUser(null);
                }
            } else {
                console.log('[UserContext] No token found');
                setUser(null);
            }
        } catch (error) {
            console.error('[UserContext] Error during auth check:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // ✅ User-triggered: Login function
    const login = async (username, password) => {
        setError(null);
        setLoading(true);

        try {
            console.log('[UserContext] Logging in:', username);

            // Call API to authenticate
            const response = await fakeStoreApi.authenticateUser(username, password);
            const token = response.token;

            console.log('[UserContext] Login successful, token received');

            // Save token to localStorage
            saveToken(token);

            // Fetch and set user data
            await checkAuth();

            return user;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            console.error('[UserContext] Login failed:', errorMessage);
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ✅ User-triggered: Register function
    const register = async (username, email, password) => {
        setError(null);
        setLoading(true);

        try {
            console.log('[UserContext] Registering:', username);

            // Call API to register
            await fakeStoreApi.addNewUser(username, email, password);

            console.log('[UserContext] Registration successful');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            console.error('[UserContext] Registration failed:', errorMessage);
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ✅ User-triggered: Logout function
    const logout = () => {
        console.log('[UserContext] Logging out');

        // Remove token from localStorage
        removeToken();

        // Clear user state
        setUser(null);
        setError(null);

        console.log('[UserContext] ✅ Logout complete');
    };

    // ✅ Update user data (for profile edits, etc.)
    const updateUser = (updatedData) => {
        console.log('[UserContext] Updating user data');
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    const value = {
        user,          // Current user object (null if not logged in)
        loading,       // Loading state
        error,         // Error message
        login,         // Function to login
        register,      // Function to register
        logout,        // Function to logout
        updateUser,    // Function to update user data
        checkAuth,     // Function to manually check auth
        isAuthenticated: !!user  // Boolean helper
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}