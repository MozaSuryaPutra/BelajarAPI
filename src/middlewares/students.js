const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetStudents = (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    name: z.string(),
    nickname: z.string().optional(),
    bachelor: z.string().optional(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetStudentsById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);

  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }
  next();
};

exports.validateCreateStudent = (req, res, next) => {
  // Validation body schema
  const validateBody = z.object({
    name: z.string(),
    nick_name: z.string(),
    class_id: z.string(),
    university_id: z.string(),
  });

  // The file is not required
  const validateFileBody = z
    .object({
      profile_picture: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Validate
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateUpdateStudent = (req, res, next) => {
  const validateSchema = z.object({
    id: z.string(),
  });

  validateSchema.safeParse(req.params);
  const result = validateSchema.safeParse(req.params);

  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  const validateBody = z.object({
    name: z.string().optional().nullable(),
    nick_name: z.string().optional().nullable(),
    class_id: z.string().optional().nullable(),
    university_id: z.string().optional().nullable(),
  });

  //Validasi
  const result2 = validateBody.safeParse(req.body);
  if (!result2.success) {
    throw new BadRequestError(result2.error.errors);
  }

  const validateFileBody = z
    .object({
      profile_picture: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();
  const resultValidateFiles = validateFileBody.safeParse(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  }

  next();
};

exports.validateDeleteStudent = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }
  next();
};
