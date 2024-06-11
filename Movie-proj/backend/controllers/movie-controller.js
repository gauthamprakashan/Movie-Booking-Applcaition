//import Movie from "../models/Movie";
import jwt from "jsonwebtoken";
import Movie from "../models/movie";
import Admin from "../models/Admin";
import mongoose, { Mongoose } from "mongoose";

export const addMovie = async(req,res,next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token Not Found" });
    }
    console.log(extractedToken);

    let adminId;
    jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted) => {
        if(err){
            return res.status(400).json({message:`${err.message} "edwef"`});
        }
        else{
            adminId=decrypted.id;
            return;
        }
    });

    const { title,description,releaseDate,posterUrl,actors,featured } =req.body;
    if (
        !title &&
        title.trim() === "" &&
        !description &&
        description.trim() == "" &&
        !posterUrl &&
        posterUrl.trim() == ""
      ) {
        return res.status(422).json({ message: "Invalid Inputs" });
      }

      let movie;

      try{ 
        movie = new Movie({
            title,
            description,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            actors,
            posterUrl,
            admin: adminId,
        })
        const session = await mongoose.startSession()
        const adminUser = await Admin.findById(adminId)
        session.startTransaction();

        movie = await movie.save({session});
        adminUser.addedMovies.push(movie);
        await adminUser.save({session});
        await session.commitTransaction();

      }

      catch(err){
        console.log(err);
      }

      

      if(!movie){
        return res.status(500).json({message:"request failed"});

      }
      return res.status(201).json({movie})


    


}

export const getAllMovies = async(req,res,next) => {
    let movies;

    try{
        movies = await Movie.find();
    }
    catch (err){
        return console.log(err);
    }
    if(!movies){
        return res.status(500).json({message:'request failed'});

    }
    return res.status(200).json({movies});
}


export const getMoviebyId = async(req,res,next) => {
    const id = req.params.id;

    let movies;

    try{
        movies = await Movie.findById(id)
    }
    catch(err){
        return console.log(err)

    }
    if(!movies){
        return res.status(400).json({message:"invalid"});
    }

    return res.status(200).json({movies});
}

