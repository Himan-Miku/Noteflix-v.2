import { create } from "zustand";
import { LabelsData } from "@/app/Sidebar";

interface ILabelsStore {
  labels: Array<LabelsData>;
  setLabels: (l: Array<LabelsData>) => void;
}

export const LabelsStore = create<ILabelsStore>()((set) => ({
  labels: [],
  setLabels: (l: Array<LabelsData>) => set({ labels: l }),
}));
