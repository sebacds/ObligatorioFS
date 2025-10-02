import mongoose from "mongoose";
import categoriaSchema from "./schemas/categoria-schema.mjs";

export default mongoose.model("Categoria", categoriaSchema);