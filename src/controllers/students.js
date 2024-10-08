const studentService = require("../services/students");
const { successResponse } = require("../utils/response");

exports.getStudents = (req, res, next) => {
  // Call the usecase or service
  const data = studentService.getStudents(
    req.query?.name,
    req.query?.nickName,
    req.query?.bachelor
  );

  successResponse(res, data, "Get Students Success");
};

exports.getStudentsById = (req, res, next) => {
  const { id } = req.params;
  const data = studentService.getStudentsById(id);
  successResponse(res, data, "Get Students By Id is Success");
};

exports.createStudent = (req, res, next) => {
  const Data = req.body;
  const data = studentService.createStudent(Data);
  successResponse(res, data, "Create Student is Success");
};

exports.updateStudent = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  const updateTheStudent = studentService.updateStudent(id, data);
  successResponse(res, updateTheStudent, "Update Student is Success");
};

exports.deleteStudent = (req, res, next) => {
  const { id } = req.params;
  const deleteTheStudent = studentService.deleteStudentById(id);
  successResponse(res, deleteTheStudent, "Delete Student is Success");
};
