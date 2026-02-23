const db = require("../db");

exports.list = async (req, res) => {
  const [rows] = await db.query(
    `SELECT i.id, i.ciclo, i.nota_final,
            e.carnet, CONCAT(e.nombres,' ',e.apellidos) AS estudiante,
            m.codigo, m.nombre AS materia
     FROM inscripciones i
     JOIN estudiantes e ON e.id = i.estudiante_id
     JOIN materias m ON m.id = i.materia_id
     ORDER BY i.created_at DESC`
  );
  res.render("inscripciones/list", { inscripciones: rows });
};

exports.newForm = async (req, res) => {
  const [estudiantes] = await db.query("SELECT id, carnet, nombres, apellidos FROM estudiantes ORDER BY nombres");
  const [materias] = await db.query("SELECT id, codigo, nombre FROM materias ORDER BY nombre");
  res.render("inscripciones/new", { estudiantes, materias });
};

exports.create = async (req, res) => {
  const { estudiante_id, materia_id, ciclo } = req.body;
  await db.query(
    "INSERT INTO inscripciones (estudiante_id, materia_id, ciclo) VALUES (?,?,?)",
    [Number(estudiante_id), Number(materia_id), ciclo]
  );
  res.redirect("/inscripciones");
};

exports.editForm = async (req, res) => {
  const { id } = req.params;
  const [[insc]] = await db.query(
    `SELECT i.id, i.ciclo, i.nota_final,
            e.carnet, CONCAT(e.nombres,' ',e.apellidos) AS estudiante,
            m.codigo, m.nombre AS materia
     FROM inscripciones i
     JOIN estudiantes e ON e.id = i.estudiante_id
     JOIN materias m ON m.id = i.materia_id
     WHERE i.id=?`,
    [id]
  );
  res.render("inscripciones/edit", { insc });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nota_final } = req.body;
  const val = (nota_final === "" ? null : Number(nota_final));
  await db.query("UPDATE inscripciones SET nota_final=? WHERE id=?", [val, id]);
  res.redirect("/inscripciones");
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM inscripciones WHERE id=?", [id]);
  res.redirect("/inscripciones");
};