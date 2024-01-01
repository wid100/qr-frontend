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
import FeedbackItem from '@/components/FeedbackItem'
import OpenDays from '@/components/business-page/OpenDays'
import OpenDaysPreview from '@/components/business-page/OpenDaysPreview'
import FeaturesAllItem from '@/components/business-page/FeaturesAllItem'
import FeaturesAllItemPreview from '@/components/business-page/FeaturesAllItemPreview'
import { DataIcons } from '@/DataIcon/DataIcons'
import { useDropzone } from 'react-dropzone'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import {    Navigation } from 'swiper/modules'

function BusinesPage() {
// ================= Opening Days ==================
  const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
  ]
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => ({
      value: i,
      label: `${i}:00 ${i < 12 ? 'am' : 'pm'}`,
  }))

  const [schedule, setSchedule] = useState(
      daysOfWeek.reduce((acc, day) => {
          acc[day] = { startTime: 0, endTime: 0, checked: false }
          return acc
      }, {}),
  )

  const handleCheckboxChangeDate = day => {
      setSchedule(prevSchedule => ({
          ...prevSchedule,
          [day]: {
              ...prevSchedule[day],
              checked: !prevSchedule[day].checked,
          },
      }))
  }

  const handleTimeChange = (day, field, value) => {
      setSchedule(prevSchedule => ({
          ...prevSchedule,
          [day]: {
              ...prevSchedule[day],
              [field]: value,
          },
      }))
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
    // Features item
    const featuresData = [
        '/img/icons/feature-1.svg',
        '/img/icons/feature-2.svg',
        '/img/icons/feature-3.svg',
        '/img/icons/feature-4.svg',
        '/img/icons/feature-5.svg',
        '/img/icons/feature-6.svg',
        '/img/icons/feature-7.svg',
        '/img/icons/feature-8.svg',
        '/img/icons/feature-9.svg',
        '/img/icons/feature-10.svg',
        '/img/icons/feature-11.svg',
        '/img/icons/feature-12.svg',
        '/img/icons/feature-13.svg',
    ]
    const [selectedItem, setSelectedItem] = useState([])

    const handleItemClick = index => {
        setSelectedItem(prevSelected => {
            if (prevSelected.includes(index)) {
                // Deselect the item
                return prevSelected.filter(item => item !== index)
            } else {
                // Select the item
                return [...prevSelected, index]
            }
        })
    }

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
                                    <div className="mb-3">
                                        <input
                                            id="cardName"
                                            type="text"
                                            name="cardName"
                                            className="form-control p-4"
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
                                                <div className="row mt-4">
                                                    <div className="col-md-4">
                                                        <div className="image-up-label">
                                                            <p>
                                                                Upload your
                                                                image (400*400).
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-8">
                                                        <div className="upload-image">
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
                                                        <p>Headline*:</p>
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

                                    <OpenDays
                                        handleCheckboxChangeDate={
                                            handleCheckboxChangeDate
                                        }
                                        handleTimeChange={handleTimeChange}
                                        daysOfWeek={daysOfWeek}
                                        hoursOfDay={hoursOfDay}
                                        schedule={schedule}
                                    />
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
                                            <FeaturesAllItem
                                                handleItemClick={
                                                    handleItemClick
                                                }
                                                selectedItem={selectedItem}
                                                featuresData={featuresData}
                                            />
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
                                            <div className="row border-bottom mt-4">
                                                <div className="col-md-2">
                                                    <div className="info-form-label">
                                                        <p>About:</p>
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
                                    <div className="form-group-wrapper mt-3">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#uploadProduct"
                                            aria-expanded="true"
                                            aria-controls="uploadProduct">
                                            <p>Upload Products</p>
                                            <div className="bottom-arrow">
                                                <img
                                                    src="/img/icons/bottom-arrow.svg"
                                                    alt=""
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className="information-form collapse show"
                                            id="uploadProduct">
                                            <p>
                                                Choose product image from your
                                                gallery.
                                            </p>
                                            <div className="row mt-4">
                                                <div className="col-md-4">
                                                    <div
                                                        {...getRootProps()}
                                                        className="dropzone-upload-img">
                                                        <input
                                                            {...getInputProps()}
                                                        />
                                                        <img
                                                            src="/img/icons/upload.svg"
                                                            alt=""
                                                        />
                                                        <p>
                                                            Click or drag file
                                                            to this area to
                                                            upload
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="uploaded-images">
                                                        {uploadedFiles.map(
                                                            (file, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="image-container">
                                                                    <img
                                                                        src={URL.createObjectURL(
                                                                            file,
                                                                        )}
                                                                        alt={`Uploaded ${file.name}`}
                                                                    />
                                                                    <button
                                                                        onClick={() =>
                                                                            removeFile(
                                                                                index,
                                                                            )
                                                                        }>
                                                                        <svg
                                                                            width="12"
                                                                            height="12"
                                                                            viewBox="0 0 18 18"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path
                                                                                d="M1.8 18L0 16.2L7.2 9L0 1.8L1.8 0L9 7.2L16.2 0L18 1.8L10.8 9L18 16.2L16.2 18L9 10.8L1.8 18Z"
                                                                                fill="white"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            ),
                                                        )}
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
                                    <FeedbackItem
                                        inputField={inputField}
                                        errors={errors}
                                        inputsHandler={inputsHandler}
                                    />
                                </div>
                                <div className="col-lg-4 mb-4">
                                    <div className="preview">
                                        <div className="preview-bar mb-3">
                                            <p>Preview</p>
                                        </div>

                                        <div className="show-preview-right">
                                            <div
                                                className="business-preview-top-header mb-4"
                                                style={divStyle}>
                                                <h3 className="company_name">
                                                    Company Name
                                                </h3>
                                                <div className="preview-image business-preview-image">
                                                    <img
                                                        src={picture.imageUrl}
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="p-4">
                                                    <h4 className="mb-2">
                                                        Eat. Refresh. Go.
                                                    </h4>
                                                    <p className="dajignation">
                                                        {inputField.jobTitle}
                                                    </p>
                                                    <button className="view-more-btn">
                                                        view more
                                                    </button>
                                                </div>
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
                                                    <li className="opening-preview-date-item">
                                                        <h4 className="opening-preview-title">
                                                            Opening Hours
                                                        </h4>
                                                        <OpenDaysPreview
                                                            schedule={schedule}
                                                            daysOfWeek={
                                                                daysOfWeek
                                                            }
                                                        />
                                                    </li>
                                                    <li className="opening-preview-date-item">
                                                        <h4 className="opening-preview-title">
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
                                                    </li>
                                                    <li className="opening-preview-date-item">
                                                        <h4 className="opening-preview-title">
                                                            Contact
                                                        </h4>
                                                        <ul className="contact-list-item">
                                                            <li>
                                                                <span>Joy</span>
                                                                <p> Name</p>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    (415)
                                                                    000-0000
                                                                </span>
                                                                <p> Phone</p>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    hello@joyscafe.com
                                                                </span>
                                                                <p> Email</p>
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    www.joyscafe.com
                                                                </span>
                                                                <p> Website</p>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className="opening-preview-date-item">
                                                        <h4 className="opening-preview-title">
                                                            Products
                                                        </h4>
                                                        <div className="upload-product-img-items">
                                                            <Swiper
                                                                slidesPerView={
                                                                    1
                                                                }
                                                                spaceBetween={
                                                                    10
                                                                }
                                                                pagination={{
                                                                    clickable: true,
                                                                }}
                                                                navigation={{
                                                                    nextEl:
                                                                        '.swiper-button-next',
                                                                    prevEl:
                                                                        '.swiper-button-prev',
                                                                }}
                                                                modules={[
                                                                    Navigation,
                                                                ]}
                                                                className="mySwiper">
                                                                {uploadedFiles.map(
                                                                    (
                                                                        file,
                                                                        index,
                                                                    ) => (
                                                                        <SwiperSlide
                                                                            key={
                                                                                index
                                                                            }>
                                                                            <div className="image-swiper-container">
                                                                                <img
                                                                                    src={URL.createObjectURL(
                                                                                        file,
                                                                                    )}
                                                                                    alt={`Uploaded ${file.name}`}
                                                                                />
                                                                            </div>
                                                                        </SwiperSlide>
                                                                    ),
                                                                )}
                                                            </Swiper>
                                                            <div className="swiper-button-next">
                                                                <img
                                                                    src="/img/icons/right-arrow.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="swiper-button-prev">
                                                                <img
                                                                    src="/img/icons/left.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="opening-preview-date-item">
                                                        <h4 className="opening-preview-title">
                                                            Facility Features
                                                        </h4>
                                                        {Array.isArray(
                                                            selectedItem,
                                                        ) &&
                                                            selectedItem.length >
                                                                0 && (
                                                                <FeaturesAllItemPreview
                                                                    featuresData={
                                                                        featuresData
                                                                    }
                                                                    selectedItem={
                                                                        selectedItem
                                                                    }
                                                                />
                                                            )}
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
