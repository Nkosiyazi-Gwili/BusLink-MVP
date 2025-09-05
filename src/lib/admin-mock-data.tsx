export interface Bus {
  id: string;
  licensePlate: string;
  capacity: number;
  driver: string;
  driverContact: string;
  currentRoute: string;
  status: 'active' | 'maintenance' | 'inactive';
  lastMaintenance: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  route: string;
  departureTime: string;
  passengerName: string;
  passengerContact: string;
  fare: number;
  status: 'confirmed' | 'completed' | 'cancelled';
  bookingDate: string;
  paymentMethod: 'cash' | 'mobile' | 'card';
}

export interface RouteSchedule {
  id: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  bus: string;
  driver: string;
  price: number;
  active: boolean;
}

export interface RevenueData {
  date: string;
  revenue: number;
  bookings: number;
  averageFare: number;
}

export interface TrackingStatus {
  busId: string;
  licensePlate: string;
  route: string;
  driver: string;
  currentLocation: [number, number]; // [lat, lng]
  status: 'on-time' | 'delayed' | 'early';
  speed: number;
  lastUpdate: string;
  occupancy: number;
  nextStop: string;
  eta: string;
}

// Mock data
export const mockBuses: Bus[] = [
  {
    id: 'bus-001',
    licensePlate: 'CA 123-456',
    capacity: 45,
    driver: 'John Smith',
    driverContact: '+27 71 123 4567',
    currentRoute: 'Cape Town to Stellenbosch',
    status: 'active',
    lastMaintenance: '2024-01-15'
  },
  {
    id: 'bus-002',
    licensePlate: 'GP 789-012',
    capacity: 52,
    driver: 'Sarah Johnson',
    driverContact: '+27 82 345 6789',
    currentRoute: 'Johannesburg to Pretoria',
    status: 'active',
    lastMaintenance: '2024-01-10'
  },
  {
    id: 'bus-003',
    licensePlate: 'KZN 345-678',
    capacity: 38,
    driver: 'Mike Brown',
    driverContact: '+27 83 456 7890',
    currentRoute: 'Durban to Pietermaritzburg',
    status: 'maintenance',
    lastMaintenance: '2024-01-05'
  },
  {
    id: 'bus-004',
    licensePlate: 'WC 901-234',
    capacity: 45,
    driver: 'Lisa Davis',
    driverContact: '+27 84 567 8901',
    currentRoute: 'Cape Town to Stellenbosch',
    status: 'active',
    lastMaintenance: '2024-01-12'
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'book-001',
    bookingCode: 'BUS-X5J3',
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
    bookingCode: 'BUS-Y8K2',
    route: 'Johannesburg to Pretoria',
    departureTime: '07:30 AM',
    passengerName: 'Maria Garcia',
    passengerContact: '+27 82 345 6789',
    fare: 75,
    status: 'completed',
    bookingDate: '2024-01-20',
    paymentMethod: 'card'
  },
  {
    id: 'book-003',
    bookingCode: 'BUS-Z1M9',
    route: 'Durban to Pietermaritzburg',
    departureTime: '09:15 AM',
    passengerName: 'Robert Johnson',
    passengerContact: '+27 83 456 7890',
    fare: 45,
    status: 'confirmed',
    bookingDate: '2024-01-20',
    paymentMethod: 'cash'
  }
];

export const mockSchedules: RouteSchedule[] = [
  {
    id: 'sched-001',
    route: 'Cape Town to Stellenbosch',
    departureTime: '08:00 AM',
    arrivalTime: '09:00 AM',
    bus: 'CA 123-456',
    driver: 'John Smith',
    price: 50,
    active: true
  },
  {
    id: 'sched-002',
    route: 'Cape Town to Stellenbosch',
    departureTime: '10:00 AM',
    arrivalTime: '11:00 AM',
    bus: 'WC 901-234',
    driver: 'Lisa Davis',
    price: 50,
    active: true
  },
  {
    id: 'sched-003',
    route: 'Johannesburg to Pretoria',
    departureTime: '07:30 AM',
    arrivalTime: '08:30 AM',
    bus: 'GP 789-012',
    driver: 'Sarah Johnson',
    price: 75,
    active: true
  }
];

export const mockRevenueData: RevenueData[] = [
  { date: '2024-01-20', revenue: 4250, bookings: 85, averageFare: 50 },
  { date: '2024-01-19', revenue: 3800, bookings: 76, averageFare: 50 },
  { date: '2024-01-18', revenue: 5100, bookings: 102, averageFare: 50 },
  { date: '2024-01-17', revenue: 3450, bookings: 69, averageFare: 50 }
];

export const mockTracking: TrackingStatus[] = [
  {
    busId: 'bus-001',
    licensePlate: 'CA 123-456',
    route: 'Cape Town to Stellenbosch',
    driver: 'John Smith',
    currentLocation: [-33.9249, 18.4241],
    status: 'on-time',
    speed: 65,
    lastUpdate: '2024-01-20T07:45:00',
    occupancy: 32,
    nextStop: 'Stellenbosch Central',
    eta: '08:55 AM'
  },
  {
    busId: 'bus-002',
    licensePlate: 'GP 789-012',
    route: 'Johannesburg to Pretoria',
    driver: 'Sarah Johnson',
    currentLocation: [-26.2041, 28.0473],
    status: 'delayed',
    speed: 45,
    lastUpdate: '2024-01-20T07:40:00',
    occupancy: 28,
    nextStop: 'Pretoria Station',
    eta: '08:45 AM'
  },
  {
    busId: 'bus-004',
    licensePlate: 'WC 901-234',
    route: 'Cape Town to Stellenbosch',
    driver: 'Lisa Davis',
    currentLocation: [-33.9345, 18.4771],
    status: 'early',
    speed: 70,
    lastUpdate: '2024-01-20T09:30:00',
    occupancy: 18,
    nextStop: 'Stellenbosch University',
    eta: '10:45 AM'
  }
];