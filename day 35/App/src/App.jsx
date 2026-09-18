import { createContext, useReducer } from "react";
import Counter from "./assets/components/Counter";
import Component1 from "./assets/components/Component1";

export const messageContext = createContext(null);

const initialState = {
    message: "Hello from App",
};
const reducer = (state, action) => {
    switch (action.type) {
        case "setMessage":
            return { ...state, message: action.payload };
        default:
            throw new Error("Invalid action type");
    }
};

export default function App() {
    const [store, dispatch] = useReducer(reducer, initialState);
    return (
        <messageContext.Provider value={{ store, dispatch }}>
            <Counter />
            <Component1 />
        </messageContext.Provider>
    );
}
