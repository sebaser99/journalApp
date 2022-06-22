import { types } from "../types/types"

const initialState = {
    notes: [],
    active: null,
    backup:[]
}
export const notesReducer = (state = initialState, action) =>{
    switch (action.type) {
        
        case types.notesAddNew:

            return {
                ...state,
                notes: [action.payload, ...state.notes],
                backup: [action.payload, ...state.notes]
            }
        
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesLoad:
            return {
                ...state,
                notes:[...action.payload],
                backup:[...action.payload]
            }

        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note
                ),
                backup: state.notes.map(
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note
                ),

            }

            case types.notesDelete:
                return {
                    ...state,
                    active: null,
                    notes: state.notes.filter(note => note.id !== action.payload),
                    backup: state.notes.filter(note => note.id !== action.payload)
                }
            
            case types.notesSearch:
                const searchResult = state.notes.filter(note => {
                    const searchText = action.payload.toLowerCase()
                    const titleNote = note.title.toLowerCase()
                    const bodyNote = note.body.toLowerCase()
                    return titleNote.includes(searchText) || bodyNote.includes(searchText)
        
                })
               
                return {
                    ...state,
                    active: null,
                    
                    notes:  searchResult.length > 0 && action.payload !== '' ? searchResult : state.backup
                }
            
            case types.notesLogoutCleaning:
                return initialState

        default:
            return state
    }
}