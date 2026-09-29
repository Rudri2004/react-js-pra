import { Link } from "@tanstack/react-router";

function About() {
    return (
        <div>
            <h1>About Page</h1>

            <p>This is the About page.</p>

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

export default About;