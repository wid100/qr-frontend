import React, { useState } from 'react'

const OpenDays = ({
    daysOfWeek,
    handleTimeChange,
    hoursOfDay,
    handleCheckboxChangeDate,
    schedule,
}) => {
    // const daysOfWeek = [
    //     'Monday',
    //     'Tuesday',
    //     'Wednesday',
    //     'Thursday',
    //     'Friday',
    //     'Saturday',
    //     'Sunday',
    // ]
    // const hoursOfDay = Array.from({ length: 24 }, (_, i) => ({
    //     value: i,
    //     label: `${i}:00 ${i < 12 ? 'am' : 'pm'}`,
    // }))

    // const [schedule, setSchedule] = useState(
    //     daysOfWeek.reduce((acc, day) => {
    //         acc[day] = { startTime: 0, endTime: 0, checked: false }
    //         return acc
    //     }, {}),
    // )

    // const handleCheckboxChange = day => {
    //     setSchedule(prevSchedule => ({
    //         ...prevSchedule,
    //         [day]: {
    //             ...prevSchedule[day],
    //             checked: !prevSchedule[day].checked,
    //         },
    //     }))
    // }

    // const handleTimeChange = (day, field, value) => {
    //     setSchedule(prevSchedule => ({
    //         ...prevSchedule,
    //         [day]: {
    //             ...prevSchedule[day],
    //             [field]: value,
    //         },
    //     }))
    // }
    const allCheckboxesChecked = Object.values(schedule).every(
        day => day.checked,
    )
    return (
        <>
            <div className="form-group-wrapper mt-3">
                <div
                    className="form-group-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#openOffice"
                    aria-expanded="false"
                    aria-controls="openOffice">
                    <p>Opening Hours</p>
                    <div className="bottom-arrow">
                        <img src="/img/icons/bottom-arrow.svg" alt="" />
                    </div>
                </div>

                <div className="information-form collapse" id="openOffice">
                    <p>Provide your opening hours if applicable.</p>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            {daysOfWeek.map((day, index) => (
                                <div key={index} className="row mt-3">
                                    <div className="col-md-4">
                                        <div className="open-date-fluid d-flex align-items-center gap-2">
                                            <input
                                                type="checkbox"
                                                id={day.toLowerCase()}
                                                checked={schedule[day].checked}
                                                onChange={() =>
                                                    handleCheckboxChangeDate(
                                                        day,
                                                    )
                                                }
                                            />
                                            <label htmlFor={day.toLowerCase()}>
                                                {day}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <select
                                            className="form-selects w-100"
                                            aria-label="Default select example"
                                            value={schedule[day].startTime}
                                            onChange={e =>
                                                handleTimeChange(
                                                    day,
                                                    'startTime',
                                                    parseInt(e.target.value),
                                                )
                                            }
                                            disabled={schedule[day].checked} // Disable if checkbox is checked
                                        >
                                            {hoursOfDay.map(hour => (
                                                <option
                                                    key={hour.value}
                                                    value={hour.value}>
                                                    {hour.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <select
                                            className="form-selects w-100"
                                            aria-label="Default select example"
                                            value={schedule[day].endTime}
                                            onChange={e =>
                                                handleTimeChange(
                                                    day,
                                                    'endTime',
                                                    parseInt(e.target.value),
                                                )
                                            }
                                            disabled={schedule[day].checked} // Disable if checkbox is checked
                                        >
                                            {hoursOfDay.map(hour => (
                                                <option
                                                    key={hour.value}
                                                    value={hour.value}>
                                                    {hour.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OpenDays
