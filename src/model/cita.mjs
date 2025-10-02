import mongoose from "mongoose";
import citaSchema from "./schemas/cita-schema.mjs";

export default mongoose.model("Cita", citaSchema);