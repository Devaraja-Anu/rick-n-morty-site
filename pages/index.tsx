
import axios from "axios";
import { ICharacters } from "@/components/types/characterTypes";
import { useInfiniteQuery, useQuery } from "react-query"
import {useState} from "react"
import Image from "next/image"
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
 
  const [page, setPage] = useState(1)
  const [speaking,setSpeaking] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
    const getCharacters = async({pageParam = 1}): Promise<ICharacters> => {
      return axios.get(`https://rickandmortyapi.com/api/character?page=${[pageParam]}`);
    };

  const { isLoading, data, error, isError,hasNextPage,fetchNextPage,isFetchingNextPage,isFetching } = useInfiniteQuery(
    ["characters",page],
    getCharacters,{getNextPageParam:(_lastPage,pages) => {
      if(pages.length<42){
        return pages.length+1
      }
      else return undefined;

    }}
  );

  if (isLoading) {
    return <div> Loading ... </div>;
  }

  if (isError) {
    return <div>Error</div>;
  }


 let smallquery = searchQuery.toLowerCase();
console.log(searchQuery.toLowerCase());

  


  return (
    <div className=" bg-slate-700 min-h-screen">
      <>
        <div className="flex flex-col w-full items-center justify-center h-fit py-10 mb-10 bg-white">
          <p className="text-slate-700 text-2xl md:text-4xl lg:text-5xl font-semibold">
            ALL RICK AND MORTY
          </p>
          <p className="text-slate-700  text-2xl md:text-4xl lg:text-5xl font-semibold">
            CHARACTERS
          </p>

          <p className="text-slate-700  font-semibold py-4">
            with text to speech functionality
          </p>
          <input
            className="border-2 border-gray-500 rounded-xl pl-4"
            placeholder="Search ..."
            type="text"
            onChange={(e) =>
              setSearchQuery(e.target.value.toLowerCase())
            }
          />
        </div>
        <InfiniteScroll
          dataLength={data?.pages?.length as number}
          next={fetchNextPage}
          hasMore={hasNextPage as boolean}
          loader={<div></div>}
        >
          <div className="grid grid-cols-1 mx-10 lg:mx-5 lg:grid-cols-2">
            {data?.pages.map((item) => {
              return item.data.results
                .filter((charname) =>
                  charname.name.toLocaleLowerCase().includes(searchQuery)
                )
                .map((char) => {
                  const imgLoader = () => {
                    return `https://rickandmortyapi.com/api/character/avatar/${char.id}.jpeg`;
                  };

                  const textToSpeech = (text: string) => {
                    setSpeaking(!speaking);
                    let speakData = new SpeechSynthesisUtterance();
                    speakData.volume = 1; // From 0 to 1
                    speakData.rate = 1; // From 0.1 to 10
                    speakData.pitch = 1; // From 0 to 2
                    speakData.text = text;
                    speakData.lang = "en";

                    speaking
                      ? speechSynthesis.speak(speakData)
                      : speechSynthesis.cancel();
                  };

                  return (
                    <div
                      className="bg-slate-600 text-white rounded-xl m-4 flex flex-col sm:flex-row gap-8"
                      key={char.id}
                    >
                      <div>
                        <Image
                          className=" rounded-t-xl sm:rounded-l-xl h-72 w-full object-cover"
                          loader={imgLoader}
                          src={char.image}
                          alt="Character sample"
                          width={200}
                          height={200}
                        />
                      </div>

                      {/* Text */}
                      <div className=" pl-7 sm:w-8/12 mr-5 ">
                        <div className="pt-5 sm:pt-10 pb-5">
                          <p className="text-2xl sm:text-4xl">{char.name}</p>
                        </div>
                        <div className="pt-5">
                          <p className="pr-4 pb-1">
                            <span className="text-slate-400"> Status:</span>
                            {char.status}
                          </p>
                          <p className="pr-4 pb-1">
                            <span className="text-slate-400"> Species:</span>
                            {char.species}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row w-full justify-between pb-5">
                          <div className="flex flex-col justify-center">
                            <p className="text-slate-400">
                              Last Known Location:{" "}
                            </p>
                            <p>{char.location.name}</p>
                          </div>
                          {/* Play Button */}
                          <div className="bg-slate-500 w-10/12 sm:w-16 h-16 rounded-full mt-5 ">
                            <button
                              onClick={() =>
                                textToSpeech(
                                  ` Name: ${char.name}, Status: ${char.status},  Species: ${char.species}, Last known Location: ${char.location.name}`
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
                  );
                });
            })}
          </div>
        </InfiniteScroll>
      </>
      <div className="py-10">
        <p className="text-5xl w-full flex justify-center text-white font-semibold">{searchQuery.length > 0 ? "That's all the characters we have with that name" : "The End"}</p>
      </div>
    </div>
  );
}


// Fix horizontal Scroll and Cronenberg Rick in mobile view
