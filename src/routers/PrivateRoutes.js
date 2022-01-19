
import { Redirect, Route } from "react-router-dom"

export const PrivateRoutes = ({component : Component, isLoginIn, ...rest}) => {
    return(
        <Route {...rest}
            component={(props)=>(
                (isLoginIn)
                    ? (<Component {...props} />)
                    : (<Redirect to='/auth/login' />)
            )}
        />
    ) 
}