import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
    const dispatch = useDispatch()
    const date = new Date();
    const noteDate = moment(date)
    const {name} = useSelector(state => state.auth)
    const handleLogout = ()=> {
        dispatch(startLogout())
    }
    const handleNewEntry = ()=>{
        dispatch(startNewNote())
    } 
    return (
    
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar'>
                <h3 className='mt-5'>
                    <p style={{ marginBottom: '5px', fontSize: '15px', textTransform: 'uppercase' }}> {name}</p>
                    <i className='far fa-moon'> </i><small style={{marginLeft: '8px', display:'inline-block',  fontSize: '13px'}}>Today: {noteDate.format('Do MMMM YYYY')}</small>
                </h3>
                <button className='btn'
                        onClick={handleLogout}
                    >Logout</button>

            </div>
            <div className='journal__new-entry'
                onClick = {handleNewEntry}
            >
                <i className='far fa-calendar-plus fa-5x'></i>
                <p className='mt-5'>New Entry</p>
            </div>
        
            <JournalEntries   />

        </aside>
        
    )
}
