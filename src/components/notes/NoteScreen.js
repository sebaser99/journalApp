import {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';
import {useForm} from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';


export const NoteScreen = () => {
    const{active:note} = useSelector(state => state.notes)
    const [ formValue, handleChangeInput, reset] = useForm(note)
    const {title, body, url, id} = note
    const activeId = useRef(note.id)
    const dispatch = useDispatch()

    useEffect(()=> {
        if(note.id !== activeId.current){
            reset(note)
            activeId.current = note.id
        }
    }, [note, reset])

 
    useEffect(()=> {
      
        dispatch(activeNote(formValue.id, {
            ...formValue,
            url: note.url
        }))
    }, [formValue, dispatch])

    const handleDelete = ()=> {
        dispatch(startDeleting(id))
    }
    
    return (
        <div className='notes__main-content'>
            <NotesAppBar />

            <div className='notes__content'>
                <input type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input' 
                    autoComplete='off'
                    name='title'
                    value={title}
                    onChange={handleChangeInput}
                />
                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleChangeInput}
                    >
                </textarea>
                {
                    url && 
                    <div className='notes__image'>
                        <img src={url}
                        alt='universe'
                        />
                        
                    </div>

                }
                <button
                    onClick={handleDelete}
                    className='btn btn-danger'
                >Delete</button>
                

            </div>
        </div>
    )
}
