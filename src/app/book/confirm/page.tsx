'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BookingData {
  route: any;
  trip: any;
  bookingCode: string;
}

export default function ConfirmPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [whatsappUpdates, setWhatsappUpdates] = useState(false);

  useEffect(() => {
    const pendingBooking = sessionStorage.getItem('pendingBooking');
    if (pendingBooking) {
      setBookingData(JSON.parse(pendingBooking));
    } else {
      router.push('/book');
    }
  }, [router]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to "database" (sessionStorage for demo)
    sessionStorage.setItem('lastBooking', JSON.stringify(bookingData));
    sessionStorage.removeItem('pendingBooking');
    
    setIsProcessing(false);
    router.push(`/book/tracking/${bookingData?.bookingCode}`);
  };

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
          <h1 className="text-xl font-bold text-blue-600 text-center">Confirm Booking</h1>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Trip Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Trip Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Route:</span>
              <span className="font-semibold">{bookingData.route.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Time:</span>
              <span className="font-semibold">{bookingData.trip.time}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span className="font-semibold">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Seats:</span>
              <span className="font-semibold">1</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">R {bookingData.route.price}.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Updates */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="whatsapp-updates"
              checked={whatsappUpdates}
              onChange={(e) => setWhatsappUpdates(e.target.checked)}
              className="h-5 w-5 text-blue-600 rounded"
            />
            <label htmlFor="whatsapp-updates" className="text-sm text-gray-700">
              Receive WhatsApp updates about my trip
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Get real-time updates, boarding reminders, and tracking links via WhatsApp
          </p>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-green-600 text-white p-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </>
          ) : (
            'Pay Now & Confirm Booking'
          )}
        </button>

        {/* Booking Code Preview */}
        <div className="text-center mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Your booking code will be:</p>
          <div className="bg-white p-3 rounded-lg border-2 border-dashed border-blue-300">
            <span className="font-mono font-bold text-blue-600 text-lg">
              {bookingData.bookingCode}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Show this to the bus driver</p>
        </div>
      </div>
    </div>
  );
}