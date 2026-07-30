import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('workouts', workoutsEndpoint)
      .then((data) => {
        if (isMounted) {
          setWorkouts(data)
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
    return <p className="text-muted">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-4" key={workout._id || workout.title}>
            <article className="data-card h-100">
              <h2>{workout.title}</h2>
              <p className="text-muted mb-2">{workout.focusArea}</p>
              <span className="badge text-bg-dark me-2">{workout.difficulty}</span>
              <span className="badge text-bg-light">{workout.durationMinutes} min</span>
              <p className="mt-3 mb-0">For: {(workout.recommendedFor || []).join(', ')}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts