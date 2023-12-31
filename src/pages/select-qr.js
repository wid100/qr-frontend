import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
const SelectQr = () => {
      const [activeItem, setActiveItem] = useState(null)

      const handleItemClick = itemName => {
          setActiveItem(itemName)
          // Your other logic or actions here
      }
    return (
        <AppLayout>
            <Head>
                <title>Create Smart Card</title>
            </Head>

            <section className="select-qr-wrapper">
                <div className="container">
                    <h4 className="select-qr-title">
                        Select your QR Code type
                    </h4>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-lg-6">
                                    <Link href={'/'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/website.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Website</h4>
                                                <p>
                                                    Link to any page on the web
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6">
                                    <Link href={'/'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/social.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Social Media</h4>
                                                <p>
                                                    Link to your social media
                                                    channels
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6">
                                    <Link href={'/createqr'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/vcard.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>vCard Plus</h4>
                                                <p>
                                                    Share personalized contact
                                                    details
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6">
                                    <Link href={'/'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/instagram.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Instagram</h4>
                                                <p>
                                                    Link to your Instagram
                                                    business page
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6">
                                    <Link href={'/'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/coupon.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Coupons</h4>
                                                <p>
                                                    Share coupons and discounts
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6">
                                    <Link href={'/'}>
                                        <div className="select-qr-item">
                                            <div className="select-qr-item-icon">
                                                <img
                                                    src="/img/icons/facebook.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="select-qr-content">
                                                <h4>Facebook</h4>
                                                <p>
                                                    Get more Likes for your page
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="select-qr-img">
                                <img
                                    src="/img/icons/select-qr-img.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    )
}

export default SelectQr
