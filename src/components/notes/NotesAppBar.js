import moment from 'moment';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {
    const {active}= useSelector(state => state.notes)
    const dispatch = useDispatch()
    const date = active.date
    const noteDate = moment(date)

    const handleSave = () => {
        dispatch(startSaveNote(active))  
    }
    const handleUploadPicture = () => {
        document.querySelector('#chooseFile').click()
    }
    const handleChangeInput = (e)=> {
        const file = e.target.files[0]
        if(file){
            dispatch(startUploading(file))
           
        }
        else{
            console.log("el archivo no es válido")
        }
    }
    return (
        <div className='notes__appbar'>
            <span>{noteDate.format('dddd, Do MMMM YYYY')}</span>
            <input type='file' id='chooseFile'
                style={{display: 'none'}}
                onChange={handleChangeInput}
            />
            <div>
                <button className='btn'
                    onClick={handleUploadPicture}
                >Picture</button>
                <button className='btn'
                    onClick={handleSave}
                >Save</button>
            </div>            
        </div>
    )
}
