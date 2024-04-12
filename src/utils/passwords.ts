import bcrypt from "bcrypt"
export const hashPassword = (password:string)=> bcrypt.hash(password,14)
export const comparePassword = (password:string,hash:string)=> bcrypt.compare(password,hash)