// path: components/addUser.tsx
import React, {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser: React.FC = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [employeeName, setEmployeeName] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch('/api/addEmployees', {
            method: 'POST',
            body: JSON.stringify({employeeId, employeeName}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        console.log(data);
        if (data.message === 'Employee added successfully') {
            toast.success('Employee added successfully');
            setEmployeeId('');
            setEmployeeName('');
        } else {
            toast.error(data.message);
        }
};

    return (
        <div className="overflow-x-hidden justify-center ">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Add User</h1>
            <div className="flex flex-col">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="employeeId"
                        id="employeeId"
                        placeholder="Employee Id"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="p-2 mb-2"
                    />
                    <input
                        type="text"
                        name="employeeName"
                        id="employeeName"
                        placeholder="Employee Name"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        className="p-2 mb-2"
                    />
                    <button
                        type="submit"
                        name="addUser"
                        className="p-2 bg-green-500 text-white ml-1 rounded-md mr-1"
                    >
                        Add User
                    </button>
                </form>
            </div>
            </div>
    );
};

export default AddUser;