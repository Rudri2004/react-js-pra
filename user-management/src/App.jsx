import { useState } from "react";

import Login from "./components/login";
import UserList from "./components/userlist";
import UserForm from "./components/userform";

import { UserProvider } from "./context/usercontext";

import { deleteUser } from "./fileservice/userapi";

import useUsers from "./hooks/useuser";

import "./App.css";


function AppContent() {

    const { dispatch } = useUsers();


    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [successMessage, setSuccessMessage] =
        useState("");

    const [editingUser, setEditingUser] =
        useState(null);

    const handleLoginSuccess = () => {

        setIsLoggedIn(true);

        setSuccessMessage(
            "Login successful!"
        );

        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

    const handleEdit = (user) => {

        setEditingUser(user);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleCancelEdit = () => {

        setEditingUser(null);

    };
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            const token =
                localStorage.getItem("token");


            if (!token) {

                alert(
                    "Authentication token not found"
                );

                return;
            }
            await deleteUser(
                id,
                token
            );

            dispatch({
                type: "DELETE_USER_SUCCESS",
                payload: id,
            });

            setSuccessMessage(
                "User deleted successfully!"
            );


            setTimeout(() => {

                setSuccessMessage("");

            }, 3000);


        } catch (error) {

            alert(error.message);

        }
    };


    return (

        <>

            {!isLoggedIn ? (

                <Login
                    onLoginSuccess={
                        handleLoginSuccess
                    }
                />

            ) : (

                <div>

                    {successMessage && (

                        <div className="success-message">

                            {successMessage}

                        </div>

                    )}


                    <UserForm
                        editingUser={editingUser}
                        onCancelEdit={
                            handleCancelEdit
                        }
                    />


                    <UserList
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                </div>

            )}

        </>

    );
}


function App() {

    return (

        <UserProvider>

            <AppContent />

        </UserProvider>

    );
}

export default App;