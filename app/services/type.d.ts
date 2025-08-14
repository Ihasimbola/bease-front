export interface CreateAdmin {
  firstname: string;
  lastname: string;
  phone?: string;
  email: string;
  password: string;
}

export interface CreateClub {
  name: string;
  profileAdmin: string;
  subCategoryNames: string[];
  emblem: string;
}