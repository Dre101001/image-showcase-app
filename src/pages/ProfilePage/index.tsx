import './Profile.scss'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/Auth'
import { AnimatePresence } from 'framer-motion'
import { NoUserModal, Avatar, InfoModal } from '../../components'
import supabase from '../../config/supabaseClient'
import TimeAgo from 'react-timeago'

const ProfilePage = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(true)
  const [infoModal, setInfoModal] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [updatedDate, setUpdatedDate] = useState<string>('')

  useEffect(() => {
    if (!user) {
      setLoading(true)
      setIsModal(true)
    } else {
      setLoading(false)
      setIsModal(false)
    }
  }, [user])

  const getProfile = async () => {
    setLoading(true)

    const { data, error } = await supabase.from('profiles').select('*').eq('id', user?.id).single()

    if (error) {
      console.warn(error)
    } else if (data) {
      setUsername(data.username)
      setAvatarUrl(data.avatar_url)
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setUpdatedDate(data.updated_at)
    }
    setLoading(false)
  }

  async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)

    const updates = {
      id: user?.id,
      username,
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    }
    setLoading(false)
    setInfoModal(true)
  }

  useEffect(() => {
    if (user) {
      getProfile()
    }
  }, [user])

  return (
    <div className='profile page'>
      {!loading ? (
        <>
          <h2>Profile Page</h2>
          <button onClick={() => navigate('/')}>Back</button>
          <form onSubmit={updateProfile}>
            <Avatar
              url={avatarUrl}
              size={150}
              onUpload={(event: any, url: any) => {
                setAvatarUrl(url)
                updateProfile(event)
              }}
            />
            <div>
              <label htmlFor='email'>Email</label>
              <input id='email' type='text' value={user?.email} disabled />
            </div>
            <div>
              <label htmlFor='username'>Name</label>
              <input
                id='username'
                type='text'
                required
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='first-name'>First Name</label>
              <input
                id='first-name'
                type='text'
                value={firstName || ''}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='last-name'>Last Name</label>
              <input id='last-name' type='text' value={lastName || ''} onChange={(e) => setLastName(e.target.value)} />
            </div>
            {updatedDate.length !== 0 && <TimeAgo className='timeago' date={updatedDate} />}
            <div>
              <button type='submit' disabled={loading}>
                {loading ? 'Loading ...' : 'Update'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <AnimatePresence mode='wait'>{isModal && <NoUserModal />}</AnimatePresence>
      <AnimatePresence mode='wait'>
        {infoModal && <InfoModal modalState={infoModal} closeModal={setInfoModal} title='Successfully updated!' />}
      </AnimatePresence>
    </div>
  )
}

export default ProfilePage
