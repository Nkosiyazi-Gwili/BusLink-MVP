import Image from "next/image";
import Link from "next/link";
import USSDSimulator from "@/components/ussd-simulator";
import LayoutWrapper, { CenteredContent, Card } from "@/components/LayoutWrapper";

export default function Home() {
  return (
    <LayoutWrapper>
      {/* Header */}
      <header className="w-full bg-white shadow-sm mb-8">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.jpeg"       // ✅ Correct path to /public/logo.jpeg
              alt="BusLink Logo"
              width={150}             // Adjust size as needed
              height={150}
              className="rounded-full"
            />
            <h2 className="text-4xl font-bold text-gray-800 mb-0 text-center">
              Welcome to BusLink
            </h2>
          </div>
        </div>
      </header>

      <CenteredContent>
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Affordable, reliable bus travel across South Africa. Book via USSD or web app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/admin/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-colors transform hover:scale-105"
            >
              Dashboard
            </Link>
            <Link
              href="/book"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-colors transform hover:scale-105"
            >
              Book Your Trip Online
            </Link>
          </div>
        </div>

        {/* USSD Simulator Section */}
        <Card className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Try Our USSD Booking
          </h3>
          <div className="flex justify-center">
            <USSDSimulator />
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl">📱</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-800">No App Needed</h4>
            <p className="text-gray-600">Book via USSD or web browser - no downloads required.</p>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">📍</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-800">Live Tracking</h4>
            <p className="text-gray-600">Track your bus in real-time and know exactly when it will arrive.</p>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-600 text-2xl">🛡️</span>
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-800">Anti-Corruption</h4>
            <p className="text-gray-600">Advanced systems ensure transparency and prevent fraud.</p>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Travel?</h3>
          <p className="mb-6 opacity-90">Join thousands of satisfied passengers across South Africa</p>
          <Link
            href="/book"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Now
          </Link>
        </Card>
      </CenteredContent>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-600">
        <p>© 2024 BusLink. All rights reserved.</p>
      </footer>
    </LayoutWrapper>
  );
}
