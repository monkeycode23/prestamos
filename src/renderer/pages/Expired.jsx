
import React from 'react';
import { Link } from 'react-router';
const Expired = () => {
    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Session Expired</h1>
                <p className="text-gray-700 mb-6">Your session has expired. Please log in again to continue.</p>
                <Link to="/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Go to Login 
                </Link>
                <p className="text-gray-500 mt-4">If you have any issues, please contact support.</p>
            </div>
        </div>
    );
}

export default Expired;