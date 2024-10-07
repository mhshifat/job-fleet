import { ILoginResponse } from "@/domain/auth/auth";
import { ILoginDto } from "./dto";
import { userDtoToUser } from "../user/transform";
import { organizationDtoToOrganization } from "../organization/transform";

export function loginDtoToLogin(values: ILoginDto): ILoginResponse {
  return {
    uid: values.uid,
    oid: values.oid,
    user: userDtoToUser(values.user),
    organization: organizationDtoToOrganization(values.organization),
  }
}