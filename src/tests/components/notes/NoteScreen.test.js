import { mount } from "enzyme";
import React from 'react';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from "../../../actions/notes";


jest.mock('../../../actions/notes', ()=> ({
    activeNote: jest.fn()
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
            id: 'ABCD',
            title: 'Hola',
            body: 'Mundo',
            date: 0,
            url: 'jgjgghghghgh'
        },
        notes: []
    }
}


let store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <NoteScreen />
        </MemoryRouter>
    </Provider>
    )

describe('vamos a probar el <NoteScreen />', ()=> {
    test('debe hacer match con el snapahot', ()=> {

        expect(wrapper).toMatchSnapshot()
    })

    test('debe hacer el llamado a activeNote', ()=> {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola dos veces'
            }
        })
        expect(activeNote).toHaveBeenLastCalledWith(
            'ABCD',
            {
                id: 'ABCD',
                title: 'Hola dos veces',
                body: 'Mundo',
                date: 0,
                url: 'jgjgghghghgh'

            }
        )
    })

})