import { useEffect } from "react";
import { getUsers } from "../fileservice/userapi";
import useUsers from "../hooks/useuser";
import UserItem from "./useritem";
import "../App.css";

function UserList({ onEdit, onDelete }) {

    const { state, dispatch } = useUsers();


    // =========================================
    // GET USERS
    // =========================================

    useEffect(() => {

        const fetchUsers = async () => {

            const token = localStorage.getItem("token");


            // Check token

            if (!token) {

                dispatch({
                    type: "FETCH_USERS_ERROR",
                    payload: "Authentication token not found",
                });

                return;
            }


            try {

                // Loading

                dispatch({
                    type: "FETCH_USERS_START",
                });


                // API call

                const data = await getUsers(token);


                // Success

                dispatch({
                    type: "FETCH_USERS_SUCCESS",
                    payload: data,
                });


            } catch (error) {

                // Error

                dispatch({
                    type: "FETCH_USERS_ERROR",
                    payload: error.message,
                });

            }

        };


        fetchUsers();

    }, [dispatch]);


    // =========================================
    // LOADING STATE
    // =========================================

    if (state.loading) {

        return (

            <div className="users-page">

                <div className="status-card">

                    <div className="loader"></div>

                    <h2>
                        Loading Users...
                    </h2>

                    <p>
                        Please wait while users are being loaded.
                    </p>

                </div>

            </div>

        );

    }


    // =========================================
    // ERROR STATE
    // =========================================

    if (state.error) {

        return (

            <div className="users-page">

                <div className="status-card error-card">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {state.error}
                    </p>

                </div>

            </div>

        );

    }


    // =========================================
    // DISPLAY USERS
    // =========================================

    return (

        <div className="users-page">

            <div className="users-container">


                {/* Header */}

                <div className="users-header">

                    <div>

                        <h1>
                            User Management
                        </h1>

                        <p>
                            Manage registered users
                        </p>

                    </div>


                    {/* User Count */}

                    <span className="user-count">

                        {state.users.length} Users

                    </span>

                </div>


                {/* =====================================
                    EMPTY STATE
                ===================================== */}

                {state.users.length === 0 ? (

                    <div className="status-card">

                        <h2>
                            No Users Found
                        </h2>

                        <p>
                            There are currently no users available.
                        </p>

                    </div>

                ) : (


                    /* =================================
                       USER GRID
                    ================================= */

                    <div className="users-grid">

                        {state.users.map((user) => (

                            <UserItem
                                key={user.id}
                                user={user}

                                onEdit={onEdit}
                                onDelete={onDelete}
                            />

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default UserList;