const express = require("express");
const {
  validateGetStudents,
  validateGetStudentsById,
  validateCreateStudent,
  validateUpdateStudent,
  validateDeleteStudent,
} = require("../middlewares/students.js");
const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/students");
const { getStudentsById } = require("../controllers/students.js");

const router = express.Router();

router.get("/", validateGetStudents, getStudents);
router.get("/:id", validateGetStudentsById, getStudentsById);
router.post("/", validateCreateStudent, createStudent);
router.put("/:id", validateUpdateStudent, updateStudent);
router.delete("/:id", validateDeleteStudent, deleteStudent);
module.exports = router;
