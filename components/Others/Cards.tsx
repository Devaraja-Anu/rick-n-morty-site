import Image from 'next/image';
import React, { useState } from 'react'
import { ICharacters } from '../types/characterTypes';

const Cards = (props:any) => {

const [speaking, setSpeaking] = useState(false)  

   const imgLoader = () => {
     return `https://rickandmortyapi.com/api/character/avatar/${props.char.id}.jpeg`;
   };

   const textToSpeech = (text: string) => {
     setSpeaking(!speaking);
     let speakData = new SpeechSynthesisUtterance();
     speakData.volume = 1; // From 0 to 1
     speakData.rate = 1; // From 0.1 to 10
     speakData.pitch = 1; // From 0 to 2
     speakData.text = text;
     speakData.lang = "en";

     speaking ? speechSynthesis.speak(speakData) : speechSynthesis.cancel();
   };
  return (
    <div>
      <div
        className="bg-slate-600 text-white rounded-xl m-4 flex flex-col sm:flex-row gap-8"
      >
        <div>
          <Image
            className=" rounded-t-xl sm:rounded-l-xl h-72 w-full object-cover"
            loader={imgLoader}
            src={props.char.image}
            alt="Character sample"
            width={200}
            height={200}
          />
        </div>

        {/* Text */}
        <div className=" pl-7 sm:w-8/12 mr-5 ">
          <div className="pt-5 sm:pt-10 pb-5">
            <p className="text-2xl sm:text-4xl">{props.char.name}</p>
          </div>
          <div className="pt-5">
            <p className="pr-4 pb-1">
              <span className="text-slate-400"> Status:</span>
              {props.char.status}
            </p>
            <p className="pr-4 pb-1">
              <span className="text-slate-400"> Species:</span>
              {props.char.species}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full justify-between pb-5">
            <div className="flex flex-col justify-center">
              <p className="text-slate-400">Last Known Location: </p>
              <p>{props.char.location.name}</p>
            </div>
            {/* Play Button */}
            <div className="bg-slate-500 w-10/12 sm:w-16 h-16 rounded-full mt-5 ">
              <button
                onClick={() =>
                  textToSpeech(
                    ` Name: ${props.char.name}, Status: ${props.char.status},  Species: ${props.char.species}, Last known Location: ${props.char.location.name}`
                  )
                }
                //

                className="w-full h-full flex items-center justify-center transition-all hover:scale-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards