// zodSchema.js
const z = require("zod");

const signupSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

const signinSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

module.exports = {
  signupSchema,
  signinSchema,
};
