import { db } from "../firebase/firebase-config";
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = ()=>{
    return async(dispatch, getState) =>{
        const uid = getState().auth.uid;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            url: ''
        }
        try{
            const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
            console.log("Document written with ID: ", docRef.id)
            dispatch(activeNote(docRef.id, newNote))
            dispatch(addNewNote(docRef.id, newNote))
        }
        catch(e){
            console.log("Error adding a document:" , e)
        }
    }
}

export const addNewNote = (id, note)=> ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const activeNote = (id, note)=>(
    {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }

    }
) 

export const startLoadingNotes = (uid) =>{
    return async (dispatch) =>{
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes)=>(
    {
        type: types.notesLoad,
        payload: notes
    }
)

export const startSaveNote = (note)=>{
    return async (dispatch, getState)=> {
        const {uid} = getState().auth
        if(!note.url){
            delete note.url
        }
        const noteToSave = {...note}
        delete noteToSave.id
        await updateDoc(doc(db, `${uid}/journal/notes/${note.id}`), noteToSave)

        dispatch(refreshNoteUpdated(note.id, noteToSave))
        Swal.fire('Saved', note.title, "success")
        
    }
}

export const refreshNoteUpdated = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = (file) => {
    return async(dispatch, getState)=> {
        const {active: activeNote} = getState().notes;
        Swal.fire({
            title: 'Uploading',
            text: 'Please wait....',
            didOpen: ()=> {
                Swal.showLoading()
            }
        })
       const urlLoad = await fileUpload(file)
       activeNote.url = urlLoad

       dispatch(startSaveNote(activeNote))
       Swal.close()
    }
}

export const startDeleting = (id)=> {
    return async(dispatch, getState)=>{
        
        const uid = getState().auth.uid
        console.log(uid)
        await deleteDoc(doc(db, `${uid}/journal/notes/${id}`))
        dispatch(deleteNote(id))
    }
}

export const deleteNote = (id)=> ({
    type: types.notesDelete,
    payload: id
})

export const cleaningLogout = () => ({
    type: types.notesLogoutCleaning

})

export const searchingNotes = (search) => ({
    type: types.notesSearch,
    payload: search
}) 