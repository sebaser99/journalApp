import { mount } from "enzyme";
import React from 'react';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";
import Swal from "sweetalert2";
import { act } from "@testing-library/react";
import { auth } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

jest.mock('sweetalert2', ()=> ({
    Swal: jest.fn()
}))
jest.mock('../../actions/auth', ()=> ({
    login: jest.fn()
}))


const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active:{
            id: 'ABCD'
        },
        notes: []
    }
}


let store = mockStore(initState)
store.dispatch = jest.fn()


describe('vamos a hacer pruebas en el AppRouter', ()=>{
    test('debe llamar la función login', async ()=> {
        let user;
        await act(async ()=> {
            const  userCred = await signInWithEmailAndPassword(auth, 'test@test.com', '123456')
            
            user = userCred
            console.log(user.user.uid)
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
                )
    
        })

        expect(login).toBeCalledWith('xNSRRkYkMacJC7Quo3N7eMcSV3t1', null)
   
    })
})
