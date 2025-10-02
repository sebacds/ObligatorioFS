import mongoose from "mongoose";
import usuarioSchema from "./schemas/usuario-schema.mjs";

export default mongoose.model("Usuario", usuarioSchema);