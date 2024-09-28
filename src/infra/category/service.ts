import { http, IHttp } from "@/utils/http";
import { createCategory, getCategories } from "../../../actions/category";
import { INewCategoryPayload } from "@/domain/category/category";
import { categoryDtoListToCategoryList, categoryDtoToCategory } from "./transform";

class CategoryService {
  private _http: IHttp;

  constructor(http: IHttp) {
    this._http = http;
  }

  async create(values: INewCategoryPayload) {
    const data = await createCategory(values);
    return categoryDtoToCategory(data);
  }

  async list() {
    const data = await getCategories();
    return categoryDtoListToCategoryList(data);
  }
}

export const categoryService = new CategoryService(http);