const studentRepository = require("../repositories/students.js");
const { NotFoundError, InternalServerError } = require("../utils/request.js");
const { imageUpload } = require("../utils/image-kit");

exports.getStudents = (name, nickName, bachelor) => {
  const students = studentRepository.getStudents(name, nickName, bachelor);
  if (students.length < 1) {
    throw new NotFoundError("Students is not found");
  }
  return students;
};

exports.getStudentsById = (id) => {
  const students = studentRepository.getStudentById(id);
  if (!students) {
    throw new NotFoundError("Students is not found");
  }
  return students;
};

exports.createStudent = async (data, file) => {
  // Upload file to image kit
  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }

  // Create the data
  return studentRepository.createStudent(data);
};

exports.updateStudent = async (id, data, file) => {
  const student = studentRepository.getStudentById(id);
  if (!student) {
    throw new NotFoundError("Student is not found");
  }

  if (file?.profilePicture) {
    data.profilePicture = await imageUpload(file.profilePicture);
  }

  const updatedStudent = studentRepository.updateStudent(id, data);
  if (!updatedStudent) {
    throw new InternalServerError(["Failed to update student!"]);
  }

  return updatedStudent;
};

exports.deleteStudentById = (id) => {
  const studentExist = studentRepository.getStudentById(id);
  if (!studentExist) {
    throw new NotFoundError("Student is not found");
  }
  const deletestudent = studentRepository.deleteStudentById(id);
  if (!deletestudent) {
    throw new InternalServerError("Failed to delete student");
  }
  return deletestudent;
};
