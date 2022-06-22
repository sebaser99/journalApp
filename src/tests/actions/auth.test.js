import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { createUserWithEmailPassword, login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';
import { FirebaseError } from 'firebase/app';
const middlewares = [thunk]

const mockStore = configureStore(middlewares)
const initState = {
    auth: {
        uid: '',
        displayName: ''
    }
}

let store = mockStore(initState)

describe('Pruebas en las acciones de auth', ()=> {

    beforeEach(()=> {
        store = mockStore(initState)
    })
    test('login y logout deben crear la acción respectiva', ()=> {
        // store.dispatch( login('3456789', 'Sebastian Rodriguez'))

        // const actions = store.getActions()
        // expect(actions[0]).toEqual({
        //     type: types.login,
        //     payload :{
        //         uid: '3456789',
        //         displayName: 'Sebastian Rodriguez'
        //     }
        // })

        const uid = '12345'
        const displayName = 'Sebastian'

        const loginAction = login(uid, displayName)
        const logoutAction = logout()

        expect(loginAction).toEqual({
          
                type: types.login,
                payload :{
                    uid: uid,
                    displayName: displayName
                }    
        })

        expect(logoutAction).toEqual({
            type: types.logout
        })
      
       
    })

    test('debe realizar el startLogout',  async ()=> {
        await store.dispatch(startLogout())

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.logout
        })  
        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning
        })
    })

    test('debe iniciar el startLoginEmailPassword', async ()=> {
        await store.dispatch(startLoginEmailPassword('test@test.com', '123456'))
        const action  = store.getActions()
        expect(action[0]).toEqual({
            type: types.uiStartLoading
        })
        expect(action[1]).toEqual({
            type: types.login,
            payload: {
                uid: 'xNSRRkYkMacJC7Quo3N7eMcSV3t1',
                displayName: null
            }
        })

        expect(action[2]).toEqual({
            type: types.uiFinishLoading,
            
        })
    })

    test('debe reportar un error al crear usuario con correo ya existente', async ()=> {
        await store.dispatch(createUserWithEmailPassword('test@test.com', '12345678', 'Sebastian'))

    
    })
    
})
 