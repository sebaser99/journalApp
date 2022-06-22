import { mount } from "enzyme";
import React from 'react';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { createUserWithEmailPassword } from "../../../actions/auth";
import { types } from "../../../types/types";

jest.mock('../../../actions/auth', ()=> {
    createUserWithEmailPassword: jest.fn()
})

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
}


let store = mockStore(initState)
// store.dispatch = jest.fn()
const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
    )


describe('vamos a probar RegisterScreen', ()=> {
    test('debe hacer match con el snapahot', ()=> {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe mostrar el error si establezco el email como campo vacio', ()=> {
        const emailField = wrapper.find('input[name="email"]')
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: {
                msg: 'Email is not valid'}
        })
    })
            
    test('debe mostrar que el cuadro de texto exista', ()=> {
        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'El correo no es válido'
            }
        }
        
        
        let store = mockStore(initState)
        // store.dispatch = jest.fn()
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
            )

        const message = wrapper.find('.auth__alert-error')
        expect(message.text().trim()).toBe(initState.ui.msgError)
    })

})