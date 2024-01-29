import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode.react'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import { useReactToPrint } from 'react-to-print'
import Link from 'next/link'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import WorkHistory from '@/components/Resume/WorkHistory'
import Education from '@/components/Resume/Education'
import References from '@/components/Resume/References'
import Others from '@/components/Resume/Others'
import Heading from '@/components/Resume/Heading'
function ResumePage() {
    // ======================= Job Added ====================

    //  // ===== Step ===========
    const totalSteps = 5
    const [currentStep, setCurrentStep] = useState(1)
    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }
    
    const calculateProgress = () => {
        return ((currentStep - 1) / (totalSteps - 1)) * 100
    }


    //  ============= Active preview ================
    const [previewActive, setPreviewActive] = useState(1)
    const handlePreview = index => {
        setPreviewActive(index)
    }

    //  ==================Profiel image upload =================

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewImage, setPreviewImage] = useState([
        '/img/icon/profile.jpg',
    ])

    const handleFileChange = event => {
        const file = event.target.files[0]
        setSelectedFile(file)

        // Create a preview image URL
        const imageUrl = URL.createObjectURL(file)
        setPreviewImage(imageUrl)
    }

    const handleUpload = () => {
        if (selectedFile) {
            // Validate the dimensions of the selected image
            const image = new Image()
            image.src = previewImage

            image.onload = () => {
                if (image.width === 300 && image.height === 300) {
                    // Perform the actual upload logic here
                    console.log('Uploading file:', selectedFile)
                } else {
                    // Display an error message or prevent the upload
                    console.error(
                        'Invalid dimensions. Please choose a 400x400 image.',
                    )
                }
            }
        }
    }

    // ========== User Auth ===========

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
    const [selectedColor, setSelectedColor] = useState('#FFB317')

    const [textColor, settextColor] = useState('#0000')

    const [secondaryColorScheme, setSecondarycolorscheme] = useState('#555555')

    const divStyle = {
        background: isChecked
            ? `linear-gradient(133deg, ${selectedColor} 0%, ${secondaryColorScheme} 97.22%)`
            : `${selectedColor}`,
    }
    // =====================end================

    const [inputField, setInputField] = useState({
        cardName: '',

        mainColor: selectedColor,
        gradientColor: secondaryColorScheme,
        textColor: textColor,
        checkgradient: isChecked,
        summary: '',
        cardtype: selectedValue,
        status: 'active',
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
        imageUrl: '/img/product/shop-1.png',
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
        imageUrl: '/img/product/product-logo.png',
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

    const componentRef = useRef()



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
                <title>Create Smart Card</title>
            </Head>

            <section>
                <div className="account-details">
                    <form>
                        <div className="container">
                            <div className="row d-flex align-items-center justify-content-center">
                                <div className="col-lg-8 mb-4">
                                    <div className="step-progress-bar">
                                        <div
                                            className="step-progress-bar-item"
                                            style={{
                                                width: `${calculateProgress()}%`,
                                            }}></div>
                                    </div>

                                    {currentStep === 1 && (
                                        <>
                                            <div className="mb-3 d-flex align-items-center gap-4">
                                                <div className="product-icon">
                                                    <img
                                                        src="/img/icons/resume.svg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="product-input w-100">
                                                    <input
                                                        id="cardName"
                                                        type="text"
                                                        name="cardName"
                                                        className="form-control p-4"
                                                        autoFocus
                                                        placeholder="Name your resume"
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group-wrapper">
                                                <div
                                                    className="form-group-title"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#colorPicker"
                                                    aria-expanded="true"
                                                    aria-controls="colorPicker">
                                                    <p>
                                                        Design and customize
                                                        your resume
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
                                                        Personalize your Smart
                                                        Card by selecting
                                                        colors.
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
                                                                    <img src="/img/color/1.png" />
                                                                </div>
                                                                <img
                                                                    src="/img/icon/mark.svg"
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
                                                                    <img src="/img/color/2.png" />
                                                                </div>
                                                                <img
                                                                    src="/img/icon/mark.svg"
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
                                                                    <img src="/img/color/3.png" />
                                                                </div>
                                                                <img
                                                                    src="/img/icon/mark.svg"
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
                                                                    <img src="/img/color/4.png" />
                                                                </div>
                                                                <img
                                                                    src="/img/icon/mark.svg"
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
                                                                    <img src="/img/color/5.png" />
                                                                </div>
                                                                <img
                                                                    src="/img/icon/mark.svg"
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
                                                                    <img src="/img/color/6.png" />
                                                                </div>
                                                                <img
                                                                    src="/img/icon/mark.svg"
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
                                                                    <img src="/img/color/7.png" />
                                                                </div>
                                                                <img
                                                                    src="/img/icon/mark.svg"
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
                                                                    <img src="/img/color/8.png" />
                                                                </div>
                                                                <img
                                                                    src="/img/icon/mark.svg"
                                                                    className="mark-icon"
                                                                    alt=""
                                                                />
                                                            </span>
                                                        </label>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <label
                                                                htmlFor="Primarycolor"
                                                                className="form-label color-pic-label">
                                                                Primary color
                                                            </label>
                                                            <div className="pic-with-color">
                                                                <p>
                                                                    {
                                                                        selectedColor
                                                                    }
                                                                </p>
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

                                                        <div className="col-md-6">
                                                            <label
                                                                htmlFor="Primarycolor"
                                                                className="form-label color-pic-label">
                                                                Text color
                                                            </label>
                                                            <div className="pic-with-color">
                                                                <p>
                                                                    {textColor}
                                                                </p>
                                                                <input
                                                                    type="color"
                                                                    className=" form-control-color"
                                                                    id="Primarycolor"
                                                                    value={
                                                                        textColor
                                                                    }
                                                                    onChange={e => {
                                                                        settextColor(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                        inputsHandler(
                                                                            e,
                                                                        )
                                                                    }}
                                                                    title="Choose your color"></input>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="upload-image-wrapper upload-image-border">
                                                        <p>
                                                            Choose image from
                                                            templates or upload
                                                            your own
                                                        </p>
                                                        <div className="row mt-4 d-flex">
                                                            <div className="col-md-4 ">
                                                                <div className="upload-shop-logo-item mb-3 upload-btn-wrapper">
                                                                    {previewImage ? (
                                                                        <div className="user-img-items mb-3">
                                                                            <img
                                                                                src={
                                                                                    previewImage
                                                                                }
                                                                                alt="Preview"
                                                                                style={{
                                                                                    maxWidth:
                                                                                        '100%',
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    ) : null}
                                                                    <button
                                                                        className="upload-btn"
                                                                        onClick={
                                                                            handleUpload
                                                                        }>
                                                                        Upload
                                                                        profile
                                                                        Image
                                                                    </button>
                                                                    <input
                                                                        type="file"
                                                                        name="image"
                                                                        onChange={
                                                                            handleFileChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <InputError
                                                            messages={
                                                                errors.image
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <Heading />
                                        </>
                                    )}

                                    {currentStep === 2 && (
                                        <>
                                            <WorkHistory
                                                inputField={inputField}
                                                setInputField={setInputField}
                                            />
                                        </>
                                    )}

                                    {currentStep === 3 && (
                                        <>
                                            <Education
                                                inputField={inputField}
                                            />
                                        </>
                                    )}
                                    {currentStep === 4 && (
                                        <>
                                            <Others inputField={inputField} />
                                        </>
                                    )}
                                    {currentStep === 5 && (
                                        <>
                                            <References
                                                inputField={inputField}
                                            />
                                        </>
                                    )}
                                    <div className="step-btn-item">
                                        {currentStep > 1 && (
                                            <div
                                                onClick={prevStep}
                                                className="custom-btn">
                                                <span>Previous</span>
                                            </div>
                                        )}
                                        {currentStep < 5 ? (
                                            <div
                                                onClick={nextStep}
                                                className="custom-btn">
                                                <span>
                                                    {currentStep === 5
                                                        ? 'Confirm'
                                                        : 'Next'}
                                                </span>
                                            </div>
                                        ) : (
                                            <div
                                                className="custom-btn"
                                                disabled>
                                                <span>Finish</span>
                                            </div>
                                        )}
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

export default ResumePage
