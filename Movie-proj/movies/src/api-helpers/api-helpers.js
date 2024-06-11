import axios from 'axios'
export const getAllMovies = async() => {
    const res = await axios.get("/movie").catch((err)=> console.log(err));

    if (res.status !==200){
        return console.log("NO data")
    }

    const data = await res.data;
    return data
}

export const sendUserAuthRequest = async(data,signup) => {
    const res = await axios
    axios.post(`http://localhost:5000/user/${signup ? "signup" : "login"}`,{
        name:signup?data.name:"",
        email:data.email,
        password:data.password,
    }).catch((err)=>console.log(err))

    if (res.status !== 200 && res.status !== 201) {
        console.log("Unexpected Error Occurred");
      }
    
      const resData = await res.data;
      return resData;
    
}