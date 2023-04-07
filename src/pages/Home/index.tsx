import './Home.scss'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/Auth'
import { LogoutModal, InfoModal } from '../../components'
import { AnimatePresence } from 'framer-motion'
import supabase from '../../config/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import { Link, useNavigate } from 'react-router-dom'

const CDNURL = 'https://tbtfyrhdtgoslimktxpu.supabase.co/storage/v1/object/public/images/'

const Home = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // Images states
  const [images, setImages] = useState<any>([])
  // Profile state
  const [profile, setProfile] = useState<any>()
  // etc states
  const [loading, setLoading] = useState(false)
  const [logoutModal, setLogoutModal] = useState<boolean>(false)
  const [infoModal, setInfoModal] = useState<boolean>(false)
  const [deleteInfoModal, setDeleteInfoModal] = useState<boolean>(false)

  useEffect(() => {
    if (user) {
      getImages()
      getProfileInfo()
    }
  }, [])

  //* Images functions

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e?.currentTarget?.files?.[0]!

    const { data, error } = await supabase.storage.from('images').upload(user?.id + '/' + uuidv4(), file)
    if (data) {
      getImages()
      setInfoModal(true)
    } else {
      console.log(error.message)
    }
  }

  const getImages = async () => {
    const { data, error } = await supabase.storage.from('images').list(user?.id + '/', {
      limit: 15,
      offset: 0,
      sortBy: {
        column: 'name',
        order: 'asc',
      },
    })
    if (data !== null) {
      setImages(data)
      // console.log(data)
    } else {
      console.log(error.message)
    }
  }

  const deleteImage = async (imageName: any) => {
    const { error } = await supabase.storage.from('images').remove([user?.id + '/' + imageName])
    if (error) {
      alert(error.message)
    } else {
      getImages()
      setDeleteInfoModal(true)
    }
  }

  // Get Data from profiles table =>
  const getProfileInfo = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('profiles').select(`*`).eq('id', user?.id).single()
      if (error) {
        throw error
      } else if (data) {
        setProfile(data)
        // console.log(data)
      }
    } catch (error: any) {
      console.warn(error)
    } finally {
      setLoading(false)
    }
  }

  // console.log(user?.user_metadata.username)

  return (
    <div className='home page'>
      {!loading ? (
        <div className='home-con'>
          <h2>Your Images</h2>
          <button onClick={() => setLogoutModal(true)}>Sign Out</button>
          <p>Signed in as: {profile?.username}</p>
          {/* <Link to='/profile'>Profile</Link> */}
          <button onClick={() => navigate('/profile')}>See profile</button>

          <form>
            <label htmlFor='file-select' className='file-select-label'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </label>
            <p>Add Image</p>
            <input
              type='file'
              name='select-file'
              id='file-select'
              accept='image/png, image/jpeg'
              onChange={(e: any) => uploadImage(e)}
            />
          </form>
          <div className='images-con'>
            {images.map((image: any) => (
              <div className='img-con' key={image.name}>
                <img src={CDNURL + user?.id + '/' + image.name} alt='image' />
                <div>
                  <button onClick={() => deleteImage(image.name)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <AnimatePresence mode='wait'>
        {logoutModal && <LogoutModal setLogoutModal={setLogoutModal} />}
        {infoModal && <InfoModal modalState={infoModal} closeModal={setInfoModal} title='Added successfully!' />}
        {deleteInfoModal && (
          <InfoModal modalState={deleteInfoModal} closeModal={setDeleteInfoModal} title='Image deleted!' />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home
