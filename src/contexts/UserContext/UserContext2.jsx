import {createContext, useContext, useEffect, useState} from "react";
import {getToken, removeToken} from "../../services/storage/localStorage.js";
import {jwtDecode} from "jwt-decode";
import {useStoreData} from "../../hooks/useStoreData.js";

const UserContext = createContext()

export function UserProvider({ children }) {
    const { fetchSingleUser } = useStoreData();

    // TODO: Figure out what user data I want to display on a standard page in the first place, and then create a state for each of those values.
    // TODO: add all of the relevant values to the values constant and pass that to the value property of the UserContext.Provider element

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAuth()
    })

    const checkAuth = async () => {
        try {
            const token = localStorage.getToken();
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const userId = decoded.sub

                    if (!username) {
                        console.error("No username (user) in the token")
                        throw new Error('Invalid token')
                    }

                    const userData = await fetchSingleUser(`/api/users/${userId}`)

                    setUser({
                        userId: decoded.sub,
                        userName: decoded.user,
                        userAdress: userData.address,
                        userEmail: userData.email,
                        name: userData.name,
                        //     userData.firstname, userData.lastname
                        userPhone: userData.phone,
                    })
                } catch (error) {
                    removeToken();
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // const value = {
    //     user,
    //     loading,
    //     error,
    //     login,
    //     register,
    //     logout,
    //     updateUser,
    //     checkAuth
    // };

    // userId, username, email, role, isAdmin, isSeller, isBuyer
    // userId, username, email

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

