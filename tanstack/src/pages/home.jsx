import { Link } from "@tanstack/react-router";

function Home() {
    return (
        <div>
            <h1>Home Page</h1>

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

export default Home;