import styles from "./UserCard.module.css";

function UserCard() {
    return (
        <div className={styles.card}>

            <h2 className={styles.title}>
                Rudri
            </h2>

            <p>
                React Developer
            </p>

            <button className={styles.button}>
                View Profile
            </button>

        </div>
    );
}

export default UserCard;