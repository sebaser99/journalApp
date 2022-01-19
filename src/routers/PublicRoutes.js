import { Redirect, Route } from "react-router-dom"

export const PublicRoutes = ({component : Component, isLoginIn, ...rest}) => {
    return(
        <Route {...rest}
            component={(props)=>(
                (!isLoginIn)
                    ? (<Component {...props} />)
                    : (<Redirect to='/' />)
            )}
        />
    ) 
}