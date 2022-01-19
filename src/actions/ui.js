import { types } from "../types/types";

export const uiSetError = (message)=>({
    type: types.uiSetError,
    payload: {
        msg: message
    }
})

export const uiRemoveError = ()=>({
    type: types.uiRemoveError
    
})

export const startLoading = ()=>({
    type: types.uiStartLoading,
  
})
export const finishLoading = ()=>({
    type: types.uiFinishLoading,
   
})
