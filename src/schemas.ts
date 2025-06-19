import { z } from "zod/v4";

export const boxConfigSchema = z
  .object({
    /** doesn't do anything, for editing only */
    name: z.string(),
    /** must match the length of the combination list */
    combinationArraySize: z.int(),
    /** string separated list of pin integers that when held during box boot will load this config */
    combination: z.string().refine((raw) => raw.match(/^(\d+(,\d+)*)?$/)),
    pinA: z.int(),
    pinB: z.int(),
    pinX: z.int(),
    pinY: z.int(),
    pinL: z.int(),
    pinR: z.int(),
    pinZ: z.int(),
    pinStart: z.int(),
    pinUp: z.int(),
    pinDown: z.int(),
    pinLeft: z.int(),
    pinRight: z.int(),
    pinCUp: z.int(),
    pinCDown: z.int(),
    pinCLeft: z.int(),
    pinCRight: z.int(),
    pinSwitch: z.int(),
    pinTilt: z.int(),
    pinDUp: z.int(),
    pinDDown: z.int(),
    pinDLeft: z.int(),
    pinDRight: z.int(),
    pinLightShield: z.int(),
    tiltValue: z.int(),
    /** left stick position for the modifiers between 0 and 180 */
    x1Value: z.int(),
    x2Value: z.int(),
    /**
     * "y1Value": 42,
     * "y2Value": 80,
     * One of those two is perfect or almost perfect wavedash
     */
    y1Value: z.int(),
    y2Value: z.int(),
    /**
     * behaviour for opposing directional inputs.
     * 0: neutral/CPT standard (directions cancel out to neutral)
     * 1: 2IP [NOT IMPLEMENTED!!!] (new direction overwrites previous, but releasing may return to neutral)
     * 2: 2IPR (new direction overwrites previous, releasing will go back to previous input (busted!))
     */
    socdMode: z.literal(0).or(z.literal(1)).or(z.literal(2)),
    /** MinZe: makes it so that the modifiers act as dpad and you have to press the switch button to activate the modifiers (this is for non-smash games tbh) */
    switchForDirections: z.boolean(),
    /** outputs analog values which is required for ultimate */
    analogShields: z.boolean(),
    /** L/R values for when analogShields is true */
    rValue: z.int(),
    lValue: z.int(),
  })
  .refine((config) => {
    // when .split(",") is used on empty string, length would be 1
    // this explicit emptry string check works around that.
    const combinationSize =
      config.combination === "" ? 0 : config.combination.split(",").length;

    return combinationSize === config.combinationArraySize;
  });

export type BoxConfig = z.infer<typeof boxConfigSchema>;

export const boxConfigFileSchema = z.object({
  configurations: z.array(boxConfigSchema),
});

export type BoxConfigFile = z.infer<typeof boxConfigFileSchema>;
