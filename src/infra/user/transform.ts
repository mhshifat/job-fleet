import { IUserDto } from "./dto";
import { IUser } from "@/domain/user/user";

export function userDtoToUser(values: IUserDto): IUser {
  return {
    id: values.id,
    firstName: values.first_name,
    lastName: values.last_name,
    email: values.email,
    avatar: values.avatar,
  }
}