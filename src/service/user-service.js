import { PrismaClient } from "@prisma/client";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  // const countUser = await PrismaClient.user.count({
  //   where: {
  //     username: user.username,
  //   },
  // });

  // if (countUser === 1) {
  //   throw new ResponseError(400, "Username already Exists");
  // }

  user.password = await bcrypt.hash(user.password, 10);

  return PrismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

export default { register };
