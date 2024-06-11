import React, { useEffect, useState } from 'react'
import {Box, Typography} from "@mui/material"
import { getAllMovies  } from '../../api-helpers/api-helpers'
import MovieItem from './MovieItem';


const Movies = () => {
  const [movie, setMovies] = useState();
  useEffect(()=>{
    getAllMovies().then((data)=>setMovies(data.movies)).catch(err=>console.log(err))
  },[])
  return ( 
  <Box margin={"auto"} marginTop={4}>
    <Typography variant="h4" padding={5} textAlign="center" bgcolor={"#900C3F"} color="white" width="100%"> ALL MOVIES </Typography>
    <Box width={"100%"} margin="auto" display={"flex"} justifyContent="center" flexwrap={"wrap"}>
      {movie && movie.map((movie,index)=> (<MovieItem id = {movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate = {movie.releaseDate} key = {index}/>))}

     </Box>
    
  </Box>
  
  )
}

export default Movies