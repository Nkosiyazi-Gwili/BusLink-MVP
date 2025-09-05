'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockRoutes, mockTrips, generateBookingCode } from '@/lib/mock-data';

export default function BookPage() {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [availableTrips, setAvailableTrips] = useState<{
    route: typeof mockRoutes[0];
    trips: typeof mockTrips[number];
  } | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, use the first route's trips
    const foundRoute = mockRoutes[0];
    if (foundRoute) {
      setAvailableTrips({
        route: foundRoute,
        trips: mockTrips[foundRoute.id]
      });
    }
    setIsSearching(false);
  };

  const handleTripSelect = (trip: any) => {
    setSelectedTrip(trip);
  };

  const proceedToPayment = () => {
    if (selectedTrip && availableTrips) {
      const bookingCode = generateBookingCode('WEB');
      sessionStorage.setItem('pendingBooking', JSON.stringify({
        route: availableTrips.route,
        trip: selectedTrip,
        bookingCode
      }));
      
      router.push('/book/confirm');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-blue-600 text-center">Book Your Trip</h1>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Find Your Route</h2>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <select
                id="from"
                value={searchData.from}
                onChange={(e) => setSearchData({...searchData, from: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select origin</option>
                <option value="capetown">Cape Town</option>
                <option value="johannesburg">Johannesburg</option>
                <option value="durban">Durban</option>
                <option value="pretoria">Pretoria</option>
              </select>
            </div>

            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <select
                id="to"
                value={searchData.to}
                onChange={(e) => setSearchData({...searchData, to: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select destination</option>
                <option value="stellenbosch">Stellenbosch</option>
                <option value="pretoria">Pretoria</option>
                <option value="pietermaritzburg">Pietermaritzburg</option>
                <option value="johannesburg">Johannesburg</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Travel Date
              </label>
              <input
                type="date"
                id="date"
                value={searchData.date}
                onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSearching ? 'Searching...' : 'Search Routes'}
            </button>
          </form>
        </div>

        {/* Available Trips */}
        {availableTrips && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Available Trips</h2>
            <p className="text-sm text-gray-600 mb-4">{availableTrips.route.name}</p>
            
            <div className="space-y-3">
              {availableTrips.trips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => handleTripSelect(trip)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedTrip?.id === trip.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-semibold text-lg">{trip.time}</span>
                      <p className="text-sm text-gray-600">{availableTrips.route.name}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-blue-600">R {availableTrips.route.price}</span>
                      <p className="text-xs text-gray-500">{trip.seats} seats left</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedTrip && (
              <button
                onClick={proceedToPayment}
                className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 mt-6 transition-colors"
              >
                Continue to Payment
              </button>
            )}
          </div>
        )}

        {/* Empty state when no search performed */}
        {!availableTrips && !isSearching && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚌</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Find Your Perfect Trip</h3>
            <p className="text-gray-600">Search for available routes and times to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}