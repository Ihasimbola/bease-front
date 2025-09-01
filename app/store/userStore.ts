import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface UserStore {
  user: {
    club: string;
    phone: string;
    _id: string;
    user: {
      _id: string;
      email: string;
      firstname: string;
      lastname: string;
      role: string;
    };
  };
  setUser: (newUser: UserStore["user"]) => void;
}

const initialState: UserStore["user"] = {
  club: "",
  phone: "",
  _id: "",
  user: {
    _id: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "",
  },
};

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    user: initialState,
    setUser: (newUser: UserStore["user"]) =>
      set(
        (state: UserStore) => ({
          user: newUser,
        }),
        false,
        'user/setUser'
      ),
  }))
);
