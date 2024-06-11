import { Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const labelStyle = {mt:1,mb:1}
const AuthForm = ({onSubmit,isAdmin,signup}) => {
  const[inputs,setInputs] = useState({
    name:"",
    email:"",
    password:"",
  })
  const [isSignup,setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState)=>({...prevState,[e.target.name]:e.target.value,}))
  }
  const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit({inputs, signup:isAdmin? false:isSignup})
  }
  return <Dialog open={true}>
    <Box sx={{mr:"auto",padding:1}}>
      <IconButton>
        <CloseRoundedIcon />
      </IconButton>
    </Box>
    <Typography variant="h4" textAlign={"center"}>
        {isSignup?"Sign Up":"Login"}
    </Typography>
      <form onSubmit={handleSubmit}> 
        <Box display = {'flex'} justifyContent={'center'} width={400} margin="auto" alignContent={"center"} flexDirection="column" >

          
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField value={inputs.email} onChange={handleChange} margin='Normal' variant="standard" type = {'email'} name="email" />

          {!isAdmin && isSignup && (<>
          <FormLabel sx={labelStyle}>Name</FormLabel>
          <TextField value={inputs.name} onChange={handleChange} margin='Normal' variant="standard" type = {'text'} name="name" />
          </>
          )}
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField value={inputs.password} onChange={(handleChange)} varaint='standard' margin='normal' type = {'password'} name="password" />
          <Button sx={{mt:2,borderRadius:10,bgcolor:"#2b2d42"}}type="submit" fullwidth> {isSignup?"SIgnup":"Login"} </Button>

          {!isAdmin && ( <Button onClick={() => setIsSignup(!isSignup)} sx={{mt:2,borderRadius:10,bgcolor:"#2b2d42"}} fullwidth> Switch To {isSignup?"Login":"SIgnup"} </Button>)}


        </Box>

      </form>
  </Dialog>
    
  
}

export default AuthForm