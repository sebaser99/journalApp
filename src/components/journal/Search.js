import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchingNotes } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";


export const Search = () => {
    const [formValue, handleChangeInput, reset] = useForm({search: ''})
    const {search} = formValue
    const dispatch = useDispatch()
    const {notes} = useSelector(state => state.notes)
    
    
    useEffect(() => {
        if(notes.length > 0){
            dispatch(searchingNotes(search))   
        }
        
    }, [formValue, dispatch]);
    
    
  return (
    <div className="search__container">

        <input type='text' placeholder="Search your note" name='search'
            onChange={handleChangeInput} value={search} className="search__box"
        />  
    </div>
  )
};
