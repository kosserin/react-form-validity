import useInput from '../hooks/use-input';
import styles from './Form.module.css'

const Form = () => {

    const { 
        value: enteredName,
        enteredValueIsValid: enteredNameIsValid,
        valueInputClasses : nameInputClasses,
        changeEnteredValueHandler : nameInputChangeHandler,
        valueInputBlurHandler : nameInputBlurHandler,
        reset : nameInputReset,

     } = useInput( value => value.trim() !== "");

    const { 
        value: enteredEmail,
        enteredValueIsValid: enteredEmailIsValid,
        valueInputClasses : emailInputClasses,
        changeEnteredValueHandler : emailInputChangeHandler,
        valueInputBlurHandler : emailInputBlurHandler,
        reset : emailInputReset,

     } = useInput( value => value.match("^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"));

    const formSubmitHandler = e => {
        e.preventDefault();
        nameInputReset();
        emailInputReset();
        console.log('Submitted!')
    }

    let nameContent = <p></p>
    let emailContent = <p></p>

    if(nameInputClasses) {
        nameContent = <p>Please enter name.</p>
    }

    if(emailInputClasses) {
        emailContent = <p>Please enter valid email address.</p>
    }
    
  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
    <div className={styles['form-group']}>
        <label htmlFor='nameInput'>Name</label>
        <input type="text" id='nameInput' value={enteredName} onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} className={nameInputClasses ? `${styles.red}` : ""} />
    </div>
    {nameContent}
    <div className={styles['form-group']}>
        <label htmlFor='emailInput'>Email</label>
        <input type="text" id='emailInput' value={enteredEmail} onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler} className={emailInputClasses ? `${styles.red}` : ""} />
    </div>
    {emailContent}
    <div className={styles['form-group']}>
        <button disabled={!enteredNameIsValid || !enteredEmailIsValid}>Submit</button>
    </div>
    </form>
  )
}

export default Form