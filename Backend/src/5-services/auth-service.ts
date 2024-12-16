import fs from "fs-extra";
import appConfig from "../2-utils/app-config";
import cyber from "../2-utils/cyber";
import { generateUniqueIdByType, IdType } from "../2-utils/handle-id";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import CredentialsModel from "../3-models/credentials-model";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";

const usersPath = appConfig.dataFiles.users;

/**
 * Register new user:
 * validate, hash password, set role as "user", 
 * create id, write user to users.json, 
 * get new token
 * @param user: UserModel
 * @returns token: string
 */
async function register(user: UserModel): Promise<string> {
  // get all users:
  const users = await fs.readJson(usersPath);

  // validate if username is already taken:
  if (await checkEmailIsTaken(users, user.email))
    throw new ValidationError(`Email already exists`);

  // validation:
  user.validate();

  // Security - Hash password:
  user.password = cyber.hashPassword(user.password);

  //Security - set role as "user" for denying someone from declaring itself as an admin:
  user.roleId = RoleModel.user;

  // create id:
  user.id = await generateUniqueIdByType(IdType.userId);

  // write user to users.json:
  users.push(user);
  await fs.writeJson(usersPath, users, { spaces: 2 });

  // get new token:
  const token = cyber.getNewToken(user);

  // return token:
  return token;
}

/**
 * Login user:
 * validate, hash password, search for user in users,
 * generate token
 * @param credentials 
 * @returns token: string
 */
async function login(credentials: CredentialsModel): Promise<string> {
  
  // validate:
  credentials.validate();
  
  // Security - set credentials' password to the hashed password:
  credentials.password = cyber.hashPassword(credentials.password);
  
  // get all users:
  const users = await fs.readJson(usersPath);
  
  // search for user in users with the credentials:
  const user = users.find((user: UserModel) => {
    if (
      user.email === credentials.email &&
      user.password === credentials.password
    )
      return user;
  });

  // if no such user:
  if (!user) throw new UnauthorizedError("Incorrect username or password.");

  // generate token:
  const token = cyber.getNewToken(user);

  // return token:
  return token;
}

/**
 * Check if email is already taken
 * @param users: UserModel[]
 * @param email: string
 * @returns boolean
 */
async function checkEmailIsTaken(
  users: UserModel[],
  email: string
): Promise<boolean> {
  // search for users with the same email:
  const result = users.filter((user: UserModel) => {
    if (user.email === email) return user;
  });

  // if users found return true:
  if (result[0]) return true;

  // if no users found return false:
  return false;
}

export default {
  register,
  login,
};
