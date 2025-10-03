import mongoose from "mongoose";
import mascotaSchema from "./schemas/mascota-schema.mjs";

export default mongoose.model("Mascota", mascotaSchema);