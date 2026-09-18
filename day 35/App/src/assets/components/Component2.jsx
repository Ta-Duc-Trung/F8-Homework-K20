import { useContext } from "react";
import { messageContext } from "../..App";
export default function Component2() {
    const { store, dispatch } = useContext(messageContext);
    const handleChangeMessage = () => {
        dispatch({ type: "setMessage", payload: "Hello F8" });
    };
    return (
        <>
            <div>Component 2: {store.message}</div>
            <button
                className="border-2 border-black p-2 rounded-mg bg-sky-500 px-4 py-2"
                onClick={handleChangeMessage}
            >
                Change Message: Hello F8
            </button>
        </>
    );
}
