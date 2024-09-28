import { ICategoryDto } from "./dto";
import { ICategory } from "@/domain/category/category";

export function categoryDtoToCategory(values: ICategoryDto): ICategory {
  return {
    id: values.id,
    name: values.name
  }
}

export function categoryDtoListToCategoryList(values: ICategoryDto[]): ICategory[] {
  return values.map(item => categoryDtoToCategory(item))
}