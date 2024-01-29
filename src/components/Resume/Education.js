import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

const Education = ({ inputField }) => {
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
                    <p>Education</p>
                    <div className="bottom-arrow">
                        <img src="/img/icons/bottom-arrow.svg" alt="" />
                    </div>
                </div>

                <div
                    className="information-form collapse show"
                    id="information">
                    <p>What best describes your level of education?</p>
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-10">
                            <div className="row mt-4">
                                <div className="col-md-12 mt-3">
                                    <div className="info-form-label mb-2">
                                        <p>School/College/University*:</p>
                                    </div>
                                    <input
                                        id=""
                                        type="text"
                                        name=""
                                        className="form-control"
                                        placeholder="Name of the institution"
                                    />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <div className="info-form-label mb-2">
                                        <p>Degree*:</p>
                                    </div>
                                    <input
                                        id=""
                                        type="text"
                                        name=""
                                        className="form-control"
                                        placeholder="Name of the degree"
                                    />
                                </div>
                                <div className="col-md-12 mt-3">
                                    <div className="info-form-label mb-2">
                                        <p>Field of Study*:</p>
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
                                        <p>Grade*:</p>
                                    </div>
                                    <input
                                        id=""
                                        type="text"
                                        name=""
                                        className="form-control"
                                        placeholder="Type your Grade"
                                    />

                                    <button className="custom-btn mt-4">
                                        Add Job
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Education
