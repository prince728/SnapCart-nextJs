import mongoose from "mongoose";

export interface User {
    _id?: mongoose.Types.ObjectId
    name: string
    email: string
    password?: string
    mobile?: string
    role: "user" | "deliveryBoy" | "admin",
    image?: string

}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    password: {
        type: String,
        required: false
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
    },
    image: {
        type: String,
        required: false
    }

}, {
    timestamps: true
})

const userModel = mongoose.models.User || mongoose.model("User",userSchema)

export default userModel