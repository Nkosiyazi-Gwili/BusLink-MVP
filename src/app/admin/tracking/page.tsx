'use client';

import { useState, useEffect } from 'react';
import { mockTracking, mockBuses } from '@/lib/admin-mock-data';

interface TrackingStatus {
  busId: string;
  licensePlate: string;
  route: string;
  driver: string;
  currentLocation: [number, number];
  status: 'on-time' | 'delayed' | 'early';
  speed: number;
  lastUpdate: string;
  occupancy: number;
  nextStop: string;
  eta: string;
}

export default function LiveTracking() {
  const [trackingData, setTrackingData] = useState<TrackingStatus[]>(mockTracking);
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'live' | 'today' | 'week'>('live');

  // Simulate live updates
  useEffect(() => {
    if (!isAutoRefresh) return;

    const interval = setInterval(() => {
      setTrackingData(prev => prev.map(bus => {
        // Simulate small location changes and data updates
        const latChange = (Math.random() - 0.5) * 0.001;
        const lngChange = (Math.random() - 0.5) * 0.001;
        
        return {
          ...bus,
          currentLocation: [
            bus.currentLocation[0] + latChange,
            bus.currentLocation[1] + lngChange
          ],
          speed: Math.max(0, Math.min(80, bus.speed + (Math.random() > 0.5 ? 2 : -2))),
          occupancy: Math.min(
            mockBuses.find(b => b.id === bus.busId)?.capacity || 50,
            Math.max(0, bus.occupancy + (Math.random() > 0.5 ? 1 : -1))
          ),
          lastUpdate: new Date().toISOString(),
          status: Math.random() > 0.8 ? 
            (bus.status === 'on-time' ? 'delayed' : 'on-time') : 
            bus.status
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-yellow-100 text-yellow-800';
      case 'early': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-time': return '✅';
      case 'delayed': return '⏰';
      case 'early': return '⚡';
      default: return '❓';
    }
  };

  const selectedBusData = selectedBus 
    ? trackingData.find(bus => bus.busId === selectedBus)
    : null;

  const busCapacity = selectedBusData 
    ? mockBuses.find(bus => bus.id === selectedBusData.busId)?.capacity || 0
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Tracking</h1>
          <p className="text-gray-600">Real-time monitoring of your bus fleet</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="live">Live View</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>
          
          <button
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isAutoRefresh 
                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {isAutoRefresh ? '🟢 Live' : '⏸️ Paused'}
          </button>
          
          <button
            onClick={() => {
              setTrackingData(mockTracking);
            }}
            className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Live Map View</h2>
          
          <div className="bg-gray-100 rounded-lg p-8 text-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗺️</span>
            </div>
            <p className="text-gray-600 mb-2">Interactive Map Integration</p>
            <p className="text-sm text-gray-500">
              {isAutoRefresh ? 'Live tracking enabled' : 'Tracking paused'}
            </p>
            
            {/* Mock map points */}
            <div className="mt-6 relative bg-blue-50 rounded-lg p-4 h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl">📍</span>
                  <p className="text-xs text-gray-600 mt-2">Bus Locations</p>
                </div>
              </div>
              
              {/* Simulated bus markers */}
              {trackingData.map((bus, index) => {
                const left = 20 + (index * 25);
                const top = 30 + (index % 2 === 0 ? 20 : 60);
                
                return (
                  <div
                    key={bus.busId}
                    className={`absolute w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-125 ${
                      selectedBus === bus.busId 
                        ? 'ring-4 ring-blue-400 transform scale-125' 
                        : 'ring-2 ring-white'
                    } ${
                      bus.status === 'on-time' ? 'bg-green-500' :
                      bus.status === 'delayed' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}
                    style={{ left: `${left}%`, top: `${top}px` }}
                    onClick={() => setSelectedBus(bus.busId)}
                    title={`${bus.licensePlate} - ${bus.driver}`}
                  >
                    <span className="text-xs font-bold text-white">
                      {bus.licensePlate.split(' ')[1].split('-')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {trackingData.filter(b => b.status === 'on-time').length}
              </div>
              <div className="text-xs text-green-800">On Time</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-lg font-bold text-yellow-600">
                {trackingData.filter(b => b.status === 'delayed').length}
              </div>
              <div className="text-xs text-yellow-800">Delayed</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">
                {trackingData.filter(b => b.status === 'early').length}
              </div>
              <div className="text-xs text-blue-800">Early</div>
            </div>
          </div>
        </div>

        {/* Bus Details Sidebar */}
        <div className="space-y-6">
          {/* Selected Bus Details */}
          {selectedBusData && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Bus Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-xl">{selectedBusData.licensePlate}</div>
                    <div className="text-sm text-gray-600">{selectedBusData.driver}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBusData.status)}`}>
                    {getStatusIcon(selectedBusData.status)} {selectedBusData.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedBusData.speed} km/h</div>
                    <div className="text-xs text-gray-600">Current Speed</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedBusData.occupancy}/{busCapacity}
                    </div>
                    <div className="text-xs text-gray-600">Occupancy</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Route Information</h3>
                  <div className="text-sm text-gray-700">{selectedBusData.route}</div>
                  <div className="text-xs text-gray-500 mt-1">Next stop: {selectedBusData.nextStop}</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">ETA & Timing</h3>
                  <div className="text-sm">
                    <span className="font-medium">Estimated Arrival:</span>{' '}
                    <span className="text-blue-600">{selectedBusData.eta}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last update: {new Date(selectedBusData.lastUpdate).toLocaleTimeString()}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-100 text-blue-800 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                    📞 Call Driver
                  </button>
                  <button className="flex-1 bg-green-100 text-green-800 py-2 rounded-lg text-sm hover:bg-green-200 transition-colors">
                    📋 Send Message
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="text-lg">📊</div>
                <div className="text-sm font-medium">Generate Report</div>
              </button>
              
              <button className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="text-lg">🚨</div>
                <div className="text-sm font-medium">Send Alert</div>
              </button>
              
              <button className="p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                <div className="text-lg">⏰</div>
                <div className="text-sm font-medium">Delay Notice</div>
              </button>
              
              <button className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="text-lg">📋</div>
                <div className="text-sm font-medium">Daily Summary</div>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">System Status</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">GPS Tracking</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Data Refresh</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {isAutoRefresh ? 'Every 3s' : 'Manual'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Connected Buses</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {trackingData.length} of {mockBuses.length}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Last System Check</span>
                <span className="text-xs text-gray-500">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Buses List */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4">All Vehicles</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bus</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Speed</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Occupancy</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trackingData.map((bus) => (
                <tr 
                  key={bus.busId} 
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedBus === bus.busId ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedBus(bus.busId)}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{bus.licensePlate}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm">{bus.driver}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-600">{bus.route}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-mono">{bus.speed} km/h</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ 
                          width: `${(bus.occupancy / (mockBuses.find(b => b.id === bus.busId)?.capacity || 50)) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {bus.occupancy}/{(mockBuses.find(b => b.id === bus.busId)?.capacity || 50)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bus.status)}`}>
                      {bus.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-500">
                      {new Date(bus.lastUpdate).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}