import { auth } from "../firebase/firebase-config";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2';
import { cleaningLogout } from "./notes";

export const startLoginEmailPassword = (email, password)=> {
    return(dispatch)=>{
        dispatch(startLoading())

        return signInWithEmailAndPassword(auth, email, password)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch(error =>{
                dispatch(finishLoading())
                Swal.fire('Error', error.message, 'error')
            }) 
        
    }
}

export const createUserWithEmailPassword = (email, password, name) =>{
    return(dispatch)=>{
         return createUserWithEmailAndPassword(auth, email, password)
        .then(async({user}) =>{
            await updateProfile(auth.currentUser, {
                displayName: name
            })
             dispatch(login(user.uid, user.displayName))
        })
        .catch(error => {
            Swal.fire('Error', error.message, 'error')
            console.log(error.code)
            
        })
    }
}

export const startGoogleLogin = ()=>{
    const googleAuthProvider = new GoogleAuthProvider();
    return(dispatch)=>{
        signInWithPopup(auth, googleAuthProvider)
        .then(({user})=>{
           dispatch(
            login(user.uid, user.displayName)
           )
  
        })
        .catch(err => console.log(err))
    }
}

export const login = (uid, displayName) => (
    {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
)

export const startLogout = ()=> {
    return(dispatch)=>{
        auth.signOut()
        dispatch(logout())
        dispatch(cleaningLogout())
    }
}

export const logout = ()=> (
    {
        type: types.logout
    }
)

