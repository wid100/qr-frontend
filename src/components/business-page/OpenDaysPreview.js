// import React from 'react'

// const OpenDaysPreview = () => {
//     // Create an array of objects representing opening hours for each day
//     const daysData = [
//         { day: 'Mon', startTime: '8:00 am', endTime: '8:00 pm' },
//         { day: 'Tue', startTime: '8:00 am', endTime: '8:00 pm' },
//         { day: 'Wed', startTime: '8:00 am', endTime: '8:00 pm' },
//         { day: 'Thu', startTime: '8:00 am', endTime: '8:00 pm' },
//         { day: 'Fri', startTime: '8:00 am', endTime: '8:00 pm' },
//         { day: 'Sat', startTime: '8:00 am', endTime: '8:00 pm' },
//         { day: 'Sun', startTime: '8:00 am', endTime: '8:00 pm' },
//         // Repeat for other days
//     ]
//     return (
//         <div className="opening-date-list mt-3">
//             {daysData.map((day, index) => (
//                 <div key={index} className="row">
//                     <div className="col-md-4">
//                         <h5>{day.day}</h5>
//                     </div>
//                     <div className="col-md-8">
//                         <div className="d-flex align-items-center gap-2">
//                             <span>{day.startTime}</span>
//                             <span>-</span>
//                             <span>{day.endTime}</span>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default OpenDaysPreview


import React from 'react';

const OpenDaysPreview = ({ schedule, daysOfWeek }) => {
    // Map through the daysOfWeek array and extract opening hours
 
    const daysData = daysOfWeek.map(day => ({
        day: day.substring(0, 3), // Abbreviate day names (e.g., 'Monday' becomes 'Mon')
        startTime: schedule[day].checked
            ? `${schedule[day].startTime}:00`
            : 'Closed',
        endTime: schedule[day].checked ? `${schedule[day].endTime}:00` : '',
    }))



    return (
        <div className="opening-date-list mt-3">
            {daysData.map((day, index) => (
                <div key={index} className="row">
                    <div className="col-md-4">
                        <h5>{day.day}</h5>
                    </div>
                    <div className="col-md-8">
                        <div className="d-flex align-items-center gap-2">
                            <span>{day.startTime}</span>
                            <span>{day.startTime !== 'Closed' && '-'}</span>
                            <span>{day.endTime}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OpenDaysPreview;
