'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    activeBookings: 85,
    totalBuses: 12,
    todayRevenue: 4250
  });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuthenticated');
    setIsAuthenticated(auth === 'true');
    setIsLoading(false);

    if (!auth && pathname !== '/admin/login') {
      router.push('/admin/login');
    }

    const completions = JSON.parse(sessionStorage.getItem('ride_completions') || '[]');
    const bookings = JSON.parse(sessionStorage.getItem('bookings') || '[]');

    setStats({
      activeBookings: bookings.filter((b: any) => b.status === 'confirmed').length || 85,
      totalBuses: 12,
      todayRevenue: 4250
    });
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊', description: 'Overview and analytics' },
    { href: '/admin/fleet', label: 'Fleet Management', icon: '🚌', description: 'Buses and drivers' },
    { href: '/admin/bookings', label: 'Bookings', icon: '🎫', description: 'Reservations and payments' },
    { href: '/admin/schedules', label: 'Schedules', icon: '⏰', description: 'Routes and timetables' },
    { href: '/admin/tracking', label: 'Live Tracking', icon: '📍', description: 'Real-time monitoring' },
    { href: '/admin/completions', label: 'Ride Completions', icon: '✅', description: 'Feedback and ratings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.jpeg"
                  alt="BusLink Logo"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BusLink Admin</h1>
                <p className="text-xs text-gray-500">Operator Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div className="text-sm text-gray-600">Welcome, Operator</div>
                <div className="text-xs text-gray-400">Last login: Today</div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <nav className="lg:w-72 xl:w-80 bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Navigation</h2>
              <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
            </div>
            
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700 shadow-inner'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-sm'
                  }`}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                  </div>
                  {pathname === item.href && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Stats summary */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 text-center">Quick Stats</h3>
              
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-2 bg-white rounded-lg shadow-xs">
                  <div className="text-lg font-bold text-blue-600">{stats.activeBookings}</div>
                  <div className="text-xs text-gray-600 mt-1">Active</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg shadow-xs">
                  <div className="text-lg font-bold text-green-600">{stats.totalBuses}</div>
                  <div className="text-xs text-gray-600 mt-1">Buses</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg shadow-xs">
                  <div className="text-lg font-bold text-purple-600">R{stats.todayRevenue}</div>
                  <div className="text-xs text-gray-600 mt-1">Revenue</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-gray-500">Updated: Just now</div>
              </div>
            </div>

            {/* Support section */}
            <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600">💬</span>
                <div className="text-xs text-yellow-800">
                  Need help? Contact support:{" "}
                  <span className="font-semibold">0800-BUSLINK</span>
                </div>
              </div>
            </div>
          </nav>

          {/* Content Area */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
                    </h1>
                    <p className="text-gray-600 mt-2">
                      {navItems.find(item => item.href === pathname)?.description || 
                       'Manage your bus operations and analytics'}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors">
                      🔄 Refresh
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                      📊 Report
                    </button>
                  </div>
                </div>
                <div className="w-16 h-1 bg-blue-600 rounded-full mt-4"></div>
              </div>

              {/* Main content */}
              <div className="space-y-6">
                {children}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-500">
                    BusLink Admin Panel • v1.0.0
                  </div>
                  <div className="text-xs text-gray-400">
                    © 2024 BusLink South Africa. All rights reserved.
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-40">
        <div className="grid grid-cols-3 gap-2">
          <Link
            href="/admin/dashboard"
            className={`flex flex-col items-center p-2 rounded-lg text-xs ${
              pathname === '/admin/dashboard' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600'
            }`}
          >
            <span className="text-lg">📊</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/bookings"
            className={`flex flex-col items-center p-2 rounded-lg text-xs ${
              pathname === '/admin/bookings' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600'
            }`}
          >
            <span className="text-lg">🎫</span>
            <span>Bookings</span>
          </Link>
          <Link
            href="/admin/tracking"
            className={`flex flex-col items-center p-2 rounded-lg text-xs ${
              pathname === '/admin/tracking' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600'
            }`}
          >
            <span className="text-lg">📍</span>
            <span>Tracking</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
