import React from 'react'

const ChooseTemplatePage = () => {
    return (
        <>
            <div className="select-qr-wrapper">
                <div className="contaner">
                    <div className="form-group-wrapper">
                        <div className="form-group-title">
                            <p>Resume Template</p>
                        </div>

                        <div className="choose-template-content">
                            <div className="row">
                                {
                                    (chooseData.map(item, id) = (
                                        <div
                                            className="col-lg-3 col-md-6 col-sm-12"
                                            key={id}>
                                            <div className="choose-template-item">
                                                <img src={item.img} alt="" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChooseTemplatePage

const chooseData = [
    {
        id: 1,
        link:'/template-1',
        img: '/img/template/1.png',
    },
    {
        id: 2,
        img: '/img/template/2.png',
    },
    {
        id: 3,
        img: '/img/template/3.png',
    },
    {
        id: 4,
        img: '/img/template/4.png',
    },
    {
        id: 5,
        img: '/img/template/5.png',
    },
    {
        id: 6,
        img: '/img/template/6.png',
    },
    {
        id: 7,
        img: '/img/template/7.png',
    },
    {
        id: 8,
        img: '/img/template/8.png',
    },
    {
        id: 9,
        img: '/img/template/9.png',
    },
    {
        id: 10,
        img: '/img/template/10.png',
    },
    {
        id: 11,
        img: '/img/template/11.png',
    },
    {
        id: 12,
        img: '/img/template/12.png',
    },
]
