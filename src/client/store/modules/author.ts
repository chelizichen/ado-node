import { author } from "@/api/hello";
import create from "zustand";

export default create<autohr>((set) => ({
  name: "",
  setName: async () => {
    const res = await author();
    set({ name: res.author + " @upfast/cli" });
  },
}));
