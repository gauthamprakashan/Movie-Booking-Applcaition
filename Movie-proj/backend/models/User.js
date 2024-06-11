import mongoose from "mongoose";

const Schema = mongoose.Schema;
const mySchema = new Schema({
    name: {
        type: String,
        requried:true,

    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
    },
    bookings: [{type:mongoose.Types.ObjectId, ref:"Booking"}]
});

export default mongoose.model("User",mySchema);