export type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profile: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ProfileAdminType = {
  _id: string;
  user: UserType;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  club: string;
};

export type ClubDataType = {
  _id: string;
  name: string;
  categories: string[];
  profileAdmin: ProfileAdminType;
  emblem: string;
};