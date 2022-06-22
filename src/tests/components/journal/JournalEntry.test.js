import { mount } from "enzyme";
import React from 'react';
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";


const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {}

let store = mockStore(initState)
store.dispatch = jest.fn()



const note = {
    id: 'ABCD',
    title: 'Hola dos veces',
    body: 'Mundo',
    date: 0,
    url: 'jgjgghghghgh'

}

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <JournalEntry {...note}/>
        </MemoryRouter>
    </Provider>
    )
describe('vamos a probar el JournalEntry', ()=>{
    test('debe hacer match con el snapshot', ()=> {
        expect(wrapper).toMatchSnapshot()
    })

    test('debe hacer el llamado al activeNote', ()=> {
        wrapper.find('.journal__entry').prop('onClick')()
        expect(store.dispatch).toHaveBeenCalledWith(
            activeNote(note.id, {...note})
        )
   

    })
})