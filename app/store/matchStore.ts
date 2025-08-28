import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { MatchType } from "~/routes/planning/section/match/type";

interface MatchStore {
  data: MatchType[],
  setData: (newData: MatchType[]) => void
  pushData: (dataToPush: MatchType[]) => void
}


export const useMatchStore = create<MatchStore>()(
  devtools((set) => ({
    data: [] as MatchType[],
    setData: (newData: MatchType[]) => set((state) => ({
      data: newData
    }), false),
    pushData: (dataToPush: MatchType[]) => set((state) => {
      const prevData = state.data;
      
      return {
        data: [...prevData, ...dataToPush] 
      }
    })
  }))
)