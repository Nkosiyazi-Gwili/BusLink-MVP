'use client';

import { useState } from 'react';
import { mockRoutes, mockTrips, generateBookingCode } from '@/lib/mock-data';
import { Card } from '@/components/LayoutWrapper';

type Screen = 'dialer' | 'menu' | 'route-selection' | 'time-selection' | 'confirmation' | 'success' | 'ride-complete';

export default function USSDSimulator() {
  const [screen, setScreen] = useState<Screen>('dialer');
  const [inputValue, setInputValue] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingCode, setBookingCode] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [donate, setDonate] = useState(false);
  const [isCompletionSubmitted, setIsCompletionSubmitted] = useState(false);

  const handleInput = (key: string) => {
    if (key === '#') {
      if (inputValue === '*123') {
        setScreen('menu');
      } else if (inputValue === '*123*888' && screen === 'dialer') {
        setScreen('ride-complete');
      }
      setInputValue('');
    } else if (key === '*') {
      setInputValue(inputValue + key);
    } else if (key === '⌫') {
      // Backspace functionality
      setInputValue(inputValue.slice(0, -1));
    } else {
      setInputValue(inputValue + key);
    }
  };

  const handleMenuSelect = (option: string) => {
    switch (option) {
      case '1':
        setScreen('route-selection');
        break;
      case '2':
        alert('Your balance: R 0.00');
        break;
      case '3':
        alert('Dial *123# to book a trip. Contact support: 0800-BUSLINK');
        break;
      case '4':
        setScreen('ride-complete');
        break;
      default:
        break;
    }
  };

  const handleRouteSelect = (routeId: number) => {
    setSelectedRoute(routeId);
    setScreen('time-selection');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setScreen('confirmation');
  };

  const confirmBooking = () => {
    const code = generateBookingCode();
    setBookingCode(code);
    setScreen('success');
  };

  const handleRideCompletion = () => {
    const completionData = {
      bookingCode: 'USS-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      route: 'Sample Route',
      fare: 50,
      rating,
      donated: donate,
      donationAmount: donate ? 0.5 : 0,
      completedAt: new Date().toISOString()
    };

    const completions = JSON.parse(sessionStorage.getItem('ride_completions') || '[]');
    completions.push(completionData);
    sessionStorage.setItem('ride_completions', JSON.stringify(completions));

    setIsCompletionSubmitted(true);
  };

  const getCurrentRoute = () => mockRoutes.find(route => route.id === selectedRoute);

  const renderScreen = () => {
    switch (screen) {
      case 'dialer':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center px-2">
            <p className="text-sm text-gray-400 mb-2">Dial USSD Code</p>
            <div className="bg-gray-900 p-3 rounded-lg mb-4 w-full max-w-xs">
              <p className="text-2xl font-bold tracking-widest text-green-400">{inputValue}</p>
            </div>
            <p className="text-xs text-gray-500 mb-2">Press # to send</p>
            {inputValue.length > 0 && (
              <p className="text-xs text-gray-400">Press ⌫ to backspace</p>
            )}
          </div>
        );
      
      case 'menu':
        return (
          <div className="h-full flex flex-col justify-center px-4">
            <p className="text-center text-green-400 mb-4">Welcome to BusLink!</p>
            <div className="space-y-3">
              <p className="cursor-pointer hover:text-green-300 transition-colors" onClick={() => handleMenuSelect('1')}>
                1. Book a Trip
              </p>
              <p className="cursor-pointer hover:text-green-300 transition-colors" onClick={() => handleMenuSelect('2')}>
                2. Check Balance
              </p>
              <p className="cursor-pointer hover:text-green-300 transition-colors" onClick={() => handleMenuSelect('3')}>
                3. Help
              </p>
              <p className="cursor-pointer hover:text-green-300 transition-colors" onClick={() => handleMenuSelect('4')}>
                4. Complete Ride
              </p>
            </div>
            <p className="text-xs text-gray-500 text-center mt-6">Select an option</p>
          </div>
        );
      
      case 'route-selection':
        return (
          <div className="h-full flex flex-col px-4">
            <p className="text-center text-green-400 mb-4">Select Route:</p>
            <div className="space-y-3 flex-1 overflow-y-auto">
              {mockRoutes.map((route) => (
                <div 
                  key={route.id} 
                  onClick={() => handleRouteSelect(route.id)} 
                  className="cursor-pointer p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <p className="text-sm">
                    <span className="font-bold">{route.id}.</span> {route.name}
                  </p>
                  <p className="text-xs text-gray-400">R {route.price}.00</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'time-selection':
        return selectedRoute ? (
          <div className="h-full flex flex-col px-4">
            <p className="text-center text-green-400 mb-4">Select Time for {getCurrentRoute()?.name}:</p>
            <div className="space-y-3 flex-1 overflow-y-auto">
              {mockTrips[selectedRoute].map((trip, index) => (
                <div 
                  key={trip.id} 
                  onClick={() => handleTimeSelect(trip.time)} 
                  className="cursor-pointer p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <p className="text-sm">
                    <span className="font-bold">{index + 1}.</span> {trip.time}
                  </p>
                  <p className="text-xs text-gray-400">{trip.seats} seats available</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      
      case 'confirmation':
        return selectedRoute && selectedTime ? (
          <div className="h-full flex flex-col justify-center px-4">
            <p className="text-center text-green-400 mb-6">Confirm Booking:</p>
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-400">Route:</span> {getCurrentRoute()?.name}</p>
                <p><span className="text-gray-400">Time:</span> {selectedTime}</p>
                <p><span className="text-gray-400">Price:</span> R {getCurrentRoute()?.price}.00</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm">1. Confirm</p>
              <p className="text-sm">0. Cancel</p>
            </div>
          </div>
        ) : null;
      
      case 'success':
        return (
          <div className="h-full flex flex-col justify-center items-center text-center px-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <p className="text-green-400 font-bold mb-2">Booking Successful!</p>
            <p className="text-xs text-gray-400 mb-4">Your booking code:</p>
            <div className="bg-gray-700 p-3 rounded-lg mb-4 w-full max-w-xs">
              <p className="text-xl font-bold tracking-widest text-white">{bookingCode}</p>
            </div>
            <p className="text-xs text-gray-400 mb-2">Show this to the driver</p>
            <p className="text-xs text-gray-500">SMS confirmation sent!</p>
          </div>
        );
      
      case 'ride-complete':
        if (isCompletionSubmitted) {
          return (
            <div className="h-full flex flex-col justify-center items-center text-center px-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <p className="text-green-400 font-bold mb-2">Thank You!</p>
              <p className="text-xs text-gray-400 mb-4">Ride completion recorded</p>
              {donate && (
                <p className="text-xs text-purple-400 mb-2">Thank you for your donation!</p>
              )}
              <p className="text-xs text-gray-500">Feedback submitted successfully</p>
            </div>
          );
        }

        return (
          <div className="h-full flex flex-col px-4 overflow-y-auto">
            <p className="text-center text-green-400 mb-4">Ride Completion</p>
            
            <div className="mb-4">
              <p className="text-sm mb-2">Rate your trip (1-5):</p>
              <div className="flex justify-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-lg cursor-pointer ${
                      rating >= star ? 'text-yellow-400' : 'text-gray-400'
                    }`}
                  >
                    {rating >= star ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 text-center">
                {rating === 0 ? 'Select rating' : 
                 rating === 1 ? 'Poor' :
                 rating === 2 ? 'Fair' :
                 rating === 3 ? 'Good' :
                 rating === 4 ? 'Very Good' : 'Excellent'}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-sm mb-2">Donate R0.50 to charity?</p>
              <div className="flex space-x-2">
                <span
                  onClick={() => setDonate(true)}
                  className={`flex-1 text-center p-2 rounded-lg cursor-pointer ${
                    donate ? 'bg-purple-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  1. Yes
                </span>
                <span
                  onClick={() => setDonate(false)}
                  className={`flex-1 text-center p-2 rounded-lg cursor-pointer ${
                    !donate ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  2. No
                </span>
              </div>
              {donate && (
                <p className="text-xs text-purple-400 mt-2">Thank you for your generosity!</p>
              )}
            </div>

            <div className="bg-gray-700 p-3 rounded-lg mb-4">
              <p className="text-xs text-gray-400 text-center">
                Press 1 to confirm completion
                <br />
                Press 0 to cancel
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const handleKeypadClick = (key: string) => {
    if (screen === 'dialer') {
      handleInput(key);
    } else if (screen === 'menu') {
      if (key === '1') handleMenuSelect('1');
      if (key === '2') handleMenuSelect('2');
      if (key === '3') handleMenuSelect('3');
      if (key === '4') handleMenuSelect('4');
    } else if (screen === 'confirmation') {
      if (key === '1') confirmBooking();
      if (key === '0') setScreen('menu');
    } else if (screen === 'ride-complete') {
      if (key === '1' && !isCompletionSubmitted) handleRideCompletion();
      if (key === '0') setScreen('menu');
    }
  };

  const handleBack = () => {
    switch (screen) {
      case 'menu': setScreen('dialer'); break;
      case 'route-selection': setScreen('menu'); break;
      case 'time-selection': setScreen('route-selection'); break;
      case 'confirmation': setScreen('time-selection'); break;
      case 'success': setScreen('dialer'); break;
      case 'ride-complete': 
        if (isCompletionSubmitted) {
          setScreen('dialer');
          setIsCompletionSubmitted(false);
          setRating(0);
          setDonate(false);
        } else {
          setScreen('menu');
        }
        break;
      default: break;
    }
  };

  const keypadLayout = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">USSD Simulator</h3>
        <p className="text-gray-600">Experience BusLink's USSD service</p>
      </div>

      <div className="bg-black text-green-400 p-6 rounded-3xl shadow-2xl font-mono">
        {/* Phone status bar */}
            {/* Main screen */}
        <div className="bg-gray-800 h-72 p-4 rounded-xl mb-6 overflow-y-auto">
          {renderScreen()}
        </div>

        {/* Keypad with backspace button */}
        <div className="grid grid-rows-5 gap-2 mb-4">
          {/* Number keypad */}
          {keypadLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-3 gap-2">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeypadClick(key)}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center text-lg active:scale-95"
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
          
          {/* Backspace row */}
          <div className="grid grid-cols-3 gap-2">
            <div></div> {/* Empty spacer */}
            <button
              onClick={() => handleKeypadClick('⌫')}
              disabled={inputValue.length === 0}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center text-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⌫
            </button>
            <div></div> {/* Empty spacer */}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setScreen('dialer')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
          >
            End
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          💡 <strong>Quick Tips:</strong><br/>
          • Dial <strong>*123#</strong> for main menu<br/>
          • Dial <strong>*123*888#</strong> for ride completion<br/>
          • Use <strong>⌫</strong> to backspace<br/>
          • Select option 4 from menu for ride completion
        </p>
      </div>
    </Card>
  );
}