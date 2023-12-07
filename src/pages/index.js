import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useReactToPrint } from 'react-to-print'
import { useState, useRef } from 'react'

import QRCode from 'qrcode.react'
export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const [inputField, setInputField] = useState({
        smarturl: '',
    })

    const inputsHandler = e => {
        e.persist()
        setInputField({
            ...inputField,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <>
            <Head>
                <title>Smart Card Generator</title>
            </Head>

            <header>
                <div className="container">
                    <div className="home-header">
                        <div className="logo">
                            <Link href={'/'}>
                                <img src="img/logo.png" alt="" />
                            </Link>
                        </div>

                        <div className="menu">
                            <ul>
                                {user ? (
                                    <li className="custom-btn">
                                        <Link href="/dashboard">Dashboard</Link>
                                    </li>
                                ) : (
                                    <>
                                        <li className="custom-btn">
                                            <Link href={'/login'}>Login</Link>
                                        </li>
                                        <li className="custom-btn">
                                            <Link href={'/registar'}>
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            {/* ============= Hero Section ================ */}
            <section>
                <div
                    className="hero-section"
                    style={{
                        backgroundImage: 'url(./img/hero-img.png)',
                    }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="hero-content">
                                    <h1>How can we use vCard Plus</h1>
                                    <p>
                                        QR Code is a two-dimensional version of
                                        the barcode, typically made up of black
                                        and white pixel patterns. Denso Wave, a
                                        Japanese subsidiary of the Toyota
                                        supplier Denso, developed them for
                                        marking components.
                                    </p>
                                    <button className="hero-btn">
                                        SIGN UP FOR FREE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ======== Input Website ============ */}
            <section className="qr-input-fleid">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="qr-input-item-wrapper">
                                <div className="qr-input-items">
                                    <div className="qr-input-list-items">
                                        <Link href={'/'}>
                                            <div className="qr-input-list-item">
                                                <span>
                                                    <img
                                                        src="/img/icon/www.svg"
                                                        alt=""
                                                    />
                                                </span>
                                                <p>Smart URL</p>
                                            </div>
                                        </Link>
                                        <Link href={'/'}>
                                            <div className="qr-input-list-item">
                                                <span>
                                                    <img
                                                        src="/img/2.svg"
                                                        alt=""
                                                    />
                                                </span>
                                                <p>Smart Resume</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="qr-input-list-items">
                                        <Link href={'/'}>
                                            <div className="qr-input-list-item">
                                                <span>
                                                    <img
                                                        src="/img/1.svg"
                                                        alt=""
                                                    />
                                                </span>
                                                <p>Smart vCard</p>
                                            </div>
                                        </Link>
                                        <Link href={'/'}>
                                            <div className="qr-input-list-item">
                                                <span>
                                                    <img
                                                        src="/img/3.svg"
                                                        alt=""
                                                    />
                                                </span>
                                                <p>Smart Profile Creator</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="basic-url"
                                        className="form-label">
                                        Input Your URL
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            id="smarturl"
                                            className="form-control"
                                            name="smarturl"
                                            placeholder="Input Smart URL"
                                            onChange={inputsHandler}
                                            value={inputField.smarturl}
                                        />
                                    </div>
                                </div>
                                <div className="qr-input-content">
                                    <h4>Enter your website</h4>
                                    <p>
                                        (Your QR Code will be generated
                                        automatically)
                                    </p>
                                    <button className="custom-btn">
                                        Signup for Free
                                    </button>
                                </div>
                                {/* <div className="scan-tracking-item">
                                    <div className="toggle-button-cover">
                                        <div id="button-3" className="button r">
                                            <input
                                                className="checkbox"
                                                type="checkbox"
                                            />
                                            <div className="knobs"></div>
                                            <div className="layer"></div>
                                        </div>
                                    </div>
                                    <span>Scan Tracking</span>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="qr-code-item">
                                <Link
                                    href={'/login'}
                                    to={user ? '/dashboard' : '/login'}>
                                    <div className="with-logo">
                                        <img
                                            src="/img/icon/with-logo.png"
                                            alt=""
                                        />
                                    </div>
                                </Link>
                                <div className="qr-code-img" ref={componentRef}>
                                    <QRCode
                                        value={inputField.smarturl}
                                        size={250}
                                    />
                                </div>
                                <button
                                    className="qr-code-download-btn custom-btn"
                                    onClick={handlePrint}>
                                    DOWNLOAD
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============= vCard Plus Roadmap =========== */}
            <section className="vCard-roadmap">
                <div className="container">
                    <div className="vCard-roadmap-wrapper">
                        <div className="vcard-roadmap-title">
                            <h4>How do I create a free vCard Plus?</h4>
                        </div>
                        <div className="vcard-roadmap-content">
                            <div className="vcard-roadmap-content-items">
                                <div className="vcard-roadmap-content-item">
                                    <div className="roadmap-img">
                                        <img
                                            src="/img/home/roadmap-1.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="vcard-roadmap-content-item">
                                    <h3>Create a free account</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </p>
                                </div>
                            </div>
                            <div className="vcard-roadmap-content-items vcard-roadmap-content-items-2">
                                <div className="vcard-roadmap-content-item">
                                    <h3>Fill in the details</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </p>
                                </div>
                                <div className="vcard-roadmap-content-item vcard-roadmap-content-item2">
                                    <div className="roadmap-img">
                                        <img
                                            src="/img/home/roadmap-2.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="vcard-roadmap-content-items">
                                <div className="vcard-roadmap-content-item ">
                                    <div className="roadmap-img">
                                        <img
                                            src="/img/home/roadmap-3.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="vcard-roadmap-content-item vcard-roadmap-content-item3">
                                    <h3>Download the QR Code</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
