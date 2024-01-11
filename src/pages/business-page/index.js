import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode.react'
// import htmlToImage from 'html-to-image'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'
import Link from 'next/link'
import { DataIcons } from '@/DataIcon/DataIcons'
import { useDropzone } from 'react-dropzone'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import { Navigation } from 'swiper/modules'

function BusinesPage() {
const [previewActive, setPreviewActive]=useState(1);
const handlePreview=(index)=>{
    setPreviewActive(index)
}

    // ========= Upload Product Image ========
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [swiperInstance, setSwiperInstance] = useState(null)

    const onDrop = acceptedFiles => {
        const updatedFiles = uploadedFiles.concat(acceptedFiles)
        setUploadedFiles(updatedFiles)
    }

    const removeFile = index => {
        const updatedFiles = [...uploadedFiles]
        updatedFiles.splice(index, 1)
        setUploadedFiles(updatedFiles)
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    })

    useEffect(() => {
        // Update Swiper instance when uploadedFiles change
        if (swiperInstance) {
            swiperInstance.update()
        }
    }, [uploadedFiles, swiperInstance])

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
                    <form onSubmit={allInfoSubmit}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 mb-4">
                                    <div className="mb-3 d-flex align-items-center gap-4">
                                        <div className="product-icon">
                                            <svg
                                                width="46"
                                                height="38"
                                                viewBox="0 0 46 38"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M45.08 9.35178C45.08 9.30378 45.08 9.30379 45.08 9.25578C45.08 9.20779 45.032 9.20778 45.032 9.15979C45.032 9.15979 45.032 9.11178 44.984 9.11178L39.32 2.48779V0.759785C39.32 0.471785 39.128 0.279785 38.84 0.279785H7.16C6.872 0.279785 6.68 0.471785 6.68 0.759785V2.48779L1.016 9.06378C1.016 9.06378 1.016 9.11178 0.967998 9.11178C0.967998 9.15978 0.919998 9.15979 0.919998 9.20779C0.919998 9.25578 0.919998 9.25578 0.919998 9.30378V9.35178V11.7518C0.919998 13.1918 1.976 14.3438 3.32 14.5838V34.8398H2.84C2.552 34.8398 2.36 35.0318 2.36 35.3198V37.2398C2.36 37.5278 2.552 37.7198 2.84 37.7198H43.16C43.448 37.7198 43.64 37.5278 43.64 37.2398V35.3198C43.64 35.0318 43.448 34.8398 43.16 34.8398H42.68V14.6318C44.024 14.3918 45.08 13.2398 45.08 11.7998V9.39979V9.35178ZM7.4 3.15979H9.656L5.96 8.91978H2.456L7.4 3.15979ZM35.24 3.15979L38.936 8.91978H35.288L32.408 3.15979H35.24ZM31.352 3.15979L34.232 8.91978H30.536L28.472 3.15979H31.352ZM27.464 3.15979L29.528 8.91978H25.832L25.016 3.15979H27.464ZM24.008 3.15979L24.824 8.91978H21.128L21.944 3.15979H24.008ZM20.168 8.91978H16.472L18.536 3.15979H20.984L20.168 8.91978ZM15.464 8.91978H11.768L14.648 3.15979H17.528L15.464 8.91978ZM10.712 8.91978H7.064L10.76 3.15979H13.544L10.712 8.91978ZM6.68 9.87978H10.52V11.7998C10.52 12.8558 9.656 13.7198 8.6 13.7198C7.544 13.7198 6.68 12.8558 6.68 11.7998V9.87978ZM11.48 9.87978H15.32V11.7998C15.32 12.8558 14.456 13.7198 13.4 13.7198C12.344 13.7198 11.48 12.8558 11.48 11.7998V9.87978ZM16.28 9.87978H20.12V11.7998C20.12 12.8558 19.256 13.7198 18.2 13.7198C17.144 13.7198 16.28 12.8558 16.28 11.7998V9.87978ZM21.08 9.87978H24.92V11.7998C24.92 12.8558 24.056 13.7198 23 13.7198C21.944 13.7198 21.08 12.8558 21.08 11.7998V9.87978ZM25.88 9.87978H29.72V11.7998C29.72 12.8558 28.856 13.7198 27.8 13.7198C26.744 13.7198 25.88 12.8558 25.88 11.7998V9.87978ZM30.68 9.87978H34.52V11.7998C34.52 12.8558 33.656 13.7198 32.6 13.7198C31.544 13.7198 30.68 12.8558 30.68 11.7998V9.87978ZM35.48 9.87978H39.32V11.7998C39.32 12.8558 38.456 13.7198 37.4 13.7198C36.344 13.7198 35.48 12.8558 35.48 11.7998V9.87978ZM40.04 8.91978L36.344 3.15979H38.6L43.544 8.91978H40.04ZM7.64 1.23979H38.36V2.19979H7.64V1.23979ZM1.88 11.7998V9.87978H5.72V11.7998C5.72 12.8558 4.856 13.7198 3.8 13.7198C2.744 13.7198 1.88 12.8558 1.88 11.7998ZM42.68 36.7598H3.32V35.7998H3.8H6.68H10.52H12.44H19.16H21.08H24.92H42.2H42.68V36.7598ZM19.64 34.8398V25.7198C19.64 25.4318 19.448 25.2398 19.16 25.2398H12.44C12.152 25.2398 11.96 25.4318 11.96 25.7198V34.8398H11V33.3998C11 33.1118 10.808 32.9198 10.52 32.9198H10.04V23.7998H10.52C10.808 23.7998 11 23.6078 11 23.3198V21.8798H20.6V23.3198C20.6 23.6078 20.792 23.7998 21.08 23.7998H21.56V32.9198H21.08C20.792 32.9198 20.6 33.1118 20.6 33.3998V34.8398H19.64ZM18.68 34.8398H12.92V26.1998H18.68V34.8398ZM21.56 33.8798H22.04H23.96H24.44V34.8398H21.56V33.8798ZM23.48 32.9198H22.52V23.7998H23.48V32.9198ZM23.96 22.8398H22.04H21.56V21.8798H24.44V22.8398H23.96ZM24.92 20.9198H21.08H10.52H6.68V19.9598H24.92V20.9198ZM7.208 18.9998L8.792 17.0798H22.76L24.344 18.9998H7.208ZM10.04 21.8798V22.8398H9.56H7.64H7.16V21.8798H10.04ZM8.12 23.7998H9.08V32.9198H8.12V23.7998ZM7.64 33.8798H9.56H10.04V34.8398H7.16V33.8798H7.64ZM25.4 34.8398V33.3998C25.4 33.1118 25.208 32.9198 24.92 32.9198H24.44V23.7998H24.92C25.208 23.7998 25.4 23.6078 25.4 23.3198V21.8798C25.688 21.8798 25.88 21.6878 25.88 21.3998V19.4798C25.88 19.4318 25.88 19.3838 25.832 19.3358C25.832 19.2878 25.784 19.2398 25.736 19.2398L23.336 16.3598C23.288 16.1678 23.144 16.1198 23 16.1198H8.6C8.456 16.1198 8.312 16.1678 8.216 16.3118L5.816 19.1918C5.768 19.2398 5.768 19.2878 5.72 19.2878C5.72 19.3358 5.672 19.3838 5.672 19.4318V21.3518C5.672 21.6398 5.864 21.8318 6.152 21.8318V23.2718C6.152 23.5598 6.344 23.7518 6.632 23.7518H7.112V32.8718H6.632C6.344 32.8718 6.152 33.0638 6.152 33.3518V34.7918H4.232V14.6318C5.048 14.4878 5.72 14.0558 6.152 13.3838C6.68 14.1518 7.544 14.6798 8.552 14.6798C9.56 14.6798 10.424 14.1518 10.952 13.3838C11.48 14.1518 12.344 14.6798 13.352 14.6798C14.36 14.6798 15.224 14.1518 15.752 13.3838C16.28 14.1518 17.144 14.6798 18.152 14.6798C19.16 14.6798 20.024 14.1518 20.552 13.3838C21.08 14.1518 21.944 14.6798 22.952 14.6798C23.96 14.6798 24.824 14.1518 25.352 13.3838C25.88 14.1518 26.744 14.6798 27.752 14.6798C28.76 14.6798 29.624 14.1518 30.152 13.3838C30.68 14.1518 31.544 14.6798 32.552 14.6798C33.56 14.6798 34.424 14.1518 34.952 13.3838C35.48 14.1518 36.344 14.6798 37.352 14.6798C38.36 14.6798 39.224 14.1518 39.752 13.3838C40.184 14.0558 40.856 14.4878 41.672 14.6318V34.8398H25.4ZM44.12 11.7998C44.12 12.8558 43.256 13.7198 42.2 13.7198C41.144 13.7198 40.28 12.8558 40.28 11.7998V9.87978H44.12V11.7998Z"
                                                    fill="#898989"
                                                />
                                                <path
                                                    d="M38.84 30.0398V23.7998C38.84 23.5118 38.648 23.3198 38.36 23.3198H27.8C27.512 23.3198 27.32 23.5118 27.32 23.7998V30.0398C27.032 30.0398 26.84 30.2318 26.84 30.5198V31.9598C26.84 32.2478 27.032 32.4398 27.32 32.4398H38.84C39.128 32.4398 39.32 32.2478 39.32 31.9598V30.5198C39.32 30.2318 39.128 30.0398 38.84 30.0398ZM37.88 30.0398H33.56V27.6398H37.88V30.0398ZM37.88 26.6798H33.56V24.2798H37.88V26.6798ZM32.6 24.2798V26.6798H28.28V24.2798H32.6ZM28.28 27.6398H32.6V30.0398H28.28V27.6398ZM38.36 31.4798H27.8V30.9998H38.36V31.4798Z"
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
                                                placeholder="Name your Business Card"
                                            />
                                            <InputError
                                                messages={errors.cardname}
                                                className="mt-2"
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

                                            <div className="upload-image-wrapper upload-image-border">
                                                <p>
                                                    Choose image from templates
                                                    or upload your own
                                                </p>
                                                <div className="row mt-4 d-flex justify-content-end">
                                                    <div className="col-md-8 ">
                                                        <div className=" business-image-con">
                                                            <div className="view-image business-image">
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
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#information"
                                            aria-expanded="true"
                                            aria-controls="information">
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
                                            id="information">
                                            <p>
                                                Introduce your business or
                                                organization in a few words.
                                                Optionally, add a button to a
                                                website of your choice. Fields
                                                marked with a * are mandatory.
                                            </p>
                                            <div className="row mt-4">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Company*:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            id="companyName"
                                                            type="text"
                                                            name="companyName"
                                                            className="form-control"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.companyName
                                                            }
                                                            placeholder="Joy's Cafe"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Business Type*:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            id="headline"
                                                            type="text"
                                                            name="headline"
                                                            className="form-control"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.headline
                                                            }
                                                            placeholder="Connect with us on social media"
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
                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#addressLoction"
                                            aria-expanded="true"
                                            aria-controls="addressLoction">
                                            <p>Address & location</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="information-form collapse show"
                                            id="addressLoction">
                                            <p>
                                                Provide your address and
                                                location information.
                                            </p>
                                            <div className="row mt-4">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Address:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="address"
                                                                    type="text"
                                                                    name="address"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.address1
                                                                    }
                                                                    placeholder="10252, Mission Street, Road 42"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="city"
                                                                    type="text"
                                                                    name="city"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.city
                                                                    }
                                                                    placeholder="city"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="countryCode"
                                                                    type="text"
                                                                    name="countryCode"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.countryCode
                                                                    }
                                                                    placeholder="Country code"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <input
                                                                    id="country"
                                                                    type="text"
                                                                    name="country"
                                                                    className="form-control"
                                                                    onChange={
                                                                        inputsHandler
                                                                    }
                                                                    value={
                                                                        inputField.country
                                                                    }
                                                                    placeholder="country"
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
                                            data-bs-target="#contactInformation"
                                            aria-expanded="true"
                                            aria-controls="contactInformation">
                                            <p>About and Contact Informaion</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="information-form collapse show"
                                            id="contactInformation">
                                            <p>
                                                Add more detailed information
                                                about your business and provide
                                                contact data.
                                            </p>
                                            <div className="row mt-4">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Name:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.name
                                                            }
                                                            placeholder="Name"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>Phone:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="mb-3">
                                                        <input
                                                            id="phone"
                                                            type="text"
                                                            name="phone"
                                                            className="form-control"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.phone
                                                            }
                                                            placeholder="Phone Number"
                                                        />
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
                                                    <div className="mb-3">
                                                        <input
                                                            id="phone"
                                                            type="text"
                                                            name="phone"
                                                            className="form-control"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.phone
                                                            }
                                                            placeholder="Inter your email"
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
                                                            id="phone"
                                                            type="text"
                                                            name="phone"
                                                            className="form-control"
                                                            onChange={
                                                                inputsHandler
                                                            }
                                                            value={
                                                                inputField.phone
                                                            }
                                                            placeholder="Inter your website link"
                                                        />
                                                    </div>
                                                </div>
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
                                                    <img
                                                        src={picture.imageUrl}
                                                        alt=""
                                                    />
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
                                            <div className="qr-download mt-3">
                                                <a
                                                    className="custom-btn"
                                                    onClick={handlePrint}>
                                                    Download QR Code
                                                </a>
                                            </div>

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

export default BusinesPage;
