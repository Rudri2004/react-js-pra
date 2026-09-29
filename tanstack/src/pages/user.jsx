import { Link } from "@tanstack/react-router";
function Users() {
    return (
        <div>
            <h1>Users Page</h1>
            <p>This is the Users page.</p>
            
                        <nav>
                            <Link to="/">Home</Link>
                            {" | "}
                            <Link to="/about">About</Link>
                              {" | "}
                            <Link to="/users">Users</Link>
                          
                        </nav>
        </div>
    );
}

export default Users;