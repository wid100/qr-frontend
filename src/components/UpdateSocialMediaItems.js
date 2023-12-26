import React, { useState } from 'react'

const UpdateSocialMediaItems = ({
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
                                    placeholder={`${socialPlatform}`}
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
                                    {socialPlatform && (
                                        <InputError
                                            messages={errors[socialPlatform]}
                                            className="mt-2"
                                        />
                                    )}
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
                <div
                    className="form-group-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#social-media"
                    aria-expanded="false"
                    aria-controls="social-media">
                    <p>Social media</p>
                    <div className="bottom-arrow">
                        <img src="/img/icons/bottom-arrow.svg" alt="" />
                    </div>
                </div>

                <div className="color-plate collapse" id="social-media">
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
                                    <div
                                        className="social-icon-item"
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

export default UpdateSocialMediaItems

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
    {
        id: 5,
        name: 'Google Review',
        img: '/img/icons/google.svg',
    },
    {
        id: 6,
        name: 'Youtube',
        img: '/img/icons/youtube.svg',
    },
    {
        id: 7,
        name: 'Apple',
        img: '/img/icons/apple.svg',
    },
    {
        id: 8,
        name: 'snapchat',
        img: '/img/icons/snapchat.svg',
    },
    {
        id: 9,
        name: 'figma',
        img: '/img/icons/figma.svg',
    },
    {
        id: 10,
        name: 'Reddit',
        img: '/img/icons/reddit.svg',
    },
    {
        id: 11,
        name: 'Discord',
        img: '/img/icons/Discord.svg',
    },
    {
        id: 12,
        name: 'Tiktok',
        img: '/img/icons/Tiktok.svg',
    },
    {
        id: 13,
        name: 'Tumblr',
        img: '/img/icons/tumblr.svg',
    },
    {
        id: 14,
        name: 'Telegram',
        img: '/img/icons/telegram.svg',
    },
    {
        id: 15,
        name: 'Pinterest',
        img: '/img/icons/pinterest.svg',
    },
    {
        id: 13,
        name: 'Github',
        img: '/img/icons/githup.svg',
    },
    {
        id: 16,
        name: 'WhatsApp',
        img: '/img/icons/whatsapp.svg',
    },
    {
        id: 17,
        name: 'Messenger',
        img: '/img/icons/messenger.svg',
    },
    {
        id: 18,
        name: 'Spotify',
        img: '/img/icons/spotify.svg',
    },
]
