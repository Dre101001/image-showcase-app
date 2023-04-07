import './Avatar.scss'
import { useEffect, useState } from 'react'
import supabase from '../../config/supabaseClient'
import { useAuth } from '../../hooks/Auth'

export default function Avatar({ url, size, onUpload }: any) {
  const { user } = useAuth()

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path: any) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error: any) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { data, error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      } else {
        console.log(data)
      }

      onUpload(event, filePath)
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='avatar-con'>
      {avatarUrl ? (
        <img src={avatarUrl} alt='Avatar' className='avatar image' style={{ height: size, width: size }} />
      ) : (
        <div className='avatar no-image' style={{ height: size, width: size }} />
      )}
      <div>
        <label className='upload-btn' htmlFor='single'>
          {uploading ? (
            'Uploading ...'
          ) : (
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
          )}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'fixed',
          }}
          type='file'
          id='single'
          accept='image/*'
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}
