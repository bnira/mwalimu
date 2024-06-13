import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from './addUser';

const AdminDash = () => {
  const [candidates, setCandidates] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch('/api/getData');
      const data = await res.json();
      setCandidates(data.candidates);
      setEmployees(data.voters);
    };

    fetchEmployees();
  }, []);

  const deleteUser = async (employee_id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log('Deleting employee: ', employee_id);

      const res = await fetch('/api/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee_id }),
      });

      console.log('Response: ', res);
      if (res.status === 200) {
        const newEmployees = employees.filter((employee) => employee.employee_id !== employee_id);
        setEmployees(newEmployees);
        toast.success('User deleted successfully');
        window.location.reload();
      } else {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <div className="mt-0">
      <ToastContainer />
      <div className="mt-1">
        <AddUser />
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold mb-1 text-black">Candidates</h1>
        <div className="overflow-x-auto">
          <table className="table-auto border bg-green-200">
            <thead>
              <tr>
                <th className="px-4 py-2">Candidate name</th>
                <th className="px-4 py-2">Candidate position</th>
                <th className="px-4 py-2">Candidate votes</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{candidate.name}</td>
                  <td className="border px-4 py-2">{candidate.position}</td>
                  <td className="border px-4 py-2">{candidate.votes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mt-2 text-black">Employees</h2>
        <div className="overflow-x-auto">
          <table className="table-auto bg-green-200">
            <thead>
              <tr>
                <th className="px-4 py-2">Employee Id</th>
                <th className="px-4 py-2">Employee Name</th>
                <th className="px-4 py-2">Voted</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{employee.employee_id}</td>
                  <td className="border px-4 py-2">{employee.Name}</td>
                  <td className="border px-4 py-2">
                    {employee.voted ? 'Yes' : 'No'}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteUser(employee.employee_id)}
                      className="bg-red-500 text-white px-3 py-3 rounded-md hover:bg-red-600 mr-1 mb-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
