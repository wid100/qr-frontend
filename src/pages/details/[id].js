import axios from 'axios'
import Sidebar from 'components/sidebar'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
const QrDetails = ({ qrDetails }) => {
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL

    return (
        <AppLayout>
            <Head>
                <title> Dashboard - Smart Card</title>
            </Head>
            <div>
                <section>
                    <div className="container">
                        <div className="row">
                            <Sidebar />
                            <div className="col-lg-8">
                                <h2 className="my-3 text-color">
                                    QR Details page
                                </h2>

                                <div className="table-wrapper">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        Details Name
                                                    </th>
                                                    <th scope="col">Data</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Card Name</td>
                                                    <td>
                                                        {qrDetails.cardname}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>
                                                        {qrDetails.firstname}{' '}
                                                        {qrDetails.lastname}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Email 1</td>
                                                    <td>{qrDetails.email1}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email 2</td>
                                                    <td>{qrDetails.email2}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phone 1</td>
                                                    <td>{qrDetails.phone1}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phone 2</td>
                                                    <td>{qrDetails.phone2}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mobile 1</td>
                                                    <td>{qrDetails.mobile1}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mobile 2</td>
                                                    <td>{qrDetails.mobile2}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mobile 3</td>
                                                    <td>{qrDetails.mobile3}</td>
                                                </tr>
                                                <tr>
                                                    <td>Mobile 4</td>
                                                    <td>{qrDetails.mobile4}</td>
                                                </tr>
                                                <tr>
                                                    <td>Fax 1</td>
                                                    <td>{qrDetails.fax1}</td>
                                                </tr>
                                                <tr>
                                                    <td>Fax 2</td>
                                                    <td>{qrDetails.fax2}</td>
                                                </tr>

                                                <tr>
                                                    <td>Address 1</td>
                                                    <td>
                                                        {qrDetails.address1}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Address 2</td>
                                                    <td>
                                                        {qrDetails.address2}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Web Address 1</td>
                                                    <td>
                                                        {qrDetails.webaddress1}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Web Address 2</td>
                                                    <td>
                                                        {qrDetails.webaddress2}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Company Name</td>
                                                    <td>
                                                        {qrDetails.companyname}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Job Title</td>
                                                    <td>
                                                        {qrDetails.jobtitle}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Main Color</td>
                                                    <td>
                                                        {qrDetails.maincolor}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Second Color</td>
                                                    <td>
                                                        {
                                                            qrDetails.gradientcolor
                                                        }
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Button Color</td>
                                                    <td>
                                                        {qrDetails.buttoncolor}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Gradient Status</td>
                                                    <td>
                                                        {qrDetails.buttoncolor}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Total Scan</td>
                                                    <td>
                                                        {qrDetails.viewcount}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Card Type </td>
                                                    <td>
                                                        {qrDetails.cardtype}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Facebook </td>
                                                    <td>
                                                        {qrDetails.facebook}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Twitter</td>
                                                    <td>{qrDetails.twitter}</td>
                                                </tr>
                                                <tr>
                                                    <td>Instagram</td>
                                                    <td>
                                                        {qrDetails.instagram}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>YouTube</td>
                                                    <td>{qrDetails.youtube}</td>
                                                </tr>
                                                <tr>
                                                    <td>Github</td>
                                                    <td>{qrDetails.github}</td>
                                                </tr>
                                                <tr>
                                                    <td>Profile Image</td>
                                                    <td>
                                                        <img
                                                            src={`${baseuri}/${qrDetails.image}`}
                                                            alt=""
                                                            width={100}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Logo</td>
                                                    <td>
                                                        <img
                                                            src={`${baseuri}/${qrDetails.welcome}`}
                                                            alt=""
                                                            width={100}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    )
}

export async function getServerSideProps({ params }) {
    const { id } = params
    const baseUri = process.env.NEXT_PUBLIC_BACKEND_URL

    try {
        const response = await axios.get(`${baseUri}/api/qr-details/${id}`)
        const qrDetails = response.data.qrDetails

        return {
            props: {
                qrDetails,
            },
        }
    } catch (error) {
        console.error('Error fetching Qr Details:', error)

        return {
            notFound: true,
        }
    }
}

export default QrDetails
