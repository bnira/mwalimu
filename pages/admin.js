import React from 'react';
import AdminDash from '../components/adminComponent';
import '../app/globals.css';

const AdminDashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl mb-8">Admin Dashboard</h1>
        <AdminDash />
        </div>
    );
    }

export default AdminDashboard;