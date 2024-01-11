import AppLayout from '@/components/Layouts/AppLayout'
// import axios from 'axios'
// const ProductDetailsPage = ({ information }) => {
//     if (!information) {
//         return null
//     }

//     const divStyle = {
//         background: `linear-gradient(133deg, ${information.maincolor} 0%, ${information.gradientcolor} 97.22%)`,
//     }
//     const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
//     return (
//         <AppLayout>
//             <div>
//                 {information ? (
//                     <section>
//                         <div className="view-information">
//                             <div className="view-information-wrraper">
//                                 <div className="preview">
//                                     <div className="show-preview">
//                                         <div
//                                             className="view-header-item"
//                                             style={divStyle}>
//                                             <div className="my-preview-top">
//                                                 <div className="preview-image">
//                                                     <img
//                                                         alt=""
//                                                         src={`${baseuri}/${information.image}`}
//                                                     />
//                                                 </div>
//                                                 <h3 className="name">
//                                                     {information.firstname}{' '}
//                                                     {information.lastname}
//                                                 </h3>
//                                                 <p className="dajignation">
//                                                     {information.jobtitle}
//                                                 </p>
//                                                 <ul className="social-aciton">
//                                                     <li>
//                                                         <a
//                                                             href={`tel:${information.phone1}`}>
//                                                             <img
//                                                                 src="/img/icon/call.svg"
//                                                                 alt=""
//                                                             />
//                                                             <p>Call</p>
//                                                         </a>
//                                                     </li>
//                                                     <li>
//                                                         <a
//                                                             href={`mailto:${information.email1}`}>
//                                                             <img
//                                                                 src="/img/icon/telegram2.svg"
//                                                                 alt=""
//                                                             />
//                                                             <p>Email</p>
//                                                         </a>
//                                                     </li>
                     
//                                                 </ul>
//                                             </div>
//                                         </div>
//                                         <div className="card-list view-body-item">
//                                             <div className="view-summary-title">
//                                                 {information.summary ? (
//                                                     <h4>
//                                                         {information.summary}
//                                                     </h4>
//                                                 ) : (
//                                                     ''
//                                                 )}
//                                             </div>
//                                             <ul>
//                                                 {information.mobile1 ? (
//                                                     <li className="card-list-li">
//                                                         <div className="preview-info-icon">
//                                                             <img
//                                                                 src="/img/icon/phone.svg"
//                                                                 alt=""
//                                                             />
//                                                         </div>
//                                                         <div className="info-show">
//                                                             <p>Mobile</p>

//                                                             <a
//                                                                 href={`tel:${information.mobile1}`}>
//                                                                 {
//                                                                     information.mobile1
//                                                                 }
//                                                             </a>
//                                                         </div>
//                                                     </li>
//                                                 ) : (
//                                                     ''
//                                                 )}
//                                                 {information.email1 ? (
//                                                     <li className="card-list-li">
//                                                         <div className="preview-info-icon">
//                                                             <img
//                                                                 src="/img/icon/email.svg"
//                                                                 alt=""
//                                                             />
//                                                         </div>
//                                                         <div className="info-show">
//                                                             <p>Email</p>
//                                                             <a
//                                                                 href={`mailto:${information.email1}`}>
//                                                                 {
//                                                                     information.email1
//                                                                 }
//                                                             </a>
//                                                         </div>
//                                                     </li>
//                                                 ) : (
//                                                     ''
//                                                 )}
//                                                 {information.address1 ? (
//                                                     <li className="card-list-li">
//                                                         <div className="preview-info-icon">
//                                                             <img
//                                                                 src="/img/icon/toffee.svg"
//                                                                 alt=""
//                                                             />
//                                                         </div>
//                                                         <div className="info-show">
//                                                             <p>Address</p>
//                                                             <p>
//                                                                 {
//                                                                     information.address1
//                                                                 }
//                                                             </p>
//                                                         </div>
//                                                     </li>
//                                                 ) : (
//                                                     ''
//                                                 )}
//                                                 {information.companyName ? (
//                                                     <li className="card-list-li">
//                                                         <div className="preview-info-icon">
//                                                             <img
//                                                                 src="/img/icon/toffee.svg"
//                                                                 alt=""
//                                                             />
//                                                         </div>
//                                                         <div className="info-show">
//                                                             <p>Company Name</p>
//                                                             <a
//                                                                 href={
//                                                                     information.webaddress2
//                                                                 }>
//                                                                 {
//                                                                     information.companyName
//                                                                 }
//                                                             </a>
//                                                         </div>
//                                                     </li>
//                                                 ) : (
//                                                     ''
//                                                 )}
//                                                 {information.webaddress2 ? (
//                                                     <li className="card-list-li">
//                                                         <div className="preview-info-icon">
//                                                             <img
//                                                                 src="/img/icon/web.svg"
//                                                                 alt=""
//                                                             />
//                                                         </div>

//                                                         <div className="info-show">
//                                                             <p>Web address</p>
//                                                             <a
//                                                                 href={
//                                                                     information.webaddress2
//                                                                 }>
//                                                                 {
//                                                                     information.webaddress2
//                                                                 }
//                                                             </a>
//                                                         </div>
//                                                     </li>
//                                                 ) : (
//                                                     ''
//                                                 )}

//                                                 <li className="view-card-social">
//                                                     {information.facebook &
//                                                     information.github &
//                                                     information.twitter &
//                                                     information.instagram &
//                                                     information.youtube ? (
//                                                         <div className="preview-info-icon">
//                                                             <img
//                                                                 src="/img/icon/share.svg"
//                                                                 alt=""
//                                                             />
//                                                         </div>
//                                                     ) : (
//                                                         ''
//                                                     )}
//                                                     <h4>Social Media</h4>
//                                                     <div className="info-show border-none">
//                                                         <ul>
//                                                             {information.facebook ? (
//                                                                 <li>
//                                                                     <a
//                                                                         href={
//                                                                             information.facebook
//                                                                         }>
//                                                                         <img
//                                                                             src="/img/icon/fb.svg"
//                                                                             alt=""
//                                                                         />
//                                                                     </a>
//                                                                 </li>
//                                                             ) : (
//                                                                 ''
//                                                             )}
//                                                             {information.github ? (
//                                                                 <li>
//                                                                     <a
//                                                                         href={
//                                                                             information.github
//                                                                         }>
//                                                                         <img
//                                                                             src="/img/icon/github.svg"
//                                                                             alt=""
//                                                                         />
//                                                                     </a>
//                                                                 </li>
//                                                             ) : (
//                                                                 ''
//                                                             )}
//                                                             {information.twitter ? (
//                                                                 <li>
//                                                                     <a
//                                                                         href={
//                                                                             information.twitter
//                                                                         }>
//                                                                         <img
//                                                                             src="/img/icon/tw.svg"
//                                                                             alt=""
//                                                                         />
//                                                                     </a>
//                                                                 </li>
//                                                             ) : (
//                                                                 ''
//                                                             )}
//                                                             {information.instagram ? (
//                                                                 <li>
//                                                                     <a
//                                                                         href={
//                                                                             information.instagram
//                                                                         }>
//                                                                         <img
//                                                                             src="/img/icon/ins.svg"
//                                                                             alt=""
//                                                                         />
//                                                                     </a>
//                                                                 </li>
//                                                             ) : (
//                                                                 ''
//                                                             )}
//                                                             {information.youtube ? (
//                                                                 <li>
//                                                                     <a
//                                                                         href={
//                                                                             information.youtube
//                                                                         }>
//                                                                         <img
//                                                                             src="/img/icon/youtube.svg"
//                                                                             alt=""
//                                                                         />
//                                                                     </a>
//                                                                 </li>
//                                                             ) : (
//                                                                 ''
//                                                             )}
//                                                         </ul>
//                                                     </div>
//                                                 </li>
//                                             </ul>
//                                             <div className="view-btn-item">
//                                                 <div className="view-card-btn">
//                                                     <button>
//                                                         <svg
//                                                             width="24"
//                                                             height="24"
//                                                             viewBox="0 0 24 24"
//                                                             fill="none"
//                                                             xmlns="http://www.w3.org/2000/svg">
//                                                             <path
//                                                                 d="M12 18L4.5 10.5L6.6 8.325L10.5 12.225V0H13.5V12.225L17.4 8.325L19.5 10.5L12 18ZM3 24C2.175 24 1.469 23.7065 0.882 23.1195C0.295 22.5325 0.001 21.826 0 21V16.5H3V21H21V16.5H24V21C24 21.825 23.7065 22.5315 23.1195 23.1195C22.5325 23.7075 21.826 24.001 21 24H3Z"
//                                                                 fill="white"
//                                                             />
//                                                         </svg>
//                                                         <span>
//                                                             DOWNLOAD VCARD
//                                                         </span>
//                                                     </button>
//                                                 </div>
//                                                 <div className="view-card-btn view-card-btn-share">
//                                                     <button>
//                                                         <svg
//                                                             xmlns="http://www.w3.org/2000/svg"
//                                                             width="24"
//                                                             height="24"
//                                                             viewBox="0 0 24 24"
//                                                             fill="none">
//                                                             <path
//                                                                 d="M20.2476 1.50026C19.6509 1.50026 19.0787 1.73728 18.6568 2.15918C18.2349 2.58108 17.9979 3.15329 17.9979 3.74995C17.9979 4.3466 18.2349 4.91882 18.6568 5.34071C19.0787 5.76261 19.6509 5.99963 20.2476 5.99963C20.8442 5.99963 21.4164 5.76261 21.8383 5.34071C22.2602 4.91882 22.4972 4.3466 22.4972 3.74995C22.4972 3.15329 22.2602 2.58108 21.8383 2.15918C21.4164 1.73728 20.8442 1.50026 20.2476 1.50026ZM16.4981 3.74995C16.498 2.87022 16.8072 2.01846 17.3717 1.3437C17.9361 0.668937 18.7199 0.214136 19.5858 0.0588685C20.4517 -0.0963994 21.3447 0.057753 22.1084 0.494355C22.8721 0.930958 23.458 1.62221 23.7636 2.44717C24.0692 3.27212 24.0749 4.17826 23.7799 5.00703C23.4848 5.8358 22.9077 6.53444 22.1496 6.98071C21.3915 7.42698 20.5006 7.59246 19.6327 7.4482C18.7649 7.30395 17.9754 6.85914 17.4025 6.1916L7.32687 10.8709C7.5585 11.605 7.5585 12.3926 7.32687 13.1266L17.4025 17.806C18.0081 17.1016 18.8538 16.6471 19.7754 16.5306C20.6971 16.4142 21.6292 16.644 22.391 17.1756C23.1529 17.7072 23.6903 18.5027 23.899 19.4079C24.1078 20.3132 23.9731 21.2637 23.521 22.0752C23.0689 22.8868 22.3316 23.5016 21.452 23.8006C20.5724 24.0995 19.6132 24.0613 18.7602 23.6933C17.9072 23.3253 17.2212 22.6537 16.8351 21.8087C16.449 20.9637 16.3904 20.0055 16.6706 19.1198L6.59497 14.4404C6.0962 15.0217 5.43136 15.4363 4.68991 15.6284C3.94845 15.8205 3.16595 15.7809 2.44766 15.515C1.72937 15.2491 1.10976 14.7695 0.672165 14.1409C0.234573 13.5123 0 12.7647 0 11.9988C0 11.2329 0.234573 10.4853 0.672165 9.85666C1.10976 9.22803 1.72937 8.7485 2.44766 8.48256C3.16595 8.21663 3.94845 8.17706 4.68991 8.36917C5.43136 8.56128 6.0962 8.97586 6.59497 9.55713L16.6706 4.87779C16.5559 4.51284 16.4977 4.13249 16.4981 3.74995ZM3.74987 9.7491C3.15322 9.7491 2.581 9.98612 2.15911 10.408C1.73721 10.8299 1.50019 11.4021 1.50019 11.9988C1.50019 12.5954 1.73721 13.1677 2.15911 13.5896C2.581 14.0115 3.15322 14.2485 3.74987 14.2485C4.34653 14.2485 4.91874 14.0115 5.34064 13.5896C5.76254 13.1677 5.99956 12.5954 5.99956 11.9988C5.99956 11.4021 5.76254 10.8299 5.34064 10.408C4.91874 9.98612 4.34653 9.7491 3.74987 9.7491ZM20.2476 17.9979C19.6509 17.9979 19.0787 18.235 18.6568 18.6569C18.2349 19.0788 17.9979 19.651 17.9979 20.2476C17.9979 20.8443 18.2349 21.4165 18.6568 21.8384C19.0787 22.2603 19.6509 22.4973 20.2476 22.4973C20.8442 22.4973 21.4164 22.2603 21.8383 21.8384C22.2602 21.4165 22.4972 20.8443 22.4972 20.2476C22.4972 19.651 22.2602 19.0788 21.8383 18.6569C21.4164 18.235 20.8442 17.9979 20.2476 17.9979Z"
//                                                                 fill="#000"
//                                                             />
//                                                         </svg>
//                                                         <span>
//                                                             SHARE THIS PAGE
//                                                         </span>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 ) : (
//                     <p>No information found</p>
//                 )}
//             </div>
//         </AppLayout>
//     )
// }

// ProductDetailsPage.getInitialProps = async context => {
//     try {
//         const { slug } = context.query
//         const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL

//         const response = await axios.get(`${baseuri}/api/information/${slug}`)
//         const information = response.data

//         return { information }
//     } catch (error) {
//         console.error('Error fetching data:', error)
//         return { information: null }
//     }
// }

// export default ProductDetailsPage

import React from 'react'

const index = () => {
  return (
    <AppLayout>

               <section>
                        <div className="view-information">
                            <div className="view-information-wrraper">
                                <div className="preview">
                                    <div className="show-preview">
                                        <div
                                            className="view-header-item"
                                           >
                                            <div className="my-preview-top">
                                                <div className="preview-image">
                                                    <img
                                                        alt=""
                                                        src='/img/product/shop.png'
                                                    />
                                                </div>
                                                <h3 className="name">
                                   
                                                </h3>
                                                {/* <p className="dajignation">
                                                    {information.jobtitle}
                                                </p>
                                                <ul className="social-aciton">
                                                    <li>
                                                        <a
                                                            href={`tel:${information.phone1}`}>
                                                            <img
                                                                src="/img/icon/call.svg"
                                                                alt=""
                                                            />
                                                            <p>Call</p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href={`mailto:${information.email1}`}>
                                                            <img
                                                                src="/img/icon/telegram2.svg"
                                                                alt=""
                                                            />
                                                            <p>Email</p>
                                                        </a>
                                                    </li>
                     
                                                </ul> */}
                                            </div>
                                        </div>
                                        <div className="card-list view-body-item">
                                            {/* <div className="view-summary-title">
                                                {information.summary ? (
                                                    <h4>
                                                        {information.summary}
                                                    </h4>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                            <ul>
                                                {information.mobile1 ? (
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="/img/icon/phone.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Mobile</p>

                                                            <a
                                                                href={`tel:${information.mobile1}`}>
                                                                {
                                                                    information.mobile1
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                ) : (
                                                    ''
                                                )}
                                                {information.email1 ? (
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="/img/icon/email.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Email</p>
                                                            <a
                                                                href={`mailto:${information.email1}`}>
                                                                {
                                                                    information.email1
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                ) : (
                                                    ''
                                                )}
                                                {information.address1 ? (
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="/img/icon/toffee.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Address</p>
                                                            <p>
                                                                {
                                                                    information.address1
                                                                }
                                                            </p>
                                                        </div>
                                                    </li>
                                                ) : (
                                                    ''
                                                )}
                                                {information.companyName ? (
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="/img/icon/toffee.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-show">
                                                            <p>Company Name</p>
                                                            <a
                                                                href={
                                                                    information.webaddress2
                                                                }>
                                                                {
                                                                    information.companyName
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                ) : (
                                                    ''
                                                )}
                                                {information.webaddress2 ? (
                                                    <li className="card-list-li">
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="/img/icon/web.svg"
                                                                alt=""
                                                            />
                                                        </div>

                                                        <div className="info-show">
                                                            <p>Web address</p>
                                                            <a
                                                                href={
                                                                    information.webaddress2
                                                                }>
                                                                {
                                                                    information.webaddress2
                                                                }
                                                            </a>
                                                        </div>
                                                    </li>
                                                ) : (
                                                    ''
                                                )}

                                                <li className="view-card-social">
                                                    {information.facebook &
                                                    information.github &
                                                    information.twitter &
                                                    information.instagram &
                                                    information.youtube ? (
                                                        <div className="preview-info-icon">
                                                            <img
                                                                src="/img/icon/share.svg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    ) : (
                                                        ''
                                                    )}
                                                    <h4>Social Media</h4>
                                                    <div className="info-show border-none">
                                                        <ul>
                                                            {information.facebook ? (
                                                                <li>
                                                                    <a
                                                                        href={
                                                                            information.facebook
                                                                        }>
                                                                        <img
                                                                            src="/img/icon/fb.svg"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </li>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.github ? (
                                                                <li>
                                                                    <a
                                                                        href={
                                                                            information.github
                                                                        }>
                                                                        <img
                                                                            src="/img/icon/github.svg"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </li>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.twitter ? (
                                                                <li>
                                                                    <a
                                                                        href={
                                                                            information.twitter
                                                                        }>
                                                                        <img
                                                                            src="/img/icon/tw.svg"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </li>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.instagram ? (
                                                                <li>
                                                                    <a
                                                                        href={
                                                                            information.instagram
                                                                        }>
                                                                        <img
                                                                            src="/img/icon/ins.svg"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </li>
                                                            ) : (
                                                                ''
                                                            )}
                                                            {information.youtube ? (
                                                                <li>
                                                                    <a
                                                                        href={
                                                                            information.youtube
                                                                        }>
                                                                        <img
                                                                            src="/img/icon/youtube.svg"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </li>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul> */}
                                            <div className="view-btn-item">
                                                <div className="view-card-btn">
                                                    <button>
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M12 18L4.5 10.5L6.6 8.325L10.5 12.225V0H13.5V12.225L17.4 8.325L19.5 10.5L12 18ZM3 24C2.175 24 1.469 23.7065 0.882 23.1195C0.295 22.5325 0.001 21.826 0 21V16.5H3V21H21V16.5H24V21C24 21.825 23.7065 22.5315 23.1195 23.1195C22.5325 23.7075 21.826 24.001 21 24H3Z"
                                                                fill="white"
                                                            />
                                                        </svg>
                                                        <span>
                                                            DOWNLOAD VCARD
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="view-card-btn view-card-btn-share">
                                                    <button>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none">
                                                            <path
                                                                d="M20.2476 1.50026C19.6509 1.50026 19.0787 1.73728 18.6568 2.15918C18.2349 2.58108 17.9979 3.15329 17.9979 3.74995C17.9979 4.3466 18.2349 4.91882 18.6568 5.34071C19.0787 5.76261 19.6509 5.99963 20.2476 5.99963C20.8442 5.99963 21.4164 5.76261 21.8383 5.34071C22.2602 4.91882 22.4972 4.3466 22.4972 3.74995C22.4972 3.15329 22.2602 2.58108 21.8383 2.15918C21.4164 1.73728 20.8442 1.50026 20.2476 1.50026ZM16.4981 3.74995C16.498 2.87022 16.8072 2.01846 17.3717 1.3437C17.9361 0.668937 18.7199 0.214136 19.5858 0.0588685C20.4517 -0.0963994 21.3447 0.057753 22.1084 0.494355C22.8721 0.930958 23.458 1.62221 23.7636 2.44717C24.0692 3.27212 24.0749 4.17826 23.7799 5.00703C23.4848 5.8358 22.9077 6.53444 22.1496 6.98071C21.3915 7.42698 20.5006 7.59246 19.6327 7.4482C18.7649 7.30395 17.9754 6.85914 17.4025 6.1916L7.32687 10.8709C7.5585 11.605 7.5585 12.3926 7.32687 13.1266L17.4025 17.806C18.0081 17.1016 18.8538 16.6471 19.7754 16.5306C20.6971 16.4142 21.6292 16.644 22.391 17.1756C23.1529 17.7072 23.6903 18.5027 23.899 19.4079C24.1078 20.3132 23.9731 21.2637 23.521 22.0752C23.0689 22.8868 22.3316 23.5016 21.452 23.8006C20.5724 24.0995 19.6132 24.0613 18.7602 23.6933C17.9072 23.3253 17.2212 22.6537 16.8351 21.8087C16.449 20.9637 16.3904 20.0055 16.6706 19.1198L6.59497 14.4404C6.0962 15.0217 5.43136 15.4363 4.68991 15.6284C3.94845 15.8205 3.16595 15.7809 2.44766 15.515C1.72937 15.2491 1.10976 14.7695 0.672165 14.1409C0.234573 13.5123 0 12.7647 0 11.9988C0 11.2329 0.234573 10.4853 0.672165 9.85666C1.10976 9.22803 1.72937 8.7485 2.44766 8.48256C3.16595 8.21663 3.94845 8.17706 4.68991 8.36917C5.43136 8.56128 6.0962 8.97586 6.59497 9.55713L16.6706 4.87779C16.5559 4.51284 16.4977 4.13249 16.4981 3.74995ZM3.74987 9.7491C3.15322 9.7491 2.581 9.98612 2.15911 10.408C1.73721 10.8299 1.50019 11.4021 1.50019 11.9988C1.50019 12.5954 1.73721 13.1677 2.15911 13.5896C2.581 14.0115 3.15322 14.2485 3.74987 14.2485C4.34653 14.2485 4.91874 14.0115 5.34064 13.5896C5.76254 13.1677 5.99956 12.5954 5.99956 11.9988C5.99956 11.4021 5.76254 10.8299 5.34064 10.408C4.91874 9.98612 4.34653 9.7491 3.74987 9.7491ZM20.2476 17.9979C19.6509 17.9979 19.0787 18.235 18.6568 18.6569C18.2349 19.0788 17.9979 19.651 17.9979 20.2476C17.9979 20.8443 18.2349 21.4165 18.6568 21.8384C19.0787 22.2603 19.6509 22.4973 20.2476 22.4973C20.8442 22.4973 21.4164 22.2603 21.8383 21.8384C22.2602 21.4165 22.4972 20.8443 22.4972 20.2476C22.4972 19.651 22.2602 19.0788 21.8383 18.6569C21.4164 18.235 20.8442 17.9979 20.2476 17.9979Z"
                                                                fill="#000"
                                                            />
                                                        </svg>
                                                        <span>
                                                            SHARE THIS PAGE
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
    </AppLayout>
  )
}

export default index