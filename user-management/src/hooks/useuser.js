import { useContext } from "react";
import { UserContext } from "../context/usercontext";
import { userReducer } from "../filereduce/userreduce";

const useUsers = () => {
    return useContext(UserContext);
};

export default useUsers;