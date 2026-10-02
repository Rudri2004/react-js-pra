import { useEffect, useState } from "react";
import { getUsers } from "../fileservice/userapi";
import useUsers from "../hooks/useuser";
import UserItem from "./useritem";
import "../App.css";

function UserList({ onEdit, onDelete }) {

    const { state, dispatch } = useUsers();


    const [searchText, setSearchText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {

        const fetchUsers = async () => {

            const token = localStorage.getItem("token");
            if (!token) {

                dispatch({
                    type: "FETCH_USERS_ERROR",
                    payload: "Authentication token not found",
                });

                return;
            }

            try {

                dispatch({
                    type: "FETCH_USERS_START",
                });

           
                const data = await getUsers(token);

                dispatch({
                    type: "FETCH_USERS_SUCCESS",
                    payload: data,
                });

            } catch (error) {

                dispatch({
                    type: "FETCH_USERS_ERROR",
                    payload: error.message,
                });

            }

        };

        fetchUsers();

    }, [dispatch]);

    const handleSearch = () => {
        setSearchQuery(searchText.trim());
    };

    const handleClearSearch = () => {
        setSearchText("");
        setSearchQuery("");
    };

    const filteredUsers = state.users.filter((user) => {

        const query = searchQuery.toLowerCase();

        return (
            (user.name || "").toLowerCase().includes(query) ||
              (user.email || "").toLowerCase().includes(query)   ||
         (user.username || "").toLowerCase().includes(query) ||
             (user.phone || "").toLowerCase().includes(query)
        );

    });

    if (state.loading) {

        return (

            <div className="users-page">

                <div className="status-card">

                    <div className="loader"></div>

                    <h2> Loading Users...</h2>

                    <p> Please wait while users are being loaded.  </p>
                </div>
            </div>
        );
    }

    if (state.error) {

        return (

            <div className="users-page">
                <div className="status-card error-card">

                    <h2> Something went wrong </h2>

                    <p>{state.error}  </p>

                </div>

            </div>   );  }

    return (

        <div className="users-page">

            <div className="users-container">


                <div className="users-header">

                    <div className="users-title">

                        <h1> User Management </h1>

                        <p> Manage registered users </p>

                    </div>

                    <div className="users-header-right">

                        <div className="search-box">

                            

                            <input
                                type="text"
                     value={searchText}
                                onChange={(e) =>
                          setSearchText(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                                placeholder="Search users..."
                            />

                            {searchQuery && (
                                <button
                                    type="button"
                  className="clear-search"
                                    onClick={handleClearSearch}
                                >
                                    ×
                                </button>
                            )}

                        </div>


                            <button
                                type="button"
                                className="search-button"
                                onClick={handleSearch}
                            >
                                Search
                        </button>


                        <span className="user-count">
                            {state.users.length} Users
                        </span>

                    </div>

                </div>

                {state.users.length === 0 ? (

                    <div className="status-card">

                        <h2>
                            No Users Found
                        </h2>

                        <p>
                            There are currently no users available.
                        </p>

                    </div>

                ) : filteredUsers.length === 0 ? (
                    <div className="status-card">

                        <h2>
                            No Matching Users
                        </h2>

                        <p>
                            No users found for "{searchQuery}".
                        </p>

                        <button
                            type="button"
                            className="clear-search-result"
                            onClick={handleClearSearch}
                        >
                            Clear Search
                        </button>

                    </div>

                ) : 

                  (  <div className="users-grid">

                        {filteredUsers.map((user) => (

                            <UserItem
                                key={user.id}
                                user={user}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))} </div>   )}
            </div>
        </div>
    );

}

export default UserList;