import React from 'react';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar';
import { useSelector } from 'react-redux';
import { Search } from './Search';

export const JournalScreen = () => {
    const {active} = useSelector(state => state.notes)
    return (
        <div className='journal__main-content animate__animated animate__fadeIn animate__fast'>
            <Sidebar />
            <main>
                <Search />
                {
                    (active)
                    ? <NoteScreen />
                    : <NothingSelected />
                }
            </main>
        </div>
    )
}
