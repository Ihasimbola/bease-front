export interface CreateAdmin {
  firstname: string;
  lastname: string;
  phone?: string;
  email: string;
  password: string;
}

export interface CreateLicensed extends CreateAdmin {
  gender: "M" | 'F';
  age: number;
  phone: string;
  isConfirmed: boolean;
  category: string;
  club: string;
  number: string;
}

export interface CreateClub {
  name: string;
  profileAdmin: string;
  subteamNames: string[];
  emblem: string;
}

export interface HttpResponse<T> {
  data: T[];
}

export interface CategoryResponse {
  name: string;
  isCustom: boolean;
  admin: CreateAdmin;
  _id: string;
}

export interface ClubResponse {
    name: string;
  profileAdmin: string;
  emblem: string;
  categories: string[];
}
