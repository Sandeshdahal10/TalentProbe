// work flow
// Mount
// Load Voice
// Intro Speak
// Questions Speak
// Mic on
// Timer Running
// Submit
// Feedback Speak
// Next Question
// Repeat
// Finish
import React from 'react'
import maleVideo from '../assets/Videos/male-ai.mp4'
import femaleVideo from '../assets/Videos/female-ai.mp4'

function Step2Interview({interviewData, onFinish}) {
  const {interviewId, questions, username} = interviewData;



  return (
    <div className='min-h-screen bg-gradient-to-br from-emarald-50 via-white to-total-100 flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-[1400px] min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden'>
        {/* Video Section */}
        <div className='w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200'>
          <div
          className='w-full max-w-md rounded-2xl overflow-hidden shadow-xl'
          >
          <video src={femaleVideo}
          muted
          playsInline
          preload='auto'
          className='w-full h-auto object-cover'
          >
              
          </video>
          </div>
          {/* subtitle pending */}




          {/* Timer Area */}
          <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5'>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-500'>
                Interview Status
              </span>
              <span className='text-sm font-semibold text-emerald-600'>
                AI Speaking

              </span>
            </div>
            <div className='h-px bg-gray-200'>
              <div className='flex justify-center'>
                
              </div>
            </div>
          </div>
        </div>

      </div>
     
    </div>
  )
}

export default Step2Interview