import React from 'react'
import AuthForm from '../Auth/AuthForm'

const Admin = () => {
  const getData = (data) =>{
    console.log("admin",data)
  }
  return (
    <div><AuthForm onSubmit={getData} isAdmin={true}/></div>
  )
}

export default Admin