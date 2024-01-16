import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="py-6 footer">
                <div className="container">
                    <div className="footer-content-wrapper">
                        <div className="footer-logo">
                            <img src="/img/logo.png" alt="" />
                        </div>
                        <div className="footer-menu">
                            <ul>
                                <li>
                                    <a href="">Terms of Service</a>
                                </li>
                                <li>
                                    <a href=""> Legal Notice</a>
                                </li>
                                <li>
                                    <a href="">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="">Cookie Policy</a>
                                </li>
                            </ul>
                        </div>
                        <p>© 2024 All Rights Reserved</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
