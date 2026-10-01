function UserItem({
    user,
    onEdit,
    onDelete
}) {


    // =========================================
    // FULL NAME
    // firstName + lastName
    // =========================================

    const fullName =
        `${user.firstName || ""} ${user.lastName || ""}`
            .trim();


    // =========================================
    // USERNAME
    // firstName_userId
    //
    // Example:
    // Aarav_usr_001
    // =========================================

    const username =
        user.username ||
        `${user.firstName || "User"}_${user.id}`;


    // =========================================
    // AVATAR
    // =========================================

    const avatarLetter =
        user.firstName
            ? user.firstName
                .charAt(0)
                .toUpperCase()
            : "U";


    return (

        <div className="user-card">


            {/* =================================
                USER HEADER
            ================================= */}

            <div className="user-card-top">


                {/* AVATAR */}

                <div className="user-avatar">

                    {avatarLetter}

                </div>



                {/* NAME + ID */}

                <div className="user-main-info">

                    <h3>

                        {fullName || "No Name"}

                    </h3>


                    <span className="user-id">

                        ID: {user.id}

                    </span>

                </div>

            </div>



            {/* =================================
                USER DETAILS
            ================================= */}

            <div className="user-details">


                {/* EMAIL */}

                <div className="detail-row">

                    <span className="detail-label">

                        Email

                    </span>


                    <span className="detail-value">

                        {user.email || "N/A"}

                    </span>

                </div>



                {/* USERNAME */}

                <div className="detail-row">

                    <span className="detail-label">

                        Username

                    </span>


                    <span className="detail-value">

                        {username}

                    </span>

                </div>



                {/* PHONE */}

                <div className="detail-row">

                    <span className="detail-label">

                        Phone

                    </span>


                    <span className="detail-value">

                        {user.phone || "N/A"}

                    </span>

                </div>


            </div>



            {/* =================================
                ACTION BUTTONS
            ================================= */}

            <div className="user-actions">


                {/* EDIT */}

                <button
                    type="button"

                    className="edit-button"

                    onClick={() =>
                        onEdit(user)
                    }
                >

                    Edit

                </button>



                {/* DELETE */}

                <button
                    type="button"

                    className="delete-button"

                    onClick={() =>
                        onDelete(user.id)
                    }
                >

                    Delete

                </button>


            </div>


        </div>

    );

}


export default UserItem;