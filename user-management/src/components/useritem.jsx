function UserItem({
    user,
    onEdit,
    onDelete
}) {

 const fullName =
        `${user.firstName || ""} ${user.lastName || ""}`
            .trim();

    const username =
        user.username ||
        `${user.firstName || "User"}_${user.id}`;

    const avatarLetter =
        user.firstName
            ? user.firstName
                .charAt(0)
                .toUpperCase()
            : "U";


    return (

        <div className="user-card">

            <div className="user-card-top">


                <div className="user-avatar">

                    {avatarLetter}

                </div>

                <div className="user-main-info">

                    <h3>

                        {fullName || "No Name"}

                    </h3>


                    <span className="user-id">

                        ID: {user.id}

                    </span>

                </div>

            </div>

            <div className="user-details">
                <div className="detail-row">
                    <span className="detail-label">   Email   </span>

                    <span className="detail-value">

                        {user.email || "N/A"}

                    </span>

                </div>

                <div className="detail-row">

                    <span className="detail-label"> Username </span>

                    <span className="etail-value">
                        {username}
                    </span>
                </div>

                <div className="detail-row">

                    <span className="detail-label">  Phone </span>
                    <span className="detail-value">
                        {user.phone || "N/A"}
                    </span>
                </div>
            </div>

            <div className="user-actions">
                <button
                    type="button" className="edit-button"  onClick={() =>   onEdit(user)     }    >
                    Edit  </button>
                <button type="button" className="delete-button"  onClick={() => onDelete(user.id)  } >
                    Delete
                </button>
            </div>
        </div>

    );

}


export default UserItem;