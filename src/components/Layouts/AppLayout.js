import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import Footer from './Footer'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            {/* Page Content */}
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default AppLayout
