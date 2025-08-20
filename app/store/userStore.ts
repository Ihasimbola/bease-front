import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserStore {
  admin: {
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
  setUser: (newUser: UserStore["admin"]) => void;
}

const initialState: UserStore["admin"] = {
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
    admin: initialState,
    setUser: (newUser: UserStore["admin"]) =>
      set(
        (state: UserStore) => ({
          admin: newUser,
        }),
        false,
        'user/setUser'
      ),
  }))
);
