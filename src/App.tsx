import { createContext, useContext, useRef, useState } from "react";
import { boxConfigSchema, type BoxConfig } from "./Config";
import { defaultConfig } from "./default";

const buttonContext = createContext<{
  editPin: (pin: number) => void;
  config: BoxConfig;
}>({
  editPin: () => {},
  config: defaultConfig,
});

const BoxButton = ({
  x,
  y,
  pinId,
}: {
  x: number;
  y: number;
  pinId: number;
}) => {
  const { config, editPin } = useContext(buttonContext);

  const entryOfAssignedPinId = Object.entries(config).find(
    ([_key, value]) => value === pinId
  );

  return (
    <button
      className="w-1/15 aspect-square rounded-full border-[.4cqmin] border-gray-600 absolute hover:bg-white transition-colors cursor-pointer -translate-1/2 hover:[&>.popover]:inline hover:[&>.black-on-hover]:text-black flex flex-col items-center justify-center"
      style={{ top: y + "%", left: x + "%" }}
      onClick={() => editPin(pinId)}
    >
      <span className="black-on-hover transition-colors text-[1.3vw] font-mono text-gray-200">
        {pinId}
      </span>
      <span className="text-[1.3vw] font-mono bg-[#242424] rounded border-[.2cqmin] border-gray-200 px-[15%]">
        {entryOfAssignedPinId?.[0] ?? "-"}
      </span>
    </button>
  );
};

function App() {
  const [config, setConfig] = useState<BoxConfig>(defaultConfig);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editingPin, setEditingPin] = useState<number | null>(null);

  return (
    <buttonContext.Provider
      value={{
        editPin: (pin) => {
          setEditingPin(pin);
          dialogRef.current?.showModal();
        },
        config,
      }}
    >
      <dialog
        ref={dialogRef}
        className="m-auto z-50 rounded backdrop:bg-black backdrop:opacity-50 bg-gray-800 border-1 border-gray-600 overflow-hidden"
      >
        <div>
          <p className="text-center p-2">
            Editing pin <code>{editingPin ?? "null"}</code>
          </p>
          <div className="flex flex-wrap gap-1 w-100 justify-center border-t-1 border-gray-600 bg-gray-900 p-3">
            {Object.keys(boxConfigSchema.shape)
              .filter((key) => key.startsWith("pin"))
              .map((key) => (
                <button
                  key={key}
                  className="px-4 text-sm py-1 rounded-full bg-gray-800 cursor-pointer hover:bg-blue-900"
                  onClick={() => {
                    const previousEntry = Object.entries(config).find(
                      ([_key, value]) => value === editingPin
                    );

                    if (previousEntry) {
                      setConfig({
                        ...config,
                        // according to MinZe, "pin..." values above 50 should be fine as "ignored"
                        [previousEntry[0]]: 51,
                        [key]: editingPin,
                      });
                    } else {
                      setConfig({
                        ...config,
                        [key]: editingPin,
                      });
                    }

                    dialogRef.current?.close();
                  }}
                >
                  {key.slice("pin".length)}
                </button>
              ))}
          </div>
        </div>
      </dialog>
      <div className="border-[.4cqmin] w-full aspect-video relative rounded-xl">
        {/* <img src={boxImg} className="opacity-30" /> */}
        <BoxButton x={10} y={31} pinId={27} />
        <BoxButton x={17} y={24} pinId={17} />
        <BoxButton x={25} y={24} pinId={16} />
        <BoxButton x={25} y={10} pinId={15} />
        <BoxButton x={33} y={24} pinId={18} />

        <BoxButton x={50} y={24} pinId={14} />

        <BoxButton x={66} y={34} pinId={5} />
        <BoxButton x={73} y={24} pinId={4} />
        <BoxButton x={80} y={24} pinId={26} />
        <BoxButton x={87} y={34} pinId={32} />

        <BoxButton x={66} y={20} pinId={1} />
        <BoxButton x={73} y={10} pinId={2} />
        <BoxButton x={80} y={10} pinId={3} />
        <BoxButton x={87} y={20} pinId={12} />

        <BoxButton x={36} y={64} pinId={34} />
        <BoxButton x={44} y={64} pinId={36} />
        <BoxButton x={32} y={52} pinId={35} />
        <BoxButton x={40} y={52} pinId={33} />

        <BoxButton x={58} y={78} pinId={13} />
        <BoxButton x={54} y={65} pinId={23} />
        <BoxButton x={62} y={65} pinId={22} />
        <BoxButton x={58} y={52} pinId={21} />
        <BoxButton x={66} y={52} pinId={25} />
      </div>
    </buttonContext.Provider>
  );
}

export default App;
