import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode.react'
import { useDropzone } from 'react-dropzone'
import { toPng } from 'html-to-image'
const Popup = ({ activePopup, handlePopup, componentRef, uniqueSlug }) => {
    const [selectedFileIndex, setSelectedFileIndex] = useState(null)
    const [selectedColor, setSelectedColor] = useState('#000000')
    const handleColorChange = event => {
        const newColor = event.target.value
        setSelectedColor(newColor)
     
    }
    const [selectedCodeColor, setSelectedCodeColor] = useState('#000000')
    const handleCodeColorChange = event => {
        const newColor = event.target.value
        setSelectedCodeColor(newColor)

    }
    const handleFileClick = index => {
        setSelectedFileIndex(index)
    }

    const [activeFrame, setActiveFrame] = useState(1)
    const toggleFrame = index => {
        setActiveFrame(index)
    }

    const [uploadedFiles, setUploadedFiles] = useState([])

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
    }, [uploadedFiles])
    const elementRef = useRef(null)
      const handleDownload = () => {
          toPng(elementRef.current, { cacheBust: false })
              .then(dataUrl => {
                  const link = document.createElement('a')
                  link.download = 'my-image-name.png'
                  link.href = dataUrl
                  link.click()
              })
              .catch(err => {
                  console.log(err)
              })
      }

    return (
        <>
            {activePopup && (
                <div className="welcome_model">
                    <div className="overlay-4">
                        <div className="popup-model-content">
                            <div className="popup-model-wrapper">
                                <div className="popop-model-left">
                                    <div
                                        className={
                                            activeFrame === 1
                                                ? 'popup-frame-list-item-view active'
                                                : 'popup-frame-list-item-view'
                                        }>
                                        <div
                                            className="popup-frame-item-first"
                                            style={{
                                                backgroundColor: selectedColor,
                                            }}
                                            ref={elementRef}>
                                            <div className="qr-item-item">
                                                <div
                                                    ref={componentRef}
                                                    style={{
                                                        position: 'relative',
                                                    }}
                                                    className="qr-image-wrapper">
                                                    <QRCode
                                                        fgColor={
                                                            selectedCodeColor
                                                        }
                                                        value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                        size={233}
                                                    />
                                                    {selectedFileIndex !==
                                                        null &&
                                                        uploadedFiles[
                                                            selectedFileIndex
                                                        ] !== undefined && (
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    uploadedFiles[
                                                                        selectedFileIndex
                                                                    ],
                                                                )}
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
                                                        )}
                                                </div>
                                            </div>
                                            <div className="scan-me-text scan-me-text-download">
                                                <h4>SCAN ME</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            activeFrame === 2
                                                ? 'popup-frame-list-item-view active'
                                                : 'popup-frame-list-item-view'
                                        }>
                                        <div
                                            className="popup-frame-item-second"
                                            ref={elementRef}>
                                            <div
                                                className="qr-item-item"
                                                style={{
                                                    border: `10px solid ${selectedColor}`,
                                                }}>
                                                <div
                                                    ref={componentRef}
                                                    style={{
                                                        position: 'relative',
                                                    }}
                                                    className="qr-image-wrapper">
                                                    <QRCode
                                                        fgColor={
                                                            selectedCodeColor
                                                        }
                                                        value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                        size={233}
                                                    />
                                                    {selectedFileIndex !==
                                                        null &&
                                                        uploadedFiles[
                                                            selectedFileIndex
                                                        ] !== undefined && (
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    uploadedFiles[
                                                                        selectedFileIndex
                                                                    ],
                                                                )}
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
                                                        )}
                                                </div>
                                            </div>
                                            <div className="scan-me-text scan-me-text-download">
                                                <h4
                                                    style={{
                                                        color: selectedColor,
                                                    }}>
                                                    SCAN ME
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            activeFrame === 3
                                                ? 'popup-frame-list-item-view active'
                                                : 'popup-frame-list-item-view'
                                        }>
                                        <div
                                            className="popup-frame-item-third"
                                            ref={elementRef}>
                                            <div className="scan-me-text scan-me-text-item scan-me-text-download">
                                                <h4>SCAN ME</h4>
                                            </div>
                                            <div
                                                className="qr-item-item"
                                                style={{
                                                    border: `10px solid ${selectedColor}`,
                                                }}>
                                                <div
                                                    ref={componentRef}
                                                    style={{
                                                        position: 'relative',
                                                    }}
                                                    className="qr-image-wrapper">
                                                    <QRCode
                                                        fgColor={
                                                            selectedCodeColor
                                                        }
                                                        value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                        size={233}
                                                    />
                                                    {selectedFileIndex !==
                                                        null &&
                                                        uploadedFiles[
                                                            selectedFileIndex
                                                        ] !== undefined && (
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    uploadedFiles[
                                                                        selectedFileIndex
                                                                    ],
                                                                )}
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
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            activeFrame === 4
                                                ? 'popup-frame-list-item-view active'
                                                : 'popup-frame-list-item-view'
                                        }>
                                        <div
                                            className="popup-frame-item-four"
                                            ref={elementRef}>
                                            <div
                                                className="qr-item-item"
                                                style={{
                                                    border: `10px solid ${selectedColor}`,
                                                }}>
                                                <div
                                                    ref={componentRef}
                                                    style={{
                                                        position: 'relative',
                                                    }}
                                                    className="qr-image-wrapper">
                                                    <QRCode
                                                        fgColor={
                                                            selectedCodeColor
                                                        }
                                                        value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                        size={233}
                                                    />
                                                    {selectedFileIndex !==
                                                        null &&
                                                        uploadedFiles[
                                                            selectedFileIndex
                                                        ] !== undefined && (
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    uploadedFiles[
                                                                        selectedFileIndex
                                                                    ],
                                                                )}
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
                                                        )}
                                                </div>
                                            </div>
                                            <div className="scan-me-text scan-me-text-item scan-me-text-download">
                                                <h4>SCAN ME</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="frame-download-btn-item">
                                        <button
                                            className="custom-btn"
                                            onClick={handleDownload}>
                                            Download QR Code
                                        </button>
                                    </div>
                                </div>
                                <div className="popop-model-right">
                                    <button
                                        className="btn-close"
                                        onClick={handlePopup}>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1.8 18L0 16.2L7.2 9L0 1.8L1.8 0L9 7.2L16.2 0L18 1.8L10.8 9L18 16.2L16.2 18L9 10.8L1.8 18Z"
                                                fill="#fff"
                                            />
                                        </svg>
                                    </button>
                                    <div className="popup-content-right">
                                        <div className="popup-frame-content">
                                            <h2 className="frame-title">
                                                FRAME
                                            </h2>
                                            <div className="popup-frame-item-lists">
                                                <div
                                                    className={
                                                        activeFrame === 1
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(1)
                                                    }>
                                                    <div className="popup-frame-item-first">
                                                        <div className="qr-item-item">
                                                            <div
                                                                ref={
                                                                    componentRef
                                                                }
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                                className="qr-image-wrapper">
                                                                <QRCode
                                                                    value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                                    size={48}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="scan-me-text">
                                                            <h4>SCAN ME</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 2
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(2)
                                                    }>
                                                    <div className="popup-frame-item-second">
                                                        <div className="qr-item-item">
                                                            <div
                                                                ref={
                                                                    componentRef
                                                                }
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                                className="qr-image-wrapper">
                                                                <QRCode
                                                                    value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                                    size={48}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="scan-me-text">
                                                            <h4>SCAN ME</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 3
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(3)
                                                    }>
                                                    <div className="popup-frame-item-third">
                                                        <div className="scan-me-text-item scan-me-text">
                                                            <h4>SCAN ME</h4>
                                                        </div>
                                                        <div className="qr-item-item">
                                                            <div
                                                                ref={
                                                                    componentRef
                                                                }
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                                className="qr-image-wrapper">
                                                                <QRCode
                                                                    value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                                    size={48}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        activeFrame === 4
                                                            ? 'popup-frame-list-item active'
                                                            : ' popup-frame-list-item'
                                                    }
                                                    onClick={() =>
                                                        toggleFrame(4)
                                                    }>
                                                    <div className="popup-frame-item-four">
                                                        <div className="qr-item-item">
                                                            <div
                                                                ref={
                                                                    componentRef
                                                                }
                                                                style={{
                                                                    position:
                                                                        'relative',
                                                                }}
                                                                className="qr-image-wrapper">
                                                                <QRCode
                                                                    value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                                    size={48}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="scan-me-text-item scan-me-text">
                                                            <h4>SCAN ME</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="popup-frame-input mt-2">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label
                                                        htmlFor="Primarycolor"
                                                        className="form-label color-pic-label">
                                                        Frame Color
                                                    </label>
                                                    <div className="pic-with-color">
                                                        <p>{selectedColor}</p>
                                                        <input
                                                            type="color"
                                                            className=" form-control-color "
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
                                                <div className="col-md-4">
                                                    <label
                                                        htmlFor="frameText"
                                                        className="form-label color-pic-label">
                                                        Frame Text
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className=" form-control-color form-control-color-frame-text"
                                                        name="frameText"
                                                        placeholder="SCAN ME"
                                                        id="frameText"
                                                        title="Choose your color"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="popup-frame-qr-code-content mt-3">
                                            <h2 className="frame-title">
                                                QR Code
                                            </h2>

                                            <div className="qr-item-item mt-2">
                                                <div
                                                    ref={componentRef}
                                                    style={{
                                                        position: 'relative',
                                                        width: '60px',
                                                        height: '60px',
                                                    }}
                                                    className="qr-image-wrapper">
                                                    <QRCode
                                                        value={`https://smartcardgenerator.net/${uniqueSlug}`}
                                                        size={60}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label
                                                        htmlFor="Primarycolor"
                                                        className="form-label color-pic-label">
                                                        CODE Color
                                                    </label>
                                                    <div className="pic-with-color">
                                                        <p>
                                                            {selectedCodeColor}
                                                        </p>
                                                        <input
                                                            type="color"
                                                            className=" form-control-color "
                                                            name="primaryColor"
                                                            value={
                                                                selectedCodeColor
                                                            }
                                                            onChange={
                                                                handleCodeColorChange
                                                            }
                                                            id="Primarycolor"
                                                            title="Choose your color"></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="popup-frame-logo-content mt-3">
                                            <div className="logo-frame-item-header d-flex align-items-center gap-3">
                                                <h2 className="frame-title">
                                                    Logo
                                                </h2>
                                                <div
                                                    {...getRootProps()}
                                                    className="dropzone-upload-imgs d-flex align-items-center gap-2">
                                                    <input
                                                        {...getInputProps()}
                                                    />
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M23.6712 4.665L21.6712 0.665C21.609 0.540279 21.5132 0.435379 21.3946 0.362073C21.2761 0.288768 21.1394 0.249958 21 0.25H3C2.8606 0.249958 2.72395 0.288768 2.60538 0.362073C2.48681 0.435379 2.39102 0.540279 2.32875 0.665L0.32875 4.665C0.277189 4.76916 0.250246 4.88378 0.25 5V22C0.25 22.4641 0.434375 22.9092 0.762563 23.2374C1.09075 23.5656 1.53587 23.75 2 23.75H22C22.4641 23.75 22.9092 23.5656 23.2374 23.2374C23.5656 22.9092 23.75 22.4641 23.75 22V5C23.7498 4.88378 23.7228 4.76916 23.6712 4.665ZM3.46375 1.75H20.5362L21.7862 4.25H2.21375L3.46375 1.75ZM22 22.25H2C1.9337 22.25 1.87011 22.2237 1.82322 22.1768C1.77634 22.1299 1.75 22.0663 1.75 22V5.75H22.25V22C22.25 22.0663 22.2237 22.1299 22.1768 22.1768C22.1299 22.2237 22.0663 22.25 22 22.25ZM16.53 14.47C16.6705 14.6106 16.7493 14.8012 16.7493 15C16.7493 15.1988 16.6705 15.3894 16.53 15.53L12.53 19.53C12.3894 19.6705 12.1988 19.7493 12 19.7493C11.8012 19.7493 11.6106 19.6705 11.47 19.53L7.47 15.53C7.33752 15.3878 7.2654 15.1998 7.26882 15.0055C7.27225 14.8112 7.35097 14.6258 7.48838 14.4884C7.62579 14.351 7.81118 14.2723 8.00548 14.2688C8.19978 14.2654 8.38783 14.3375 8.53 14.47L11.25 17.1887V9C11.25 8.80109 11.329 8.61032 11.4697 8.46967C11.6103 8.32902 11.8011 8.25 12 8.25C12.1989 8.25 12.3897 8.32902 12.5303 8.46967C12.671 8.61032 12.75 8.80109 12.75 9V17.1887L15.47 14.47C15.6106 14.3295 15.8012 14.2507 16 14.2507C16.1988 14.2507 16.3894 14.3295 16.53 14.47Z"
                                                            fill="#B5B5B5"
                                                        />
                                                    </svg>

                                                    <p>upload</p>
                                                </div>
                                            </div>
                                            <div className="logo-frame-list-item">
                                                <ul>
                                                    {uploadedFiles.map(
                                                        (file, index) => (
                                                            <li
                                                                key={index}
                                                                className="logo-frame-item"
                                                                onClick={() =>
                                                                    handleFileClick(
                                                                        index,
                                                                    )
                                                                }>
                                                                <img
                                                                    src={URL.createObjectURL(
                                                                        file,
                                                                    )}
                                                                    alt={`Uploaded ${file.name}`}
                                                                />
                                                                <button
                                                                    className="remove-btn"
                                                                    onClick={() =>
                                                                        removeFile(
                                                                            index,
                                                                        )
                                                                    }>
                                                                    <svg
                                                                        width="8"
                                                                        height="8"
                                                                        viewBox="0 0 18 18"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <path
                                                                            d="M1.8 18L0 16.2L7.2 9L0 1.8L1.8 0L9 7.2L16.2 0L18 1.8L10.8 9L18 16.2L16.2 18L9 10.8L1.8 18Z"
                                                                            fill="white"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Popup
