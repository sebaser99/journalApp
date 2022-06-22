 /** * @jest-environment node */

import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';
import * as fs from 'fs';

jest.mock('../../helpers/fileUpload', ()=> {
    return {
        fileUpload: () =>{
            return Promise.resolve('https://ahorasi.com/image.jpg')
        }
    }
})

global.scrollTo = jest.fn()
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '7kZAStaWu5jSYVTyH9f6',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}

let store =  mockStore(initState)

describe('vamos a hacer pruebas en action: notes', ()=> {
    
    beforeEach( ()=> {
        store =  mockStore(initState)
    })
    test('debe crear una nueva nota startNewNote', async ()=> {
        await store.dispatch(startNewNote())
        const actions = store.getActions()
        
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number),
            url: ''
            }
        })

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number),
            url: ''
            }
        })

        const {id} = actions[0].payload
        const k = store.getState()
        const {uid} = k.auth
        
    
        await deleteDoc(doc(db, `${uid}/journal/notes/${id}`))
    })

    test('debe mostrar las acciones correctas al cargar las notas con startLoadingNotes', async ()=> {
    
        const k = store.getState()
        const {uid} = k.auth
        await store.dispatch(startLoadingNotes(uid))
        const actions = store.getActions()
       
        
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        })
        
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
            url: expect.any(String)
        }

        expect(actions[0].payload[0]).toMatchObject(expected)
        
    })

    test('startSaveNote debe actualizar la nota', async()=> {
        const k = store.getState()
        const {uid} = k.auth
        const note = {
            id: '7kZAStaWu5jSYVTyH9f6',
            title: 'titulo',
            body: 'body'
        }
        await store.dispatch(startSaveNote(note))

        const actions = store.getActions()
       expect(actions[0].type).toBe(types.notesUpdated)
        const docRef = doc(db, `${uid}/journal/notes`, note.id ) 
        const docSnap = await getDoc(docRef);
        
       expect(docSnap.data().title).toBe('titulo')
    })


    test('startUploading debe actualizar el url del entry', async ()=> {
        const k = store.getState()
        const {uid} = k.auth
        const file = []
        await store.dispatch(startUploading(file))
        
        const docRef = doc(db, `${uid}/journal/notes`, '7kZAStaWu5jSYVTyH9f6' ) 
        const docSnap = await getDoc(docRef);
        expect(docSnap.data().url).toBe('https://ahorasi.com/image.jpg')
    })
})
