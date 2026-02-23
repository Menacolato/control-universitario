const router = require("express").Router();
const c = require("../controllers/materias.controller");

router.get("/", c.list);
router.get("/new", c.newForm);
router.post("/", c.create);

router.get("/:id/edit", c.editForm);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

module.exports = router;