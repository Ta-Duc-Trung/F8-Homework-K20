import { useState } from "react";
import { useReducer } from "react";
const initialState = { count: 0 };
const reducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { ...state, count: state.count + Number(action.payload ) };
        case "decrement":
            return { ...state, count: state.count - Number(action.payload ) };
        case "reset":
            return initialState;
        default:
            throw new Error("Invalid action type");
    }
};
export default function Counter() {
    const [state, dispatch] = useReducer(reducer,initialState);
    const [value, setValue] = useState("0");
    return (
        <div>
            <p>{state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
            <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
            <div>
                <button
                    onClick={() =>
                        dispatch({ type: "increment", payload: value })
                    }
                >
                    Add{value}
                </button>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter a value"
                />
            </div>
        </div>
    );
}
