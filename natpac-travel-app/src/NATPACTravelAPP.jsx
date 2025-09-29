import React, { useState, useEffect, useCallback } from "react";
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
  ArrowLeft,
  Home,
  Route,
  Calendar,
  Wallet,
  Star,
  Search,
  Menu,
  X,
  Phone,
  Mail,
  Shield,
  Send,
} from "lucide-react";

const NATPACTravelApp = () => {
  const [currentView, setCurrentView] = useState("start");
  const [isTracking, setIsTracking] = useState(false);
  const [trips, setTrips] = useState([]);
  const [user] = useState({ id: "u_demo", name: "Demo User" });
  const [showMenu, setShowMenu] = useState(false);

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
    {
      id: "2",
      tripNumber: 2,
      origin: { lat: 9.939, lng: 76.261, name: "Office, Ernakulam" },
      destination: { lat: 9.945, lng: 76.255, name: "Lulu Mall" },
      startTime: "2025-09-27T18:30:00Z",
      endTime: "2025-09-27T18:50:00Z",
      mode: "CAR",
      distance: 1800.2,
      purpose: "SHOPPING",
      companions: 2,
      cost: 45.0,
      status: "completed",
    },
  ];

  useEffect(() => {
    setTrips(sampleTrips);
  }, []);

  const navigateTo = useCallback((newView) => {
    setCurrentView(newView);
    setShowMenu(false);
  }, []);

  const goBack = useCallback(() => {
    if (currentView === "home" || currentView === "dashboard") {
      setCurrentView("start");
    } else if (currentView !== "start") {
      setCurrentView("home");
    }
  }, [currentView]);

  const handleMenuNavigation = (view) => {
    setShowMenu(false);
    navigateTo(view);
  };

  const NATPAC_ICON = () => (
    <div className="flex items-center space-x-2">
      <img src="/tripxlogo.png" alt="TripX Logo" className="h-15 w-auto" />
    </div>
  );

  const Header = ({ title, showBack = true }) => {
    const isInternalPage =
      currentView !== "home" &&
      currentView !== "dashboard" &&
      currentView !== "start";

    const BackButtonPlaceholder = isInternalPage ? (
      <button
        onClick={goBack}
        className="p-2 hover:bg-gray-100 rounded-full transition-all"
      >
        <ArrowLeft size={20} className="text-gray-600" />
      </button>
    ) : (
      <div className="w-10"></div>
    );

    const MenuButtonPlaceholder =
      currentView !== "start" && currentView !== "dashboard" ? (
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-gray-100 rounded-full transition-all"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
      ) : (
        <div className="w-10"></div>
      );

    return (
      <div className="flex items-center justify-between p-4 bg-white shadow-md border-b border-gray-100 sticky top-0 z-40">
        {BackButtonPlaceholder}

        <div className="flex-1 flex justify-center absolute left-0 right-0">
          {title ? (
            <h1 className="text-xl font-extrabold text-gray-900">{title}</h1>
          ) : (
            <NATPAC_ICON />
          )}
        </div>

        {MenuButtonPlaceholder}
      </div>
    );
  };

  const BottomNavBar = ({ currentView, navigateTo }) => {
    const getActiveView = () => {
      if (["addTrip", "booking", "expenses", "privacy"].includes(currentView)) {
        return "home";
      }
      if (currentView === "bestRoute") return "bestRoute";
      if (currentView === "trips") return "trips";
      if (currentView === "settings") return "settings";
      return currentView;
    };

    const activeView = getActiveView();

    const navItems = [
      { icon: Home, label: "Home", view: "home" },
      { icon: Route, label: "Routes", view: "bestRoute" },
      { icon: BarChart3, label: "Trips", view: "trips" },
      { icon: Settings, label: "Settings", view: "settings" },
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40">
        <div className="flex justify-around py-3 max-w-md mx-auto">
          {navItems.map((tab, index) => (
            <button
              key={index}
              onClick={() => navigateTo(tab.view)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all ${
                activeView === tab.view
                  ? "text-blue-600 bg-blue-50 shadow-inner"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <tab.icon size={22} />
              <span className="text-xs font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const SideMenu = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setShowMenu(false)}
    >
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={() => setShowMenu(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-2">
            {[
              { icon: Home, label: "Home", view: "home" },
              { icon: MapPin, label: "Add Trip", view: "addTrip" },
              { icon: Route, label: "Best Routes", view: "bestRoute" },
              { icon: Hotel, label: "Bookings", view: "booking" },
              { icon: BarChart3, label: "My Trips", view: "trips" },
              { icon: Wallet, label: "Expenses", view: "expenses" },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuNavigation(item.view)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-all text-left text-lg"
              >
                <item.icon size={22} className="text-blue-600" />
                <span className="font-semibold text-gray-700">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
            <button
              onClick={() => handleMenuNavigation("settings")}
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-left"
            >
              <Settings size={20} className="text-gray-600" />
              <span className="font-medium text-gray-700">Settings</span>
            </button>
            <button
              onClick={() => handleMenuNavigation("start")}
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-all text-left"
            >
              <ArrowLeft size={20} className="text-red-600 rotate-180" />
              <span className="font-medium text-red-600">Switch/Exit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const StartScreen = ({ navigateTo }) => (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-800 via-blue-900 to-purple-900 text-white transition-all duration-1000">
      <div className="text-center mb-12">
        <img
          src="/tripxlogo.png"
          alt="TripX Logo"
          className="w-20 h-auto mx-auto mb-4"
        />

        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
          TripX: Travel Made Effortless...
        </h1>
        <p className="text-lg font-light opacity-80">
          Kerala's Comprehensive Travel & Planning App
        </p>
      </div>

      <div className="w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center">Select Your Role</h2>

        <button
          onClick={() => navigateTo("home")}
          className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-white text-gray-900 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:ring-4 hover:ring-blue-300 hover:scale-[1.02]"
        >
          <MapPin size={24} className="text-blue-600" />
          <span>User App (Trip Logging)</span>
        </button>

        <button
          onClick={() => navigateTo("dashboard")}
          className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-green-500 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all hover:ring-4 hover:ring-green-300 hover:scale-[1.02] hover:bg-green-600"
        >
          <BarChart3 size={24} className="text-white" />
          <span>NATPAC Dashboard</span>
        </button>
      </div>

      <div className="mt-12 text-center text-sm opacity-70">
        <p>National Transportation Planning and Research Centre (NATPAC)</p>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Header title="" showBack={false} />
      <div className="p-4 pb-28">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl border-t-4 border-blue-500 transition-all hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Hello, {user.name.split(" ")[0]}!
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Let's record your next journey.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigateTo("settings")}
                className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-all"
              >
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Trip Tracking
              </h3>
              <div
                className={`w-3 h-3 rounded-full ${
                  isTracking ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              ></div>
            </div>

            <button
              onClick={() => setIsTracking(!isTracking)}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all transform hover:shadow-lg hover:scale-[1.01] ${
                isTracking
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                {isTracking ? <Pause size={20} /> : <Play size={20} />}
                <span>
                  {isTracking ? "Stop & Save Trip" : "Start Auto Tracking"}
                </span>
              </div>
            </button>

            {isTracking && (
              <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-200 shadow-inner">
                <p className="text-green-800 font-medium flex items-center space-x-2">
                  <Clock size={18} /> <span>Live Tracking Active...</span>
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              {
                icon: MapPin,
                label: "Manual Add",
                color: "blue",
                view: "addTrip",
                iconBg: "bg-blue-100 text-blue-600",
              },
              {
                icon: Route,
                label: "Find Route",
                color: "green",
                view: "bestRoute",
                iconBg: "bg-green-100 text-green-600",
              },
              {
                icon: Hotel,
                label: "Bookings",
                color: "purple",
                view: "booking",
                iconBg: "bg-purple-100 text-purple-600",
              },
              {
                icon: BarChart3,
                label: "My Trips",
                color: "orange",
                view: "trips",
                iconBg: "bg-orange-100 text-orange-600",
              },
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => navigateTo(action.view)}
                className="bg-white p-5 rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:translate-y-[-2px] border border-gray-100 text-left"
              >
                <div
                  className={`w-10 h-10 ${action.iconBg} rounded-xl flex items-center justify-center mb-3 transition-all`}
                >
                  <action.icon size={20} />
                </div>
                <p className="font-bold text-gray-800 text-base">
                  {action.label}
                </p>
              </button>
            ))}
          </div>

          {trips.length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {trips.slice(0, 2).map((trip, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {trip.origin.name.split(",")[0]} →{" "}
                        {trip.destination.name.split(",")[0]}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium text-blue-600">
                          {trip.mode.replace("PT_", "").replace("_", " ")}
                        </span>{" "}
                        • ₹{trip.cost} •{" "}
                        {Math.round((trip.distance / 1000) * 10) / 10} km
                      </p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigateTo("trips")}
                className="w-full mt-4 py-2 text-blue-600 font-semibold border-t border-gray-100 pt-4 hover:text-blue-700 transition-colors"
              >
                View All Trips
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const TripConfirmation = () => (
    <div className="min-h-screen bg-gray-50">
      <Header title="Confirm Trip" />

      <div className="p-4 pb-28">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl h-48 mb-6 flex items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
              <div className="relative z-10 text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-800 font-medium">Trip Route Map</p>
                <p className="text-blue-600 text-sm">2.4 km • 25 minutes</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <input
                    type="text"
                    value="Home, Kochi"
                    className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 text-sm focus:bg-white focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                    className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 text-sm focus:bg-white focus:ring-blue-500 focus:border-blue-500 transition-all"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode of Transport
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                  <option value="PT_BUS">🚌 Bus</option>
                  <option value="PT_TRAIN">🚊 Train</option>
                  <option value="CAR">🚗 Car</option>
                  <option value="TWO_WHEELER">🏍️ Two Wheeler</option>
                  <option value="WALK">🚶 Walking</option>
                  <option value="CYCLE">🚴 Bicycle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Purpose
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                  <option value="WORK">💼 Work</option>
                  <option value="HOME">🏠 Home</option>
                  <option value="EDUCATION">📚 Education</option>
                  <option value="SHOPPING">🛒 Shopping</option>
                  <option value="LEISURE">🎯 Leisure</option>
                  <option value="MEDICAL">🏥 Medical</option>
                  <option value="OTHER">📋 Other</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Companions
                  </label>
                  <input
                    type="number"
                    defaultValue="1"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost (₹)
                  </label>
                  <input
                    type="number"
                    defaultValue="15"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                    <option value="ONE_TIME">One Time</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={goBack}
                className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all transform hover:scale-[1.01]"
              >
                Cancel
              </button>
              <button
                onClick={() => navigateTo("home")}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-[1.01]"
              >
                Confirm Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BestRouteScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Header title="Find Route" />
      <div className="p-4 pb-28">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-6">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Enter starting location"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <div className="relative">
                  <Navigation
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Enter destination"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-[1.01]">
              <Search className="inline mr-2" size={20} />
              Find Routes
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                type: "Fastest",
                time: "25 mins",
                distance: "2.4 km",
                cost: "₹15",
                mode: "Bus",
                color: "from-green-500 to-emerald-600",
                icon: "🚌",
              },
              {
                type: "Cheapest",
                time: "35 mins",
                distance: "2.8 km",
                cost: "₹10",
                mode: "Bus",
                color: "from-blue-500 to-cyan-600",
                icon: "🚌",
              },
              {
                type: "Eco-friendly",
                time: "45 mins",
                distance: "2.2 km",
                cost: "Free",
                mode: "Walk + Metro",
                color: "from-emerald-500 to-teal-600",
                icon: "🚶‍♂️🚇",
              },
            ].map((route, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 transition-all hover:shadow-xl cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-r ${route.color} flex items-center justify-center shadow-md`}
                    >
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {route.type} Route
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {route.icon} {route.mode}
                      </p>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-blue-600">
                    {route.cost}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{route.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{route.distance}</span>
                  </div>
                </div>

                <button className="w-full py-3 px-4 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-all">
                  Select & Navigate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BookingScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Header title="Bookings" />

      <div className="p-4 pb-28">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-6 transition-all hover:shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              What would you like to book?
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl text-center hover:from-blue-100 hover:to-indigo-200 transition-all transform hover:scale-[1.03] border border-blue-200 shadow-md">
                <Car className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-800">Transport</p>
                <p className="text-gray-600 text-sm mt-1">Bus, Train, Taxi</p>
              </button>
              <button className="p-6 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl text-center hover:from-purple-100 hover:to-pink-200 transition-all transform hover:scale-[1.03] border border-purple-200 shadow-md">
                <Hotel className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-800">Hotels</p>
                <p className="text-gray-600 text-sm mt-1">
                  Stay & Accommodation
                </p>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Popular Bookings
            </h3>

            <div className="space-y-4">
              {[
                {
                  type: "transport",
                  title: "KSRTC Volvo",
                  subtitle: "Kochi → Trivandrum",
                  price: "₹280",
                  duration: "4h 30m",
                  rating: 4.5,
                  icon: "🚌",
                },
                {
                  type: "transport",
                  title: "Shatabdi Express",
                  subtitle: "Ernakulam → Bangalore",
                  price: "₹540",
                  duration: "11h 45m",
                  rating: 4.2,
                  icon: "🚄",
                },
                {
                  type: "hotel",
                  title: "Hotel Fort Kochi",
                  subtitle: "Near Beach, AC Room",
                  price: "₹2,400",
                  duration: "per night",
                  rating: 4.6,
                  icon: "🏨",
                },
              ].map((booking, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-2xl hover:shadow-md transition-all cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{booking.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {booking.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {booking.subtitle}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">
                            {booking.rating}
                          </span>
                          <span className="text-gray-400 text-sm">
                            • {booking.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">
                        {booking.price}
                      </p>
                      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all transform hover:scale-[1.05]">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TripsScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Header title="My Trips" />

      <div className="p-4 pb-28">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-6 transition-all hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              This Month
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {trips.length}
                </p>
                <p className="text-gray-600 text-sm">Total Trips</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">4.2</p>
                <p className="text-gray-600 text-sm">Avg km/trip</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">₹560</p>
                <p className="text-gray-600 text-sm">Total Spent</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {trips.map((trip, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 transition-all hover:shadow-xl cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      Trip #{trip.tripNumber}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {trip.origin.name.split(",")[0]} →{" "}
                      {trip.destination.name.split(",")[0]}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(trip.startTime).toLocaleDateString()} •{" "}
                      {new Date(trip.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">₹{trip.cost}</p>
                    <p className="text-sm text-gray-600">
                      {(trip.distance / 1000).toFixed(1)} km
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {trip.mode.replace("PT_", "").replace("_", " ")}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {trip.purpose}
                    </span>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Header title="Settings" />

      <div className="p-4 pb-28">
        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Profile
            </h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">D</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{user.name}</h4>
                <p className="text-gray-600 text-sm">ID: {user.id}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Privacy & Data
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: Shield,
                  label: "Privacy Policy",
                  action: () => navigateTo("privacy"),
                },
                { icon: Download, label: "Export My Data", action: () => {} },
                {
                  icon: Settings,
                  label: "Data Sharing Settings",
                  action: () => {},
                },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={20} className="text-gray-600" />
                    <span className="font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                  <ArrowLeft className="rotate-180 text-gray-400" size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              App Settings
            </h3>
            <div className="space-y-4">
              {[
                { label: "Push Notifications", enabled: true },
                { label: "Auto Trip Detection", enabled: true },
                { label: "Battery Optimization", enabled: false },
                { label: "Offline Mode", enabled: true },
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">
                    {setting.label}
                  </span>
                  <div
                    className={`w-12 h-6 rounded-full p-1 transition-colors`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        setting.enabled
                          ? "translate-x-6 bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Support
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  label: "Contact Support",
                  sublabel: "Get help with the app",
                },
                {
                  icon: Mail,
                  label: "Feedback",
                  sublabel: "Share your thoughts",
                },
                { icon: Star, label: "Rate App", sublabel: "Help us improve" },
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-left"
                >
                  <item.icon size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-700">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.sublabel}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PrivacyScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Header title="Privacy Policy" />

      <div className="p-4 pb-28">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-800">
                Your Privacy Matters
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Data We Collect
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Trip origin and destination coordinates</li>
                  <li>• Travel mode and distance</li>
                  <li>• Trip purpose and cost information</li>
                  <li>• Device location (with your permission)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  How We Use Your Data
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Transportation planning research by NATPAC</li>
                  <li>• Improving public transport systems</li>
                  <li>• Urban planning and policy decisions</li>
                  <li>• Statistical analysis (anonymized)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Your Rights
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• View and export your data anytime</li>
                  <li>• Delete your account and data</li>
                  <li>• Control data sharing preferences</li>
                  <li>• Withdraw consent at any time</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Data Security:</strong> All data is encrypted and
                  stored securely. Your personal identity is never shared with
                  third parties.
                </p>
              </div>

              <button
                onClick={goBack}
                className="w-full py-3 px-6 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all transform hover:scale-[1.01]"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md border-b border-gray-200 p-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <BarChart3 className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                NATPAC Analytics
              </h1>
              <p className="text-sm text-gray-600">
                Kerala Transportation Planning Dashboard
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => navigateTo("start")}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all transform hover:scale-[1.05]"
            >
              <ArrowLeft size={16} />
              <span>Exit Dashboard</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-[1.05]">
              <Filter size={16} />
              <span>Filters</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-[1.05]">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Trips",
                value: "15,847",
                change: "+12% MoM",
                color: "from-blue-500 to-blue-600",
                icon: MapPin,
              },
              {
                title: "Active Users",
                value: "2,341",
                change: "+8% MoM",
                color: "from-green-500 to-green-600",
                icon: Users,
              },
              {
                title: "Avg Distance",
                value: "4.2 km",
                change: "per trip",
                color: "from-purple-500 to-purple-600",
                icon: Navigation,
              },
              {
                title: "Peak Hour",
                value: "8-9 AM",
                change: "Morning rush",
                color: "from-orange-500 to-orange-600",
                icon: Clock,
              },
            ].map((metric, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${metric.color} text-white p-6 rounded-2xl shadow-xl transition-all hover:shadow-2xl`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold opacity-90">
                    {metric.title}
                  </h3>
                  <metric.icon size={24} className="opacity-80" />
                </div>
                <p className="text-3xl font-bold mb-1">{metric.value}</p>
                <p className="text-sm opacity-80">{metric.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Transportation Mode Share
              </h3>
              <div className="space-y-4">
                {[
                  {
                    mode: "Bus",
                    percentage: 42,
                    color: "bg-blue-500",
                    icon: "🚌",
                  },
                  {
                    mode: "Two Wheeler",
                    percentage: 28,
                    color: "bg-green-500",
                    icon: "🏍️",
                  },
                  {
                    mode: "Car",
                    percentage: 18,
                    color: "bg-purple-500",
                    icon: "🚗",
                  },
                  {
                    mode: "Walking",
                    percentage: 8,
                    color: "bg-orange-500",
                    icon: "🚶",
                  },
                  {
                    mode: "Train",
                    percentage: 4,
                    color: "bg-red-500",
                    icon: "🚄",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-700">
                          {item.mode}
                        </span>
                        <span className="font-bold text-gray-800">
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 ${item.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Trip Purpose Analysis
              </h3>
              <div className="space-y-4">
                {[
                  { purpose: "Work", count: 6240, percentage: 39, icon: "💼" },
                  { purpose: "Home", count: 4753, percentage: 30, icon: "🏠" },
                  {
                    purpose: "Shopping",
                    count: 2377,
                    percentage: 15,
                    icon: "🛒",
                  },
                  {
                    purpose: "Education",
                    count: 1585,
                    percentage: 10,
                    icon: "📚",
                  },
                  { purpose: "Leisure", count: 892, percentage: 6, icon: "🎯" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium text-gray-700">
                        {item.purpose}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-800">
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

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Live Trip Data Stream
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 rounded-lg">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Trip ID
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Route
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Mode
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Distance
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Purpose
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      id: "T001",
                      route: "Kochi → Ernakulam",
                      mode: "Bus",
                      distance: "2.4 km",
                      purpose: "Work",
                      time: "06:45",
                      icon: "🚌",
                    },
                    {
                      id: "T002",
                      route: "Thrissur → Palakkad",
                      mode: "Train",
                      distance: "45.2 km",
                      purpose: "Education",
                      time: "07:30",
                      icon: "🚄",
                    },
                    {
                      id: "T003",
                      route: "Calicut → Beach",
                      mode: "Two Wheeler",
                      distance: "8.1 km",
                      purpose: "Leisure",
                      time: "08:15",
                      icon: "🏍️",
                    },
                    {
                      id: "T004",
                      route: "Home → Mall",
                      mode: "Car",
                      distance: "12.5 km",
                      purpose: "Shopping",
                      time: "09:00",
                      icon: "🚗",
                    },
                  ].map((trip, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {trip.id}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-800">
                        {trip.route}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{trip.icon}</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {trip.mode}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {trip.distance}
                      </td>
                      <td className="px-4 py-4 text-gray-800">
                        {trip.purpose}
                      </td>
                      <td className="px-4 py-4 text-gray-600 font-mono">
                        {trip.time}
                      </td>
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

  const renderCurrentView = () => {
    switch (currentView) {
      case "start":
        return <StartScreen navigateTo={navigateTo} />;
      case "home":
        return <HomeScreen />;
      case "addTrip":
        return <TripConfirmation />;
      case "bestRoute":
        return <BestRouteScreen />;
      case "booking":
        return <BookingScreen />;
      case "trips":
        return <TripsScreen />;
      case "settings":
        return <SettingsScreen />;
      case "privacy":
        return <PrivacyScreen />;
      case "dashboard":
        return <DashboardScreen />;
      default:
        return <StartScreen navigateTo={navigateTo} />;
    }
  };

  const isUserAppView = currentView !== "start" && currentView !== "dashboard";
  const showBottomNav = isUserAppView && currentView !== "privacy";

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {renderCurrentView()}
      {isUserAppView && <SideMenu />}
      {showBottomNav && (
        <BottomNavBar currentView={currentView} navigateTo={navigateTo} />
      )}
    </div>
  );
};

export default NATPACTravelApp;
