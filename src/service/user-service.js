import { PrismaClient } from "@prisma/client";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prisma.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already Exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prisma.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(registerUserValidation, request);

  const user = await prisma.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true
    }
  })

  if (!user) {
    throw new ResponseError(401, "Username Or Password Wrong !");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (isPasswordValid) {
    const token = uuid().toString();
    return prisma.user.update({
      data: {
        token: token
      },
      where: {
        username: user.username
      },
      select: {
        token: true
      }
    })
  }


}

export default { register, login };
