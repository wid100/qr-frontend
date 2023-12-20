import { useState } from 'react'

const SocialMediaItem = ({ inputField, InputError, errors, inputsHandler }) => {
const [facebookFields, setFacebookFields] = useState([''])
const [linkedinFields, setLinkedinFields] = useState([''])

const addInputField = type => {
    if (type === 'facebook') {
        setFacebookFields([...facebookFields, ''])
    } else if (type === 'linkedin') {
        setLinkedinFields([...linkedinFields, ''])
    }
}

const deleteInputField = (type, index) => {
    if (type === 'facebook') {
        const newFacebookFields = [...facebookFields]
        newFacebookFields.splice(index, 1)
        setFacebookFields(newFacebookFields)
    } else if (type === 'linkedin') {
        const newLinkedinFields = [...linkedinFields]
        newLinkedinFields.splice(index, 1)
        setLinkedinFields(newLinkedinFields)
    }
}

const handleInputChange = (type, index, value) => {
    if (type === 'facebook') {
        const newFacebookFields = [...facebookFields]
        newFacebookFields[index] = value
        setFacebookFields(newFacebookFields)
    } else if (type === 'linkedin') {
        const newLinkedinFields = [...linkedinFields]
        newLinkedinFields[index] = value
        setLinkedinFields(newLinkedinFields)
    }
}
    return (
        <>
            <div className="form-group-wrapper mt-3">
                <div className="form-group-title">
                    <p>Social media</p>
                </div>

                <div className="color-plate">
                    <p className="mb-3">
                        Click on the icon to add social media channel:
                    </p>

                    {/* <div className="social-list-item">
                        {facebookFields.map((value, index) => (
                            <div
                                key={index}
                                className="row d-flex align-items-center mb-2">
                                <div className="col-md-3">
                                    <div className="info-form-label">
                                        <p>Facebook:</p>
                                        <span>
                                            {' '}
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_46_436)">
                                                    <path
                                                        d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 23.9859 5.85094 30.6053 13.5 31.8056V20.625H9.4375V16H13.5V12.475C13.5 8.465 15.8888 6.25 19.5434 6.25C21.2934 6.25 23.125 6.5625 23.125 6.5625V10.5H21.1075C19.12 10.5 18.5 11.7334 18.5 13V16H22.9375L22.2281 20.625H18.5V31.8056C26.1491 30.6053 32 23.9859 32 16Z"
                                                        fill="#898989"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_46_436">
                                                        <rect
                                                            width="32"
                                                            height="32"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="social-media-field">
                                        <div className="social-input-fields">
                                            <div className="icon-send">
                                                <span>@*</span>
                                            </div>
                                            <div className="social-item">
                                                <input
                                                    type="text"
                                                    placeholder="Facebook"
                                                    id={`facebook-${index}`}
                                                    name={`facebook-${index}`}
                                                    onChange={e =>
                                                        handleInputChange(
                                                            'facebook',
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={
                                                        facebookFields[index]
                                                    }
                                                />
                                                <span>
                                                    <InputError
                                                        messages={
                                                            errors.facebook
                                                        }
                                                        className="mt-2"
                                                    />
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                deleteInputField(
                                                    'facebook',
                                                    index,
                                                )
                                            }>
                                            <span>&#10006;</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}

                    <div className="social-list-item">
                        {linkedinFields.map((value, index) => (
                            <div
                                key={index}
                                className="row d-flex align-items-center mb-2">
                                <div className="col-md-3">
                                    <div className="info-form-label">
                                        <p>Linkedin:</p>
                                        <span>
                                            <svg
                                                width="32"
                                                height="32"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_46_436)">
                                                    <path
                                                        d="M32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 23.9859 5.85094 30.6053 13.5 31.8056V20.625H9.4375V16H13.5V12.475C13.5 8.465 15.8888 6.25 19.5434 6.25C21.2934 6.25 23.125 6.5625 23.125 6.5625V10.5H21.1075C19.12 10.5 18.5 11.7334 18.5 13V16H22.9375L22.2281 20.625H18.5V31.8056C26.1491 30.6053 32 23.9859 32 16Z"
                                                        fill="#898989"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_46_436">
                                                        <rect
                                                            width="32"
                                                            height="32"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="social-media-field">
                                        <div className="social-input-fields">
                                            <div className="icon-send">
                                                <span>@*</span>
                                            </div>
                                            <div className="social-item">
                                                <input
                                                    type="text"
                                                    placeholder="Facebook"
                                                    id={`facebook-${index}`}
                                                    name={`facebook-${index}`}
                                                    onChange={e =>
                                                        handleInputChange(
                                                            'facebook',
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={
                                                        facebookFields[index]
                                                    }
                                                />
                                                <span>
                                                    <InputError
                                                        messages={
                                                            errors.facebook
                                                        }
                                                        className="mt-2"
                                                    />
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                deleteInputField(
                                                    'linkedin',
                                                    index,
                                                )
                                            }>
                                            <span>&#10006;</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-3">
                            <div className="info-form-label">
                                <p>Add more:</p>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="social-all-item">
                                <button
                                    onClick={() => addInputField('facebook')}>
                                    <img src="/img/icon/facebook.svg" alt="" />
                                    <span>Facebook</span>
                                </button>
                                <button
                                    onClick={() => addInputField(Instagram)}>
                                    <img src="/img/icon/facebook.svg" alt="" />
                                    <span>Instagram</span>
                                </button>
                                <button onClick={() => addInputField(twiter)}>
                                    <img src="/img/icon/facebook.svg" alt="" />
                                    <span>twiter</span>
                                </button>

                                <button
                                    onClick={() => addInputField('linkedin')}>
                                    <img src="/img/icon/facebook.svg" alt="" />
                                    <span>LinkedIn</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SocialMediaItem
