const fs = require("fs");
const students = require("../../data/students.json");
exports.getStudents = (name, nickName, bachelor) => {
  const searchedStudent = students.filter((student) => {
    // Do filter logic here
    let result = true;
    if (name) {
      const isFoundName = student.name
        .toLowerCase()
        .includes(name.toLowerCase());
      result = result && isFoundName;
    }
    if (nickName) {
      const isFoundNickName = student.nickName
        .toLowerCase()
        .includes(nickName.toLowerCase());
      result = result && isFoundNickName;
    }
    if (bachelor) {
      const isFoundBachelor = student.education.bachelor
        .toLowerCase()
        .includes(bachelor.toLowerCase());
      result = result && isFoundBachelor;
    }

    return result;
  });
  return searchedStudent;
};

exports.getStudentById = (id) => {
  const student = students.find((student) => student.id == id);
  return student;
};

exports.createStudent = (data) => {
  const maxId = students.reduce(
    (max, student) => student.id > max && student.id,
    0
  );

  const newStudent = {
    id: maxId + 1,
    //Titik 3 ngambil value semua objek tanpa ambil semuanya
    ...data,
  };

  students.push(newStudent);

  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students, null, 4),
    "utf-8"
  );

  return newStudent;
};

exports.updateStudent = (id, data) => {
  const index = students.findIndex((student) => student.id === parseInt(id));
  // TODO: Update the data
  if (index !== -1) {
    students.splice(index, 1, {
      ...students[index],
      ...data,
    });
  } else {
    //TODO
    throw new NotFoundError("Student not found");
  }
  // TODO: Update the json data
  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students, null, 4),
    "utf-8"
  );
  return students[index];
};

exports.deleteStudentById = (id) => {
  const studentIndex = students.findIndex((student) => student.id == id);
  if (studentIndex < 0) {
    // If no index found
    // TODO: make a error class
    return null;
  }

  // If the index found
  const deletedStudent = students.splice(studentIndex, 1);

  // Update the json
  fs.writeFileSync(
    "./data/students.json",
    JSON.stringify(students, null, 4),
    "utf-8"
  );

  return deletedStudent;
};
