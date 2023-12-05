import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>

            <header>
                <div className="container">
                    <div className="home-header">
                        <div className="logo">
                            <Link href={'/'}>
                                <img src="img/logo.png" alt="" />
                            </Link>
                        </div>

                        <div className="menu">
                            <ul>
                                {user ? (
                                    <li className="custom-btn">
                                        <Link href="/dashboard">Dashboard</Link>
                                    </li>
                                ) : (
                                    <>
                                        <li className="custom-btn">
                                            <Link href={'/login'}>Login</Link>
                                        </li>
                                        <li className="custom-btn">
                                            <Link href={'/registar'}>
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <section>
                <div className="hero-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="hero-content">
                                    <h1>How can we use vCard Plus</h1>
                                    <p>
                                        QR Code is a two-dimensional version of
                                        the barcode, typically made up of black
                                        and white pixel patterns. Denso Wave, a
                                        Japanese subsidiary of the Toyota
                                        supplier Denso, developed them for
                                        marking components.
                                    </p>
                                    <button className="hero-btn">
                                        SIGN UP FOR FREE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
