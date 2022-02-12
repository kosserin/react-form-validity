import { useReducer } from 'react';

const initialState = {
    value: "",
    isTouched: false,
}

const inputReducer = (state, action) => {
    if(action.type === "CHANGE") {
        return { value: action.value, isTouched: state.isTouched}
    }
    if(action.type === "BLUR") {
        return { isTouched: true, value: state.value }
    }
    if(action.type === "RESET") {
        return { isTouched: false, value: "" }
    }
    return initialState;
}

const useInput = (validateValue) => {

    const [inputState, dispatchInputAction] = useReducer(inputReducer, initialState)
    const enteredValueIsValid = validateValue(inputState.value);
    const valueInputClasses = !enteredValueIsValid && inputState.isTouched;
    

    const changeEnteredValueHandler = e => {
        dispatchInputAction({
            type: "CHANGE", value: e.target.value
        })
    }

    const valueInputBlurHandler = e => {
        dispatchInputAction({
            type: "BLUR",
        })
    }

    const reset = () => {
        dispatchInputAction({
            type: 'RESET'
        })
    }


    return {
        value : inputState.value,
        enteredValueIsValid,
        isTouched : inputState.isTouched,
        valueInputClasses,
        changeEnteredValueHandler,
        valueInputBlurHandler,
        reset,
    };
}

export default useInput;