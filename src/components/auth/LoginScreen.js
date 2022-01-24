import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import {  startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import validator  from "validator";
import { uiRemoveError, uiSetError} from "../../actions/ui";

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const {loading, msgError} = useSelector(state => state.ui)
    const [ formValue, handleChangeInput]= useForm({
        email: "alexrodriguez@gmail.com",
        password: '123456'
    })
    const {email, password} = formValue;

    const handleLogin = (e)=>{
        e.preventDefault()
        if(isFormValid()){
            dispatch(startLoginEmailPassword(email, password))
        
        }        
    }
    const handleLoginGoogle = ()=>{
        dispatch(startGoogleLogin())
    }
    const isFormValid = ()=>{
        if(!validator.isEmail(email)){
            dispatch(uiSetError('Email is not valid'))
            return false
        } else if(password.length <= 5){
            dispatch(uiSetError('El password must be at least 6 characters'))
            return false 
        }
        dispatch(uiRemoveError())
        return true
    }
    return (
        <div className="animate__animated animate__fadeIn animate__fast">
            <h3 className="auth__title mb-5">Login</h3>
            {
                msgError && (
                    <div className="auth__alert-error">{msgError}</div>
                )
            }
            <form onSubmit={handleLogin}>
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
                <button className="btn btn-primary" type="submit" disabled={loading} >Login</button>
                
                <div className="auth__social-networks">
                    <p>Login with social media networks</p>
                    <div className="google-btn"
                            onClick={handleLoginGoogle}
                        >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className="auth__link" to='/auth/register' >
                    Create new account
                </Link>

            </form>
        </div>
    )
}
