import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserRoleContext = createContext();

const UserRoleProvider = ({ children }) => {
    const [userRole, setUserRole] = useState("staff");
    useEffect(() => {
        axios
            .get("/api/users")
            .then((response) =>
                setUserRole(response.data.type === 1 ? "admin" : "staff")
            );
    }, []);

    return (
        <UserRoleContext.Provider value={userRole}>
            {children}
        </UserRoleContext.Provider>
    );
};
export default UserRoleProvider;
