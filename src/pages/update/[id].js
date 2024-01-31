import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useRef, useState } from 'react'
import QRCode from 'qrcode.react'
// import htmlToImage from 'html-to-image'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'
import Link from 'next/link'
import FeedbackItem from '@/components/FeedbackItem'
import { DataIcons } from '@/DataIcon/DataIcons'
import SmartCodeView from '@/components/Popup/SmartCodeView'
import SmartCodeViewUpdate from '@/components/Popup/SmartCodeViewUpdate'
const UpdateQrPage = ({ qrData }) => {
      const [previewActive, setPreviewActive] = useState(1)
    const handlePreview = index => {
        setPreviewActive(index)
    }
    // Social Media Item
    const [selectedSocialPlatforms, setSelectedSocialPlatforms] = useState([])
    const [previewIcons, setPreviewIcons] = useState([])
    const addInputField = socialPlatform => {
        if (!selectedSocialPlatforms.includes(socialPlatform)) {
            setSelectedSocialPlatforms(prevPlatforms => [
                ...prevPlatforms,
                socialPlatform,
            ])
            setPreviewIcons(prevIcons => [...prevIcons, socialPlatform])
        }
    }

    const removeInputField = socialPlatform => {
        setSelectedSocialPlatforms(prevPlatforms =>
            prevPlatforms.filter(platform => platform !== socialPlatform),
        )
        setPreviewIcons(prevIcons =>
            prevIcons.filter(icon => icon !== socialPlatform),
        )
    }

    const renderPreviewIcons = () => {
        return previewIcons.map((socialPlatform, index) => (
            <div key={index} className="preview-icon-item">
                <img
                    src={
                        DataIcons.find(
                            item => item.name.toLowerCase() === socialPlatform,
                        )?.img
                    }
                    alt={socialPlatform}
                />
            </div>
        ))
    }

    const renderInputFields = () => {
        return selectedSocialPlatforms.map((socialPlatform, index) => (
            <div key={index} className="row d-flex align-items-center mb-2">
                <div className="col-md-3">
                    {/* Render label and icon based on selected social platform */}
                    {DataIcons.map(item =>
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
                                    // onChange={e =>
                                    //     inputsHandler(
                                    //         `${socialPlatform}-${index}`,
                                    //         e.target.value,
                                    //     )
                                    // }
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



    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
    const [loading, setLoading] = useState(false)

    const { user } = useAuth({ middleware: 'auth' })
    const [selectedValue, setSelectedValue] = useState(qrData.cardtype)

    // Function to handle select box changes
    const handleSelectChange = event => {
        setSelectedValue(event.target.value)
    }

    const [isChecked, setIsChecked] = useState(qrData.checkgradient)

    // ==================radio button color change ===============
    const [selectedColor, setSelectedColor] = useState(qrData.maincolor)

    const [buttonColor, setButtoncolor] = useState(qrData.buttoncolor)

    const [secondaryColorScheme, setSecondarycolorscheme] = useState(
        qrData.gradientcolor,
    )

    const divStyle = {
        background: isChecked
            ? `linear-gradient(133deg, ${selectedColor} 0%, ${secondaryColorScheme} 97.22%)`
            : `${selectedColor}`,
    }
    // =====================end================

    const [errors, setErrors] = useState([])
    const [inputField, setInputField] = useState({
        cardName: qrData.cardname,
        firstName: qrData.firstname,
        lastName: qrData.lastname,
        email1: qrData.email1,
        email2: qrData.email2,
        phone1: qrData.phone1,
        phone2: qrData.phone2,
        mobile1: qrData.mobile1,
        mobile2: qrData.mobile2,
        mobile3: qrData.mobile3,
        mobile4: qrData.mobile4,
        fax: qrData.fax,
        fax2: qrData.fax2,
        address1: qrData.address1,
        address2: qrData.address2,
        webaddress1: qrData.webaddress1,
        webaddress2: qrData.webaddress2,
        companyName: qrData.companyname,
        jobTitle: qrData.jobtitle,
        mainColor: selectedColor,
        gradientColor: secondaryColorScheme,
        buttonColor: buttonColor,
        checkgradient: isChecked,
        summary: qrData.summary,
        slug: qrData.slug,
        cardtype: selectedValue,
        status: 'active',

        // ==================sociel link================
        facebook: qrData.facebook,
        twitter: qrData.twitter,
        instagram: qrData.instagram,
        youtube: qrData.youtube,
        github: qrData.github,
        setErrors,
    })

    const inputsHandler = e => {
        e.persist()
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    const handleColorChange = event => {
        setSelectedColor(event.target.value)
    }

    const [picture, setPicture] = useState({
        image: '',
        imageUrl: qrData.image ? `${baseuri}/${qrData.image}` : null,
    })

    const [welcome, setWelcome] = useState({
        image: '',
        imageUrl: qrData.welcome ? `${baseuri}/${qrData.welcome}` : null,
    })

    const handleImage = e => {
        const selectedImage = e.target.files[0]

        setPicture(prevState => ({
            ...prevState,
            image: selectedImage,
            imageUrl: URL.createObjectURL(selectedImage),
        }))
    }

    const handleWelcome = e => {
        const selectedImage = e.target.files[0]

        setWelcome(prevState => ({
            ...prevState,
            image: selectedImage,
            imageUrl: URL.createObjectURL(selectedImage),
        }))
    }

    // =========================

    const allInfoSubmit = e => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('cardname', inputField.cardName ?? '')
        formData.append('firstname', inputField.firstName ?? '')
        formData.append('lastname', inputField.lastName ?? '')
        formData.append('email1', inputField.email1 ?? '')
        formData.append('email2', inputField.email2 ?? '')
        formData.append('phone1', inputField.phone1 ?? '')
        formData.append('phone2', inputField.phone2 ?? '')
        formData.append('mobile1', inputField.mobile1 ?? '')
        formData.append('mobile2', inputField.mobile2 ?? '')
        formData.append('mobile3', inputField.mobile3 ?? '')
        formData.append('mobile4', inputField.mobile4 ?? '')
        formData.append('fax', inputField.fax ?? '')
        formData.append('fax2', inputField.fax2 ?? '')
        formData.append('address1', inputField.address1 ?? '')
        formData.append('address2', inputField.address2 ?? '')
        formData.append('maincolor', selectedColor)
        formData.append('gradientcolor', secondaryColorScheme)
        formData.append('buttoncolor', inputField.buttonColor)
        formData.append('webaddress1', inputField.webaddress1 ?? '')
        formData.append('webaddress2', inputField.webaddress2 ?? '')
        formData.append('companyname', inputField.companyName ?? '')
        formData.append('jobtitle', inputField.jobTitle ?? '')
        formData.append('checkgradient', inputField.checkgradient ?? '')
        formData.append('summary', inputField.summary ?? '')
        formData.append('cardtype', selectedValue)
        formData.append('facebook', inputField.facebook ?? '')
        formData.append('twitter', inputField.twitter ?? '')
        formData.append('instagram', inputField.instagram ?? '')
        formData.append('youtube', inputField.youtube ?? '')
        formData.append('github', inputField.github ?? '')
        formData.append('image', picture.image)
        formData.append('welcomeimage', welcome.image)
        formData.append('status', inputField.status)
        formData.append('user_id', user?.id)

        axios
            .post(`${baseuri}/api/updateqr/${qrData.id}`, formData)

            .then(res => {
                if (res.data.status === 200) {
                    setLoading(false)
                    alert('Form submit successfully')
                    window.location.href = '/dashboard'
                } else if (res.data.status === 422 && res.data.errors) {
                    setLoading(false)
                    const errorMessages = Object.values(res.data.errors).flat()
                    alert('Validation Error:\n' + errorMessages.join('\n'))
                } else {
                    setLoading(false)
                    alert('An error occurred. Please try again.')
                }
            })
            .catch(error => {
                setLoading(false)
                console.error('An error occurred:', error)
                alert('An error occurred. Please try again.')
            })
    }

    // ==============print function================
    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    // Description Caracter
    const [inputArea, setInputArea] = useState({ summary: '' })
    const [errorsArea, setErrorsArea] = useState({})

    const inputAreaHandler = e => {
        const { name, value } = e.target
        setInputArea(prev => ({
            ...prev,
            [name]: value,
        }))

        // Validate and set errors
        setErrorsArea(prev => ({
            ...prev,
            summary:
                value.length > 250 ? 'Description exceeds 250 characters.' : '',
        }))
    }

    return (
        <AppLayout>
            <Head>
                <title>Update Your Smart Card</title>
            </Head>

            <section>
                <div className="account-details">
                    <form onSubmit={allInfoSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="mb-3">
                                        <input
                                            id="cardName"
                                            type="text"
                                            name="cardName"
                                            className="form-control p-4"
                                            onChange={inputsHandler}
                                            value={inputField.cardName}
                                            autoFocus
                                            required
                                            placeholder="Name your Smart Card"
                                        />
                                        <InputError
                                            messages={errors.cardName}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="form-group-wrapper">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#colorPicker"
                                            aria-expanded="true"
                                            aria-controls="colorPicker">
                                            <p>
                                                Design and customize your Smart
                                                Card
                                            </p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="color-plate collapse show"
                                            id="colorPicker">
                                            <p>
                                                Personalize your Smart Card by
                                                selecting colors.
                                            </p>
                                            <div className="color-point">
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        value="#FF0000"
                                                        checked={
                                                            selectedColor ===
                                                            '#FF0000'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />

                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="../img/color/1.png" />
                                                        </div>
                                                        <img
                                                            src="../img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#fb3d97"
                                                        checked={
                                                            selectedColor ===
                                                            '#fb3d97'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="../img/color/2.png" />
                                                        </div>
                                                        <img
                                                            src="../img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#851DD7"
                                                        checked={
                                                            selectedColor ===
                                                            '#851DD7'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="../img/color/3.png" />
                                                        </div>
                                                        <img
                                                            src="../img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#1023CA"
                                                        checked={
                                                            selectedColor ===
                                                            '#1023CA'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="../img/color/4.png" />
                                                        </div>
                                                        <img
                                                            src="../img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#FFB317"
                                                        checked={
                                                            selectedColor ===
                                                            '#FFB317'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="../img/color/5.png" />
                                                        </div>
                                                        <img
                                                            src="../img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#00D5D2"
                                                        checked={
                                                            selectedColor ===
                                                            '#00D5D2'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="../img/color/6.png" />
                                                        </div>
                                                        <img
                                                            src="../img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#21CD12"
                                                        checked={
                                                            selectedColor ===
                                                            '#21CD12'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="../img/color/7.png" />
                                                        </div>
                                                        <img
                                                            src="../img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                                <label className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name="radio"
                                                        value="#000000"
                                                        checked={
                                                            selectedColor ===
                                                            '#000000'
                                                        }
                                                        onChange={
                                                            handleColorChange
                                                        }
                                                    />
                                                    <span className="radio-btn">
                                                        <div className="hobbies-icon">
                                                            <img src="../img/color/8.png" />
                                                        </div>
                                                        <img
                                                            src="../img/icon/mark.svg"
                                                            className="mark-icon"
                                                            alt=""
                                                        />
                                                    </span>
                                                </label>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label
                                                        htmlFor="Primarycolor"
                                                        className="form-label color-pic-label">
                                                        Primary color
                                                    </label>
                                                    <div className="pic-with-color">
                                                        <p>{selectedColor}</p>
                                                        <input
                                                            type="color"
                                                            className=" form-control-color"
                                                            name="primaryColor"
                                                            value={
                                                                selectedColor
                                                            }
                                                            onChange={
                                                                handleColorChange
                                                            }
                                                            id="Primarycolor"
                                                            title="Choose your color"></input>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <label
                                                        htmlFor="Primarycolor"
                                                        className="form-label color-pic-label">
                                                        Button color
                                                    </label>
                                                    <div className="pic-with-color">
                                                        <p>{buttonColor}</p>
                                                        <input
                                                            type="color"
                                                            className=" form-control-color"
                                                            id="Primarycolor"
                                                            value={buttonColor}
                                                            onChange={e => {
                                                                setButtoncolor(
                                                                    e.target
                                                                        .value,
                                                                )
                                                                inputsHandler(e)
                                                            }}
                                                            title="Choose your color"></input>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="parmision-checkbox">
                                                        <div className="form-check ">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                id="flexCheckDefault"
                                                                checked={
                                                                    isChecked
                                                                }
                                                                onChange={
                                                                    handleCheckboxChange
                                                                }
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="flexCheckDefault">
                                                                Use color
                                                                gradient
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <label
                                                        htmlFor="primarycolor"
                                                        className="form-label color-pic-label">
                                                        Gradient color
                                                    </label>
                                                    <div className="pic-with-color">
                                                        <p>
                                                            {
                                                                secondaryColorScheme
                                                            }
                                                        </p>
                                                        <input
                                                            type="color"
                                                            className=" form-control-color"
                                                            id="primarycolor"
                                                            value={
                                                                secondaryColorScheme
                                                            }
                                                            onChange={e => {
                                                                setSecondarycolorscheme(
                                                                    e.target
                                                                        .value,
                                                                )
                                                                inputsHandler(e)
                                                            }}
                                                            title="Choose your color"></input>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="upload-image-wrapper">
                                                <div className="row ">
                                                    <div className="col-md-4">
                                                        <div className="image-up-label">
                                                            <p>
                                                                Upload your
                                                                image (400*400).
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-5">
                                                        <div className="upload-image">
                                                            <div className="view-image">
                                                                <img
                                                                    src={
                                                                        picture.imageUrl
                                                                    }
                                                                    width={200}
                                                                />
                                                            </div>
                                                            <div className="upload-input">
                                                                <div className="file-btn custom-btn">
                                                                    Upload
                                                                    <input
                                                                        type="file"
                                                                        name="image"
                                                                        onChange={
                                                                            handleImage
                                                                        }
                                                                        className="file-input"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#information"
                                            aria-expanded="true"
                                            aria-controls="information">
                                            <p>Your information</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="information-form collapse show"
                                            id="information">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Name:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="firstName"
                                                                    type="text"
                                                                    name="firstName"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.firstName
                                                                    }
                                                                    required
                                                                    placeholder="First name"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.firstName
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="lastName"
                                                                    type="text"
                                                                    name="lastName"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.lastName
                                                                    }
                                                                    required
                                                                    placeholder="Last name"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.lastName
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Numbers:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="mobile1"
                                                                    type="text"
                                                                    name="mobile1"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.mobile1
                                                                    }
                                                                    required
                                                                    placeholder="Mobile number 01"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.mobile1
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="phone1"
                                                                    type="text"
                                                                    name="phone1"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.phone1
                                                                    }
                                                                    required
                                                                    placeholder="Phone"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.phone1
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="fax"
                                                                    type="text"
                                                                    name="fax"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.fax
                                                                    }
                                                                    placeholder="Fax"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.fax
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Email:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="email1"
                                                                    type="email"
                                                                    name="email1"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.email1
                                                                    }
                                                                    required
                                                                    placeholder="Email address"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.email1
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="company-info-form">
                                                <div className="row">
                                                    <div className="col-md-2">
                                                        <div className="info-form-label">
                                                            <p>Company:</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-10">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Company name"
                                                                        id="companyName"
                                                                        name="companyName"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        required
                                                                        value={
                                                                            inputField.companyName
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.companyName
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Job title"
                                                                        id="jobTitle"
                                                                        name="jobTitle"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        required
                                                                        value={
                                                                            inputField.jobTitle
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.jobTitle
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Address:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Address"
                                                            id="address2"
                                                            name="address2"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.address2
                                                            }
                                                        />
                                                        <InputError
                                                            messages={
                                                                errors.address2
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Website:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter web address"
                                                            id="webaddress2"
                                                            name="webaddress2"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.webaddress2
                                                            }
                                                        />
                                                        <InputError
                                                            messages={
                                                                errors.webaddress2
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Summary:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <textarea
                                                            cols="30"
                                                            rows="5"
                                                            placeholder="summary"
                                                            className="form-control"
                                                            id="summary"
                                                            name="summary"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            required
                                                            maxLength={250}
                                                            value={
                                                                inputField.summary
                                                            }></textarea>
                                                        <div className="text-right">
                                                            <small>
                                                                {
                                                                    inputField
                                                                        .summary
                                                                        .length
                                                                }
                                                                /250 characters
                                                            </small>
                                                        </div>
                                                        <InputError
                                                            messages={
                                                                errors.summary
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <textarea
                                                            cols="30"
                                                            rows="5"
                                                            placeholder="Description in 250 characters."
                                                            className="form-control"
                                                            id="summary"
                                                            name="summary"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.summary
                                                            }
                                                            maxLength={250} // Set maximum character length
                                                        ></textarea>

                                                        {errors.summary && (
                                                            <div className="text-danger">
                                                                {errors.summary}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ========== Social Media Item ============ */}
                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#social-media"
                                            aria-expanded="false"
                                            aria-controls="social-media">
                                            <p>Social media</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="color-plate collapse"
                                            id="social-media">
                                            <p className="mb-3">
                                                Click on the icon to add social
                                                media channel:
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
                                                        {DataIcons.map(item => (
                                                            <div
                                                                className="social-icon-item"
                                                                key={item.id}
                                                                onClick={() =>
                                                                    addInputField(
                                                                        item.name.toLowerCase(),
                                                                    )
                                                                }>
                                                                <img
                                                                    src={
                                                                        item.img
                                                                    }
                                                                    alt=""
                                                                />
                                                                <span>
                                                                    {item.name}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#welScreen"
                                            aria-expanded="true"
                                            aria-controls="welScreen">
                                            <p>Welcome screen</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="color-plate collapse show"
                                            id="welScreen">
                                            <p className="mb-3">
                                                Display your logo while your
                                                page is loading:
                                            </p>

                                            <div className="row d-flex justify-content-center">
                                                <div className="col-md-5">
                                                    <div className="upload-image">
                                                        <div className="view-image">
                                                            <img
                                                                src={
                                                                    welcome.imageUrl
                                                                }
                                                            />
                                                        </div>
                                                        <div className="upload-input">
                                                            <div className="file-btn custom-btn">
                                                                Upload
                                                                <input
                                                                    type="file"
                                                                    className="file-input"
                                                                    id="welcome"
                                                                    name="welcome"
                                                                    onChange={
                                                                        handleWelcome
                                                                    }
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.welcome
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#shareItem"
                                            aria-expanded="false"
                                            aria-controls="shareItem">
                                            <p>Advance Options</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="color-plate collapse"
                                            id="shareItem">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Sharing:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="share-check-item d-flex align-items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id="check"
                                                        />
                                                        <label htmlFor="check">
                                                            Add a share button
                                                            to the page.
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Status:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="share-check-item">
                                                        <input
                                                            type="checkbox"
                                                            class="checkbox"
                                                            id="checkbox"
                                                        />
                                                        <label
                                                            for="checkbox"
                                                            class="checkbox-label">
                                                            <i class="fas fa-moon"></i>
                                                            <i class="fas fa-sun"></i>
                                                            <span class="ball"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <FeedbackItem
                                        inputField={inputField}
                                        errors={errors}
                                        inputsHandler={inputsHandler}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <div className="preview">
                                        <div className="preview-btn-con">
                                            <div
                                                className={
                                                    previewActive === 1
                                                        ? 'preview-bar active'
                                                        : 'preview-bar'
                                                }
                                                onClick={() => {
                                                    handlePreview(1)
                                                }}>
                                                <p>Preview</p>
                                            </div>
                                            <div
                                                className={
                                                    previewActive === 2
                                                        ? 'preview-bar active'
                                                        : 'preview-bar'
                                                }
                                                onClick={() => {
                                                    handlePreview(2)
                                                }}>
                                                <p>Smart Code</p>
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                previewActive === 1
                                                    ? 'show-preview-right active'
                                                    : 'show-preview-right'
                                            }>
                                            <div
                                                className="my-preview-top-header"
                                                style={divStyle}>
                                                <div className="preview-image">
                                                    <img
                                                        src={picture.imageUrl}
                                                        alt=""
                                                    />
                                                </div>
                                                <h3 className="name">
                                                    {inputField.firstName}{' '}
                                                    {inputField.lastName}
                                                </h3>
                                                <p className="dajignation">
                                                    {inputField.jobTitle}
                                                </p>

                                                <ul className="social-aciton-right">
                                                    <li>
                                                        <a
                                                            href={`tel:${inputField.phone1}`}>
                                                            <img
                                                                src="../img/icon/call.svg"
                                                                alt=""
                                                            />
                                                            <p>Call</p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href={`mailto:${inputField.email1}`}>
                                                            <img
                                                                src="../img/icon/telegram2.svg"
                                                                alt=""
                                                            />
                                                            <p>Email</p>
                                                        </a>
                                                    </li>
                                                    {/* <li>
                                                        <a
                                                            href={`location:${inputField.address1}`}>
                                                            <img
                                                                src="../img/icon/location.svg"
                                                                alt=""
                                                            />
                                                            <p>Location</p>
                                                        </a>
                                                    </li> */}
                                                </ul>
                                            </div>

                                            {/* <div
                                                className="margin:auto"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <div
                                                    ref={componentRef}
                                                    style={{
                                                        position: 'relative',
                                                        width: '250px',
                                                        height: '250px',
                                                    }}>
                                                    <div className="qr-image-wrapper">
                                                        <QRCode
                                                            value={`https://smartcardgenerator.net/${qrData.slug}`}
                                                            size={250}
                                                        />
                                                        <img
                                                            src={
                                                                welcome.imageUrl
                                                            }
                                                            width={100}
                                                            height={100}
                                                            style={{
                                                                position:
                                                                    'absolute',
                                                                top: '50%',
                                                                left: '50%',
                                                                transform:
                                                                    'translate(-50%, -50%)',
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="qr-download mt-3">
                                                <a
                                                    className="custom-btn"
                                                    onClick={handlePrint}>
                                                    Download QR Code
                                                </a>
                                            </div> */}
                                            <div className="card-list-right">
                                                <ul>
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon"></div>
                                                        <p>
                                                            {inputField.summary}
                                                        </p>
                                                    </li>
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="../img/icon/phone.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Mobile</p>

                                                            <a
                                                                href={`tel:${inputField.mobile1}`}>
                                                                {
                                                                    inputField.mobile1
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="card-list-li">
                                                        {' '}
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="../img/icon/email.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Email</p>
                                                            <a
                                                                href={`mailto:${inputField.email1}`}>
                                                                {
                                                                    inputField.email1
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="../img/icon/toffee.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Company Name</p>
                                                            <a
                                                                href={
                                                                    inputField.webaddress2
                                                                }>
                                                                {
                                                                    inputField.companyName
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="../img/icon/web.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Web address</p>
                                                            <a
                                                                href={
                                                                    inputField.webaddress2
                                                                }>
                                                                {
                                                                    inputField.webaddress2
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                    <li className="card-list-li card-list-social">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="img/icon/share.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show border-none">
                                                            <div className="preview-section">
                                                                <h2>
                                                                    Social Media
                                                                </h2>
                                                            </div>
                                                            <div className="social-media-list-items">
                                                                {renderPreviewIcons()}
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                previewActive === 2
                                                    ? 'show-preview-right active'
                                                    : 'show-preview-right'
                                            }>
                                            <SmartCodeViewUpdate
                                                componentRef={componentRef}
                                                uniqueSlug={qrData.slug}
                                                welcome={welcome}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="submit-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="submit-back">
                                            <Link href={'/dashboard'}>
                                                <a className="back">Back</a>
                                            </Link>
                                            {loading ? (
                                                <div className="submit-details-form">
                                                    Loading...
                                                </div>
                                            ) : (
                                                <button
                                                    className="submit-details-form"
                                                    type="submit">
                                                    Submit
                                                </button>
                                            )}
                                            {/* <button
                                                className="submit-details-form"
                                                type="submit">
                                                Submit
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </AppLayout>
    )
}

export async function getServerSideProps(context) {
    const { params } = context
    const { id } = params
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
    const response = await fetch(`${baseuri}/api/editqr/${id}`)

    const qrData = await response.json()
    console.log(qrData)
    return {
        props: {
            qrData: qrData.qrgen,
        },
    }
}

export default UpdateQrPage


