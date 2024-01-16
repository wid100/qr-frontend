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
import InstagramPopup from '@/components/Popup/InstagramPopup'

function InstagramPage() {
    const [previewActive, setPreviewActive] = useState(1)
    const handlePreview = index => {
        setPreviewActive(index)
    }


    // Popup
    const [activePopup, setActivePopup] = useState(true)

    const handlePopup = () => {
        setActivePopup(!activePopup)
    }

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
                <title>Create Website </title>
            </Head>

            <section>
                <div className="account-details">
                    <form onSubmit={allInfoSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mb-4">
                                    <div className="mb-3 d-flex align-items-center gap-4">
                                        <div className="product-icon">
                                            <svg
                                                width="38"
                                                height="38"
                                                viewBox="0 0 32 32"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M23 30H9C5.14 30 2 26.86 2 23V9C2 5.14 5.14 2 9 2H23C26.86 2 30 5.14 30 9V23C30 26.86 26.86 30 23 30ZM9 3C5.691 3 3 5.691 3 9V23C3 26.309 5.691 29 9 29H23C26.309 29 29 26.309 29 23V9C29 5.691 26.309 3 23 3H9Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M20 26H12C8.691 26 6 23.309 6 20V12C6 8.691 8.691 6 12 6H20C23.309 6 26 8.691 26 12V20C26 23.309 23.309 26 20 26ZM12 8C9.794 8 8 9.794 8 12V20C8 22.206 9.794 24 12 24H20C22.206 24 24 22.206 24 20V12C24 9.794 22.206 8 20 8H12Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M21.5 11.75C20.811 11.75 20.25 11.189 20.25 10.5C20.25 9.811 20.811 9.25 21.5 9.25C22.189 9.25 22.75 9.811 22.75 10.5C22.75 11.189 22.189 11.75 21.5 11.75Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M16 21C13.243 21 11 18.757 11 16C11 13.243 13.243 11 16 11C18.757 11 21 13.243 21 16C21 18.757 18.757 21 16 21ZM16 13C14.346 13 13 14.346 13 16C13 17.654 14.346 19 16 19C17.654 19 19 17.654 19 16C19 14.346 17.654 13 16 13Z"
                                                    fill="#898989"
                                                />
                                            </svg>
                                        </div>
                                        <div className="product-input w-100">
                                            <input
                                                id="cardName"
                                                type="text"
                                                name="cardName"
                                                className="form-control p-4"
                                                onChange={inputsHandler}
                                                value={inputField.cardName}
                                                autoFocus
                                                placeholder="Name your QR Instagram"
                                            />
                                            <InputError
                                                messages={errors.cardname}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#website"
                                            aria-expanded="false"
                                            aria-controls="website">
                                            <p>Basic Information</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="information-form collapse show"
                                            id="website">
                                            <p>
                                                Type in the Instagram username
                                                of your business to link with
                                                the QR Code.
                                            </p>
                                            <div className="row mt-3">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Username:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3 instagram-input-fluid">
                                                        <span>@ *</span>
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
                                                            placeholder="username"
                                                        />
                                                    </div>
                                                    <InputError
                                                        messages={
                                                            errors.mobile1
                                                        }
                                                        className="mt-2"
                                                    />
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
                                            <p>Upload your logo</p>
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
                                                page is loading: (Max Image Size
                                                300*300)
                                            </p>

                                            <div className="row d-flex justify-content-center">
                                                <div className="col-md-5">
                                                    <div className="upload-image">
                                                        <div className="view-image view-image-logo">
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
                                                <p>QR Code</p>
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                previewActive === 1
                                                    ? 'show-preview-right active'
                                                    : 'show-preview-right'
                                            }>
                                            <div className="instagram-preview-username">
                                                <h4>Username</h4>
                                                <span>joy_sorkar111</span>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                previewActive === 2
                                                    ? 'show-preview-right active'
                                                    : 'show-preview-right'
                                            }>
                                            <div className="smart-code-preview">
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
                                            {/* <div className="qr-download mt-3 mb-4">
                                                <a
                                                    className="custom-btn"
                                                    onClick={handlePrint}>
                                                    Download QR Code
                                                </a>
                                            </div> */}
                                            <div className="card-list-right text-center">
                                                <h1 className="opening-preview-title">
                                                    Scan this QR Code to preview
                                                </h1>
                                                <p>
                                                    You can customize the design
                                                    of your QR Code in the next
                                                    step.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="submit-form footer-submit-from">
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
                                                    onClick={handlePopup}
                                                    type="submit">
                                                    Submit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <InstagramPopup
                            handlePopup={handlePopup}
                            activePopup={activePopup}
                            componentRef={componentRef}
                            uniqueSlug={uniqueSlug}
                        />
                    </form>
                </div>
            </section>
        </AppLayout>
    )
}

export default InstagramPage
