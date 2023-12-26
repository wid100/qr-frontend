import React, { useState } from 'react'

const FeedbackItem = ({ inputField, inputsHandler, errors }) => {
    // Use 'inputHandler' instead of 'inputAreaHandler' for consistency
    const inputAreaHandler = e => {
        const { name, value } = e.target
        inputHandler({
            ...inputField,
            [name]: value,
        })

        // Validate and set errors
        // Use 'errors' instead of 'errorsArea'
        errors.summary =
            value.length > 250 ? 'Description exceeds 250 characters.' : ''
    }

    return (
        <>
            <div className="form-group-wrapper mt-3">
                <div className="color-plate feedback-title">
                    <h4>We want your feedback.</h4>
                    <p>
                        How can we improve this Solution? What other features
                        would you like to have?
                    </p>
                    <div className="row mt-4">
                        <div className="col-md-2">
                            <div className="info-form-label">
                                <img src="/img/feedback.svg" alt="" />
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="mb-3">
                                <textarea
                                    cols="30"
                                    rows="5"
                                    placeholder="Description in 250 characters."
                                    className="form-control"
                                    id="summary"
                                    name="summary"
                                    onChange={inputsHandler} // Use 'inputAreaHandler' for textarea
                                    value={inputField.summary}
                                    maxLength={250} // Set maximum character length
                                ></textarea>
                                <div className="text-right">
                                    <small>
                                        {inputField.summary.length}/250
                                        characters
                                    </small>
                                </div>
                                {errors.summary && (
                                    <div className="text-danger">
                                        {errors.summary}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                 
                </div>
            </div>
        </>
    )
}

export default FeedbackItem
