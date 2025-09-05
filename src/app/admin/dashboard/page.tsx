'use client';

import { useState, useEffect } from 'react';
import { mockRevenueData, mockBookings, mockBuses, mockTracking } from '@/lib/admin-mock-data';

interface RideCompletion {
  bookingCode: string;
  route: string;
  fare: number;
  rating: number;
  donated: boolean;
  donationAmount: number;
  completedAt: string;
}

export default function AdminDashboard() {
  const [completions, setCompletions] = useState<RideCompletion[]>([]);
  
  useEffect(() => {
    // Load completions from sessionStorage for demo
    const completedRides = JSON.parse(sessionStorage.getItem('ride_completions') || '[]');
    setCompletions(completedRides);
  }, []);

  const totalRevenue = mockRevenueData.reduce((sum, day) => sum + day.revenue, 0);
  const totalBookings = mockRevenueData.reduce((sum, day) => sum + day.bookings, 0);
  const activeBuses = mockBuses.filter(bus => bus.status === 'active').length;
  const activeBookings = mockBookings.filter(booking => booking.status === 'confirmed').length;
  
  // Completion statistics
  const completedRidesToday = completions.length;
  const totalDonations = completions.filter(c => c.donated).length * 0.5;
  const averageRating = completions.length > 0 
    ? (completions.reduce((sum, c) => sum + c.rating, 0) / completions.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Real-time operations and performance metrics</p>
      </div>

      {/* Stats Grid - Two rows for better desktop layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* First Row */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">R{totalRevenue}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">🎫</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalBookings}</div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">🚌</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{activeBuses}</div>
              <div className="text-sm text-gray-600">Active Buses</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">✅</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{completedRidesToday}</div>
              <div className="text-sm text-gray-600">Completed Rides</div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">⭐</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{averageRating}</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">❤️</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">R{totalDonations.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Donations</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">👥</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{activeBookings}</div>
              <div className="text-sm text-gray-600">Active Bookings</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">📊</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {completions.filter(c => c.donated).length}
              </div>
              <div className="text-sm text-gray-600">Donations Made</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Side by side layout for desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
            <div className="space-y-3">
              {mockRevenueData.map((day) => (
                <div key={day.date} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 w-20">
                    {new Date(day.date).toLocaleDateString()}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 mx-4">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${(day.revenue / 6000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold w-20 text-right">R{day.revenue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
            <div className="space-y-3">
              {mockBookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold">{booking.bookingCode}</div>
                    <div className="text-sm text-gray-600">{booking.route}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">R{booking.fare}</div>
                    <div className={`text-xs ${
                      booking.status === 'confirmed' ? 'text-green-600' : 
                      booking.status === 'completed' ? 'text-gray-600' : 'text-red-600'
                    }`}>
                      {booking.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Ride Completions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Recent Ride Completions</h2>
            {completions.length > 0 ? (
              <div className="space-y-3">
                {completions.slice(0, 5).map((completion, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{completion.bookingCode}</div>
                      <div className="text-sm text-gray-600">{completion.route}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-400">⭐</span>
                        <span className="font-semibold">{completion.rating}/5</span>
                      </div>
                      {completion.donated && (
                        <div className="text-xs text-purple-600">Donated R0.50</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-gray-500">No ride completions yet</p>
                <p className="text-sm text-gray-400 mt-1">Completed rides will appear here</p>
              </div>
            )}
          </div>

          {/* Live Tracking Overview */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Live Operations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4">
              {mockTracking.map((bus) => (
                <div key={bus.busId} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold">{bus.licensePlate}</div>
                      <div className="text-sm text-gray-600">{bus.driver}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bus.status === 'on-time' ? 'bg-green-100 text-green-800' :
                      bus.status === 'delayed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {bus.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{bus.route}</div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Occupancy: {bus.occupancy}/{mockBuses.find(b => b.id === bus.busId)?.capacity}</span>
                    <span>ETA: {bus.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary - Full width at bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-semibold mb-4">Service Quality</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Rating</span>
              <span className="font-semibold flex items-center">
                ⭐ {averageRating}/5
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Feedback</span>
              <span className="font-semibold">{completions.length} rides</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Donation Rate</span>
              <span className="font-semibold">
                {completions.length > 0 
                  ? `${Math.round((completions.filter(c => c.donated).length / completions.length) * 100)}%` 
                  : '0%'
                }
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-semibold mb-4">Performance Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Daily Revenue</span>
              <span className="font-semibold text-green-600">
                R{mockRevenueData[0]?.revenue || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Vehicles</span>
              <span className="font-semibold">{activeBuses}/{mockBuses.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <span className="font-semibold">
                {totalBookings > 0 
                  ? `${Math.round((completions.length / totalBookings) * 100)}%` 
                  : '0%'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}