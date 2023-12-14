import axios from 'axios'

const Information = ({ information }) => {
    if (!information) {
        return null
    }

    const divStyle = {
        background: `linear-gradient(133deg, ${information.maincolor} 0%, ${information.gradientcolor} 97.22%)`,
    }
    const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL
    return (
        <div>
            {information ? (
                <section>
                    <div className="view-information">
                        <div className="container p-0">
                            <div className="row">
                                <div className="col-md-12 p-0">
                                    <div className="preview">
                                        <div className="show-preview">
                                            <div
                                                className="my-preview-top"
                                                style={divStyle}>
                                                <div className="preview-image">
                                                    <img
                                                        alt=""
                                                        src={`${baseuri}/${information.image}`}
                                                    />
                                                </div>
                                                <h3 className="name">
                                                    {information.firstname}{' '}
                                                    {information.lastname}
                                                </h3>
                                                <p className="dajignation">
                                                    {information.jobtitle}
                                                </p>
                                                <ul className="social-aciton">
                                                    <li>
                                                        <a
                                                            href={`tel:${information.phone1}`}>
                                                            <img
                                                                src="img/icon/call.svg"
                                                                alt=""
                                                            />
                                                            <p>Call</p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href={`mailto:${information.email1}`}>
                                                            <img
                                                                src="img/icon/telegram2.svg"
                                                                alt=""
                                                            />
                                                            <p>Email</p>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="location:">
                                                            <img
                                                                src="img/icon/location.svg"
                                                                alt=""
                                                            />
                                                            <p>Location</p>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="card-list">
                                                <ul>
                                                    {information.summary ? (
                                                        <li className="card-list-li">
                                                            <div className="preview-info-icon"></div>
                                                            <p>
                                                                {
                                                                    information.summary
                                                                }
                                                            </p>
                                                        </li>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {information.mobile1 ? (
                                                        <li className="card-list-li">
                                                            <div className="preview-info-icon">
                                                                <img
                                                                    src="img/icon/phone.svg"
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
                                                                    src="img/icon/email.svg"
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
                                                    {information.companyName ? (
                                                        <li className="card-list-li">
                                                            <div className="preview-info-icon">
                                                                <img
                                                                    src="img/icon/toffee.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="info-show">
                                                                <p>
                                                                    Company Name
                                                                </p>
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
                                                                    src="img/icon/web.svg"
                                                                    alt=""
                                                                />
                                                            </div>

                                                            <div className="info-show">
                                                                <p>
                                                                    Web address
                                                                </p>
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
                                                    <li className="card-list-li">
                                                        {information.facebook &
                                                        information.github &
                                                        information.twitter &
                                                        information.instagram &
                                                        information.youtube ? (
                                                            <div className="preview-info-icon">
                                                                <img
                                                                    src="img/icon/share.svg"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        ) : (
                                                            ''
                                                        )}
                                                        <div className="info-show border-none">
                                                            <ul>
                                                                {information.facebook ? (
                                                                    <li>
                                                                        <a
                                                                            href={
                                                                                information.facebook
                                                                            }>
                                                                            <img
                                                                                src="img/icon/fb.svg"
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
                                                                                src="img/icon/github.svg"
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
                                                                                src="img/icon/tw.svg"
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
                                                                                src="img/icon/ins.svg"
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
                                                                                src="img/icon/youtube.svg"
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
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <p>No information found</p>
            )}
        </div>
    )
}

Information.getInitialProps = async context => {
    try {
        const { slug } = context.query
        const baseuri = process.env.NEXT_PUBLIC_BACKEND_URL

        const response = await axios.get(`${baseuri}/api/information/${slug}`)
        const information = response.data

        return { information }
    } catch (error) {
        console.error('Error fetching data:', error)
        return { information: null }
    }
}

export default Information
