import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

describe('vamos a hacer pruebas en el auth Reducer', ()=> {

    const initialState = {

    }
    
    const newAuth = {
        uid: "hjfhfsdkdjdhdhdgg",
        displayName: "Alex Rodriguez"
    }
    const authState ={
        uid: "hjfhfsdkdjdhdhdgg",
        displayName: "Alex Rodriguez"
    }
    
    test('debe retornar el estado cuando no envío action', () => {
        const autent = authReducer(initialState, {})

        expect(autent).toEqual(initialState)
    })

    test('debe retornar el nuevo usuario cuando envío login ', () => {
        const autent = authReducer(initialState, {
            type: types.login,
            payload: newAuth
        })

        expect(autent).toEqual({
            uid: newAuth.uid,
            name: newAuth.displayName
        })
    })

    test('debe retornar {} cuando envío logout ', () => {
        const autent = authReducer(authState, {
            type: types.logout
            
        })

        expect(autent).toEqual({
            
        })
    })

    test('debe retornar state si el type de la acción no es reconocida', () => {
        const autent = authReducer(authState, {
            type: 'kkkkklllll'
            
        })

        expect(autent).toEqual(authState)
    })
})