import { useCallback, useState } from "react";

function useFormStateAndValidation() {
    const [values, setValues] = useState({});
    const [errorMessages, setErrorMessages] = useState({});
    const [formIsValid, setFormValidity] = useState(false);

    function onChange(evt) {
        const { name, value } = evt.target;
        const isValid = evt.target.closest('form').checkValidity();

        setValues({
            ...values,
            [name]: value,
        })
        setErrorMessages({
            ...errorMessages,
            [name]: evt.target.validationMessage
        })
        setFormValidity(isValid);
    }

    const resetFormValues = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrorMessages(newErrors);
        setFormValidity(newIsValid);
    }, [setValues, setErrorMessages, setFormValidity]);

    return { values, errorMessages, formIsValid, onChange, resetFormValues }
}

export default useFormStateAndValidation;