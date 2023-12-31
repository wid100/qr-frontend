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
import SocialMediaItem from '@/components/SocialMediaItem'
function CreateQR() {
    const { user } = useAuth({ middleware: 'auth' })
    const [loading, setLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')

    // Function to handle select box changes
    const handleSelectChange = event => {
        setSelectedValue(event.target.value)
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }
    // ==================radio button color change ===============
    const [selectedColor, setSelectedColor] = useState('#FF0000')

    const [buttonColor, setButtoncolor] = useState('#555555')

    const [secondaryColorScheme, setSecondarycolorscheme] = useState('#555555')

    const divStyle = {
        background: isChecked
            ? `linear-gradient(133deg, ${selectedColor} 0%, ${secondaryColorScheme} 97.22%)`
            : `${selectedColor}`,
    }
    // =====================end================

    const [inputField, setInputField] = useState({
        cardName: '',
        firstName: '',
        lastName: '',
        email1: '',
        email2: '',
        phone1: '',
        phone2: '',
        mobile1: '',
        mobile2: '',
        mobile3: '',
        mobile4: '',
        fax: '',
        fax2: '',
        address1: '',
        address2: '',
        webaddress1: '',
        webaddress2: '',
        companyName: '',
        jobTitle: '',
        mainColor: selectedColor,
        gradientColor: secondaryColorScheme,
        buttonColor: buttonColor,
        checkgradient: isChecked,
        summary: '',
        cardtype: selectedValue,
        status: 'active',

        // ==================sociel link================
        facebook: '',
        twitter: '',
        instagram: '',
        youtube: '',
        github: '',
    })

    const handleColorChange = event => {
        setSelectedColor(event.target.value)
    }
    const inputsHandler = e => {
        e.persist()
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }

    const [picture, setPicture] = useState({
        image: null,
        imageUrl: null,
    })
    // Info: Branding Info

    const handleImage = e => {
        const selectedImage = e.target.files[0]

        setPicture({
            image: selectedImage,
            imageUrl: URL.createObjectURL(selectedImage),
        })
    }

    const [welcome, setWelcome] = useState({
        image: null,
        imageUrl: null,
    })

    const handleWelcome = e => {
        const selectedImage = e.target.files[0]

        const maxSize = 300 * 300 // 1MB (adjust as needed)
        const allowedExtensions = ['jpg', 'jpeg', 'png'] // Add allowed extensions

        if (selectedImage.size > maxSize) {
            alert('File size exceeds the maximum allowed size.')
            return
        }

        const fileExtension = selectedImage.name.split('.').pop().toLowerCase()
        if (!allowedExtensions.includes(fileExtension)) {
            alert('Invalid file type. Please upload a valid image file.')
            return
        }

        // Update the state with the validated image information
        setWelcome({
            image: selectedImage,
            imageUrl: URL.createObjectURL(selectedImage),
        })
    }

    // =========================

    const slugify = require('slugify')
    function generateRandomNumber() {
        const min = 1000000000
        const max = 9999999999
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    // Example usage
    const id = user?.id
    const name = inputField.cardName
    const firstName = inputField.firstName
    const lastName = inputField.lastName

    const uniqueSlug = generateUniqueSlug(
        firstName,
        lastName,
        id,
        name,
        generateRandomNumber,
    )

    function generateUniqueSlug(id, name, firstName, lastName) {
        const timestamp = new Date().getTime()

        const combinedString = `${firstName}-${lastName}-${id}-${timestamp}-${name}-`

        const slug = slugify(combinedString, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
        })

        return slug
    }

    const [errors, setErrors] = useState({
        cardName: '',
        email1: '',
    })

    const allInfoSubmit = e => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('cardname', inputField.cardName)
        formData.append('firstname', inputField.firstName)
        formData.append('lastname', inputField.lastName)
        formData.append('email1', inputField.email1)
        formData.append('email2', inputField.email2)
        formData.append('phone1', inputField.phone1)
        formData.append('phone2', inputField.phone2)
        formData.append('mobile1', inputField.mobile1)
        formData.append('mobile2', inputField.mobile2)
        formData.append('mobile3', inputField.mobile3)
        formData.append('mobile4', inputField.mobile4)
        formData.append('fax', inputField.fax)
        formData.append('fax2', inputField.fax2)
        formData.append('address1', inputField.address1)
        formData.append('address2', inputField.address2)
        formData.append('maincolor', selectedColor)
        formData.append('webaddress1', inputField.webaddress1)
        formData.append('webaddress2', inputField.webaddress2)
        formData.append('companyname', inputField.companyName)
        formData.append('jobtitle', inputField.jobTitle)
        formData.append('gradientcolor', secondaryColorScheme)
        formData.append('buttoncolor', inputField.buttonColor)
        formData.append('checkgradient', isChecked)
        formData.append('summary', inputField.summary)
        formData.append('cardtype', selectedValue)
        formData.append('facebook', inputField.facebook)
        formData.append('twitter', inputField.twitter)
        formData.append('instagram', inputField.instagram)
        formData.append('youtube', inputField.youtube)
        formData.append('github', inputField.github)
        formData.append('image', picture.image)
        formData.append('welcomeimage', welcome.image)
        formData.append('user_id', user?.id)
        formData.append('slug', uniqueSlug)
        formData.append('status', inputField.status)

        console.log(formData)

        const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL

        axios
            .post(`${baseuri}/api/qrcreate`, formData)
            .then(res => {
                if (res.data.status === 200) {
                    setLoading(false)
                    alert('Form submit successfully')
                    window.location.href = '/dashboard'
                } else if (res.data.status === 422 && res.data.errors) {
                    setLoading(false)
                    const fieldErrors = res.data.errors

                    // Update state with errors
                    setErrors(fieldErrors)
                    // const errorMessages = Object.values(res.data.errors).flat()
                    // alert('Validation Error:\n' + errorMessages.join('\n'))
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

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <AppLayout>
            <Head>
                <title>Create Smart Card</title>
            </Head>

            <section>
                <div className="account-details">
                    <form onSubmit={allInfoSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mb-4">
                                    <div className="mb-3">
                                        <input
                                            id="cardName"
                                            type="text"
                                            name="cardName"
                                            className="form-control"
                                            onChange={inputsHandler}
                                            value={inputField.cardName}
                                            autoFocus
                                            placeholder="Name your Smart Card"
                                        />
                                        <InputError
                                            messages={errors.cardname}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="form-group-wrapper">
                                        <div className="form-group-title">
                                            <p>
                                                Design and customize your Smart
                                                Card
                                            </p>
                                        </div>

                                        <div className="color-plate">
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
                                                            <img src="img/color/1.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
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
                                                            <img src="img/color/2.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
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
                                                            <img src="img/color/3.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
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
                                                            <img src="img/color/4.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
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
                                                            <img src="img/color/5.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
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
                                                            <img src="img/color/6.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
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
                                                            <img src="img/color/7.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
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
                                                            <img src="img/color/8.png" />
                                                        </div>
                                                        <img
                                                            src="img/icon/mark.svg"
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
                                                <InputError
                                                    messages={errors.image}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group-wrapper mt-3">
                                        <div className="form-group-title">
                                            <p>Your information</p>
                                        </div>

                                        <div className="information-form">
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
                                                                    placeholder="First name"
                                                                />

                                                                <InputError
                                                                    messages={
                                                                        errors.firstname
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
                                                                    placeholder="Last name"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.lastname
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
                                                        <p>Home:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-6">
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
                                                                    id="mobile2"
                                                                    type="text"
                                                                    name="mobile2"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.mobile2
                                                                    }
                                                                    placeholder="Mobile number 02"
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
                                                            </div>
                                                        </div>
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
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="address1"
                                                                    name="address1"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.address1
                                                                    }
                                                                    placeholder="Address"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.address1
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="webaddress1"
                                                                    name="webaddress1"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.webaddress1
                                                                    }
                                                                    placeholder="Enter web address"
                                                                />
                                                                <InputError
                                                                    messages={
                                                                        errors.webaddress1
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
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
                                                                    value={
                                                                        inputField.summary
                                                                    }></textarea>
                                                                <InputError
                                                                    messages={
                                                                        errors.summary
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
                                                        <p>Others:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <select
                                                            className="form-select form-control"
                                                            aria-label="Default select example"
                                                            name="cardtype"
                                                            value={
                                                                selectedValue
                                                            }
                                                            onChange={
                                                                handleSelectChange
                                                            }>
                                                            <option>
                                                                Please Select
                                                                Card Type
                                                            </option>
                                                            <option
                                                                value="Home"
                                                                selected>
                                                                Home
                                                            </option>
                                                            <option value="Business">
                                                                Business
                                                            </option>
                                                            <option value="Others">
                                                                Others
                                                            </option>
                                                        </select>

                                                        <InputError
                                                            messages={
                                                                errors.cardtype
                                                            }
                                                            className="mt-2"
                                                        />
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
                                                            <div className="col-md-6">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="mobile3"
                                                                        name="mobile3"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.mobile3
                                                                        }
                                                                        placeholder="Mobile number 01"
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.mobile3
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
                                                                        placeholder="Mobile number 02"
                                                                        id="mobile4"
                                                                        name="mobile4"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.mobile4
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.mobile4
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
                                                                        placeholder="Phone"
                                                                        id="phone2"
                                                                        name="phone2"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.phone2
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.phone2
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
                                                                        placeholder="Fax"
                                                                        id="fax2"
                                                                        name="fax2"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.fax2
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.fax2
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                <div className="mb-3">
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        placeholder="Email address"
                                                                        id="email2"
                                                                        name="email2"
                                                                        onChange={
                                                                            inputsHandler
                                                                        }
                                                                        value={
                                                                            inputField.email2
                                                                        }
                                                                    />
                                                                    <InputError
                                                                        messages={
                                                                            errors.email2
                                                                        }
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
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
                                                            <div className="col-md-12">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="form-group-wrapper mt-3">
                                        <div className="form-group-title">
                                            <p>Social media</p>
                                        </div>

                                        <div className="color-plate">
                                            <p className="mb-3">
                                                Click on the icon to add social
                                                media channel:
                                            </p>

                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Facebook:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Facebook"
                                                            id="facebook"
                                                            name="facebook"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.facebook
                                                            }
                                                        />
                                                        <InputError
                                                            messages={
                                                                errors.facebook
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Twitter:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Twitter"
                                                            id="twitter"
                                                            name="twitter"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.twitter
                                                            }
                                                        />
                                                        <InputError
                                                            messages={
                                                                errors.twitter
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Instagram:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Instagram"
                                                            id="instagram"
                                                            name="instagram"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.instagram
                                                            }
                                                        />
                                                        <InputError
                                                            messages={
                                                                errors.instagram
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Youtube:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Youtube"
                                                            id="youtube"
                                                            name="youtube"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.youtube
                                                            }
                                                        />
                                                        <InputError
                                                            messages={
                                                                errors.youtube
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>GitHub:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="GitHub"
                                                            id="github"
                                                            name="github"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.github
                                                            }
                                                        />
                                                        <InputError
                                                            messages={
                                                                errors.github
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    <SocialMediaItem
                                        inputsHandler={inputsHandler}
                                        inputField={inputField}
                                        InputError={InputError}
                                        errors={errors}
                                    />



                                    <div className="form-group-wrapper mt-3">
                                        <div className="form-group-title">
                                            <p>Welcome screen</p>
                                        </div>

                                        <div className="color-plate">
                                            <p className="mb-3">
                                                Display your logo while your
                                                page is loading: (Max Image Size
                                                300*300)
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
                                </div>
                                <div className="col-lg-4 mb-4">
                                    <div className="preview">
                                        <div className="preview-bar mb-3">
                                            <p>Preview</p>
                                        </div>

                                        <div className="show-preview-right">
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
                                                            href={`tel:${inputField.mobile1}`}>
                                                            <img
                                                                src="img/icon/call.svg"
                                                                alt=""
                                                            />
                                                            <p>Call</p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href={`mailto:${inputField.email1}`}>
                                                            <img
                                                                src="img/icon/telegram2.svg"
                                                                alt=""
                                                            />
                                                            <p>Email</p>
                                                        </a>
                                                    </li>
                                                    {/* <li>
                                                        <a
                                                            href={`location:${inputField.address1}`}>
                                                            <img
                                                                src="img/icon/location.svg"
                                                                alt=""
                                                            />
                                                            <p>Location</p>
                                                        </a>
                                                    </li> */}
                                                </ul>
                                            </div>

                                            <div
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
                                                    }}
                                                    className="qr-image-wrapper">
                                                    <QRCode
                                                        value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                        size={250}
                                                    />
                                                    <img
                                                        src={welcome.imageUrl}
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
                                            <div className="qr-download mt-3">
                                                <a
                                                    className="custom-btn"
                                                    onClick={handlePrint}>
                                                    Download QR Code
                                                </a>
                                            </div>

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
                                                                src="img/icon/phone.svg"
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
                                                                src="img/icon/email.svg"
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
                                                                src="img/icon/toffee.svg"
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
                                                                src="img/icon/web.svg"
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
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="img/icon/share.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show border-none">
                                                            <ul>
                                                                <li>
                                                                    <a
                                                                        href={
                                                                            inputField.facebook
                                                                        }>
                                                                        <img
                                                                            src="img/icon/fb.svg"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href={
                                                                            inputField.github
                                                                        }>
                                                                        <img
                                                                            src="img/icon/github.svg"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href={
                                                                            inputField.twitter
                                                                        }>
                                                                        <img
                                                                            src="img/icon/tw.svg"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href={
                                                                            inputField.instagram
                                                                        }>
                                                                        <img
                                                                            src="img/icon/ins.svg"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        href={
                                                                            inputField.youtube
                                                                        }>
                                                                        <img
                                                                            src="img/icon/youtube.svg"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
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
                                            <Link
                                                href={'/dashboard'}
                                                className="back">
                                                {'< Back'}
                                            </Link>
                                            {/* <button
                                                className="submit-details-form"
                                                type="submit">
                                                Submit
                                            </button> */}
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

export default CreateQR;
