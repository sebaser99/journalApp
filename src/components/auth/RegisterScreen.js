import { Link } from "react-router-dom"

export const RegisterScreen = () => {
    return (
        <>
        <h3 className="auth__title mb-5">Register</h3>
        <form>
            <input  type='text' 
                placeholder="Name"
                name="name"
                className="auth__input"
                autoComplete='off'
            />
            <input  type='text' 
                placeholder="Email"
                name="email"
                className="auth__input"
                autoComplete='off'
            />
            <input  type='password' 
                placeholder="Password"
                name="password"
                className="auth__input"
            />
            <input  type='password' 
                placeholder="Confirm Password"
                name="password"
                className="auth__input"
            />
            <button className="btn btn-primary" type="submit">Register</button>

           
            <Link className="auth__link" to='/auth/register' >
                I have a account
            </Link>

        </form>
    </>
    )
}
