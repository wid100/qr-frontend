import React, { useState } from 'react'

const SocialMediaItems = ({
    inputField,
    InputError,
    errors,
    inputsHandler,
}) => {
    const [selectedSocialPlatforms, setSelectedSocialPlatforms] = useState([])

    const addInputField = socialPlatform => {
        // Check if the social platform is not already selected
        if (!selectedSocialPlatforms.includes(socialPlatform)) {
            setSelectedSocialPlatforms(prevPlatforms => [
                ...prevPlatforms,
                socialPlatform,
            ])
        }
    }

    const removeInputField = socialPlatform => {
        // Remove the selected social platform
        setSelectedSocialPlatforms(prevPlatforms =>
            prevPlatforms.filter(platform => platform !== socialPlatform),
        )
    }

    const renderInputFields = () => {
        return selectedSocialPlatforms.map((socialPlatform, index) => (
            <div key={index} className="row d-flex align-items-center mb-2">
                <div className="col-md-3">
                    {/* Render label and icon based on selected social platform */}
                    {dataIcon.map(item =>
                        item.name.toLowerCase() === socialPlatform ? (
                            <div className="info-form-label" key={item.id}>
                                <p>{item.name}</p>
                                <span>
                                    <img src={item.img} alt={item.name} />
                                </span>
                            </div>
                        ) : null,
                    )}
                </div>
                <div className="col-md-9">
                    {/* Your existing code for social media fields and input */}
                    <div className="social-media-field">
                        <div className="social-input-fields">
                            <div className="icon-send">
                                <span>URL</span>
                                <span>*</span>
                            </div>
                            <div className="social-item">
                                <input
                                    type="text"
                                    placeholder={socialPlatform}
                                    id={`${socialPlatform}-${index}`}
                                    name={`${socialPlatform}-${index}`}
                                    onChange={e =>
                                        inputsHandler(
                                            `${socialPlatform}-${index}`,
                                            e.target.value,
                                        )
                                    }
                                />
                                <span>
                                    <InputError
                                        messages={errors[socialPlatform]}
                                        className="mt-2"
                                    />
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => removeInputField(socialPlatform)}>
                            <span>&#10006;</span>
                        </button>
                    </div>
                </div>
            </div>
        ))
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

                    <div className="social-list-item">
                        {renderInputFields()}
                    </div>

                    <div className="row mt-4 mb-4">
                        <div className="col-md-3">
                            <div className="info-form-label">
                                <p>Add more:</p>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="social-all-item">
                                {dataIcon.map(item => (
                                    <div className='social-icon-item'
                                        key={item.id}
                                        onClick={() =>
                                            addInputField(
                                                item.name.toLowerCase(),
                                            )
                                        }>
                                        <img src={item.img} alt="" />
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SocialMediaItems

const dataIcon = [
    {
        id: 1,
        name: 'Facebook',
        img: '/img/icons/facebook.svg',
    },
    {
        id: 2,
        name: 'Behance',
        img: '/img/icons/behance.svg',
    },
    {
        id: 3,
        name: 'Instagram',
        img: '/img/icons/instagram.svg',
    },
    {
        id: 4,
        name: 'LinkedIn',
        img: '/img/icons/linkedin.svg',
    },
]
