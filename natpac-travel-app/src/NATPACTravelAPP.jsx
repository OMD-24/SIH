import React, { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Hotel,
  Car,
  Clock,
  Users,
  DollarSign,
  Play,
  Pause,
  CheckCircle,
  Settings,
  BarChart3,
  Download,
  Filter,
} from "lucide-react";

const NATPACTravelApp = () => {
  const [currentView, setCurrentView] = useState("home");
  const [isTracking, setIsTracking] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState({ id: "u_demo", name: "Demo User" });

  // Sample trip data
  const sampleTrips = [
    {
      id: "1",
      tripNumber: 1,
      origin: { lat: 9.931233, lng: 76.267303, name: "Home, Kochi" },
      destination: { lat: 9.939, lng: 76.261, name: "Office, Ernakulam" },
      startTime: "2025-09-27T06:45:00Z",
      endTime: "2025-09-27T07:10:00Z",
      mode: "PT_BUS",
      distance: 2400.5,
      purpose: "WORK",
      companions: 1,
      cost: 15.0,
      status: "completed",
    },
  ];

  useEffect(() => {
    setTrips(sampleTrips);
  }, []);

  // Home Screen Component
  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Travel Tracker
          </h1>
          <p className="text-gray-600">
            Contributing to Kerala's transportation planning
          </p>
        </div>

        {/* Tracking Status */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Trip Tracking
            </h2>
            <div
              className={`w-4 h-4 rounded-full ${
                isTracking ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
          </div>

          <button
            onClick={() => setIsTracking(!isTracking)}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all ${
              isTracking
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              {isTracking ? <Pause size={20} /> : <Play size={20} />}
              <span>{isTracking ? "Stop Tracking" : "Start Tracking"}</span>
            </div>
          </button>

          {isTracking && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl">
              <p className="text-green-800 font-medium">🛰️ Tracking active</p>
              <p className="text-green-600 text-sm">
                Your trip will be recorded automatically
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setCurrentView("addTrip")}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <MapPin className="w-8 h-8 text-blue-500 mb-3 mx-auto" />
            <p className="font-semibold text-gray-800">Add Trip</p>
          </button>

          <button
            onClick={() => setCurrentView("bestRoute")}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <Navigation className="w-8 h-8 text-green-500 mb-3 mx-auto" />
            <p className="font-semibold text-gray-800">Best Route</p>
          </button>

          <button
            onClick={() => setCurrentView("booking")}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <Hotel className="w-8 h-8 text-purple-500 mb-3 mx-auto" />
            <p className="font-semibold text-gray-800">Book Stay</p>
          </button>

          <button
            onClick={() => setCurrentView("trips")}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <BarChart3 className="w-8 h-8 text-orange-500 mb-3 mx-auto" />
            <p className="font-semibold text-gray-800">My Trips</p>
          </button>
        </div>

        {/* Recent Activity */}
        {trips.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Trip
            </h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-800">Home → Office</p>
                <p className="text-sm text-gray-600">Bus • ₹15 • 25 mins</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="flex justify-around py-3">
            <button
              onClick={() => setCurrentView("home")}
              className={`p-3 ${
                currentView === "home" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <MapPin size={24} />
            </button>
            <button
              onClick={() => setCurrentView("trips")}
              className={`p-3 ${
                currentView === "trips" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <BarChart3 size={24} />
            </button>
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`p-3 ${
                currentView === "dashboard" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <Settings size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Trip Confirmation Component
  const TripConfirmation = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Confirm Your Trip
          </h2>

          {/* Trip Map Preview */}
          <div className="bg-gray-200 rounded-xl h-48 mb-6 flex items-center justify-center">
            <p className="text-gray-600">📍 Trip Route Map</p>
          </div>

          {/* Trip Details Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <input
                type="text"
                value="Home, Kochi"
                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <input
                type="text"
                value="Office, Ernakulam"
                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mode of Transport
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-xl">
                <option value="PT_BUS">Bus</option>
                <option value="PT_TRAIN">Train</option>
                <option value="CAR">Car</option>
                <option value="TWO_WHEELER">Two Wheeler</option>
                <option value="WALK">Walking</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Purpose
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-xl">
                <option value="WORK">Work</option>
                <option value="HOME">Home</option>
                <option value="EDUCATION">Education</option>
                <option value="SHOPPING">Shopping</option>
                <option value="LEISURE">Leisure</option>
                <option value="MEDICAL">Medical</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Companions
                </label>
                <input
                  type="number"
                  defaultValue="1"
                  className="w-full p-3 border border-gray-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost (₹)
                </label>
                <input
                  type="number"
                  defaultValue="15"
                  className="w-full p-3 border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-xl">
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="ONE_TIME">One Time</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setCurrentView("home")}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => setCurrentView("home")}
              className="flex-1 py-3 px-6 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all"
            >
              Confirm Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Best Route Component
  const BestRouteScreen = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Find Best Route
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <input
                type="text"
                placeholder="Enter starting location"
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <input
                type="text"
                placeholder="Enter destination"
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
            </div>
          </div>

          <button className="w-full py-3 px-6 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all">
            Find Routes
          </button>
        </div>

        {/* Route Options */}
        <div className="space-y-4">
          {[
            {
              type: "Fastest",
              time: "25 mins",
              distance: "2.4 km",
              cost: "₹15",
              mode: "Bus",
            },
            {
              type: "Cheapest",
              time: "35 mins",
              distance: "2.8 km",
              cost: "₹10",
              mode: "Bus",
            },
            {
              type: "Eco-friendly",
              time: "45 mins",
              distance: "2.2 km",
              cost: "Free",
              mode: "Walk + Metro",
            },
          ].map((route, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800">
                  {route.type} Route
                </h3>
                <span className="text-blue-500 font-medium">{route.cost}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>⏱️ {route.time}</span>
                <span>📍 {route.distance}</span>
                <span>🚌 {route.mode}</span>
              </div>
              <button className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-all">
                Select & Navigate
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Booking Component
  const BookingScreen = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Book Travel & Stay
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button className="p-6 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition-all">
              <Car className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-medium text-gray-800">Transport</p>
            </button>
            <button className="p-6 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition-all">
              <Hotel className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="font-medium text-gray-800">Hotels</p>
            </button>
          </div>
        </div>

        {/* Quick Booking Options */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Popular Options
          </h3>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">KSRTC Bus</h4>
                  <p className="text-sm text-gray-600">Kochi → Trivandrum</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₹180</p>
                  <p className="text-sm text-gray-600">4h 30m</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">Budget Inn</h4>
                  <p className="text-sm text-gray-600">Near Railway Station</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">₹1,200</p>
                  <p className="text-sm text-gray-600">per night</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // NATPAC Dashboard Component
  const DashboardScreen = () => (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              NATPAC Analytics Dashboard
            </h2>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                <Filter size={16} />
                <span>Filters</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
                <Download size={16} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Total Trips</h3>
              <p className="text-3xl font-bold">15,847</p>
              <p className="text-blue-100 text-sm mt-2">+12% from last month</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Active Users</h3>
              <p className="text-3xl font-bold">2,341</p>
              <p className="text-green-100 text-sm mt-2">+8% from last month</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Avg Distance</h3>
              <p className="text-3xl font-bold">4.2 km</p>
              <p className="text-purple-100 text-sm mt-2">Per trip</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Peak Hour</h3>
              <p className="text-3xl font-bold">8-9 AM</p>
              <p className="text-orange-100 text-sm mt-2">Morning rush</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Mode Share Distribution
              </h3>
              <div className="space-y-3">
                {[
                  { mode: "Bus", percentage: 42, color: "bg-blue-500" },
                  {
                    mode: "Two Wheeler",
                    percentage: 28,
                    color: "bg-green-500",
                  },
                  { mode: "Car", percentage: 18, color: "bg-purple-500" },
                  { mode: "Walking", percentage: 8, color: "bg-orange-500" },
                  { mode: "Train", percentage: 4, color: "bg-red-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full bg-gray-200 relative">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="flex-1 font-medium text-gray-700">
                      {item.mode}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Trip Purpose Analysis
              </h3>
              <div className="space-y-3">
                {[
                  { purpose: "Work", count: 6240, percentage: 39 },
                  { purpose: "Home", count: 4753, percentage: 30 },
                  { purpose: "Shopping", count: 2377, percentage: 15 },
                  { purpose: "Education", count: 1585, percentage: 10 },
                  { purpose: "Leisure", count: 892, percentage: 6 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium text-gray-700">
                      {item.purpose}
                    </span>
                    <div className="text-right">
                      <span className="font-semibold text-gray-800">
                        {item.count.toLocaleString()}
                      </span>
                      <span className="text-gray-600 text-sm ml-2">
                        ({item.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Data Table */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Trip Data
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-700">
                      Trip ID
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-700">
                      Origin → Destination
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-700">
                      Mode
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-700">
                      Distance
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-700">
                      Purpose
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-700">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    {
                      id: "T001",
                      route: "Kochi → Ernakulam",
                      mode: "Bus",
                      distance: "2.4 km",
                      purpose: "Work",
                      time: "06:45",
                    },
                    {
                      id: "T002",
                      route: "Thrissur → Palakkad",
                      mode: "Train",
                      distance: "45.2 km",
                      purpose: "Education",
                      time: "07:30",
                    },
                    {
                      id: "T003",
                      route: "Calicut → Beach",
                      mode: "Two Wheeler",
                      distance: "8.1 km",
                      purpose: "Leisure",
                      time: "08:15",
                    },
                    {
                      id: "T004",
                      route: "Home → Mall",
                      mode: "Car",
                      distance: "12.5 km",
                      purpose: "Shopping",
                      time: "09:00",
                    },
                  ].map((trip, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm text-gray-600">
                        {trip.id}
                      </td>
                      <td className="px-4 py-3 text-gray-800">{trip.route}</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {trip.mode}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-800">
                        {trip.distance}
                      </td>
                      <td className="px-4 py-3 text-gray-800">
                        {trip.purpose}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{trip.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomeScreen />;
      case "addTrip":
        return <TripConfirmation />;
      case "bestRoute":
        return <BestRouteScreen />;
      case "booking":
        return <BookingScreen />;
      case "trips":
        return <TripConfirmation />;
      case "dashboard":
        return <DashboardScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="font-sans">
      {renderCurrentView()}

      {/* Demo Controls */}
      <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg z-50">
        <p className="text-xs mb-2 font-semibold">Demo Controls:</p>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentView("home")}
            className="text-xs bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
          >
            App
          </button>
          <button
            onClick={() => setCurrentView("dashboard")}
            className="text-xs bg-green-600 px-2 py-1 rounded hover:bg-green-700"
          >
            NATPAC
          </button>
        </div>
      </div>
    </div>
  );
};

export default NATPACTravelApp;
