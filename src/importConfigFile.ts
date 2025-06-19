import type { Dispatch } from "react";
import { boxConfigFileSchema, type BoxConfigFile } from "./schemas";
import { z } from "zod/v4";

export const importConfigFile = async (
  file: File | null | undefined,
  setConfigFile: Dispatch<BoxConfigFile>
) => {
  if (!file) {
    window.alert("Error: No file could be read from the input");
    return;
  }

  let text = "";

  try {
    text = await file.text();
  } catch {
    window.alert("Error: File could not be loaded as text/string");
    return;
  }

  let obj: unknown = {};

  try {
    obj = JSON.parse(text);
  } catch {
    window.alert("Error: File could not be parsed as JSON");
    return;
  }

  const parseResult = boxConfigFileSchema.safeParse(obj);

  if (!parseResult.success) {
    window.alert(
      `Error: JSON in file doesn't match schema: ${z.prettifyError(
        parseResult.error
      )}`
    );
    return;
  }

  setConfigFile(parseResult.data);
};
