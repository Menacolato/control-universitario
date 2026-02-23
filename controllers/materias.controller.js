const db = require("../db");

exports.list = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM materias ORDER BY created_at DESC");
  res.render("materias/list", { materias: rows });
};

exports.newForm = (req, res) => res.render("materias/new");

exports.create = async (req, res) => {
  const { codigo, nombre, uv } = req.body;
  await db.query(
    "INSERT INTO materias (codigo, nombre, uv) VALUES (?,?,?)",
    [codigo, nombre, Number(uv)]
  );
  res.redirect("/materias");
};

exports.editForm = async (req, res) => {
  const { id } = req.params;
  const [[materia]] = await db.query("SELECT * FROM materias WHERE id=?", [id]);
  res.render("materias/edit", { materia });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre, uv } = req.body;
  await db.query(
    "UPDATE materias SET codigo=?, nombre=?, uv=? WHERE id=?",
    [codigo, nombre, Number(uv), id]
  );
  res.redirect("/materias");
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM materias WHERE id=?", [id]);
  res.redirect("/materias");
};