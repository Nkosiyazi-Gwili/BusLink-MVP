'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface RideData {
  bookingCode: string;
  route: string;
  departureTime: string;
  fare: number;
  passengerName: string;
  completedAt: string;
}

// Fallback mock data in case import fails
const fallbackMockBookings = [
  {
    id: 'book-001',
    bookingCode: 'WEB-X5J3',
    route: 'Cape Town to Stellenbosch',
    departureTime: '08:00 AM',
    passengerName: 'James Wilson',
    passengerContact: '+27 71 234 5678',
    fare: 50,
    status: 'confirmed',
    bookingDate: '2024-01-20',
    paymentMethod: 'mobile'
  },
  {
    id: 'book-002',
    bookingCode: 'WEB-Y8K2',
    route: 'Johannesburg to Pretoria',
    departureTime: '07:30 AM',
    passengerName: 'Maria Garcia',
    passengerContact: '+27 82 345 6789',
    fare: 75,
    status: 'completed',
    bookingDate: '2024-01-20',
    paymentMethod: 'card'
  }
];

const fallbackMockRoutes = [
  { id: 1, name: 'Cape Town to Stellenbosch', price: 50 },
  { id: 2, name: 'Johannesburg to Pretoria', price: 75 },
  { id: 3, name: 'Durban to Pietermaritzburg', price: 45 },
];

export default function RideCompletePage() {
  const params = useParams();
  const router = useRouter();
  const bookingCode = params.bookingCode as string;
  
  const [rideData, setRideData] = useState<RideData | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [donate, setDonate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Simulate fetching ride data
    const completedRide = sessionStorage.getItem(`completed_ride_${bookingCode}`);
    
    if (completedRide) {
      setRideData(JSON.parse(completedRide));
    } else {
      // For demo purposes, create mock ride data
      // Use fallback data if imported data is not available
      let mockBookings;
      let mockRoutes;
      
      try {
        // Try to import the data, but use fallback if it fails
        const importedData = require('@/lib/mock-data');
        mockBookings = importedData.mockBookings || fallbackMockBookings;
        mockRoutes = importedData.mockRoutes || fallbackMockRoutes;
      } catch (error) {
        mockBookings = fallbackMockBookings;
        mockRoutes = fallbackMockRoutes;
      }

      const mockBooking = mockBookings.find((b: any) => b.bookingCode === bookingCode);
      
      if (mockBooking) {
        const route = mockRoutes.find((r: any) => r.name === mockBooking.route);
        const rideData: RideData = {
          bookingCode: mockBooking.bookingCode,
          route: mockBooking.route,
          departureTime: mockBooking.departureTime,
          fare: mockBooking.fare,
          passengerName: mockBooking.passengerName,
          completedAt: new Date().toISOString()
        };
        setRideData(rideData);
        sessionStorage.setItem(`completed_ride_${bookingCode}`, JSON.stringify(rideData));
      } else {
        // Create a generic ride completion if no specific booking found
        const genericRideData: RideData = {
          bookingCode: bookingCode,
          route: 'Demo Route',
          departureTime: '12:00 PM',
          fare: 50,
          passengerName: 'Demo Passenger',
          completedAt: new Date().toISOString()
        };
        setRideData(genericRideData);
        sessionStorage.setItem(`completed_ride_${bookingCode}`, JSON.stringify(genericRideData));
      }
    }
  }, [bookingCode, router]);

  const handleSubmit = async () => {
    if (!rideData) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Record completion in system
    const completionData = {
      ...rideData,
      rating,
      donated: donate,
      donationAmount: donate ? 0.5 : 0,
      completedAt: new Date().toISOString()
    };
    
    // Store in sessionStorage for demo (would be API call in production)
    sessionStorage.setItem(`ride_completion_${bookingCode}`, JSON.stringify(completionData));
    
    // Also add to completions list for admin dashboard
    const completions = JSON.parse(sessionStorage.getItem('ride_completions') || '[]');
    completions.push(completionData);
    sessionStorage.setItem('ride_completions', JSON.stringify(completions));
    
    setIsCompleted(true);
    setIsSubmitting(false);
  };

  if (!rideData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✅</span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            Your feedback has been recorded. {donate && 'Thank you for your donation!'}
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Ride completion recorded in system</p>
            <p className="text-xs text-gray-500 mt-1">Reference: {bookingCode}</p>
          </div>
          
          <button
            onClick={() => router.push('/')}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ride Complete!</h1>
          <p className="text-gray-600">Thank you for riding with BusLink</p>
        </div>

        {/* Ride Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Your Trip Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Passenger:</span>
              <span className="font-medium">{rideData.passengerName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Route:</span>
              <span className="font-medium">{rideData.route}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Departure Time:</span>
              <span className="font-medium">{rideData.departureTime}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Fare Paid:</span>
              <span className="font-medium text-green-600">R {rideData.fare}.00</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Completed:</span>
              <span className="font-medium">{new Date(rideData.completedAt).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Rating System */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Rate Your Trip</h2>
          <p className="text-gray-600 mb-4">How was your experience today?</p>
          
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl p-2 rounded-lg transition-colors ${
                  rating >= star 
                    ? 'text-yellow-400 bg-yellow-50' 
                    : 'text-gray-300 hover:text-yellow-400'
                }`}
              >
                ⭐
              </button>
            ))}
          </div>
          
          <div className="text-center text-sm text-gray-500">
            {rating === 0 && 'Tap a star to rate'}
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Good'}
            {rating === 4 && 'Very Good'}
            {rating === 5 && 'Excellent!'}
          </div>
        </div>

        {/* Donation Option */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">❤️</span>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Support a Good Cause</h3>
              <p className="text-gray-600 text-sm mb-3">
                Would you like to donate R0.50 to support transportation for underprivileged communities?
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setDonate(true)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    donate 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                  }`}
                >
                  Yes, Donate R0.50
                </button>
                
                <button
                  onClick={() => setDonate(false)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    !donate 
                      ? 'bg-gray-200 text-gray-800' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  No, thanks
                </button>
              </div>
              
              {donate && (
                <p className="text-xs text-purple-600 mt-3">
                  Thank you for your generosity! Your donation will make a difference.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            'Submit Feedback'
          )}
        </button>

        {/* Info */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Your feedback helps us improve our service. Completion recorded for analytics.
          </p>
        </div>
      </div>
    </div>
  );
}