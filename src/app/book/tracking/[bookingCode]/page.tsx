'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface BookingData {
  route: any;
  trip: any;
  bookingCode: string;
}

export default function TrackingPage() {
  const params = useParams();
  const bookingCode = params.bookingCode as string;
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  useEffect(() => {
    const lastBooking = sessionStorage.getItem('lastBooking');
    if (lastBooking) {
      setBookingData(JSON.parse(lastBooking));
    }
  }, []);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-blue-600 text-center">Live Tracking</h1>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Booking Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">✅</span>
            </div>
            <h2 className="text-lg font-semibold text-green-600">Booking Confirmed!</h2>
            <p className="text-sm text-gray-600">Your trip is being prepared</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking Code:</span>
              <span className="font-mono font-bold">{bookingData.bookingCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Route:</span>
              <span>{bookingData.route.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Departure:</span>
              <span>{bookingData.trip.time}</span>
            </div>
          </div>
        </div>

        {/* Live Tracking Placeholder */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Live Tracking</h3>
          
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📍</span>
            </div>
            <p className="text-gray-600 mb-2">Live tracking will be available</p>
            <p className="text-sm text-gray-500">30 minutes before departure</p>
            
            <div className="mt-6 p-3 bg-yellow-100 rounded-lg">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Next:</span> Track your bus in real-time
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Confirmation */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-600 mb-4">
            We'll send you WhatsApp updates with tracking links and boarding reminders.
          </p>
          
          <div className="bg-green-50 p-3 rounded-lg flex items-center space-x-3">
            <span className="text-2xl">💬</span>
            <div>
              <p className="text-sm font-semibold">WhatsApp Updates Enabled</p>
              <p className="text-xs text-gray-600">You'll receive real-time notifications</p>
              <p className="text-xs text-gray-600">
                <Link
                href={`/ride-complete/${bookingData.bookingCode}`}
                className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center block mt-4"
                >
                Complete Ride & Provide Feedback
                </Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}