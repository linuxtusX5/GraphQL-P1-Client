import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
})

const ClientModel = mongoose.model('Client', ClientSchema)
export default ClientModel; 