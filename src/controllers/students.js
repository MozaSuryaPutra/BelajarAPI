const studentService = require("../services/students");
const { successResponse } = require("../utils/response");
const studentRepository = require("../repositories/students");

exports.getStudents = (req, res, next) => {
  // Call the usecase or service
  const data = studentService.getStudents(
    req.query?.name,
    req.query?.nickname,
    req.query?.bachelor
  );

  successResponse(res, data, "Get Students Success");
};

exports.getStudentsById = (req, res, next) => {
  const { id } = req.params;
  const data = studentService.getStudentsById(id);
  successResponse(res, data, "Get Students By Id is Success");
};

exports.createStudent = async (req, res, next) => {
  // Convert to student data format
  const requestBody = {
    ...req.body,
    address: {
      province: req.body["address.province"],
      city: req.body["address.city"],
    },
    education: {
      bachelor: req.body["education.bachelor"],
    },
  };
  delete requestBody["address.province"];
  delete requestBody["address.city"];
  delete requestBody["education.bachelor"];

  // Create the new student
  const data = await studentService.createStudent(requestBody, req.files);
  successResponse(res, data);
};

exports.updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const student = studentRepository.getStudentById(id);
  const requestBody = {
    ...req.body,
    address: {
      province: req.body["address.province"] || student.address.province,
      city: req.body["address.city"] || student.address.city,
    },
    education: {
      bachelor: req.body["education.bachelor"] || student.education.bachelor,
    },
  };
  delete requestBody["address.province"];
  delete requestBody["address.city"];
  delete requestBody["education.bachelor"];
  const updateTheStudent = await studentService.updateStudent(
    id,
    requestBody,
    req.files
  );
  successResponse(res, updateTheStudent, "Update Student is Success");
};

exports.deleteStudent = (req, res, next) => {
  const { id } = req.params;
  const deleteTheStudent = studentService.deleteStudentById(id);
  successResponse(res, deleteTheStudent, "Delete Student is Success");
};
