import { useRef, useState } from "react";
import { EditPinDialog } from "./EditPinDialog";
import { Options } from "./Options";
import { Pin } from "./Pin";
import { useConfigData } from "./useConfigData";
import { useEditPinData } from "./useEditPinData";
import { importConfigFile } from "../importConfigFile";

export const App = () => {
  const configData = useConfigData();
  const editPinData = useEditPinData();
  const [isDragging, setIsDragging] = useState(false);

  const ctx: Parameters<typeof Pin>["0"]["ctx"] = {
    configData,
    editPin: editPinData.editPin,
  };

  const dragCounter = useRef(0);

  return (
    <main
      className="flex flex-col gap-2"
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => {
        dragCounter.current++;
        setIsDragging(true);
      }}
      onDragLeave={() => {
        dragCounter.current--;
        if (dragCounter.current <= 0) {
          setIsDragging(false);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        dragCounter.current = 0;
        setIsDragging(false);
        const [item] = e.dataTransfer.items;

        if (item.kind !== "file") {
          window.alert("Drop item is not a file");
          return;
        }

        importConfigFile(item.getAsFile(), configData.setFile);
      }}
    >
      <span
        style={{ display: isDragging ? undefined : "none" }}
        className="w-full h-full top-0 left-0 fixed bg-black opacity-70 z-50 flex justify-center items-center"
      >
        Drop configuration.json to load (replaces all current configs)
      </span>
      <Options configData={configData} />
      <EditPinDialog
        config={configData.config}
        patchConfig={configData.patch}
        dialogRef={editPinData.dialogRef}
        editingPin={editPinData.editingPin}
      />
      <div className="border-[.4cqmin] border-gray-600 w-full aspect-video relative rounded-xl">
        <Pin ctx={ctx} x={10} y={31} pinId={27} />
        <Pin ctx={ctx} x={17} y={24} pinId={17} />
        <Pin ctx={ctx} x={25} y={24} pinId={16} />
        <Pin ctx={ctx} x={25} y={10} pinId={15} />
        <Pin ctx={ctx} x={33} y={24} pinId={18} />

        <Pin ctx={ctx} x={50} y={24} pinId={14} />

        <Pin ctx={ctx} x={66} y={34} pinId={5} />
        <Pin ctx={ctx} x={73} y={24} pinId={4} />
        <Pin ctx={ctx} x={80} y={24} pinId={26} />
        <Pin ctx={ctx} x={87} y={34} pinId={32} />

        <Pin ctx={ctx} x={66} y={20} pinId={1} />
        <Pin ctx={ctx} x={73} y={10} pinId={2} />
        <Pin ctx={ctx} x={80} y={10} pinId={3} />
        <Pin ctx={ctx} x={87} y={20} pinId={12} />

        <Pin ctx={ctx} x={36} y={64} pinId={34} />
        <Pin ctx={ctx} x={44} y={64} pinId={36} />
        <Pin ctx={ctx} x={32} y={52} pinId={35} />
        <Pin ctx={ctx} x={40} y={52} pinId={33} />

        <Pin ctx={ctx} x={58} y={78} pinId={13} />
        <Pin ctx={ctx} x={54} y={65} pinId={23} />
        <Pin ctx={ctx} x={62} y={65} pinId={22} />
        <Pin ctx={ctx} x={58} y={52} pinId={21} />
        <Pin ctx={ctx} x={66} y={52} pinId={25} />

        <span className="absolute text-xs left-2 bottom-2 text-gray-600">
          Drag & Drop <code>configuration.json</code> anywhere to load
        </span>
      </div>
    </main>
  );
};
