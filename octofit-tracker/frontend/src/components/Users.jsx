import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('users')
      .then((data) => {
        if (isMounted) {
          setUsers(data)
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
    return <p className="text-muted">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="alert alert-danger">{error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </div>
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-4" key={user._id || user.username}>
            <article className="data-card h-100">
              <h2>{user.displayName || user.username}</h2>
              <p className="text-muted mb-2">@{user.username}</p>
              <p>{user.fitnessGoal}</p>
              {user.age && <span className="badge text-bg-light mt-3">Age {user.age}</span>}
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Users