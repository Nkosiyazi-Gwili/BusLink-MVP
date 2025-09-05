import Link from 'next/link';
import USSDSimulator from '@/components/ussd-simulator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="w-full bg-white shadow-sm p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">BusLink</h1>
          <nav className="hidden md:flex space-x-6">
            <Link href="/admin/login" className="text-gray-600 hover:text-blue-600">
              Admin
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Welcome to BusLink
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-8">
            Affordable, reliable bus travel across South Africa
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg shadow-lg transition-colors"
            >
              Book Your Trip Online
            </Link>
          </div>
        </div>

        {/* USSD Simulator Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-4">
            Try Our USSD Booking
          </h3>
          <div className="flex justify-center">
            <USSDSimulator />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16 px-2 sm:px-0">
          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">📱</span>
            </div>
            <h4 className="font-bold text-lg mb-2">No App Needed</h4>
            <p className="text-gray-600 text-sm sm:text-base">
              Book via USSD or web browser - no downloads required.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">📍</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Live Tracking</h4>
            <p className="text-gray-600 text-sm sm:text-base">
              Track your bus in real-time and know exactly when it will arrive.
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold">🛡️</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Anti-Corruption</h4>
            <p className="text-gray-600 text-sm sm:text-base">
              Advanced systems ensure transparency and prevent fraud.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
