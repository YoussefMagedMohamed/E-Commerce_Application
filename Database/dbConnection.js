import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect("mongodb://127.0.0.1/E-Commerce_App").then(() => {
        console.log("DB Connected")
    }).catch((err) => {
        console.log("DB Not Connected" , err)
    })
}