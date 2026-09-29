import { useContext } from "react";
import { UserContext } from "../context/usercontext";

const useUsers = () => {
    return useContext(UserContext);
};

export default useUsers;