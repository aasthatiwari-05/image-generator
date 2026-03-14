import React, { useContext, useState } from 'react'
import { assets, stepsData, testimonialsData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user, setShowLogin, showLogin, setUser } = useContext(AppContext)
  const navigate = useNavigate()
  const [prompt, setPrompt] = useState('')

  const handleGenerate = () => {
    if (prompt.trim()) {
      navigate('/result', { state: { prompt } })
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <div className='flex flex-col justify-center items-center text-center my-20'>
        <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
          <p>Best text to image generator</p>
          <img src={assets.star_icon} alt="" />
        </div>
        <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>
          Turn text to <span className='text-blue-600'>image</span>, in seconds.
        </h1>
        <p className='text-center max-w-xl mx-auto mt-5'>
          Unleash your creativity with AI. Turn your imagination into visual art in seconds – just type, and watch the magic happen.
        </p>

        <div className='flex flex-col sm:flex-row items-center gap-4 mt-8 w-full max-w-xl'>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            type="text"
            placeholder='Describe what you want to see'
            className='flex-1 w-full sm:w-auto px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={handleGenerate}
            className='bg-zinc-900 w-full sm:w-auto text-white px-10 py-3 rounded-full hover:scale-105 transition-all duration-500'
          >
            Generate
          </button>
        </div>

        <div className='flex flex-wrap justify-center mt-16 gap-3'>
          {Array(6)
            .fill('')
            .map((item, index) => (
              <img
                onClick={() => (user ? navigate('/result') : setShowLogin(true))}
                className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
                alt=""
                key={index}
                width={70}
              />
            ))}
        </div>
        <p className='mt-2 text-neutral-600'>Generated images from imagify</p>
        
        <button
          onClick={() => (user ? navigate('/result') : setShowLogin(true))}
          className='bg-zinc-900 text-white px-10 py-3 rounded-full hover:scale-105 transition-all duration-500 mt-6 inline-flex items-center gap-2'
        >
          Generate Images
          <img className='h-6' src={assets.star_group} alt="" />
        </button>
      </div>

      {/* Steps Section */}
      <div className='pb-16'>
        <h1 className='text-center text-3xl sm:text-4xl py-2 mt-20'>How it works</h1>
        <p className='text-center mb-8 text-gray-600'>Transform Words Into Stunning Images</p>

        <div className='space-y-4 w-full max-w-4xl mx-auto'>
          {stepsData.map((item, index) => (
            <div
              key={index}
              className='flex items-center gap-4 p-5 px-8 bg-white/20 shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg'
            >
              <img width={40} src={item.icon} alt="" />
              <div>
                <h2 className='text-xl font-medium'>{item.title}</h2>
                <p className='text-gray-500'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className='pb-16'>
        <h1 className='text-center text-3xl sm:text-4xl py-2 mt-20'>Customer testimonials</h1>
        <p className='text-center mb-12 text-gray-600'>What Our Users Are Saying</p>

        <div className='flex flex-wrap gap-6 max-w-5xl mx-auto'>
          {testimonialsData.map((item, index) => (
            <div
              key={index}
              className='bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'
            >
              <div className='flex items-center gap-3'>
                <img src={item.image} className='w-12 rounded-full' alt="" />
                <div>
                  <p className='font-medium'>{item.name}</p>
                  <p className='text-sm text-gray-600'>{item.role}</p>
                </div>
              </div>
              <div className='flex gap-1 mt-4'>
                {Array(item.stars)
                  .fill()
                  .map((star, index) => (
                    <img key={index} src={assets.rating_star} alt="" />
                  ))}
              </div>
              <p className='text-gray-600 mt-4 text-sm'>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className='my-20 text-center'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>
          See the magic. Try now
        </h1>
        <p className='text-gray-600 mb-8'>
          Transform your imagination into visuals in seconds
        </p>
      </div>

      {/* Footer */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-4 py-4 mt-20 border-t'>
        <img width={150} src={assets.logo} alt="" />
        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>
          Copyright @GreatStack.dev | All right reserved.
        </p>
        <div className='flex gap-2.5'>
          <img width={35} src={assets.facebook_icon} alt="" />
          <img width={35} src={assets.twitter_icon} alt="" />
          <img width={35} src={assets.instagram_icon} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home