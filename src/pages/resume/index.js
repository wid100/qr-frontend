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
function ResumePage() {
// ======================= Job Added ====================
    const [jobEntries, setJobEntries] = useState([])
    const [inputFields, setInputFields] = useState({
        job_title: '',
        employer_name: '',
        location_address: '',
        startMonth: null,
        startYear: null,
        endMonth: null,
        endYear: null,
        summary: '',
        currentlyWorking: false,
    })

    const handleInputChange = (field, value) => {
        setInputField({
            ...inputField,
            [field]: value,
        })
    }

    const handleAddJob = () => {
        setJobEntries([...jobEntries, inputField])
        setInputField({
            job_title: '',
            employer_name: '',
            location_address: '',
            startMonth: null,
            startYear: null,
            endMonth: null,
            endYear: null,
            summary: '',
            currentlyWorking: false,
        })
    }

    const handleRemoveJob = index => {
        const updatedJobEntries = [...jobEntries]
        updatedJobEntries.splice(index, 1)
        setJobEntries(updatedJobEntries)
    }

    // ================== Date Picker ===========
    const [startMonth, setStartMonth] = useState(null)
    const [startYear, setStartYear] = useState(null)
    const [endMonth, setEndMonth] = useState(null)
    const [endYear, setEndYear] = useState(null)
    //  // ===== Step ===========
    // const totalSteps = 6
    const [currentStep, setCurrentStep] = useState(1)
    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1)
    }

    // const calculateProgress = () => {
    //     return ((currentStep - 1) / (totalSteps - 1)) * 100
    // }

    //  ============= Active preview ================
    const [previewActive, setPreviewActive] = useState(1)
    const handlePreview = index => {
        setPreviewActive(index)
    }

    //  ==================Profiel image upload =================

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewImage, setPreviewImage] = useState([
        '/assets/images/dashboard/profile.jpg',
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
                <title>Create Smart Card</title>
            </Head>

            <section>
                <div className="account-details">
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mb-4">
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
                                                                    {previewImage && (
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
                                                                    )}
                                                                    <button
                                                                        className="upload-btn"
                                                                        onClick={
                                                                            handleUpload
                                                                        }>
                                                                        Upload
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

                                            <div className="form-group-wrapper mt-3">
                                                <div
                                                    className="form-group-title"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#information"
                                                    aria-expanded="true"
                                                    aria-controls="information">
                                                    <p>Heading</p>
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
                                                    <p>
                                                        Introduce your business
                                                        or organization in a few
                                                        words. Optionally, add a
                                                        button to a website of
                                                        your choice. Fields
                                                        marked with a * are
                                                        mandatory.
                                                    </p>
                                                    <div className="row d-flex align-items-center justify-content-center">
                                                        <div className="col-md-10">
                                                            <div className="row mt-4">
                                                                <div className="col-md-6">
                                                                    <div className="info-form-label mb-2">
                                                                        <p>
                                                                            First
                                                                            Name*:
                                                                        </p>
                                                                    </div>
                                                                    <input
                                                                        id="first_name"
                                                                        type="text"
                                                                        name="first_name"
                                                                        className="form-control"
                                                                        placeholder="First name"
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="info-form-label mb-2">
                                                                        <p>
                                                                            Last
                                                                            Name*:
                                                                        </p>
                                                                    </div>
                                                                    <input
                                                                        id="last_name"
                                                                        type="text"
                                                                        name="last_name"
                                                                        className="form-control"
                                                                        placeholder="Last Name"
                                                                    />
                                                                </div>
                                                                <div className="col-md-12 mt-3">
                                                                    <div className="info-form-label mb-2">
                                                                        <p>
                                                                            Profession*:
                                                                        </p>
                                                                    </div>
                                                                    <input
                                                                        id="profession"
                                                                        type="text"
                                                                        name="profession"
                                                                        className="form-control"
                                                                        placeholder="Type your profession"
                                                                    />
                                                                </div>
                                                                <div className="col-md-12 mt-3">
                                                                    <div className="info-form-label mb-2">
                                                                        <p>
                                                                            Address*:
                                                                        </p>
                                                                    </div>
                                                                    <input
                                                                        id="address"
                                                                        type="text"
                                                                        name="address"
                                                                        className="form-control"
                                                                        placeholder="Enter your Address"
                                                                    />
                                                                </div>
                                                                <div className="col-md-12 mt-3">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="info-form-label mb-2">
                                                                                <p>
                                                                                    City*:
                                                                                </p>
                                                                            </div>
                                                                            <input
                                                                                id="city"
                                                                                type="text"
                                                                                name="city"
                                                                                className="form-control"
                                                                                placeholder="Enter your City"
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="info-form-label mb-2">
                                                                                <p>
                                                                                    Postal
                                                                                    Code*:
                                                                                </p>
                                                                            </div>
                                                                            <input
                                                                                id="postal_code"
                                                                                type="text"
                                                                                name="postal_code"
                                                                                className="form-control"
                                                                                placeholder="Postal code"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 mt-3">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="info-form-label mb-2">
                                                                                <p>
                                                                                    Country*:
                                                                                </p>
                                                                            </div>
                                                                            <select
                                                                                className="form-select form-control"
                                                                                aria-label="Default select example">
                                                                                <option
                                                                                    selected>
                                                                                    Select
                                                                                    Your
                                                                                    Country
                                                                                </option>
                                                                                <option value="1">
                                                                                    One
                                                                                </option>
                                                                                <option value="2">
                                                                                    Two
                                                                                </option>
                                                                                <option value="3">
                                                                                    Three
                                                                                </option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {currentStep === 2 && (
                                        <>
                                            <div className="form-group-wrapper mt-3">
                                                <div
                                                    className="form-group-title"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#information"
                                                    aria-expanded="true"
                                                    aria-controls="information">
                                                    <p>Work History</p>
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
                                                    <p>
                                                        You can include any work
                                                        experience, internships,
                                                        scholarships, relevant
                                                        coursework and academic
                                                        achievements.
                                                    </p>
                                                    <div className="row d-flex align-items-center justify-content-center">
                                                        <div className="col-md-10">
                                                            {/* <div className="row mt-4">
                                                                <div className="col-md-12 mt-3">
                                                                    <div className="info-form-label mb-2">
                                                                        <p>
                                                                            Job
                                                                            Title*:
                                                                        </p>
                                                                    </div>
                                                                    <input
                                                                        id="job_title"
                                                                        type="text"
                                                                        name="job_title"
                                                                        className="form-control"
                                                                        placeholder="Type your Job Title"
                                                                    />
                                                                </div>
                                                                <div className="col-md-12 mt-3">
                                                                    <div className="info-form-label mb-2">
                                                                        <p>
                                                                            Employer*:
                                                                        </p>
                                                                    </div>
                                                                    <input
                                                                        id="employer_name"
                                                                        type="text"
                                                                        name="employer_name"
                                                                        className="form-control"
                                                                        placeholder="Employer name"
                                                                    />
                                                                </div>
                                                                <div className="col-md-12 mt-3">
                                                                    <div className="info-form-label mb-2">
                                                                        <p>
                                                                            Location*:
                                                                        </p>
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
                                                                                <p>
                                                                                    Start
                                                                                    Date*:
                                                                                </p>
                                                                            </div>
                                                                            <DatePicker
                                                                                selected={
                                                                                    startMonth
                                                                                }
                                                                                onChange={date =>
                                                                                    setStartMonth(
                                                                                        date,
                                                                                    )
                                                                                }
                                                                                showMonthYearPicker
                                                                                dateFormat="MMMM"
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <DatePicker
                                                                                selected={
                                                                                    startYear
                                                                                }
                                                                                onChange={date =>
                                                                                    setStartYear(
                                                                                        date,
                                                                                    )
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
                                                                                <p>
                                                                                    End
                                                                                    Date*:
                                                                                </p>
                                                                            </div>
                                                                            <DatePicker
                                                                                selected={
                                                                                    endMonth
                                                                                }
                                                                                onChange={date =>
                                                                                    setEndMonth(
                                                                                        date,
                                                                                    )
                                                                                }
                                                                                showMonthYearPicker
                                                                                dateFormat="MMMM"
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <DatePicker
                                                                                selected={
                                                                                    endYear
                                                                                }
                                                                                onChange={date =>
                                                                                    setEndYear(
                                                                                        date,
                                                                                    )
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
                                                                        <p>
                                                                            Job
                                                                            Description*:
                                                                        </p>
                                                                    </div>
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
                                                                            maxLength={
                                                                                250
                                                                            } 
                                                                        ></textarea>
                                                                        <div className="text-right">
                                                                            <small>
                                                                                {
                                                                                    inputField
                                                                                        .summary
                                                                                        .length
                                                                                }
                                                                                /250
                                                                                characters
                                                                            </small>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="job-checkbox d-flex align-items-center gap-2">
                                                                    <input type="checkbox" />
                                                                    <p>
                                                                        I am
                                                                        currently
                                                                        working
                                                                        here.
                                                                    </p>
                                                                </div>
                                                                <button
                                                                    className="custom-btn"
                                                                    onClick={
                                                                        handleAddJob
                                                                    }>
                                                                    Add Job
                                                                </button>
                                                            </div> */}
                                                            <div className="row mt-4">
                                                                {/* Job Title Input */}
                                                                <div className="col-md-12 mt-3">
                                                                    <div className="info-form-label mb-2">
                                                                        <p>
                                                                            Job
                                                                            Title*:
                                                                        </p>
                                                                    </div>
                                                                    <input
                                                                        id="job_title"
                                                                        type="text"
                                                                        name="job_title"
                                                                        className="form-control"
                                                                        placeholder="Type your Job Title"
                                                                       
                                                                    />
                                                                </div>

                                                                {/* Add Job button */}
                                                                <div className="col-md-12 mt-3">
                                                                    <div
                                                                        className="custom-btn"
                                                                        onClick={
                                                                            handleAddJob
                                                                        }>
                                                                        Add Job
                                                                    </div>
                                                                </div>

                                                                {/* Display added job entries */}
                                                                <div className="col-md-12 mt-3">
                                                                    <h2>
                                                                        Added
                                                                        Jobs:
                                                                    </h2>
                                                                    {jobEntries.map(
                                                                        (
                                                                            entry,
                                                                            index,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }>
                                                                                <p>
                                                                                    Job
                                                                                    Title:{' '}
                                                                                    {
                                                                                        entry.job_title
                                                                                    }
                                                                                </p>
                                                                                {/* Display more details as needed */}
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleRemoveJob(
                                                                                            index,
                                                                                        )
                                                                                    }>
                                                                                    Remove
                                                                                    Job
                                                                                </button>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="step-btn-item">
                                        {currentStep > 1 && (
                                            <button
                                                onClick={prevStep}
                                                className="custom-btn">
                                                <span>Previous</span>
                                            </button>
                                        )}
                                        {currentStep < 2 ? (
                                            <button
                                                onClick={nextStep}
                                                className="custom-btn">
                                                <span>
                                                    {currentStep === 2
                                                        ? 'Confirm'
                                                        : 'Next'}
                                                </span>
                                            </button>
                                        ) : (
                                            <button
                                                className="custom-btn"
                                                disabled>
                                                <span>Finish</span>
                                            </button>
                                        )}
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
                                                <p>Smart Code</p>
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                previewActive === 1
                                                    ? 'show-preview-right active'
                                                    : 'show-preview-right'
                                            }>
                                            <div className="business-preview-top-header">
                                                <div className="business-preview-image">
                                                    <div className="business-preview-bg-img">
                                                        <img
                                                            src={
                                                                picture.imageUrl
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="business-preview-logo">
                                                        <img
                                                            src={
                                                                welcome.imageUrl
                                                            }
                                                            width={100}
                                                            height={100}
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="p-4"
                                                    style={divStyle}>
                                                    <h4 className="mb-2 preview-title">
                                                        Eat. Refresh. Go.
                                                    </h4>
                                                    <h5 className="mb-2">
                                                        Food & Catering Business
                                                    </h5>
                                                    <p className="dajignation">
                                                        {inputField.jobTitle}
                                                        We aim to provide fresh
                                                        and healthy snacks for
                                                        people on the go.
                                                    </p>
                                                    <div className="opening-preview-date-item">
                                                        <h4 className="preview-title opening-preview-title">
                                                            Location
                                                        </h4>
                                                        <p>
                                                            Mission Street 526
                                                        </p>
                                                        <p>
                                                            San Francisco, CA
                                                            94105
                                                        </p>
                                                        <p>United States</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-list-right">
                                                <ul>
                                                    <li>
                                                        <h4 className="opening-preview-title">
                                                            Contact
                                                        </h4>
                                                        <ul className="contact-list-item">
                                                            <li>
                                                                <h5>Joy</h5>
                                                                <p> Name</p>
                                                            </li>
                                                            <li>
                                                                <h5>
                                                                    (415)
                                                                    000-0000
                                                                </h5>
                                                                <p> Phone</p>
                                                            </li>
                                                            <li>
                                                                <h5>
                                                                    hello@joyscafe.com
                                                                </h5>
                                                                <p> Email</p>
                                                            </li>
                                                            <li>
                                                                <h5>
                                                                    www.joyscafe.com
                                                                </h5>
                                                                <p> Website</p>
                                                            </li>
                                                        </ul>
                                                    </li>

                                                    <li className="card-list-li card-list-social">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="/img/icon/share.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show border-none">
                                                            <h4 className="opening-preview-title">
                                                                Social Media
                                                            </h4>
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
                                            <div className="smart-code-preview">
                                                <div
                                                    ref={componentRef}
                                                    style={{
                                                        position: 'relative',
                                                        width: '250px',
                                                        height: '250px',
                                                    }}
                                                    className="qr-image-wrapper ">
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
                                            {/* <div className="qr-download mt-3">
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
