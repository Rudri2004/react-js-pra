import { useEffect, useState } from "react";
import {
    addUser,
    updateUser
} from "../fileservice/userapi";

import useUsers from "../hooks/useuser";

import "../App.css";


function UserForm({ editingUser, onCancelEdit }) {

    const { dispatch } = useUsers();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    // =========================================
    // LOAD USER DATA WHEN EDITING
    // =========================================

    useEffect(() => {

        if (editingUser) {

            setName(editingUser.name || "");
            setEmail(editingUser.email || "");
            setUsername(editingUser.username || "");
            setPhone(editingUser.phone || "");

            setError("");
            setSuccess("");
        }

    }, [editingUser]);


    // =========================================
    // FORM SUBMIT
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Validation

        if (
            !name.trim() ||
            !email.trim() ||
            !username.trim() ||
            !phone.trim()
        ) {

            setError("All fields are required");

            return;
        }


        try {

            setLoading(true);


            const token = localStorage.getItem("token");


            if (!token) {

                setError(
                    "Authentication token not found"
                );

                return;
            }


            const userData = {

                name: name.trim(),

                email: email.trim(),

                username: username.trim(),

                phone: phone.trim(),

            };


            // =====================================
            // EDIT USER
            // =====================================

            if (editingUser) {

                const updatedUser = await updateUser(
                    editingUser.id,
                    userData,
                    token
                );


                dispatch({

                    type: "UPDATE_USER_SUCCESS",

                    payload: updatedUser,

                });


                setSuccess(
                    "User updated successfully!"
                );

            }


            // =====================================
            // ADD USER
            // =====================================

            else {

                const newUser = await addUser(
                    userData,
                    token
                );


                dispatch({

                    type: "ADD_USER_SUCCESS",

                    payload: newUser,

                });


                setSuccess(
                    "User added successfully!"
                );

            }


            // Clear form

            setName("");
            setEmail("");
            setUsername("");
            setPhone("");


            // Exit edit mode

            if (editingUser) {

                onCancelEdit();

            }


        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="add-user-page">

            <div className="add-user-container">


                {/* Header */}

                <div className="add-user-header">

                    <h1>

                        {editingUser
                            ? "Edit User"
                            : "Add User"
                        }

                    </h1>

                    <p>

                        {editingUser
                            ? "Update user information"
                            : "Add a new user to the system"
                        }

                    </p>

                </div>


                {/* Form */}

                <form
                    className="add-user-form"
                    onSubmit={handleSubmit}
                >


                    {/* Name */}

                    <div className="form-group">

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter name"
                        />

                    </div>


                    {/* Email */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter email"
                        />

                    </div>


                    {/* Username */}

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Enter username"
                        />

                    </div>


                    {/* Phone */}

                    <div className="form-group">

                        <label>
                            Phone
                        </label>

                        <input
                            type="text"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            placeholder="Enter phone number"
                        />

                    </div>


                    {/* Error */}

                    {error && (

                        <div className="form-error">

                            {error}

                        </div>

                    )}


                    {/* Success */}

                    {success && (

                        <div className="form-success">

                            {success}

                        </div>

                    )}


                    {/* Buttons */}

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="add-user-button"
                            disabled={loading}
                        >

                            {loading

                                ? editingUser
                                    ? "Updating User..."
                                    : "Adding User..."

                                : editingUser
                                    ? "Update User"
                                    : "Add User"

                            }

                        </button>


                        {/* Cancel */}

                        {editingUser && (

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={onCancelEdit}
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                </form>

            </div>

        </div>

    );
}

export default UserForm;