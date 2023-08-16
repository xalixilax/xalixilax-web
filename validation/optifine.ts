import { z } from 'zod'

const minHeightProps =  // deprecated
const maxHeightProps = z.number().int().max(65535) // deprecated
const tintIndexProps = z.number().int().min(-1) // For overlays only
const tintBlockProps = z.string() 
const layerProps = z.union([z.literal("cutout"), z.literal("cutout_mipped"), z.literal("translucent")])
const ctmIndexProps = z.union([z.number(), z.string()]) // Property name regex "^ctm\\.\\d+$". Peut-être présent plusieurs fois

const basePropertiesSchema = z.object({
    matchTiles: z.array(z.string()),
    matchBlocks: z.array(z.string()),
    weight: z.number().int().min(0),
    connect: z.union([z.literal("block"), z.literal("tile"), z.literal("material"), z.literal("state")]),
    connectTiles: z.array(z.string()),
    faces: z.union([z.literal("bottom"), z.literal("top"), z.literal("north"), z.literal("south"), z.literal("east"), z.literal("west"), z.literal("sides"), z.literal("all")]),
    biomes: z.array(z.string()), // Think of something for negative biomes
    heights: z.array(z.number().int().min(-65535).max(65535)),
    minHeight: z.number().int().min(-65535),
    maxHeight: z.number().int().max(65535),
    tintIndex: z.number().int().min(-1),
    tintBlock: z.string(),
    layer: z.union([z.literal("cutout"), z.literal("cutout_mipped"), z.literal("translucent")]),
})


const ctmSchema = z.object({
    method: z.literal("ctm"),
    tiles: z.array(z.string()).length(47),
    innerSeams: z.boolean(),
})
export type ctm = z.infer<typeof ctmSchema>

const ctmCompactSchema = z.object({
    method: z.literal("ctm_compact"),
    tiles: z.array(z.string()).length(5),
    innerSeams: z.boolean(),
    // ctm.N
})
export type ctmCompact = z.infer<typeof ctmCompactSchema>

const horizontalSchema = z.object({
    method: z.literal("horizontal"),
    tiles: z.array(z.string()).length(4),
})
export type horizontal = z.infer<typeof horizontalSchema>

const verticalSchema = z.object({
    method: z.literal("vertical"),
    tiles: z.array(z.string()).length(4),
})
export type vertical = z.infer<typeof verticalSchema>

const topSchema = z.object({
    method: z.literal("top"),
    tiles: z.string(),
})
export type top = z.infer<typeof topSchema>

const randomSchema = z.object({
    method: z.literal("random"),
    tiles: z.array(z.string()),
    weights: z.array(z.number()),
    randomLoops: z.number().int().min(0).max(9),
    symmetry: z.union([z.literal("none"), z.literal("opposite"), z.literal("all")]),
    linked: z.boolean(),
}).refine(data => data.tiles.length === data.weights.length, {
    message: "tiles and weights array length must be equal",
    path: ["tiles", "weights"],
})
export type random = z.infer<typeof randomSchema>

const repeatSchema = z.object({
    method: z.literal("repeat"),
    width: z.number().int().min(1).max(16384),
    height: z.number().int().min(1).max(16384),
    tiles: z.array(z.string()), // width * height,
    symmetry: z.union([z.literal("none"), z.literal("opposite")])
}).refine(data => data.tiles.length === data.width * data.height, {
    message: "tiles array length must be equal to width * height",
    path: ["tiles"],
})
export type repeat = z.infer<typeof repeatSchema>

const fixedSchema = z.object({
    method: z.literal("fixed"),
    tiles: z.array(z.string()).length(1),
})
export type fixed = z.infer<typeof fixedSchema>

