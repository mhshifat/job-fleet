import { ISettingsDto } from "./dto";
import { ISettings } from "@/domain/settings/settings";

export function settingsToSettingsDto(values: ISettings): ISettingsDto {
  return {
    id: values.id,
    city: values.city,
    country: values.country,
    street_address: values.streetAddress,
    zip_code: values.zipCode,
    user_id: "",
    org_id: "",
  }
}

export function settingsDtoToSettings(values: ISettingsDto): ISettings {
  return {
    id: values.id,
    city: values.city,
    country: values.country,
    streetAddress: values.street_address,
    zipCode: values.zip_code,
  }
}