import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const teamsEndpoint = '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('teams', teamsEndpoint)
      .then((data) => {
        if (isMounted) {
          setTeams(data)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.name}>
            <article className="data-card h-100">
              <h2>{team.name}</h2>
              <p className="text-muted mb-2">{team.city}</p>
              <p>Coach: {team.coach}</p>
              <p className="mb-0">Members: {(team.memberUsernames || []).join(', ')}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams