import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

interface AdminLoginComponentProps {
  onLoginSuccess: () => void;
}

export const AdminLoginComponent: React.FC<AdminLoginComponentProps> = ({
 onLoginSuccess,
}) => {
 const [loading, setLoading] = useState(false);
 const [code, setCode] = useState('');

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
   const isValid = await verifyCodeWithAPI(code);
   if (isValid) {
    sessionStorage.setItem('isLoggedIn', 'true');
    onLoginSuccess();
   } else {
    alert('Invalid code');
   }
  } catch (error) {
   console.log(error);
  } finally {
   setLoading(false);
  }
 };

 const verifyCodeWithAPI = async (pwd: string): Promise<boolean> => {
  try {
   const response = await fetch('/api/verify-admin', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pwd }),
   });

   if (response.ok) {
    const data = await response.json();
    return data.isValid;
   } else {
    return false;
   }
  } catch (error) {
   console.error('Error verifying code:', error);
   return false;
  }
 };

 return (
  <>
   <div className="w-full bg-black text-white p-2 fixed top-0 left-0 z-50">
    <button
     type="button"
     name="codegenerationbutton"
     className="text-white p-2 cursor-pointer "
     disabled
    >
          mwalimu voting system
    </button>
   </div>
   <div className="flex items-center justify-center h-screen">
    <form className="flex flex-col" onSubmit={handleSubmit}>
     <h1 className="text-2xl font-bold mb-4">Enter access code</h1>
     <input
      type="text"
      name="accesscode"
      placeholder="Enter access code"
      onChange={(e) => setCode(e.target.value)}
      className="border-2 border-black p-2"
     />
     <button type="submit" className="bg-black text-white p-2 mt-1 ">
      {loading ? 'Verifying...' : 'Verify'}
     </button>
    </form>
   </div>
  </>
 );
};
