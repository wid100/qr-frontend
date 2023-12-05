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
                                            <div className="row">
                                                <div className="col-3"></div>
                                                <div className="col-9">
                                                    <div className="show-summery info-show">
                                                        <p>
                                                            {
                                                                information.summary
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="preview-info-icon">
                                                        <img
                                                            src="img/icon/phone.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-9">
                                                    <div className="info-show">
                                                        <a
                                                            href={`tel:${information.phone1}`}>
                                                            {information.phone1}
                                                        </a>
                                                        <p>Mobile</p>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="preview-info-icon">
                                                        <img
                                                            src="img/icon/email.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-9">
                                                    <div className="info-show">
                                                        <a
                                                            href={`mailto:${information.email1}`}>
                                                            {information.email1}
                                                        </a>
                                                        <p>Email</p>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="preview-info-icon">
                                                        <img
                                                            src="img/icon/toffee.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-9">
                                                    <div className="info-show">
                                                        <a
                                                            href={
                                                                information.webaddress1
                                                            }>
                                                            {
                                                                information.webaddress1
                                                            }
                                                        </a>
                                                        <p>
                                                            {
                                                                information.companyname
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="preview-info-icon">
                                                        <img
                                                            src="img/icon/web.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-9">
                                                    <div className="info-show">
                                                        <a
                                                            href={
                                                                information.webaddress1
                                                            }>
                                                            {
                                                                information.webaddress1
                                                            }
                                                        </a>
                                                        <p>Web address</p>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="preview-info-icon">
                                                        <img
                                                            src="img/icon/share.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-9">
                                                    <div className="info-show border-none">
                                                        <ul>
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
                                                        </ul>
                                                    </div>
                                                </div>
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
