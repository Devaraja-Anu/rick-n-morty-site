import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query/types/react'

const CharacterQueries = () => {

    const getCharacters = () => {
        return axios.get('https://rickandmortyapi.com/api/character')
    }
    const {isLoading,data,error,isError} = useQuery('characters',getCharacters) 

    if(isLoading){
        return <div>  Loading ... </div>
    }

    if(isError){
        return <div>Error</div>
    }

  return (
    <div>   
        
    </div>
  )
}

export default CharacterQueries