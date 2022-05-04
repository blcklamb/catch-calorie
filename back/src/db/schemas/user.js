import pkg from "mongoose";

const { Schema, model } = pkg;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        enum: ["us", "non_us"],
        required: true,
        default: "non_us",
    },
    open: {
        type: Boolean,
        default: true,
    },
    icon: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default: "설명이 아직 없습니다. 추가해 주세요.",
    }
});

const UserModel = model("User", UserSchema);

export { UserModel };
