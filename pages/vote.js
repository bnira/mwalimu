//path: pages/vote.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import '../app/globals.css'

const Vote = () => {
  const [presidentCandidates, setPresidentCandidates] = useState([])
  const [deputyCandidates, setDeputyCandidates] = useState([])
  const [selectedPresident, setSelectedPresident] = useState(null)
  const [selectedDeputy, setSelectedDeputy] = useState(null)
  const router = useRouter()
  const { employeeId } = router.query
  
  useEffect(() => {
    const fetchCandidates = async () => {
      const resPresident = await fetch('/api/getCandidates?position=president')
      const resDeputy = await fetch('/api/getCandidates?position=deputy')

      const presidentData = await resPresident.json()
      const deputyData = await resDeputy.json()

      setPresidentCandidates(presidentData)
      setDeputyCandidates(deputyData)
    }

    fetchCandidates()
  }, [])

  const handleSubmit = async () => {
    const res = await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        presidentId: selectedPresident,
        deputyPresidentId: selectedDeputy,
        employeeId: employeeId,
      }),
    })

    const data = await res.json()

    if (res.status === 200) {
      router.push('/');
      toast.success('Vote submitted successfully')
    } else {
      toast.error(data.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1 className="text-4xl mb-8">Vote for Candidates</h1>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">President Candidates</h2>
        {presidentCandidates.map((candidate) => (
          <div key={candidate.id} className="mb-2">
            <label className="block">
              <input
                type="radio"
                name="president"
                value={candidate.id}
                onChange={() => setSelectedPresident(candidate.id)}
                className="mr-2"
              />
              {candidate.name}
            </label>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Deputy President Candidates</h2>
        {deputyCandidates.map((candidate) => (
          <div key={candidate.id} className="mb-2">
            <label className="block">
              <input
                type="radio"
                name="deputy"
                value={candidate.id}
                onChange={() => setSelectedDeputy(candidate.id)}
                className="mr-2"
              />
              {candidate.name}
            </label>
          </div>
        ))}
      </div>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleSubmit}
        disabled={!selectedPresident || !selectedDeputy}
      >
        Submit
      </button>
    </div>
  )
}

export default Vote
