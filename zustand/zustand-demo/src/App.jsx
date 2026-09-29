import { useContext } from "react";
import useCounterStore from "./store/useCounterStore";
import ThemeContext from "./context/ThemeContext";

function App() {

    // Zustand code - keep this same
    const count = useCounterStore(
        (state) => state.count
    );

    const increment = useCounterStore(
        (state) => state.increment
    );

    const decrement = useCounterStore(
        (state) => state.decrement
    );

    // Context code
    const { theme, changeTheme } = useContext(ThemeContext);

    return (
        <div>
            <h1>Counter</h1>

            <h2>Count: {count}</h2>

            <button onClick={increment}>
                +
            </button>

            <button onClick={decrement}>
                -
            </button>

            <h1>Current Theme: {theme}</h1>

            <button onClick={changeTheme}>
                Change Theme
            </button>
        </div>
    );
}

export default App;