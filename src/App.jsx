import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import './App.css';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Hosts from './components/Hosts';
import ListingDetail from './components/ListingDetail';
import Experiences from './components/Experiences';
import Testimonials from './components/Testimonials';
import Meals from './components/Meals';
import BecomeHost from './components/BecomeHost';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import Loading from './components/Loading';

// Host Components
import HostLayout from './components/host/HostLayout';
import HostDashboard from './components/host/HostDashboard';
import AddMeal from './components/host/AddMeal';
import HostMealsList from './components/host/HostMealsList';
import HostBookings from './components/host/HostBookings';

function App() {
  const { loading } = useAppContext();

  console.log('App rendering - loading:', loading);

  if (loading) {
    console.log('Showing loading screen');
    return <Loading />;
  }

  console.log('Showing main app');
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <div>
              <Hero />
              <Features />
              <Hosts />
              <Testimonials />
            </div>
          } />
          <Route path="/meals" element={<Meals />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/become-host" element={<BecomeHost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          
          {/* Host Routes - Must come before /dashboard */}
          <Route path="/host" element={<HostLayout />}>
            <Route index element={<HostDashboard />} />
            <Route path="dashboard" element={<HostDashboard />} />
            <Route path="meals" element={<HostMealsList />} />
            <Route path="meals/add" element={<AddMeal />} />
            <Route path="meals/edit/:id" element={<AddMeal />} />
            <Route path="bookings" element={<HostBookings />} />
          </Route>
          
          {/* User Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;