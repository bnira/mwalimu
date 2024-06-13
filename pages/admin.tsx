import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminDash from '../components/adminComponent';
import { AdminLoginComponent } from '../components/adminLoginComponent';
import '../app/globals.css';

const Invitation: React.FC = () => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);

 useEffect(() => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  setIsAuthenticated(isLoggedIn);
 }, []);

 const handleLoginSuccess = () => {
  setIsAuthenticated(true);
 };

 return isAuthenticated ? (
    <div>
        <nav className="bg-gray-800 p-4 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold">Admin DashBoard</div>
          <div>
            <Link href="/admin">
              <div className="text-white">Admin</div>
            </Link>
          </div>
        </div>
      </nav>
      <div className='items-center justify-center'>
        <AdminDash />
        </div>
    </div>
 ) : (
  <AdminLoginComponent onLoginSuccess={handleLoginSuccess} />
 );
};

export default Invitation;
