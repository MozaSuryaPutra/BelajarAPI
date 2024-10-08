const express = require("express"); // Import express
const fs = require("fs");
const path = require("path");
const students = require("./data/students.json");
// Inisialisasi Aplikasi Express
const app = express();
const port = 3000;
const { z } = require("zod");
require("express-async-errors");
const router = require("./src/routes");
const {
  errorHandler,
  notFoundURLHandler,
} = require("./src/middlewares/errors.js");
// const successResponse = (res, data) => {
//   res.status(200).json({
//     success: true,
//     data,
//   });
// };

// class BadRequestError extends Error {
//   constructor(errors) {
//     super("Validation failed!");
//     this.errors = errors;
//     this.status = 400;
//   }
// }

// class NotFoundError extends Error {
//   constructor(message) {
//     super(message || "Resource not found");
//     this.status = 404;
//   }
// }

app.use(express.json());

// Buat routing dan response
app.get("/", (req, res) => {
  res.send("hello world broo");
});

// app.get("/moza", (req, res) => {
//   res.send("lucunyaaaa");
// });

app.use("/", router);

// app.get("/students/:id", (req, res) => {
//   //Make a validation schema
//   const validateSchema = z.object({
//     id: z.string(),
//   });

//   const result = validateSchema.safeParse(req.params);

//   if (!result.success) {
//     // If validation fails, return error messages
//     throw new BadRequestError(result.error.errors);
//   }
//   const { id } = req.params;
//   const student = students.find((student) => student.id == id);

//   if (student) {
//     successResponse(res, student);
//     return;
//   } else {
//     //Todo
//     throw new NotFoundError("Student not found");
//   }
// });

// app.post("/students", (req, res) => {
//   //Skema Validasi Body
//   const validateBody = z.object({
//     name: z.string(),
//     nickname: z.string(),
//     class: z.string(),
//     address: z.object({
//       province: z.string(),
//       city: z.string(),
//     }),
//     education: z
//       .object({
//         bachelor: z.string().optional().nullable(),
//       })
//       .optional()
//       .nullable(),
//   });

//   //Validasi
//   const result = validateBody.safeParse(req.body);
//   if (!result.success) {
//     throw new BadRequestError(result.error.errors);
//   }
//   // const { id, name, nickname, address, education } = req.body;

//   // if (!id || id == "") {
//   //   res.status(400).json({
//   //     message: "ID is empty",
//   //   });
//   //   return;
//   // }

//   // const existingStudent = students.find((student) => student.id === id);
//   // if (existingStudent) {
//   //   res.status(400).json({
//   //     message: "ID already exists",
//   //   });
//   //   return;
//   // }

//   // if (!name || name == "") {
//   //   res.status(400).json({
//   //     message: "Name is required",
//   //   });
//   //   return;
//   // }

//   // if (!nickname || nickname == "") {
//   //   res.status(400).json({
//   //     message: "Nickname is required",
//   //   });
//   //   return;
//   // }

//   // if (!req.body.class || req.body.class == "") {
//   //   res.status(400).json({
//   //     message: "Class is required",
//   //   });
//   //   return;
//   // }

//   // if (!address) {
//   //   res.status(400).json({
//   //     message: "Address is required",
//   //   });
//   //   return;
//   // }

//   // if (!education) {
//   //   res.status(400).json({
//   //     message: "Education is required",
//   //   });
//   //   return;
//   // }

//   // const { province, city } = address;

//   // if (!city) {
//   //   res.status(400).json({
//   //     message: "City is required",
//   //   });
//   //   return;
//   // }

//   // if (!province) {
//   //   res.status(400).json({
//   //     message: "Province is required",
//   //   });
//   //   return;
//   // }

//   // const { bachelor } = education;

//   // if (!bachelor) {
//   //   res.status(400).json({
//   //     message: "Bachelor is required",
//   //   });
//   //   return;
//   // }

//   const maxId = students.reduce(
//     (max, student) => student.id > max && student.id,
//     0
//   );

//   const newStudent = {
//     id: maxId + 1,
//     //Titik 3 ngambil value semua objek tanpa ambil semuanya
//     ...req.body,
//   };

//   students.push(newStudent);

//   const filePath = path.join(__dirname, "students.json");
//   fs.writeFile(filePath, JSON.stringify(students, null, 2), (err) => {
//     if (err) {
//       res.status(500).json({
//         message: "Failed to save student data",
//       });
//       return;
//     }

//     successResponse(res, newStudent);
//   });
// });

// TODO: Update a student: PUT /students/:id
// app.put("/students/:id", (req, res) => {
//   // TODO: zod validation
//   //Untuk ID di URL
//   const validateSchema = z.object({
//     id: z.string(),
//   });

//   validateSchema.safeParse(req.params);
//   const result = validateSchema.safeParse(req.params);

//   if (!result.success) {
//     // If validation fails, return error messages
//     throw new BadRequestError(result.error.errors);
//   }
//   const { id } = req.params;

//   const index = students.findIndex((student) => student.id === parseInt(id));
//   //Validasi Inputan
//   const validateBody = z.object({
//     name: z.string(),
//     nickname: z.string(),
//     class: z.string(),
//     address: z.object({
//       province: z.string(),
//       city: z.string(),
//     }),
//     education: z
//       .object({
//         bachelor: z.string().optional().nullable(),
//       })
//       .optional()
//       .nullable(),
//   });

//   //Validasi
//   const result2 = validateBody.safeParse(req.body);
//   if (!result2.success) {
//     return res.status(400).json({
//       message: "Validation Failded",
//       errors: result2.error.errors.map((err) => ({
//         field: err.path[0],
//         issue: err.message,
//       })),
//     });
//   }

//   // TODO: Update the data
//   if (index !== -1) {
//     students.splice(index, 1, { ...students[index], ...result2.data });
//     res.json(students[index]);
//   } else {
//     //TODO
//     throw new NotFoundError("Student not found");
//   }
//   // TODO: Update the json data
//   const filePath = path.join(__dirname, "students.json");
//   fs.writeFile(filePath, JSON.stringify(students, null, 2), (err) => {
//     if (err) {
//       res.status(500).json({
//         message: "Failed to save student data",
//       });
//       return;
//     }

//     res.status(201).json();
//   });
// });
// app.delete("/students/:id", (req, res) => {
//   const validateParams = z.object({
//     id: z.string(),
//   });

//   const result = validateParams.safeParse(req.params);
//   if (!result.success) {
//     // If validation fails, return error messages
//     throw new BadRequestError(result.error.errors);
//   }

//   // Get the id from params
//   const { id } = req.params;

//   // Find index
//   const studentIndex = students.findIndex((student) => student.id == id);

//   if (studentIndex < 0) {
//     // If no index found
//     // TODO: make a error class
//     throw new NotFoundError("Student not found");
//   }

//   // If the index found
//   const deletedStudent = students.splice(studentIndex, 1);

//   // Update the json
//   fs.writeFileSync(
//     "./data/students.json",
//     JSON.stringify(students, null, 4),
//     "utf-8"
//   );

//   successResponse(res, deletedStudent);
// });

app.use("*", notFoundURLHandler);

// This function is to handle error when API hit, it always be the last middleware
app.use(errorHandler);
// Running Aplikasi Express.js
app.listen(port, () => {
  console.log(`the express.js app is running on port ${port}`);
});
