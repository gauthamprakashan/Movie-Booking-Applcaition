import Bookings from "../models/Bookings";
import User from "../models/User";
import Movie from "../models/movie";


export const newBooking = async(req,res) => {
    const{movie,date,seatNumber,user} = req.body;

    console.log(movie)
    let existingMovie;
    let existingUser;
    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (err) {
      return console.log(err);
    }
    if (!existingMovie) {
        return res.status(404).json({ message: "Movie Not Found With Given ID" });
    }
    if (!user) {
        return res.status(404).json({ message: "User not found with given ID " });
    }
    let booking; 
    try{ 
        booking = new Bookings({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user
        });
        booking = await booking.save();
    } 
    catch(err) {
        return console.log(err)
    }

    if(!booking){
        return res.status(500).json({message:"unable to create a booking"})
    }

return res.status(201).json({booking})
};

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
      booking = await Bookings.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!booking) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ booking });
  };
  

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
      booking = await Bookings.findByIdAndRemove(id).populate("user movie");
      console.log(booking);
      const session = await mongoose.startSession();
      session.startTransaction();
      await booking.user.bookings.pull(booking);
      await booking.movie.bookings.pull(booking);
      await booking.movie.save({ session });
      await booking.user.save({ session });
      session.commitTransaction();
    } catch (err) {
      return console.log(err);
    }
    if (!booking) {
      return res.status(500).json({ message: "Unable to Delete" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
  };