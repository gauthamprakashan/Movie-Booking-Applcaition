import React, { useEffect, useState } from 'react'
import {AppBar, Autocomplete, Tab, Tabs, TextField, Toolbar} from "@mui/material";
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import {Box} from '@mui/system';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [value, setValue] = useState(0);
  const [movie,setMovie] = useState([])
  useEffect(() => {
    getAllMovies().then((data)=>setMovie(data.movies)).catch(err=>console)
  })

  return <AppBar sx={{bgcolor: "#2b2d42"}}>
    <Toolbar>
      <Box width={"30%"}> <MovieCreationIcon /> 
      
      </Box>
      <Box width={"20r%"} margin = {"auto"}>
      <Autocomplete
  disablePortal
 
  options={movie && movie.map((option)=> option.title)}
  sx={{ width: 300 }}
   mqbk87
  renderInput={(params) => <TextField sx={{input:{color:"white"}}} variant="standard" {...params} label="Search" />}
/>
      </Box>
      <Box display={"flex"}>
        <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)}>
          <Tab LinkComponent={Link} to = "/movie" label = "Movies" />
          <Tab LinkComponent={Link} to = "/auth" label ="Auth" />
          <Tab LinkComponent={Link} to = "/admin" label = "ADMIN"/>
        </Tabs>


      </Box>
      
    </Toolbar>
  </AppBar>
}

export default Header