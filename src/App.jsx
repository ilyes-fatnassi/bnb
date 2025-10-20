import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppContext } from './context/AppContext'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Hosts from './components/Hosts'
import Experiences from './components/Experiences'
import Testimonials from './components/Testimonials'
import HostProfile from './components/HostProfile'
import Booking from './components/Booking'
import Login from './components/Login'
import Signup from './components/Signup'
import Search from './components/Search'
import NotFound from './components/NotFound'
import Loading from './components/Loading'
import Notification from './components/Notification'
import Footer from './components/Footer'

function App() {
  const { notifications, removeNotification, loading } = useAppContext();

  return (
    <>
      <Header />
      {loading && <Loading />}
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Hosts />
              <Experiences />
              <Testimonials />
            </>
          } />
          <Route path="/search" element={<Search />} />
          <Route path="/hosts" element={<Hosts />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/host-profile" element={<HostProfile />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App