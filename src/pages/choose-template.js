import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const ChooseTemplatePage = () => {
    return (
        <>
            <AppLayout>
                <Head>
                    <title>Choose Template </title>
                </Head>
                <div className="select-qr-wrapper">
                    <div className="container">
                        <div className="choose-template-wrapper">
                            <h1 className="choose-template-title">
                                Choose Resume Template
                            </h1>

                            <div className="choose-template-content">
                                <div className="row">
                                    {chooseData.map((item, id) => (
                                        <div
                                            className="col-lg-3 col-md-6 col-sm-12"
                                            key={id}>
                                            <Link href={item.link}>
                                                <div className="choose-template-item">
                                                    <img
                                                        src={item.img}
                                                        alt="template"
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    )
}

export default ChooseTemplatePage

const chooseData = [
    {
        id: 1,
        link: '/resume/template-1',

        img: '/img/template/1.png',
    },
    {
        id: 2,
        link: '/template-2',
        img: '/img/template/2.png',
    },
    {
        id: 3,
        link: '/template-3',
        img: '/img/template/3.png',
    },
    {
        id: 4,
        link: '/template-4',
        img: '/img/template/4.png',
    },
    {
        id: 5,
        link: '/resume/template-5',
        img: '/img/template/5.png',
    },
    {
        id: 6,
        link: '/template-6',
        img: '/img/template/6.png',
    },
    {
        id: 7,
        link: '/template-7',
        img: '/img/template/7.png',
    },
    {
        id: 8,
        link: '/template-8',
        img: '/img/template/8.png',
    },
    {
        id: 9,
        link: '/template-9',
        img: '/img/template/9.png',
    },
    {
        id: 10,
        link: '/template-10',
        img: '/img/template/10.png',
    },
    {
        id: 11,
        link: '/template-11',
        img: '/img/template/11.png',
    },
    {
        id: 12,
        link: '/template-12',
        img: '/img/template/12.png',
    },
]
