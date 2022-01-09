import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import {  startLoginEmailPassword } from "../../actions/auth";

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [ formValue, handleChangeInput, reset ]= useForm({
        email: "sebaser99@gmail.com",
        password: 12345
    })
    const {email, password} = formValue;
    const handleLogin = (e)=>{
        e.preventDefault()
        dispatch(startLoginEmailPassword(email, password))
        
    }
    return (
        <>
            <h3 className="auth__title mb-5">Login</h3>
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
                <button className="btn btn-primary" type="submit">Login</button>

                <div className="auth__social-networks">
                    <p>Login with social media networks</p>
                    <div className="google-btn">
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
        </>
    )
}
