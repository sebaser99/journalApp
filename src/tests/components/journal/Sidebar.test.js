import { mount } from "enzyme";
import React from 'react';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

jest.mock('../../../actions/auth', ()=> ({
    startLogout: jest.fn()
}))

jest.mock('../../../actions/notes', ()=>({
    startNewNote: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
    auth: {
        uid: '23',
        name: 'Sebastian'
    },
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

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider>
    )

    
describe('vamos a probar el Sidebar', ()=> {
    test('debe hacer match con el snapshot', ()=> {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe hacer el llamado a startNewNot al dar click en el boton new entry', ()=>{
        const newNote = wrapper.find('.journal__new-entry')
        newNote.simulate('click')

        expect(startNewNote).toHaveBeenCalled()
    })
    test('debe hacer el llamado a startLogout al dar click en el boton Logout', ()=>{
        const newNote = wrapper.find('.btn')
        newNote.simulate('click')

        expect(startLogout).toHaveBeenCalled()
    })
})