const db = require("../db");

exports.list = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM estudiantes ORDER BY created_at DESC");
  res.render("estudiantes/list", { estudiantes: rows });
};

exports.newForm = (req, res) => res.render("estudiantes/new");

exports.create = async (req, res) => {
  const { carnet, nombres, apellidos, email } = req.body;
  await db.query(
    "INSERT INTO estudiantes (carnet, nombres, apellidos, email) VALUES (?,?,?,?)",
    [carnet, nombres, apellidos, email]
  );
  res.redirect("/estudiantes");
};

exports.show = async (req, res) => {
  const { id } = req.params;
  const [[estudiante]] = await db.query("SELECT * FROM estudiantes WHERE id=?", [id]);
  const [insc] = await db.query(
    `SELECT i.id, i.ciclo, i.nota_final, m.codigo, m.nombre
     FROM inscripciones i
     JOIN materias m ON m.id = i.materia_id
     WHERE i.estudiante_id=?
     ORDER BY i.created_at DESC`,
    [id]
  );
  res.render("estudiantes/show", { estudiante, inscripciones: insc });
};

exports.editForm = async (req, res) => {
  const { id } = req.params;
  const [[estudiante]] = await db.query("SELECT * FROM estudiantes WHERE id=?", [id]);
  res.render("estudiantes/edit", { estudiante });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { carnet, nombres, apellidos, email } = req.body;
  await db.query(
    "UPDATE estudiantes SET carnet=?, nombres=?, apellidos=?, email=? WHERE id=?",
    [carnet, nombres, apellidos, email, id]
  );
  res.redirect(`/estudiantes/${id}`);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM estudiantes WHERE id=?", [id]);
  res.redirect("/estudiantes");
};