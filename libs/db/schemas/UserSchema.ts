import mongoose, { Schema } from "mongoose";

const UserShema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
},
{
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User", UserShema);
export default User;