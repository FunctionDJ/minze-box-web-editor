import { useState } from "react";
import type { BoxConfig } from "../schemas";

export const useConfigIndexData = (configurations: BoxConfig[]) => {
  const [index, setIndex] = useState(0);

  return {
    index,
    canPrev: index > 0,
    setIndex,
    prev: () => setIndex(Math.max(0, index - 1)),
    canNext: index < configurations.length - 1,
    next: () => setIndex(Math.min(configurations.length - 1, index + 1)),
  };
};

export type ConfigIndex = ReturnType<typeof useConfigIndexData>;
