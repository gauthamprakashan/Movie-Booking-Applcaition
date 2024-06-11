import express from "express";
import { addMovie, getAllMovies, getMoviebyId } from "../controllers/movie-controller";

const movierouter = express.Router();

movierouter.get("/", getAllMovies);
movierouter.get("/:id", getMoviebyId);

movierouter.post("/", addMovie);

export default movierouter