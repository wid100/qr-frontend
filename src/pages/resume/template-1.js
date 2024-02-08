import AppLayout from '@/components/Layouts/AppLayout'
import React from 'react'

const Template1 = () => {
    return (
        <>
            <AppLayout>
                <div className="resume-wrapper">
                    <div className="resume-content">
                        <div className="resume-left">
                            <div className="resume-profile">
                                <div className="resume-img">
                                    <img src="" alt="" />
                                </div>
                            </div>
                            <div className="resume-left-item">
                                <h3>Contract Us</h3>
                                <ul>
                                    <li>
                                        <h4>Phone</h4>
                                        <p>123-456-7890</p>
                                    </li>
                                    <li>
                                        <h4>Email</h4>
                                        <p>mail@domainname.com</p>
                                    </li>
                                    <li>
                                        <h4>Address</h4>
                                        <p>
                                            Banyan View (1st Floor), 50-51,
                                            Janata Co-operative Housing Society,
                                            Ring Road, Mohammadpur, Dhaka,
                                            Bangladesh
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="resume-left-item">
                                <h3>Education</h3>
                                <ul>
                                    <li>
                                        <p>2008</p>
                                        <h4>Enter Your Degree</h4>
                                        <p>Grade University/Collage</p>
                                    </li>
                                    <li>
                                        <p>2008</p>
                                        <h4>Enter Your Degree</h4>
                                        <p>Grade University/Collage</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="resume-left-item">
                                <h3>Skill</h3>
                                <ul className="resume-skill">
                                    <li>
                                        <p>UI/UX</p>
                                        <p>Storyboards</p>
                                    </li>
                                    <li>
                                        <h4>Visual Design</h4>
                                        <p>User Flows</p>
                                    </li>
                                    <li>
                                        <h4>Visual Design</h4>
                                        <p>User Flows</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="resume-left-item">
                                <h3>Language</h3>
                                <ul className="resume-skill">
                                    <li>
                                        <p>English</p>
                                    </li>
                                    <li>
                                        <p>Spanish</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="resume-left-item">
                                <h3>Interest</h3>
                                <ul className="resume-skill">
                                    <li>
                                        <p>Music</p>
                                    </li>
                                    <li>
                                        <p>Singing</p>
                                    </li>
                                    <li>
                                        <p>Reading</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="resume-right"></div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}

export default Template1
