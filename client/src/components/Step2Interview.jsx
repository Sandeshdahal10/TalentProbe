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
import React, { useEffect, useRef, useState } from 'react'
import maleVideo from '../assets/Videos/male-ai.mp4'
import femaleVideo from '../assets/Videos/female-ai.mp4'
import Timer from './Timer.jsx';
import { motion } from "motion/react";
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';

function Step2Interview({interviewData, onFinish}) {
  const {interviewId, questions, username} = interviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAiPlaying, setIsAiPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timelimit || 60
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");
  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];


  useEffect(()=>{
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if(!voices.length) return;

      const femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("female") 
      );
      if(femaleVoice){
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }
      // Try known male voice
      const maleVoice = voices.find(v =>
        v.name.toLowerCase().includes("david") ||
        v.name.toLowerCase().includes("mark") ||
        v.name.toLowerCase().includes("male")
      );
      if(maleVoice){
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }
      // Fallback to any voice
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  },[])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  // SPEAK FUNCTION

  const speakText = (text) => {
    return new Promise((resolve) => {
      if(!window.speechSynthesis || !selectedVoice){
        resolve();
        return;
      }

      window.speechSynthesis.cancel(); // Stop any ongoing speech

      const humanText = text.replace(/,/g, ", ... ").replace(/\./g, ". ... ");


      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;

      // Humanize the speech by adding slight pauses and varying the rate
      utterance.rate = 0.92; // Slightly slower than normal
      utterance.pitch = 1.05; // Slightly higher pitch for a more engaging tone
      utterance.volume = 1; // Full volume

      utterance.onstart = () => {
        setIsAiPlaying(true);
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAiPlaying(false);
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    })
  }

  useEffect(() => {
    if(!selectedVoice) {
      return;
    }

    const runIntro = async () => {
      if(isIntroPhase){
        await speakText(`Hello ${username}, welcome to your AI interview. I will be asking you a series of questions related to the role you applied for. Please answer them to the best of your ability. Let's get started!`);
        setIsIntroPhase(false);
      } else if(currentQuestion){
        await new Promise(r=> setTimeout(r, 800));

      //If last question (hard level)
      if(currentIndex === questions.length - 1){
        await speakText(`This is the final question. ${currentQuestion.question} You have ${currentQuestion.timelimit} seconds to answer. Good luck!`);
      }
      await speakText(currentQuestion.question);
    }
  }
  runIntro();


  },[selectedVoice, isIntroPhase, currentIndex])


  return (
    <div className='min-h-screen bg-gradient-to-br from-emarald-50 via-white to-total-100 flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-[1400px] min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden'>
        {/* Video Section */}
        <div className='w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200'>
          <div
          className='w-full max-w-md rounded-2xl overflow-hidden shadow-xl'
          >
          <video src={videoSource}
          key={videoSource}
          ref={videoRef}
          muted
          playsInline
          preload='auto'
          className='w-full h-auto object-cover'
          >
              
          </video>
          </div>
          {/* subtitle pending */}
           {subtitle && (
            <div className='w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm'>
                <p className='text-gray-700 text-sm sm:text-base font-medium text-center leading-relaxed'>{subtitle}</p>
            </div>
           )}



          {/* Timer Area */}
          <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5'>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-500'>
                Interview Status
              </span>
              {isAiPlaying &&<span className='text-sm font-semibold text-emerald-600'>
                {isAiPlaying ? "AI Speaking" : ""}

              </span>}
            </div>
            <div className='h-px bg-gray-200'>
            </div>
              <div className='flex justify-center'>
                <Timer timeLeft="30" totalTime="60"/>
              </div>
              <div className='h-px bg-gray-200'>
            </div>
            <div className='grid grid-cols-2 gap-6 text-center'>
              <div>
                <span className='text-2xl font-bold text-emerald-600'>{currentIndex + 1}</span>
                <span className='text-xs text-gray-400'>Current Questions</span>
              </div>
              <div>
                <span className='text-2xl font-bold text-emerald-600'>{questions.length}</span>
                <span className='text-xs text-gray-400'>Total Questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative'>
          <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 mb-6'>
            AI Smart Interview
          </h2>
          <div className='relative mb-6 bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm '>
            <p className='text-xs sm:text-sm text-gray-400 mb-2'>
              Question {currentIndex + 1} of {questions.length}
            </p>
            <div className='text-base sm:text-lg font-semibold text-gray-800 leading-relaxed pr-16'>
              {currentQuestion?.question}
            </div>
          </div>
          <textarea placeholder="Your answer here..." className='flex-1 bg-gray-100 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200 focus:ring-2 focus:ring-emerald-500 transition text-gray-800'/>
          <div className='flex items-center gap-4 mt-6'>
            <motion.button
            className='w-12 h-12 sm:w-14 flex items-center justify-center rounded-full bg-black text-white shadow-lg'
            whileTap={{ scale: 0.9 }}

            >
              <FaMicrophone size={20}/>

            </motion.button>
            <motion.button 
            whileTap={{ scale: 0.95 }}
            className='flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg hover:opacity-90 transition font-semibold'>
            
            Submit Answer
            </motion.button>

          </div>
        </div>

      </div>
     
    </div>
  )
}

export default Step2Interview