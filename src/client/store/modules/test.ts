import create from "zustand";

export default create<test>((set) => {
  return {
    version: "1.0.0",
    bigVersion: 1,
    midVersion: 0,
    smallVersion: 0,
    increment: () => {
      set((state) => {
        if (++state.smallVersion == 10) {
          state.smallVersion = 0;
          if (++state.midVersion == 10) {
            state.midVersion = 0;
            state.bigVersion++;
          }
        }

        const currVersion = `${state.bigVersion}.${state.midVersion}.${state.smallVersion}`;
        return { version: currVersion };
      });
    },
  };
});
