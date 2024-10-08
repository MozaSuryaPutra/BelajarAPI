const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetStudents = (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    name: z.string(),
    nickName: z.string().optional(),
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
  const validateBody = z.object({
    name: z.string(),
    nickname: z.string(),
    class: z.string(),
    address: z.object({
      province: z.string(),
      city: z.string(),
    }),
    education: z
      .object({
        bachelor: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  });

  //Validasi
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(result.error.errors);
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
    name: z.string(),
    nickname: z.string(),
    class: z.string(),
    address: z.object({
      province: z.string(),
      city: z.string(),
    }),
    education: z
      .object({
        bachelor: z.string().optional().nullable(),
      })
      .optional()
      .nullable(),
  });

  //Validasi
  const result2 = validateBody.safeParse(req.body);
  if (!result2.success) {
    throw new BadRequestError(result2.error.errors);
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
