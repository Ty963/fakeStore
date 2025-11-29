import {useContext, useState} from "react";

const UserContext = useContext()

export function UserProvider({ children }) {

    const [authorised, setAuthorised] = useState(false);
    const [userData, setUserData] = useState(null);

    const value = "placeholder";

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

