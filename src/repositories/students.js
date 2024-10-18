const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const students = require("../../data/students.json");

const prisma = new PrismaClient();

exports.getStudents = async (name, nickName) => {
  const searchedStudents = await prisma.students.findMany({
    where: {
      OR: [
        { name: { contains: name, mode: "insensitive" } },
        { nick_name: { contains: nickName, mode: "insensitive" } },
      ],
    },
    include: {
      classes: true,
      universities: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(searchedStudents);
  return JSONBigInt.parse(serializedStudents);
};

exports.getStudentById = async (id) => {
  // find student by id
  const student = await prisma.students.findFirst({
    where: {
      id: id,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(student);
  return JSONBigInt.parse(serializedStudents);
};

exports.createStudent = async (data) => {
  const newStudent = await prisma.students.create({
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedStudents = JSONBigInt.stringify(newStudent);
  return JSONBigInt.parse(serializedStudents);
};

exports.updateCars = async (id, data) => {
  const updatedCars = await prisma.cars.update({
    where: {
      id: id,
    },
    include: {
      carModels: {
        include: {
          type: true,
          manufactures: true,
          transmissions: true,
        },
      },
    },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(updatedCars);
  return JSONBigInt.parse(serializedCars);
};

exports.deleteStudentById = async (id) => {
  const deleteUser = await prisma.students.delete({
    where: {
      id: id,
    },
  });

  const deleteStudents = JSONBigInt.stringify(deleteUser);
  return JSONBigInt.parse(deleteStudents);
};
