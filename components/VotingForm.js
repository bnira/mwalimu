'use client';
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

const VotingForm = () => {
  const [employeeId, setEmployeeId] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/checkEmployee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId }),
    })

    if (res.status === 404) {
      toast.error('Employee not found')
    } else {
      router.push(`/vote?employeeId=${employeeId}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1 className="text-4xl mb-8">Employee Voting</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
            Employee ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="employeeId"
            type="text"
            placeholder="Enter your employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Next
        </button>
      </form>
    </div>
  )
}

export default VotingForm
