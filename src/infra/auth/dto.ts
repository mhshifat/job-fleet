import { IOrganizationDto } from "../organization/dto";
import { IUserDto } from "../user/dto";

export interface ILoginDto {
  uid: string;
  oid: string;
  user: IUserDto;
  organization: IOrganizationDto;
}

export interface ILoginDtoPayload {
  email: string;
  password: string;
}