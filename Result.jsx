import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Result = () => {
  const { generateImage, user, credit, setCredit } = useContext(AppContext)
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
    if (location.state?.prompt) {
      setInput(location.state.prompt)
      onSubmitHandler(location.state.prompt)
    }
  }, [])

  const onSubmitHandler = async (prompt = input) => {
    if (!prompt.trim()) return

    if (credit <= 0) {
      alert('You have no credits left. Please purchase more credits.')
      navigate('/buy')
      return
    }

    setLoading(true)
    setIsImageLoaded(false)

    try {
      const result = await generateImage(prompt)
      if (result.success) {
        setImage(result.imageUrl)
        setIsImageLoaded(true)
        setCredit(credit - 1)
      } else {
        alert(result.error || 'Failed to generate image. Please try again.')
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      alert('Failed to generate image. Please try again.')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(image, '_blank');
    }
  }

  return (
    <div className='min-h-[75vh] flex flex-col items-center justify-center'>
      <div>
        <div className='relative'>
          <img
            src={image}
            className='max-w-sm rounded'
            alt='Generated'
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? 'w-full transition-all duration-[10s]' : 'w-0'
            }`}
          />
        </div>
        {loading && (
          <div className='text-center mt-4'>
            <p className='text-lg font-medium'>Generating your image...</p>
            <p className='text-sm text-gray-600'>This may take a few seconds</p>
          </div>
        )}
      </div>

      {!isImageLoaded && (
        <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type='text'
            placeholder='Describe what you want to generate'
            className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'
          />
          <button
            onClick={() => onSubmitHandler()}
            className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <button
            onClick={downloadImage}
            className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-gray-100 transition-all'
          >
            Download
          </button>
          <button
            onClick={() => {
              setIsImageLoaded(false)
              setInput('')
              setImage(assets.sample_img_1)
            }}
            className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer hover:bg-zinc-800 transition-all'
          >
            Generate Another
          </button>
        </div>
      )}
    </div>
  )
}

export default Result