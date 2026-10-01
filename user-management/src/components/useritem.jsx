function UserItem({ user, onEdit, onDelete }) {

    // Combine first name and last name
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    // Create username using first name + user id
    const username = user.firstName
        ? `${user.firstName}_${user.id}`
        : "N/A";

    return (

        <div className="user-card">


            {/* User Header */}

            <div className="user-card-top">

                <div className="user-avatar">

                    {user.firstName
                        ? user.firstName
                            .charAt(0)
                            .toUpperCase()
                        : "U"
                    }

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


            {/* User Details */}

            <div className="user-details">


                {/* Email */}

                <div className="detail-row">

                    <span className="detail-label">
                        Email
                    </span>

                    <span className="detail-value">
                        {user.email || "N/A"}
                    </span>

                </div>


                {/* Username */}

                <div className="detail-row">

                    <span className="detail-label">
                        Username
                    </span>

                    <span className="detail-value">
                        {username}
                    </span>

                </div>


                {/* Phone */}

                <div className="detail-row">

                    <span className="detail-label">
                        Phone
                    </span>

                    <span className="detail-value">
                        {user.phone || "N/A"}
                    </span>

                </div>

            </div>


            {/* Actions */}

            <div className="user-actions">

                <button
                    type="button"
                    className="edit-button"
                    onClick={() => onEdit(user)}
                >
                    Edit
                </button>


                <button
                    type="button"
                    className="delete-button"
                    onClick={() => onDelete(user.id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default UserItem;