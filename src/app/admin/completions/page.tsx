'use client';

import { useState, useEffect } from 'react';

interface RideCompletion {
  bookingCode: string;
  route: string;
  fare: number;
  rating: number;
  donated: boolean;
  donationAmount: number;
  completedAt: string;
  passengerName?: string;
}

export default function RideCompletionsPage() {
  const [completions, setCompletions] = useState<RideCompletion[]>([]);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterDonation, setFilterDonation] = useState<boolean | null>(null);

  useEffect(() => {
    // Load completions from sessionStorage for demo
    const completedRides = JSON.parse(sessionStorage.getItem('ride_completions') || '[]');
    setCompletions(completedRides);
  }, []);

  const filteredCompletions = completions.filter(completion => {
    const matchesRating = filterRating === null || completion.rating === filterRating;
    const matchesDonation = filterDonation === null || completion.donated === filterDonation;
    return matchesRating && matchesDonation;
  });

  const totalDonations = completions
    .filter(c => c.donated)
    .reduce((sum, c) => sum + c.donationAmount, 0);

  const averageRating = completions.length > 0 
    ? completions.reduce((sum, c) => sum + c.rating, 0) / completions.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ride Completions</h1>
        <p className="text-gray-600">Analytics and reporting for completed rides</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{completions.length}</div>
            <div className="text-sm text-gray-600">Total Completions</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {completions.filter(c => c.donated).length}
            </div>
            <div className="text-sm text-gray-600">Donations Made</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">R{totalDonations.toFixed(2)}</div>
            <div className="text-sm text-gray-600">Total Donated</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <select
              value={filterRating === null ? 'all' : filterRating.toString()}
              onChange={(e) => setFilterRating(e.target.value === 'all' ? null : parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Donation</label>
            <select
              value={filterDonation === null ? 'all' : filterDonation.toString()}
              onChange={(e) => setFilterDonation(e.target.value === 'all' ? null : e.target.value === 'true')}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All</option>
              <option value="true">With Donation</option>
              <option value="false">Without Donation</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Actions</label>
            <button
              onClick={() => {
                setFilterRating(null);
                setFilterDonation(null);
              }}
              className="w-full bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Completions Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fare</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompletions.map((completion, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono font-bold text-blue-600">{completion.bookingCode}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{completion.route}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      <span className="font-semibold">{completion.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      completion.donated 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {completion.donated ? 'R0.50 Donated' : 'No Donation'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold">R{completion.fare}.00</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(completion.completedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCompletions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-gray-500">No ride completions found</p>
          </div>
        )}
      </div>

      {/* Export Options */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Export Data</h2>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            📄 Export to CSV
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            📊 Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}