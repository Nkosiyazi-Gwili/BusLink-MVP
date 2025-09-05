'use client';

import { useState } from 'react';
import { mockSchedules, mockBuses } from '@/lib/admin-mock-data';

interface ScheduleFormData {
  route: string;
  departureTime: string;
  arrivalTime: string;
  bus: string;
  driver: string;
  price: number;
  active: boolean;
}

export default function SchedulesManagement() {
  const [schedules, setSchedules] = useState(mockSchedules);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<string | null>(null);
  const [formData, setFormData] = useState<ScheduleFormData>({
    route: '',
    departureTime: '',
    arrivalTime: '',
    bus: '',
    driver: '',
    price: 50,
    active: true
  });

  const handleAddSchedule = () => {
    const newSchedule = {
      id: `sched-${Date.now()}`,
      ...formData
    };
    setSchedules([...schedules, newSchedule]);
    setIsAdding(false);
    setFormData({
      route: '',
      departureTime: '',
      arrivalTime: '',
      bus: '',
      driver: '',
      price: 50,
      active: true
    });
  };

  const handleEditSchedule = (scheduleId: string) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    if (schedule) {
      setFormData({
        route: schedule.route,
        departureTime: schedule.departureTime,
        arrivalTime: schedule.arrivalTime,
        bus: schedule.bus,
        driver: schedule.driver,
        price: schedule.price,
        active: schedule.active
      });
      setEditingSchedule(scheduleId);
    }
  };

  const handleUpdateSchedule = () => {
    if (editingSchedule) {
      setSchedules(schedules.map(schedule =>
        schedule.id === editingSchedule
          ? { ...schedule, ...formData }
          : schedule
      ));
      setEditingSchedule(null);
      setFormData({
        route: '',
        departureTime: '',
        arrivalTime: '',
        bus: '',
        driver: '',
        price: 50,
        active: true
      });
    }
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    if (confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
    }
  };

  const toggleScheduleStatus = (scheduleId: string) => {
    setSchedules(schedules.map(schedule =>
      schedule.id === scheduleId
        ? { ...schedule, active: !schedule.active }
        : schedule
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedules Management</h1>
          <p className="text-gray-600">Manage bus schedules and pricing</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Schedule
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingSchedule) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
              <select
                value={formData.route}
                onChange={(e) => setFormData({...formData, route: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Route</option>
                <option value="Cape Town to Stellenbosch">Cape Town to Stellenbosch</option>
                <option value="Johannesburg to Pretoria">Johannesburg to Pretoria</option>
                <option value="Durban to Pietermaritzburg">Durban to Pietermaritzburg</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bus</label>
              <select
                value={formData.bus}
                onChange={(e) => setFormData({...formData, bus: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Bus</option>
                {mockBuses.map(bus => (
                  <option key={bus.id} value={bus.licensePlate}>
                    {bus.licensePlate} - {bus.driver}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
              <input
                type="time"
                value={formData.departureTime}
                onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
              <input
                type="time"
                value={formData.arrivalTime}
                onChange={(e) => setFormData({...formData, arrivalTime: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (R)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.active ? 'active' : 'inactive'}
                onChange={(e) => setFormData({...formData, active: e.target.value === 'active'})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={editingSchedule ? handleUpdateSchedule : handleAddSchedule}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingSchedule ? 'Update Schedule' : 'Add Schedule'}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingSchedule(null);
                setFormData({
                  route: '',
                  departureTime: '',
                  arrivalTime: '',
                  bus: '',
                  driver: '',
                  price: 50,
                  active: true
                });
              }}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Schedules Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus & Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{schedule.route}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold">{schedule.departureTime}</div>
                    <div className="text-sm text-gray-500">to {schedule.arrivalTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{schedule.bus}</div>
                    <div className="text-sm text-gray-500">{schedule.driver}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold">R{schedule.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleScheduleStatus(schedule.id)}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        schedule.active
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {schedule.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditSchedule(schedule.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.id)}
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
            <div className="text-3xl font-bold text-blue-600">{schedules.length}</div>
            <div className="text-sm text-gray-600">Total Schedules</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {schedules.filter(s => s.active).length}
            </div>
            <div className="text-sm text-gray-600">Active Schedules</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {new Set(schedules.map(s => s.route)).size}
            </div>
            <div className="text-sm text-gray-600">Unique Routes</div>
          </div>
        </div>
      </div>
    </div>
  );
}