import { IFormDto } from "./dto";
import { IForm } from "@/domain/form/form";

export function formDtoToForm(values: IFormDto): IForm {
  return {
    id: values.id,
    title: values.title,
    fields: values.fields,
    status: values.status,
  }
}

export function formToFormDto(values: IForm): IFormDto {
  return {
    id: values.id,
    title: values.title,
    fields: values.fields,
    status: values.status,
  }
}

export function formDtoListToFormList(values: IFormDto[]): IForm[] {
  return values.map(item => formDtoToForm(item))
}