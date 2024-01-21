import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
// if (typeof window !== 'undefined') {
//     require('bootstrap/dist/js/bootstrap.bundle.min.js')
// }
import '../style/layout.css'
import '../style/master.css'
import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }) => {
    useEffect(() => {
        // Initialize AOS when the component mounts
        AOS.init()

        // Import Bootstrap JS when the component mounts
        import('bootstrap/dist/js/bootstrap.bundle.min.js')
    }, [])

    return <Component {...pageProps} />
}

export default App
