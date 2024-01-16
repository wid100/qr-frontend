import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React, { useState } from 'react'
import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'

import Select from 'react-select'
function SingleProductPage() {
    const colourOptions = [
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
    ]

    // ========= Upload Product Image ========
    // State and function for the first image upload
    const [uploadedFiles1, setUploadedFiles1] = useState([])
    const onDrop1 = acceptedFiles => {
        setUploadedFiles1(acceptedFiles)
    }

    // State and function for the second image upload
    const [uploadedFiles2, setUploadedFiles2] = useState([])
    const onDrop2 = acceptedFiles => {
        setUploadedFiles2(acceptedFiles)
    }

    // State and function for the third image upload
    const [uploadedFiles3, setUploadedFiles3] = useState([])
    const onDrop3 = acceptedFiles => {
        setUploadedFiles3(acceptedFiles)
    }

    const renderImageUpload = (
        uploadedFiles,
        { getRootProps, getInputProps, isDragActive },
    ) => (
        <div className="dropzone-upload-img" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <>
                    <img src="/img/icons/upload.svg" alt="" />
                    <p>Upload</p>
                    {uploadedFiles.length > 0 && (
                        <span>{uploadedFiles[0].name}</span>
                    )}
                </>
            )}
        </div>
    )

    const { user } = useAuth({ middleware: 'auth' })
    const [loading, setLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')

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
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-8 mb-4">
                                    <div className="mb-3 d-flex align-items-center gap-4">
                                        <div className="product-icon">
                                            <svg
                                                width="40"
                                                height="40"
                                                viewBox="0 0 48 48"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_2105_893)">
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M20.964 21.0344C20.6512 21.3472 20.6512 21.8528 20.964 22.1656L25.764 26.9656C25.92 27.1216 26.1248 27.2 26.3296 27.2C26.5344 27.2 26.7392 27.1216 26.8952 26.9656C27.208 26.6528 27.208 26.1472 26.8952 25.8344L22.0952 21.0344C21.7824 20.7216 21.2768 20.7216 20.964 21.0344ZM18.8952 24.2344C18.5824 23.9216 18.0768 23.9216 17.764 24.2344C17.4512 24.5472 17.4512 25.0528 17.764 25.3656L22.564 30.1656C22.72 30.3216 22.9248 30.4 23.1296 30.4C23.3344 30.4 23.5392 30.3216 23.6952 30.1656C24.008 29.8528 24.008 29.3472 23.6952 29.0344L18.8952 24.2344ZM15.6952 27.4344C15.3824 27.1216 14.8768 27.1216 14.564 27.4344C14.2512 27.7472 14.2512 28.2528 14.564 28.5656L19.364 33.3656C19.52 33.5216 19.7248 33.6 19.9296 33.6C20.1344 33.6 20.3392 33.5216 20.4952 33.3656C20.808 33.0528 20.808 32.5472 20.4952 32.2344L15.6952 27.4344ZM30.7984 25.6L22.3296 17.1312L10.6608 28.8L19.1296 37.2688L30.7984 25.6ZM22.8952 15.4344L32.4952 25.0344C32.808 25.3472 32.808 25.8528 32.4952 26.1656L19.6952 38.9656C19.5392 39.1216 19.3344 39.2 19.1296 39.2C18.9248 39.2 18.72 39.1216 18.564 38.9656L8.964 29.3656C8.6512 29.0528 8.6512 28.5472 8.964 28.2344L21.764 15.4344C22.0768 15.1216 22.5824 15.1216 22.8952 15.4344ZM41.5096 29.26C41.1272 29.0352 40.6376 29.164 40.4144 29.5456L31.2448 45.1856C30.5824 46.332 29.1112 46.7264 28.0008 46.0864L26.2144 44.9288C25.8448 44.688 25.3488 44.7944 25.1088 45.1648C24.868 45.536 24.9736 46.0312 25.3448 46.2712L27.1656 47.4512C27.7936 47.8136 28.4808 47.9856 29.1592 47.9856C30.5424 47.9856 31.8888 47.2696 32.6272 45.9904L41.7944 30.3544C42.0176 29.9736 41.8904 29.484 41.5096 29.26ZM47.9296 4V16.8C47.9296 19.2752 47.1424 21.1192 45.2952 22.9656L21.5368 46.7576C20.7808 47.5136 19.776 47.9288 18.7072 47.9288C17.6384 47.9288 16.6344 47.5136 15.88 46.7576L1.172 32.0504C0.416 31.2944 0 30.2896 0 29.2208C0 28.152 0.416 27.148 1.172 26.3928L21.9512 5.6416C16.5176 4.4064 13.1456 4.3232 12.1584 4.612C12.5752 5.0384 13.8736 5.944 17.0072 7.1792C17.4184 7.3416 17.62 7.8056 17.4584 8.2168C17.296 8.628 16.8312 8.8272 16.4208 8.668C9.9344 6.1112 10.3136 4.6936 10.4568 4.16C10.7536 3.048 12.3384 2.6776 15.5848 2.9616C18.2288 3.1928 21.6416 3.8448 25.1944 4.796C28.7472 5.748 32.0272 6.8896 34.432 8.012C37.388 9.3904 38.5728 10.5016 38.2744 11.6144C37.9864 12.688 36.4896 12.8192 35.9976 12.8624C35.9744 12.8648 35.9504 12.8656 35.9272 12.8656C35.5168 12.8656 35.168 12.5512 35.1312 12.1352C35.092 11.6952 35.4176 11.3072 35.8584 11.2688C36.1992 11.2392 36.4256 11.1928 36.572 11.1512C36.2296 10.7936 35.3632 10.236 33.9776 9.572C33.6872 10.0616 33.5296 10.624 33.5296 11.2C33.5296 12.9648 34.9648 14.4 36.7296 14.4C38.4944 14.4 39.9296 12.9648 39.9296 11.2C39.9296 9.4352 38.4944 8 36.7296 8C36.2872 8 35.9296 7.6424 35.9296 7.2C35.9296 6.7576 36.2872 6.4 36.7296 6.4C39.3768 6.4 41.5296 8.5528 41.5296 11.2C41.5296 13.8472 39.3768 16 36.7296 16C34.0824 16 31.9296 13.8472 31.9296 11.2C31.9296 10.3976 32.1408 9.616 32.5176 8.9184C30.6032 8.1144 28.0352 7.2144 24.7808 6.3416C24.4376 6.2496 24.1072 6.1656 23.7768 6.0816L2.3032 27.5248C1.8496 27.9776 1.6 28.5808 1.6 29.2208C1.6 29.8624 1.8496 30.4648 2.3032 30.9184L17.0112 45.6264C17.9176 46.5328 19.4984 46.5328 20.4048 45.6264L44.1632 21.8344C45.7224 20.276 46.3296 18.864 46.3296 16.8V4C46.3296 2.6768 45.2528 1.6 43.9296 1.6H31.1296C29.0656 1.6 27.6536 2.2072 26.0952 3.7656C25.7824 4.0784 25.2768 4.0784 24.964 3.7656C24.6512 3.4528 24.6512 2.9472 24.964 2.6344C26.8104 0.7872 28.6544 0 31.1296 0H43.9296C46.1352 0 47.9296 1.7944 47.9296 4Z"
                                                        fill="#898989"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2105_893">
                                                        <rect
                                                            width="48"
                                                            height="48"
                                                            fill="white"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="product-input w-100">
                                            <input
                                                id="cardName"
                                                type="text"
                                                name="cardName"
                                                className="form-control p-4"
                                                autoFocus
                                                placeholder="Product name"
                                            />
                                            <InputError className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="form-group-wrapper">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#information"
                                            aria-expanded="true"
                                            aria-controls="information">
                                            <p>Product Information</p>
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
                                                <div className="col-md-3">
                                                    <div className="info-form-label">
                                                        <p>Category*:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <select
                                                        className="form-select form-control"
                                                        aria-label="Default select example">
                                                        <option selected>
                                                            Open this select
                                                            menu
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
                                            <div className="row mt-4">
                                                <div className="col-md-3">
                                                    <div className="info-form-label">
                                                        <p>Sub Category*:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    {/* <select
                                                        className="form-select form-control"
                                                        aria-label="Default select example">
                                                        <option selected>
                                                            Open this select
                                                            menu
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
                                                    </select> */}
                                                    <Select
                                                        defaultValue={[
                                                            colourOptions[2],
                                                            colourOptions[3],
                                                        ]}
                                                        isMulti
                                                        name="colors"
                                                        options={colourOptions}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                    />
                                                </div>
                                            </div>

                                            <div className="row mt-4">
                                                <div className="col-md-3">
                                                    <div className="info-form-label">
                                                        <p>Description:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
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

                                            <div className="row d-flex align-items-center">
                                                <div className="col-md-3">
                                                    <div className="info-form-label">
                                                        <p>Price*:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="row ">
                                                        <div className="col-md-6">
                                                            <div className="product-price-item d-flex align-items-center">
                                                                <div className="product-price d-flex align-items-center gap-2">
                                                                    <span>
                                                                        BDT
                                                                    </span>
                                                                    <input
                                                                        type="number"
                                                                        placeholder="500 ৳"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className='d-flex align-items-center gap-3 product-discount-item'>
                                                                <p>
                                                                    Discount*:
                                                                </p>
                                                                <div className="product-price-item d-flex align-items-center">
                                                                    <div className="product-price">
                                                                        <input
                                                                            type="number"
                                                                            placeholder="20%"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex align-items-center">
                                                <div className="col-md-3">
                                                    <div className="info-form-label">
                                                        <p>Product Size*:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="product-size-items">
                                                        <div className="product-size-item">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="S"
                                                            />
                                                        </div>
                                                        <div className="product-size-item">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="M"
                                                            />
                                                        </div>
                                                        <div className="product-size-item">
                                                            <input
                                                                type="text"
                                                                placeholder="L"
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <div className="product-size-item">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="XL"
                                                            />
                                                        </div>
                                                        <div className="product-size-item">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="XXL"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="col-md-3">
                                                    <div className="info-form-label">
                                                        <p>Quantity*:</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-9">
                                                    <input
                                                        type="text"
                                                        name="cardName"
                                                        className="form-control"
                                                        autoFocus
                                                        placeholder="123"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group-wrapper mt-4">
                                        <div
                                            className="form-group-title"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#uploadsProduct"
                                            aria-expanded="true"
                                            aria-controls="uploadsProduct">
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
                                            id="uploadsProduct">
                                            <p>
                                                Choose product image from your
                                                gallery. (Maximum limit (03
                                                images)
                                            </p>

                                            <div className="row mt-4 d-flex align-items-center justify-content-center">
                                                <div className="col-md-3">
                                                    {renderImageUpload(
                                                        uploadedFiles1,
                                                        useDropzone({
                                                            onDrop: onDrop1,
                                                        }),
                                                    )}
                                                </div>
                                                <div className="col-md-3">
                                                    {renderImageUpload(
                                                        uploadedFiles2,
                                                        useDropzone({
                                                            onDrop: onDrop2,
                                                        }),
                                                    )}
                                                </div>
                                                <div className="col-md-3">
                                                    {renderImageUpload(
                                                        uploadedFiles3,
                                                        useDropzone({
                                                            onDrop: onDrop3,
                                                        }),
                                                    )}
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
                                            className="color-plate collapse show"
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

export default SingleProductPage
