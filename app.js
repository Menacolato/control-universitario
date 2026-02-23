const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ✅ FIX: servir /public correctamente
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/index.routes"));
app.use("/estudiantes", require("./routes/estudiantes.routes"));
app.use("/materias", require("./routes/materias.routes"));
app.use("/inscripciones", require("./routes/inscripciones.routes"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Running on port ${PORT}`);
});