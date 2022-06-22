import { shallow } from "enzyme";
import { types } from "../types/types";

describe('vamos a hacer pruebas en types', ()=> {
    test('debe devolver el mismo objeto', ()=> {
    expect(types).toEqual({
        login: '[Auth] Login',
        logout: '[Auth] Logout',
    
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
    
        uiStartLoading: '[UI] Start Loading',
        uiFinishLoading: '[UI] Finish Loading',
        
        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note ',
        notesLoad: '[Notes] Load notes',
        notesUpdated: '[Notes] Updated  note',
        notesFileUrl: '[Notes] Updated image url',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout cleaning',
        notesSearch: '[Notes] Search',
    })
    })
})