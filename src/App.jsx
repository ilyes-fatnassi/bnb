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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;