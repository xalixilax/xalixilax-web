type properties = 
| "method"
| "tiles"
| "matchTiles"
| "connectTiles"
| "matchBlocks"
| "weight"
| "connect"
| "faces"
| "biomes"
| "heights"
| "symmetry"
| "minHeight" // legacy
| "maxHeight" // legacy
// ctm.<ctm_index>
| "tintIndex" 
| "tintBlock"
| "layer"
| "name"


type method = 
| "ctm"
| "ctm_compact"
| "horizontal"
| "vertical"
| "horizontal+vertical"
| "vertical+horizontal"
| "top"
| "random"
| "repeat"
| "fixed"
| "overlay_ctm"
| "overlay_random"
| "overlay_repeat"
| "overlay_fixed"

type connect =
| "block"
| "tile"
| "material"
| "none"

type faces =
| "bottom"
| "top"
| "north"
| "south"
| "east"
| "west"
| "sides"
| "all"