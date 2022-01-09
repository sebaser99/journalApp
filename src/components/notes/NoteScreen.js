import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input' 
                    autoComplete='off'
                />
                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'>
                </textarea>
                <div className='notes__image'>
                    <img src='https://img.vixdata.io/pd/jpg-large/es/sites/default/files/btg/universo-observable-en-una-imagen-3.png'
                    alt='image'
                    />
                    
                </div>
                

            </div>
        </div>
    )
}
