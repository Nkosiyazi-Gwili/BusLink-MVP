'use client';

import { useState } from 'react';
import { mockBuses } from '@/lib/admin-mock-data';

interface BusFormData {
  licensePlate: string;
  capacity: number;
  driver: string;
  driverContact: string;
  currentRoute: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export default function FleetManagement() {
  const [buses, setBuses] = useState(mockBuses);
  const [isAdding, setIsAdding] = useState(false);
  const [editingBus, setEditingBus] = useState<string | null>(null);
  const [formData, setFormData] = useState<BusFormData>({
    licensePlate: '',
    capacity: 45,
    driver: '',
    driverContact: '',
    currentRoute: '',
    status: 'active'
  });

  const handleAddBus = () => {
    const newBus = {
      id: `bus-${Date.now()}`,
      ...formData,
      lastMaintenance: new Date().toISOString().split('T')[0]
    };
    setBuses([...buses, newBus]);
    setIsAdding(false);
    setFormData({
      licensePlate: '',
      capacity: 45,
      driver: '',
      driverContact: '',
      currentRoute: '',
      status: 'active'
    });
  };

  const handleEditBus = (busId: string) => {
    const bus = buses.find(b => b.id === busId);
    if (bus) {
      setFormData({
        licensePlate: bus.licensePlate,
        capacity: bus.capacity,
        driver: bus.driver,
        driverContact: bus.driverContact,
        currentRoute: bus.currentRoute,
        status: bus.status
      });
      setEditingBus(busId);
    }
  };

  const handleUpdateBus = () => {
    if (editingBus) {
      setBuses(buses.map(bus => 
        bus.id === editingBus 
          ? { ...bus, ...formData, lastMaintenance: bus.lastMaintenance }
          : bus
      ));
      setEditingBus(null);
      setFormData({
        licensePlate: '',
        capacity: 45,
        driver: '',
        driverContact: '',
        currentRoute: '',
        status: 'active'
      });
    }
  };

  const handleDeleteBus = (busId: string) => {
    if (confirm('Are you sure you want to delete this bus?')) {
      setBuses(buses.filter(bus => bus.id !== busId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fleet Management</h1>
          <p className="text-gray-600">Manage your bus fleet, drivers, and assignments</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Bus
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingBus) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            {editingBus ? 'Edit Bus' : 'Add New Bus'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
              <input
                type="text"
                value={formData.licensePlate}
                onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="CA 123-456"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
              <input
                type="text"
                value={formData.driver}
                onChange={(e) => setFormData({...formData, driver: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Driver Contact</label>
              <input
                type="text"
                value={formData.driverContact}
                onChange={(e) => setFormData({...formData, driverContact: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="+27 71 123 4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
              <select
                value={formData.currentRoute}
                onChange={(e) => setFormData({...formData, currentRoute: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Route</option>
                <option value="Cape Town to Stellenbosch">Cape Town to Stellenbosch</option>
                <option value="Johannesburg to Pretoria">Johannesburg to Pretoria</option>
                <option value="Durban to Pietermaritzburg">Durban to Pietermaritzburg</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={editingBus ? handleUpdateBus : handleAddBus}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingBus ? 'Update Bus' : 'Add Bus'}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingBus(null);
                setFormData({
                  licensePlate: '',
                  capacity: 45,
                  driver: '',
                  driverContact: '',
                  currentRoute: '',
                  status: 'active'
                });
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Fleet Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Maintenance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buses.map((bus) => (
                <tr key={bus.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{bus.licensePlate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>{bus.driver}</div>
                    <div className="text-sm text-gray-500">{bus.driverContact}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{bus.currentRoute}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{bus.capacity} seats</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bus.status)}`}>
                      {bus.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(bus.lastMaintenance).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditBus(bus.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBus(bus.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{buses.length}</div>
            <div className="text-sm text-gray-600">Total Buses</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {buses.filter(b => b.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Buses</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {buses.filter(b => b.status === 'maintenance').length}
            </div>
            <div className="text-sm text-gray-600">In Maintenance</div>
          </div>
        </div>
      </div>
    </div>
  );
}