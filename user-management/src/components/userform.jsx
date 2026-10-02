import { useEffect, useState } from "react";

import {
    addUser,
    updateUser
} from "../fileservice/userapi";

import useUsers from "../hooks/useuser";

import "../App.css";


function UserForm({
    editingUser,
    onCancelEdit
}) {

    const { dispatch } = useUsers();



    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [username, setUsername] = useState("");

    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);



    useEffect(() => {

        if (editingUser) {

            const fullName =
                `${editingUser.firstName || ""} ${editingUser.lastName || ""}`
                    .trim();


            setName(fullName);


            setEmail(
                editingUser.email || ""
            );


            setPhone(
                editingUser.phone || ""
            );


            setUsername(
                editingUser.username ||
                `${editingUser.firstName || "User"}_${editingUser.id}`
            );


            setError("");

            setSuccess("");
        }

    }, [editingUser]);



    const handleSubmit = async (e) => {

        e.preventDefault();


        setError("");

        setSuccess("");


        if (
            !name.trim() ||
            !email.trim() ||
            !phone.trim()
        ) {

            setError(
                "Name, email and phone are required"
            );

            return;
        }


        try {

            setLoading(true);

            const token =
                localStorage.getItem("token");


            if (!token) {

                setError(
                    "Authentication token not found"
                );

                return;
            }
            const nameParts =
                name.trim().split(" ");


            const firstName =
                nameParts[0];


            const lastName =
                nameParts
                    .slice(1)
                    .join(" ");

            const userData = {

                firstName: firstName,

                lastName: lastName,

                email: email.trim(),

                phone:`+91 ${phone.trim()}`,

            };


            if (editingUser) {

                const updatedUser =
                    await updateUser(
                        editingUser.id,
                        userData,
                        token
                    );


                const finalUser = {

                    ...updatedUser,

                    username:
                        editingUser.username ||
                        `${firstName}_${editingUser.id}`,

                }

                dispatch({

                    type: "UPDATE_USER_SUCCESS",

                    payload: finalUser,

                });


                setSuccess(
                    "User updated successfully!"
                );
                setName("");
                setEmail("");
                setUsername("");
                setPhone("");
                onCancelEdit();

            }

            else {
                const newUser =
                    await addUser(
                        userData,
                        token
                    );

                const generatedUsername =
                    `${firstName}_${newUser.id}`;
                const finalUser =
                    await updateUser(
                        newUser.id,
                        {
                            ...newUser,
                            username:
                                generatedUsername,
                        },
                        token
                    );
                dispatch({

                    type: "ADD_USER_SUCCESS",

                    payload: finalUser,

                });


                setSuccess(
                    "User added successfully!"
                );




                setName("");

                setEmail("");

                setUsername("");

                setPhone("");

            }

        }

        catch (error) {

            setError(
                error.message
            );

        }

        finally {

            setLoading(false);

        }

    }
    return (

        <div className="add-user-page">

            <div className="add-user-container">


                <div className="add-user-header">

                    <h1>

                        {editingUser
                            ? "Edit User"
                            : "Add User"}

                    </h1>


                    <p>

                        {editingUser
                            ? "Update user information"
                            : "Add a new user to the system"}

                    </p>

                </div>


             

                <form
                    className="add-user-form"
                    onSubmit={handleSubmit}
                >


                    {/* NAME */}

                    <div className="form-group">

                        <label>
                            Name
                        </label>


                        <input
                            type="text"

                            value={name}

                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }

                            placeholder="Enter full name"
                        />

                    </div>



                    {/* EMAIL */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>


                        <input
                            type="email"

                            value={email}

                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }

                            placeholder="Enter email"
                        />

                    </div>



              

                    <div className="form-group">

                        <label>
                            Username
                        </label>


                        <input
                            type="text"

                            value={
                                editingUser
                                    ? username
                                    : ""
                            }

                            readOnly

                            placeholder={
                                editingUser
                                    ? "Username"
                                    : "Automatically generated"
                            }

                        />

                    </div>



                 

                    <div className="form-group">

                        <label>
                            Phone
                        </label>


                        <input
                            type="text"

                            value={phone}
                            
                         onChange={(e) => {
                const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0,10);

                setPhone(value);
            }}
            placeholder="Enter phone number"
        />

                    </div>



                

                    {error && (

                        <div className="form-error">

                            {error}

                        </div>

                    )}



         

                    {success && (

                        <div className="form-success">

                            {success}

                        </div>

                    )}



                 

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



                      

                        {editingUser && (

                            <button
                                type="button"

                                className="cancel-button"

                                onClick={
                                    onCancelEdit
                                }
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