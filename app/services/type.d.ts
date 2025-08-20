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
  subteamNames: string[];
  emblem: string;
}

export interface HttpResponse<T> {
  data: T[];
}
