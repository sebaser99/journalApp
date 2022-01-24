import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";
import { CheckingScreen } from "../components/checking/CheckingScreen";
import { JournalScreen } from "../components/journal/JournalScreen";
import { auth } from "../firebase/firebase-config";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged(async (user) =>{
            if(user?.uid){
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)
                dispatch(startLoadingNotes(user.uid))
            }else {
                setIsLoggedIn(false)    
            }
            setChecking(false)
            
        })
    }, [dispatch, setChecking, setIsLoggedIn]);
    
    if(checking) {
        return (
            <CheckingScreen />
        )
    }

    return (

        <Router>
            <div>
                <Switch>
                    <PublicRoutes isLoginIn={isLoggedIn} path='/auth' component={AuthRouter} />
                    <PrivateRoutes isLoginIn={isLoggedIn}  exact path='/' component={JournalScreen} />
                    <Redirect to='/auth' />
                </Switch>
            </div>
        </Router>
        
      
    )
}
