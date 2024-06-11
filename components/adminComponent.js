import React, { useState, useEffect } from 'react';

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

      if (res.status === 200) {
        const newEmployees = employees.filter((employee) => employee.employee_id !== employee_id);
        setEmployees(newEmployees);
        console.log('Employee deleted successfully');
      } else {
        console.log('Error deleting user');
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-bold text-center mb-2 text-black">Candidates</h1>
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
      <div className="mt-8">
        <h2 className="text-xl font-bold mt-2 text-center text-black">Employees</h2>
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
