import AppLayout from '@/components/Layouts/AppLayout';
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import QRCode from 'qrcode.react';
// import htmlToImage from 'html-to-image'
import InputError from '@/components/InputError';
import { useAuth } from '@/hooks/auth';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import Link from 'next/link';
import Popup from '@/components/Popup/Popup';


function Webiste() {
     const [previewActive, setPreviewActive] = useState(1)
     const handlePreview = index => {
         setPreviewActive(index)
     }
// ======== Popup ============

const [activePopup, setActivePopup]=useState(true);

const handlePopup=()=>{
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
                                                    d="M7.5 5C7.77614 5 8 4.77614 8 4.5C8 4.22386 7.77614 4 7.5 4C7.22386 4 7 4.22386 7 4.5C7 4.77614 7.22386 5 7.5 5Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M5.5 5C5.77614 5 6 4.77614 6 4.5C6 4.22386 5.77614 4 5.5 4C5.22386 4 5 4.22386 5 4.5C5 4.77614 5.22386 5 5.5 5Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M3.5 5C3.77614 5 4 4.77614 4 4.5C4 4.22386 3.77614 4 3.5 4C3.22386 4 3 4.22386 3 4.5C3 4.77614 3.22386 5 3.5 5Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M30.5 7H3.5C3.224 7 3 6.776 3 6.5C3 6.224 3.224 6 3.5 6H30.5C30.776 6 31 6.224 31 6.5C31 6.776 30.776 7 30.5 7Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M30.5 22C30.224 22 30 21.776 30 21.5V3.5C30 3.225 29.776 3 29.5 3H2.5C2.224 3 2 3.225 2 3.5V19.5C2 19.776 1.776 20 1.5 20C1.224 20 1 19.776 1 19.5V3.5C1 2.673 1.673 2 2.5 2H29.5C30.327 2 31 2.673 31 3.5V21.5C31 21.776 30.776 22 30.5 22Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M21.5 31H10.5C10.224 31 10 30.776 10 30.5C10 30.224 10.224 30 10.5 30H11.5C12.327 30 13 29.327 13 28.5V27.5C13 27.224 13.224 27 13.5 27C13.776 27 14 27.224 14 27.5V28.5C14 29.063 13.813 29.582 13.499 30H18.501C18.187 29.582 18 29.063 18 28.5V25.5C18 25.224 18.224 25 18.5 25C18.776 25 19 25.224 19 25.5V28.5C19 29.327 19.673 30 20.5 30H21.5C21.776 30 22 30.224 22 30.5C22 30.776 21.776 31 21.5 31Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M29.5 26H2.5C1.673 26 1 25.327 1 24.5V21.5C1 21.224 1.224 21 1.5 21H30.5C30.776 21 31 21.224 31 21.5V24.5C31 25.327 30.327 26 29.5 26ZM2 22V24.5C2 24.775 2.224 25 2.5 25H29.5C29.776 25 30 24.775 30 24.5V22H2Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M28.5 15H3.5C3.224 15 3 14.776 3 14.5V8.5C3 8.224 3.224 8 3.5 8H28.5C28.776 8 29 8.224 29 8.5V14.5C29 14.776 28.776 15 28.5 15ZM4 14H28V9H4V14Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M28.5 17H17.5C17.224 17 17 16.776 17 16.5C17 16.224 17.224 16 17.5 16H28.5C28.776 16 29 16.224 29 16.5C29 16.776 28.776 17 28.5 17Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M28.5 19H17.5C17.224 19 17 18.776 17 18.5C17 18.224 17.224 18 17.5 18H28.5C28.776 18 29 18.224 29 18.5C29 18.776 28.776 19 28.5 19Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M14.5 17H3.5C3.224 17 3 16.776 3 16.5C3 16.224 3.224 16 3.5 16H14.5C14.776 16 15 16.224 15 16.5C15 16.776 14.776 17 14.5 17Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M14.5 19H3.5C3.224 19 3 18.776 3 18.5C3 18.224 3.224 18 3.5 18H14.5C14.776 18 15 18.224 15 18.5C15 18.776 14.776 19 14.5 19Z"
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
                                                placeholder="Enter Your Website Name"
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
                                            <p>Enter your Website </p>
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
                                                Type in the website to link with
                                                your QR Code
                                            </p>
                                            <div className="row mt-3">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Name:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
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
                                                            placeholder="http://www.my-website.com"
                                                        />
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
                                                <h4>Your Website Name</h4>
                                                <span>http://webiste.com</span>
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
                                                    onClick={handlePopup}
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
                        <Popup
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

export default Webiste
