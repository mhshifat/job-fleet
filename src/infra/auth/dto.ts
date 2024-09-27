import { IUserDto } from "../user/dto";

export interface ILoginDto {
  token: string;
  user: IUserDto;
}