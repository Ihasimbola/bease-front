import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ClubStore {
  club: {
    _id: string;
    name: string;
    categories: [
      string
    ];
    profileAdmin: string;
    emblem: string
  },
  setClub: (newClub: ClubStore["club"]) => void
}

const initialState: ClubStore["club"] = {
  _id: "",
  name: "",
  categories: [""],
  profileAdmin: "",
  emblem: ""
}

export const useClubStore = create<ClubStore>()(
  (set) => ({
    club: initialState,
    setClub: (newClub: ClubStore["club"]) => set({ club: newClub }),
  })
)