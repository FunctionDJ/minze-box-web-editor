import { useRef } from "react";
import { FileInput } from "./FileInput";
import type { useConfigData } from "./useConfigData";
import { defaultConfigFile } from "../default";
import { Checkbox } from "./Checkbox";
import { NumValue } from "./NumValue";

const commonOptionsClassNames = `
  w-7 flex justify-center
  disabled:text-gray-600
  enabled:hover:bg-gray-500
  enabled:cursor-pointer disabled:cursor-not-allowed
`;

interface Props {
  configData: ReturnType<typeof useConfigData>;
}

export const Options = ({ configData }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aRef = useRef<HTMLAnchorElement>(null);

  const createConfig = () => {
    const indexOfNewConfig = configData.file.configurations.length;

    configData.setFile({
      configurations: [
        ...configData.file.configurations,
        {
          ...defaultConfigFile.configurations[0],
          name: `config ${indexOfNewConfig + 1}`,
        },
      ],
    });

    configData.indexData.setIndex(indexOfNewConfig);
  };

  const cloneConfig = () => {
    configData.setFile({
      configurations: [
        ...configData.file.configurations,
        {
          ...configData.config,
          name: `clone of ${configData.config.name}`,
        },
      ],
    });

    configData.indexData.setIndex(configData.file.configurations.length);
  };

  const deleteConfig = () => {
    if (
      window.confirm(
        `Are you sure you want to delete this config "${configData.config.name}"?`
      )
    ) {
      configData.indexData.prev();

      configData.setFile({
        configurations: configData.file.configurations.filter(
          (_c, i) => i !== configData.indexData.index
        ),
      });
    }
  };

  return (
    <section className="rounded-xl bg-[#151515] **:border-gray-500 p-3 flex gap-3 *:basis-1/2">
      <FileInput inputRef={fileInputRef} setConfigFile={configData.setFile} />
      <a
        ref={aRef}
        className="hidden"
        href="#"
        download="configuration.json"
      ></a>
      <div className="flex flex-col gap-2">
        <div className="flex *:grow gap-1">
          <button
            className="border rounded px-1 hover:bg-gray-500 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            Import file
          </button>
          <button
            className="border rounded px-1 hover:bg-gray-500 cursor-pointer"
            onClick={() => {
              if (aRef.current === null) {
                return;
              }

              aRef.current.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
                JSON.stringify(configData.file, null, 2)
              )}`;

              aRef.current.click();
            }}
          >
            Export file
          </button>
          <button
            className="border rounded px-1 hover:bg-gray-500 cursor-pointer"
            title="Prompts for confirmation. Loads MinZe default configurations."
            onClick={() => {
              if (
                window.confirm(
                  "Delete all configurations and load default (MinZe) configurations?"
                )
              ) {
                configData.setFile(defaultConfigFile);
                configData.indexData.setIndex(0);
              }
            }}
          >
            Reset all configs
          </button>
        </div>
        <div className="flex border rounded overflow-hidden">
          <button
            disabled={!configData.indexData.canPrev}
            className={commonOptionsClassNames + " border-r"}
            onClick={configData.indexData.prev}
          >
            ◄
          </button>
          <span className="w-6 text-center border-r text-gray-300 flex justify-center">
            #{configData.indexData.index}
          </span>
          <input
            className="grow px-1 font-mono w-0 min-w-[50"
            value={configData.config.name}
            onChange={(e) => configData.patch({ name: e.currentTarget.value })}
          />
          <button
            className={commonOptionsClassNames + " border-l"}
            onClick={createConfig}
            title="Create new config"
          >
            ➕
          </button>
          <button
            className={commonOptionsClassNames + " border-l"}
            onClick={cloneConfig}
            title="Clone current config"
          >
            ⧉
          </button>
          <button
            className={commonOptionsClassNames + " border-l"}
            title="Reset this config (prompts for confirmation)"
            onClick={() =>
              window.confirm(
                `Reset this config "${configData.config.name}"?`
              ) &&
              configData.patch({
                ...defaultConfigFile.configurations[0],
                name: configData.config.name,
              })
            }
          >
            🔃
          </button>
          <button
            disabled={configData.file.configurations.length <= 1}
            className={commonOptionsClassNames + " border-l"}
            onClick={deleteConfig}
            title={
              configData.file.configurations.length <= 1
                ? "Can't delete if there's a single config"
                : "Delete this config (prompts for confirmation)"
            }
          >
            🗑
          </button>
          <button
            disabled={!configData.indexData.canNext}
            className={commonOptionsClassNames + " border-l"}
            onClick={configData.indexData.next}
          >
            ►
          </button>
        </div>
        <div className="rounded border flex">
          <Checkbox
            checked={configData.editCombination}
            onChange={() =>
              configData.setEditCombination(!configData.editCombination)
            }
            className="border-r"
          >
            Edit activation combination
          </Checkbox>
          <input
            className="font-mono text-gray-400 w-0 grow text-ellipsis px-1"
            value={`"${configData.config.combination}"`}
            readOnly
          />
          <button
            title="Reset/clear activation combination (prompts for confirmation)"
            className={commonOptionsClassNames + "border-l"}
            onClick={() =>
              window.confirm(
                "Reset the activation confirmation for this config?"
              ) &&
              configData.patch({ combination: "", combinationArraySize: 0 })
            }
          >
            🔃
          </button>
        </div>
        <div className="flex gap-1 *:grow">
          <NumValue
            value={configData.config.tiltValue}
            onValue={(tiltValue) => configData.patch({ tiltValue })}
          >
            tiltValue
          </NumValue>
          <Checkbox
            title="MinZe: makes it so that the modifiers act as dpad and you have to press the switch button to activate the modifiers (this is for non-smash games tbh)"
            className="border rounded w-0"
            checked={configData.config.switchForDirections}
            onChange={() =>
              configData.patch({
                switchForDirections: !configData.config.switchForDirections,
              })
            }
          >
            switchForDirections
          </Checkbox>
        </div>
        <div className="flex gap-1 *:grow">
          <NumValue
            value={configData.config.x1Value}
            onValue={(x1Value) => configData.patch({ x1Value })}
          >
            x1Value
          </NumValue>
          <NumValue
            value={configData.config.x2Value}
            onValue={(x2Value) => configData.patch({ x2Value })}
          >
            x2Value
          </NumValue>
        </div>
        <div className="flex gap-1 *:grow">
          <NumValue
            value={configData.config.y1Value}
            onValue={(y1Value) => configData.patch({ y1Value })}
          >
            y1Value
          </NumValue>
          <NumValue
            value={configData.config.y2Value}
            onValue={(y2Value) => configData.patch({ y2Value })}
          >
            y2Value
          </NumValue>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Checkbox
          className="rounded border justify-center"
          checked={configData.config.analogShields}
          onChange={() =>
            configData.patch({
              analogShields: !configData.config.analogShields,
            })
          }
        >
          Analog shields
        </Checkbox>
        <div className="flex gap-1 *:grow">
          <NumValue
            value={configData.config.lValue}
            onValue={(lValue) => configData.patch({ lValue })}
            min={0}
            max={180}
            disabled={!configData.config.analogShields}
          >
            lValue
          </NumValue>
          <NumValue
            value={configData.config.rValue}
            onValue={(rValue) => configData.patch({ rValue })}
            min={0}
            max={180}
            disabled={!configData.config.analogShields}
          >
            rValue
          </NumValue>
        </div>
        <div className="rounded border flex *:grow **:cursor-pointer select-none">
          <label className="px-2 flex gap-2 align-middle border-r">
            <input
              type="radio"
              checked={configData.config.socdMode === 0}
              onChange={() => configData.patch({ socdMode: 0 })}
            />
            <span>Opposing directions cancel out (Neutral SOCD)</span>
          </label>
          <label className="px-2 flex gap-2 align-middle">
            <input
              type="radio"
              checked={configData.config.socdMode === 2}
              onChange={() => configData.patch({ socdMode: 2 })}
            />
            <span>Opposing direction overwrites & returns (2IPR)</span>
          </label>
        </div>
      </div>
    </section>
  );
};
