import { finishLoading, startLoading, uiRemoveError, uiSetError } from "../../actions/ui"
import { types } from "../../types/types"

describe('vamos a hacer pruebas en el ui action', ()=> {
    test('debe retornar los valores de todas las pruebas asíncronas', ()=> {

        const action = uiSetError('Help!!!...')
        expect(action).toEqual({
            type: types.uiSetError,
            payload: {
                msg: 'Help!!!...' 
            }
        })
        const remove = uiRemoveError()
        expect(remove).toEqual({
            type: types.uiRemoveError
        })
        const start = startLoading()
        expect(start).toEqual({
            type: types.uiStartLoading
        })
        const finish = finishLoading()
        expect(finish).toEqual({
            type: types.uiFinishLoading
        })
    })
})