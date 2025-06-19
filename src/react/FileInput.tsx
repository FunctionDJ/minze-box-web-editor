import type { ChangeEvent, Dispatch, RefObject } from "react";
import { importConfigFile } from "../importConfigFile";
import { type BoxConfigFile } from "../schemas";

interface Props {
  inputRef: RefObject<HTMLInputElement | null>;
  setConfigFile: Dispatch<BoxConfigFile>;
}
export const FileInput = ({ inputRef, setConfigFile }: Props) => {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0);

    // resets input element for the case if the same file is imported again
    e.currentTarget.value = "";

    importConfigFile(file, setConfigFile);
  };

  return (
    <input
      type="file"
      className="hidden"
      ref={inputRef}
      onChange={handleChange}
    />
  );
};
