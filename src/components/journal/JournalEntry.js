import React from 'react'

export const JournalEntry = () => {
    return (
        <div className='journal__entry pointer'>
            <div className='journal__entry-picture'
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/12/14/02/29/landscape-3874123_960_720.jpg)'

                }}
            ></div>
            
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                Un nuevo día
                </p>
                <p className='journal__entry-content'>
                    Ipsum labore magna duis ipsum laborum ipsum ex voluptate.
                </p>
            </div>
            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>28</h4>
            </div>

            
        </div>
    )
}
