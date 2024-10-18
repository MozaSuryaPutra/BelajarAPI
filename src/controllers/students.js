const studentService = require("../services/students");
const { successResponse } = require("../utils/response");
const studentRepository = require("../repositories/students");

exports.getStudents = async (req, res, next) => {
  // Call the usecase or service
  const data = await studentService.getStudents(
    req.query?.name,
    req.query?.nick_name
  );

  successResponse(res, data, "Get Students Success");
};

exports.getStudentsById = async (req, res, next) => {
  const { id } = req.params;
  const data = await studentService.getStudentById(id);
  successResponse(res, data, "Get Students By Id is Success");
};

exports.createStudent = async (req, res, next) => {
  // Create the new student
  const data = await studentService.createStudent(req.body, req.files);
  successResponse(res, data);
};

exports.updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const requestBody = {
    ...req.body,
  };

  const updateTheStudent = await studentService.updateStudent(
    id,
    requestBody,
    req.files
  );
  successResponse(res, updateTheStudent, "Update Student is Success");
};

exports.deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  const deleteTheStudent = await studentService.deleteStudentById(id);
  successResponse(res, deleteTheStudent, "Delete Student is Success");
};
