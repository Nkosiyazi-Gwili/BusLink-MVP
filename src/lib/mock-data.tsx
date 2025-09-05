export interface Route {
  id: number;
  name: string;
  price: number;
}

export interface Trip {
  id: string;
  time: string;
  seats: number;
}

export const mockRoutes: Route[] = [
  { id: 1, name: 'Cape Town to Stellenbosch', price: 50 },
  { id: 2, name: 'Johannesburg to Pretoria', price: 75 },
  { id: 3, name: 'Durban to Pietermaritzburg', price: 45 },
];

export const mockTrips: Record<number, Trip[]> = {
  1: [
    { id: '1a', time: '08:00 AM', seats: 15 },
    { id: '1b', time: '10:00 AM', seats: 32 },
    { id: '1c', time: '02:00 PM', seats: 8 },
  ],
  2: [
    { id: '2a', time: '07:30 AM', seats: 40 },
    { id: '2b', time: '01:00 PM', seats: 22 },
    { id: '2c', time: '05:30 PM', seats: 18 },
  ],
  3: [
    { id: '3a', time: '09:15 AM', seats: 10 },
    { id: '3b', time: '12:15 PM', seats: 25 },
    { id: '3c', time: '04:45 PM', seats: 5 },
  ],
};

// Simulated bus path coordinates for live tracking (Cape Town to Stellenbosch)
export const simulatedPathCTtoS: [number, number][] = [
  [-33.9249, 18.4241], // Start: Cape Town approx
  [-33.9320, 18.4724],
  [-33.9500, 18.6000],
  [-33.9600, 18.7500],
  [-33.9500, 18.8700],
  [-33.9333, 18.8667], // End: Stellenbosch approx
];

export const generateBookingCode = (prefix: string = 'BUS'): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
};