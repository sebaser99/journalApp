import { mount } from "enzyme";
import React from 'react';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startGoogleLogin, startLoginEmailPassword } from "../../../actions/auth";

jest.mock("../../../actions/auth", ()=> ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))
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
store.dispatch = jest.fn()
const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
    )


describe('pruebas en LoginScreen', ()=> {
    test('debe mostrar el componente correctamente', ()=> {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe de disparar la acción de startGoogleLogin', ()=> {
        wrapper.find('.google-btn').prop('onClick')()
        expect(startGoogleLogin).toHaveBeenCalled()
    }),
    test('debe de disparar la accion startLoginEmailPassword con los argumentos correctos', ()=> {
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })
        expect(startLoginEmailPassword).toHaveBeenLastCalledWith('alexrodriguez@gmail.com', '123456')
    })
})