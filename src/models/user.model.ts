import mongoose from "mongoose";

interface User {
    _id?: mongoose.Types.ObjectId
    name: string
    email: string
    password: string
    mobile?: string
    role: "user" | "deliveryBoy" | "admin"

}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    mobile: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ["user", "deliveryBoy", "admin"],
        default: "user"
    }

}, {
    timestamps: true
})

const userModel = mongoose.models.User || mongoose.model("User",userSchema)

export default userModel