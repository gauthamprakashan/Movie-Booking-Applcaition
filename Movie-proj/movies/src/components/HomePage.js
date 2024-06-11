import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Box, Button, Typography } from '@mui/material'
import { getAllMovies  } from '../api-helpers/api-helpers'
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [movie,setMovie] = useState([])
    
    useEffect(() => {getAllMovies().then((data)=>setMovie(data.movies)).catch(err=>console)
  })
  return (
    <Box width={'100%'} height= {"100%"} margin="auto" marginTop={2}>
      <Box margin = {"auto"} width = {"80%"} height={"40%"} padding={7}>
        <img 
        src='https://i.ytimg.com/vi/yEinBUJG2RI/maxresdefault.jpg'
        alt="Fifty shades"
        width={"100%"}
        height={"90%"}
        
        
        />

      </Box>
      <Box padding = {5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Release
        </Typography>
      </Box>


      <Box display="flex" width="80%" justifyContent={"center"} flexWrap={"wrap"}>
        {movie && movie.slice(0,4).map((movie,index)=> (<MovieItem id = {movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate = {movie.releaseDate} key = {index}/>))}
      </Box>
      
      <Box display="flex" padding={5} margin="auto">
        <Button LinkComponent={Link} to="/movies" variant = "outlined" sx={{margin:'auto'}}>
          View all Movies
        </Button>
      </Box>

    </Box>
  )
}

export default HomePage
      
