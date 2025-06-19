import type { useConfigData } from "./useConfigData";

export const Pin = ({
  x,
  y,
  pinId,
  ctx,
}: {
  x: number;
  y: number;
  pinId: number;
  ctx: {
    configData: ReturnType<typeof useConfigData>;
    editPin: (pinId: number) => void;
  };
}) => {
  const combinationList = ctx.configData.config.combination.split(",");
  const stringPinId = String(pinId);

  const entryOfAssignedPinId = Object.entries(ctx.configData.config)
    .filter(([key]) => key.startsWith("pin"))
    .find(([_key, value]) => value === pinId);

  const handleClick = () => {
    if (!ctx.configData.editCombination) {
      ctx.editPin(pinId);
      return;
    }

    if (combinationList.includes(stringPinId)) {
      const newList = [...combinationList].filter((p) => p !== stringPinId);

      ctx.configData.patch({
        combination: newList.join(","),
        combinationArraySize: newList.length,
      });
    } else {
      const newList = [...combinationList.filter((p) => p.trim()), stringPinId];

      ctx.configData.patch({
        combination: newList.join(","),
        combinationArraySize: newList.length,
      });
    }
  };

  return (
    <button
      className={`
        w-1/15 aspect-square rounded-full border-[.4cqmin] border-gray-600 absolute
        hover:bg-white transition-colors cursor-pointer -translate-1/2 hover:[&>.popover]:inline
        hover:[&>.black-on-hover]:text-black flex flex-col items-center justify-center
      `}
      style={{ top: y + "%", left: x + "%" }}
      onClick={handleClick}
    >
      <span className="black-on-hover transition-colors text-[1.3vw] font-mono text-gray-400">
        #{pinId}
      </span>

      {ctx.configData.editCombination ? (
        <input
          className="cursor-pointer"
          type="checkbox"
          checked={combinationList.includes(stringPinId)}
        />
      ) : (
        entryOfAssignedPinId && (
          <span className="text-[1.3vw] font-mono bg-[#242424] rounded border-[.2cqmin] border-gray-200 px-[15%]">
            {entryOfAssignedPinId[0].slice("pin".length)}
          </span>
        )
      )}
    </button>
  );
};
