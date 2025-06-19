import type { Dispatch, RefObject } from "react";
import { boxConfigSchema, type BoxConfig } from "../schemas";

interface Props {
  dialogRef: RefObject<HTMLDialogElement | null>;
  editingPin: number | null;
  config: BoxConfig;
  patchConfig: Dispatch<Partial<BoxConfig>>;
}

const whiteBorderOnHover = `
  border-2 border-transparent hover:border-white
  rounded-full transition-colors cursor-pointer
`;

const pinStrings = Object.keys(boxConfigSchema.shape).filter((key) =>
  key.startsWith("pin")
);

export const EditPinDialog = ({
  dialogRef,
  editingPin,
  config,
  patchConfig,
}: Props) => {
  const previousEntry = Object.entries(config).find(
    ([_key, value]) => value === editingPin
  );

  const handleClick = (key: string) => {
    if (previousEntry !== undefined) {
      patchConfig({
        // according to MinZe, "pin..." values above 50 should be fine as "ignored"
        [previousEntry[0]]: 51,
        [key]: editingPin,
      });
    } else {
      patchConfig({
        [key]: editingPin,
      });
    }

    dialogRef.current?.close();
  };

  return (
    <dialog
      closedby="any"
      ref={dialogRef}
      className="m-auto z-50 rounded backdrop:bg-black backdrop:opacity-50 bg-gray-800 border-1 border-gray-600 overflow-hidden"
    >
      <div>
        <div className="flex justify-center items-center p-2">
          <span>
            Editing pin <code>{editingPin ?? "null"}</code>
          </span>
          <button
            className={`absolute right-3 h-7 w-7 ${whiteBorderOnHover}`}
            onClick={() => dialogRef.current?.close()}
          >
            ✖
          </button>
        </div>
        <div className="flex flex-wrap gap-1 w-100 justify-center border-t-1 border-gray-600 bg-gray-900 p-3">
          {pinStrings.map((key) => {
            const isCurrent = key === previousEntry?.[0];

            return (
              <button
                key={key}
                title={isCurrent ? "Current assignment" : undefined}
                className={`px-4 text-sm py-0.5 hover:bg-blue-700 ${whiteBorderOnHover} ${
                  isCurrent ? "bg-gray-500" : "bg-gray-800"
                }`}
                onClick={() => handleClick(key)}
              >
                {key.slice("pin".length)}
              </button>
            );
          })}
        </div>
      </div>
    </dialog>
  );
};
