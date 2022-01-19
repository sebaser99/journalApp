import { Link } from "react-router-dom";
import {useForm} from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { uiRemoveError, uiSetError } from "../../actions/ui";
import { createUserWithEmailPassword } from "../../actions/auth";


export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const {msgError} = useSelector(state => state.ui)
   
    const [ formValue, handleChangeInput]= useForm({
        name: 'Alex Rodriguez',
        email: "alexrodriguez@gmail.com",
        password: '123456',
        password2: '123456'
    })
    const {name, email, password, password2} = formValue

    const handleRegister = (e)=>{
        e.preventDefault()
        if(isFormValid()){
            dispatch(createUserWithEmailPassword(email, password, name))
        }
    }
    const isFormValid = ()=> {
        if(name.trim().length === 0){
            dispatch(uiSetError('Name is required'))
            return false
        } else if(!validator.isEmail(email)){
            dispatch(uiSetError('Email is not valid'))
            return false
        }else if(password !== password2 || password.length <= 5){
            dispatch(uiSetError('Password should be a least 6 characthers and match each other'))
            return false
        }
        dispatch(uiRemoveError())
        return true
    }
    return (
        <>
        <h3 className="auth__title mb-5">Register</h3>
        {msgError && (
            <div className="auth__alert-error">{msgError}</div>
        )}
        <form onSubmit={handleRegister}>
            <input  type='text' 
                placeholder="Name"
                name="name"
                className="auth__input"
                autoComplete='off'
                value={name}
                onChange={handleChangeInput}
            />
            <input  type='text' 
                placeholder="Email"
                name="email"
                className="auth__input"
                autoComplete='off'
                value={email}
                onChange={handleChangeInput}
            />
            <input  type='password' 
                placeholder="Password"
                name="password"
                className="auth__input"
                value={password}
                onChange={handleChangeInput}
            />
            <input  type='password' 
                placeholder="Confirm Password"
                name="password2"
                className="auth__input"
                value={password2}
                onChange={handleChangeInput}
            />
            <button className="btn btn-primary" type="submit">Register</button>

           
            <Link className="auth__link" to='/auth/login' >
                I have a account
            </Link>

        </form>
    </>
    )
}
