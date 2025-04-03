import bcrypt from 'bcryptjs'

export default function saltAndHashPassword(password: any): string {
   const salt = bcrypt.genSaltSync(10)
   return bcrypt.hashSync(password, salt)
}
