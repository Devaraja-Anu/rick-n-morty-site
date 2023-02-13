
import axios from "axios";
import { ICharacters } from "@/components/types/characterTypes";
import { useInfiniteQuery, useQuery } from "react-query"
import {useState} from "react"
import Image from "next/image"
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "@/components/Others/Cards";

export default function Home() {
 
  const [page, setPage] = useState(1)
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

                  return (
                    <Cards char={char} key={char.id}/>
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
