import { useState } from "react";
import { defaultConfigFile } from "../default";
import type { BoxConfig, BoxConfigFile } from "../schemas";
import { useConfigIndexData as useConfigIndexData } from "./useConfigIndexData";

export const useConfigData = () => {
  const [file, setFile] = useState<BoxConfigFile>(defaultConfigFile);
  const indexData = useConfigIndexData(file.configurations);
  const [editCombination, setEditCombination] = useState(false);

  return {
    file,
    setFile,
    indexData,
    config: file.configurations[indexData.index],
    editCombination,
    setEditCombination,
    patch: (partialConfig: Partial<BoxConfig>) =>
      setFile({
        configurations: file.configurations.map((c, i) =>
          i === indexData.index ? { ...c, ...partialConfig } : c
        ),
      }),
  };
};
