import {useContext, useState} from "react";

const UserContext = useContext()

export function UserProvider({ children }) {

    // TODO: Figure out what user data I want to display on a standard page in the first place, and then create a state for each of those values.
    // TODO: add all of the relevant values to the values constant and pass that to the value property of the UserContext.Provider element

    const [authorised, setAuthorised] = useState(false);
    const [userData, setUserData] = useState(null);

    const value = "placeholder";

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

