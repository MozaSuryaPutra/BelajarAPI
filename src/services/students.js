const studentRepository = require("../repositories/students.js");
const { NotFoundError, InternalServerError } = require("../utils/request.js");
const { imageUpload } = require("../utils/image-kit");

exports.getStudents = async (name, nickname) => {
  const students = await studentRepository.getStudents(name, nickname);
  if (students.length < 1) {
    throw new NotFoundError("Students is not found");
  }
  return students;
};

exports.getStudentById = async (id) => {
  const student = await studentRepository.getStudentById(id);
  if (!student) {
    throw new NotFoundError("Student is Not Found!");
  }

  return student;
};

exports.createStudent = async (data, file) => {
  // Upload file to image kit
  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }

  // Create the data
  return studentRepository.createStudent(data);
};

exports.updateStudent = async (id, data, file) => {
  const student = await studentRepository.getStudentById(id);
  if (!student) {
    throw new NotFoundError("Student is not found");
  }

  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }

  const updatedStudent = await studentRepository.updateStudent(id, data);
  if (!updatedStudent) {
    throw new InternalServerError(["Failed to update student!"]);
  }

  return updatedStudent;
};

exports.deleteStudentById = async (id) => {
  const studentExist = await studentRepository.getStudentById(id);
  if (!studentExist) {
    throw new NotFoundError("Student is not found");
  }
  const deletestudent = await studentRepository.deleteStudentById(id);
  if (!deletestudent) {
    throw new InternalServerError("Failed to delete student");
  }
  return deletestudent;
};
