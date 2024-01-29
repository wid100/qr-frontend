import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
const WorkHistory = ({ inputField, setInputField }) => {
    // ================== Date Picker ===========
    const [startMonth, setStartMonth] = useState(null)
    const [startYear, setStartYear] = useState(null)
    const [endMonth, setEndMonth] = useState(null)
    const [endYear, setEndYear] = useState(null)
    const inputsHandler = e => {
        e.persist()
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <>
            <div className="form-group-wrapper mt-3">
                <div
                    className="form-group-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#information"
                    aria-expanded="true"
                    aria-controls="information">
                    <p>Work History</p>
                    <div className="bottom-arrow">
                        <img src="/img/icons/bottom-arrow.svg" alt="" />
                    </div>
                </div>

                <div
                    className="information-form collapse show"
                    id="information">
                    <p>
                        You can include any work experience, internships,
                        scholarships, relevant coursework and academic
                        achievements.
                    </p>
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-10">
                            <div className="row mt-4">
                                <div className="col-md-12 mt-3">
                                    <div className="info-form-label mb-2">
                                        <p>Job Title*:</p>
                                    </div>
                                    <input
                                        id="job_title"
                                        type="text"
                                        name="job_title"
                                        className="form-control"
                                        placeholder="Type your Job Title"
                                    />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <div className="info-form-label mb-2">
                                        <p>Employer*:</p>
                                    </div>
                                    <input
                                        id="employer_name"
                                        type="text"
                                        name="employer_name"
                                        className="form-control"
                                        placeholder="Employer name"
                                    />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <div className="info-form-label mb-2">
                                        <p>Location*:</p>
                                    </div>
                                    <input
                                        id="location_address"
                                        type="text"
                                        name="location_address"
                                        className="form-control"
                                        placeholder="Type your address"
                                    />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <div className="row d-flex align-items-end">
                                        <div className="col-md-6">
                                            <div className="info-form-label mb-2">
                                                <p>Start Date*:</p>
                                            </div>
                                            <DatePicker
                                                selected={startMonth}
                                                onChange={date =>
                                                    setStartMonth(date)
                                                }
                                                showMonthYearPicker
                                                dateFormat="MMMM"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <DatePicker
                                                selected={startYear}
                                                onChange={date =>
                                                    setStartYear(date)
                                                }
                                                showYearPicker
                                                dateFormat="yyyy"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="row d-flex align-items-end mt-3">
                                        <div className="col-md-6">
                                            <div className="info-form-label mb-2">
                                                <p>End Date*:</p>
                                            </div>
                                            <DatePicker
                                                selected={endMonth}
                                                onChange={date =>
                                                    setEndMonth(date)
                                                }
                                                showMonthYearPicker
                                                dateFormat="MMMM"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <DatePicker
                                                selected={endYear}
                                                onChange={date =>
                                                    setEndYear(date)
                                                }
                                                showYearPicker
                                                dateFormat="yyyy"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12 mt-3">
                                    <div className="info-form-label mb-2">
                                        <p>Job Description*:</p>
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            cols="30"
                                            rows="5"
                                            placeholder="Description in 250 characters."
                                            className="form-control"
                                            id="summary"
                                            name="summary"
                                            onChange={inputsHandler}
                                            value={inputField.summary}
                                            maxLength={250}></textarea>
                                        <div className="text-right">
                                            <small>
                                                {inputField.summary.length}
                                                /250 characters
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="job-checkbox d-flex align-items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="check-work"
                                        />
                                        <label htmlFor="check-work">
                                            I am currently working here.
                                        </label>
                                    </div>

                                    <div className="add-work-btn w-fit mt-3">
                                        <button className="custom-btn">
                                            Add Job
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WorkHistory