import AppLayout from '@/components/Layouts/AppLayout'
import Footer from '@/components/Layouts/Footer'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
const Template5 = () => {
   const componentRef = useRef()
   const handlePrint = useReactToPrint({
       content: () => componentRef.current,
   })

    return (
        <>
            <AppLayout>
                <section>
                    <div className="outer-box">
                        <div className="resume" ref={componentRef}>
                            <div className="resume-top">
                                <div className="resume-left">
                                    <div className="resume-img">
                                        <img
                                            src="/img/template/r5.png"
                                            alt="Image error!"
                                        />
                                    </div>
                                </div>
                                <div className="resume-right">
                                    <h1 className="resume-name">
                                        <span>Rozina</span> Ahmed
                                    </h1>
                                    <p className="resume-position">
                                        Marketing Manager
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                            <div className="resume-bottom">
                                <div className="resume-left">
                                    <div className="resume-content">
                                        <h1 className="resume-head">CONTACT</h1>

                                        <div className="resume-phone mt-3">
                                            <h3>Phone</h3>
                                            <p>123-456-7890</p>
                                        </div>

                                        <div className="resume-email mt-3">
                                            <h3>Email</h3>
                                            <p>mail@domainname.com</p>
                                        </div>

                                        <div className="resume-address mt-3">
                                            <h3>Adress</h3>
                                            <p>
                                                50-51, Janata Co-operative
                                                Housing Society, Ring Road,
                                                Mohammadpur, Dhaka Bangladesh
                                            </p>
                                        </div>

                                        <h1 className="resume-head">
                                            EDUCATION
                                        </h1>

                                        <ul className="resume-degree">
                                            <li>
                                                <p className="degree-year mb-2">
                                                    2008
                                                </p>
                                                <h3 className="degree mb-2">
                                                    Enter Your Degree
                                                </h3>
                                                <p className="degree-grade mb-2">
                                                    Grade
                                                </p>
                                                <p className="degree-place mb-2">
                                                    University/College
                                                </p>
                                            </li>
                                            <li>
                                                <p className="degree-year mb-2">
                                                    2008
                                                </p>
                                                <h3 className="degree mb-2">
                                                    Enter Your Degree
                                                </h3>
                                                <p className="degree-grade mb-2">
                                                    Grade
                                                </p>
                                                <p className="degree-place mb-2">
                                                    University/College
                                                </p>
                                            </li>
                                        </ul>

                                        <h1 className="resume-head">SKILL</h1>
                                        <ul className="resume-skill">
                                            <li>UI/UX</li>
                                            <li>Visual Design</li>
                                            <li>Wireframes</li>
                                            <li>Storyboards</li>
                                            <li>User Flows</li>
                                            <li>Process Flows</li>
                                        </ul>

                                        <div>
                                            <h1 className="resume-head">
                                                LANGUAGE
                                            </h1>
                                            <ul className="resume-language">
                                                <li>English</li>
                                                <li>Spanish</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h1 className="resume-head">
                                                INTEREST
                                            </h1>
                                            <ul className="resume-interest">
                                                <li>Music</li>
                                                <li>Singing</li>
                                                <li>Reading</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="resume-right">
                                    <div className="resume-content">
                                        <h1 className="resume-head">
                                            Experience
                                        </h1>
                                        <ul className="resume-experience">
                                            <li className="job">
                                                <p className="job-year">
                                                    2019 - 2022
                                                </p>
                                                <p className="company-name">
                                                    Company Name | 123 Anywhere
                                                    St. Any City
                                                </p>
                                                <h3 className="job-position">
                                                    Job position here
                                                </h3>
                                                <p className="job-description">
                                                    Sed ut perspiciatis unde
                                                    omnis iste natus error sit
                                                    voluptatem accusantium
                                                    doloremque laudantium, totam
                                                    rem aperiam, eaque ipsa quae
                                                    ab illo inventore veritatis
                                                    et quasi architecto beatae
                                                    vitae dicta sunt explicabo.
                                                    Nemo enim ipsam voluptatem
                                                    quia voluptas sit aspernatur
                                                    aut odit aut fugit, sed quia
                                                    consequuntur magni dolores
                                                    eos qui ratione voluptatem
                                                    sequi nesciunt. Neque porro
                                                    quisquam est, qui dolorem
                                                    ipsum quia dolor sit amet,
                                                    consectetur, adipisci velit.
                                                </p>
                                            </li>
                                            <li className="job">
                                                <p className="job-year">
                                                    2017 - 2019
                                                </p>
                                                <p className="company-name">
                                                    Company Name | 123 Anywhere
                                                    St. Any City
                                                </p>
                                                <h3 className="job-position">
                                                    Job position here
                                                </h3>
                                                <p className="job-description">
                                                    Sed ut perspiciatis unde
                                                    omnis iste natus error sit
                                                    voluptatem accusantium
                                                    doloremque laudantium, totam
                                                    rem aperiam, eaque ipsa quae
                                                    ab illo inventore veritatis
                                                    et quasi architecto beatae
                                                    vitae dicta sunt explicabo.
                                                    Nemo enim ipsam voluptatem
                                                    quia voluptas sit aspernatur
                                                    aut odit aut fugit, sed quia
                                                    consequuntur magni dolores
                                                    eos qui ratione voluptatem
                                                    sequi nesciunt. Neque porro
                                                    quisquam est, qui dolorem
                                                    ipsum quia dolor sit amet,
                                                    consectetur, adipisci velit.
                                                </p>
                                            </li>
                                            <li className="job">
                                                <p className="job-year">
                                                    2015 - 2017
                                                </p>
                                                <p className="company-name">
                                                    Company Name | 123 Anywhere
                                                    St. Any City
                                                </p>
                                                <h3 className="job-position">
                                                    Job position here
                                                </h3>
                                                <p className="job-description">
                                                    Sed ut perspiciatis unde
                                                    omnis iste natus error sit
                                                    voluptatem accusantium
                                                    doloremque laudantium, totam
                                                    rem aperiam, eaque ipsa quae
                                                    ab illo inventore veritatis
                                                    et quasi architecto beatae
                                                    vitae dicta sunt explicabo.
                                                    Nemo enim ipsam voluptatem
                                                    quia voluptas sit aspernatur
                                                    aut odit aut fugit, sed quia
                                                    consequuntur magni dolores
                                                    eos qui ratione voluptatem
                                                    sequi nesciunt. Neque porro
                                                    quisquam est, qui dolorem
                                                    ipsum quia dolor sit amet,
                                                    consectetur, adipisci velit.
                                                </p>
                                            </li>
                                        </ul>

                                        <h1 className="resume-head">
                                            Reference
                                        </h1>
                                        <div className="resume-reference">
                                            <div className="ref">
                                                <h3 className="ren-name">
                                                    <span>Name Surmame</span>
                                                </h3>
                                                <p className="ref-position">
                                                    Job Position | Company Name
                                                </p>
                                                <p className="ref-phone">
                                                    <span>Phone</span>{' '}
                                                    123-456-7890
                                                </p>
                                                <p className="ref-email">
                                                    <span>Email</span>{' '}
                                                    hello@domainname.com
                                                </p>
                                            </div>
                                            <div className="ref">
                                                <h3 className="ren-name">
                                                    <span>Name Surmame</span>
                                                </h3>
                                                <p className="ref-position">
                                                    Job Position | Company Name
                                                </p>
                                                <p className="ref-phone">
                                                    <b>Phone</b> 123-456-7890
                                                </p>
                                                <p className="ref-email">
                                                    <b>Email</b>{' '}
                                                    hello@domainname.com
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handlePrint}>download</button>
                </section>

                <Footer />
            </AppLayout>
        </>
    )
}

export default Template5
