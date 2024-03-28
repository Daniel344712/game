/**
 * 
 * @param {import("../types/typedef").Coordinate} currentPosition 
 * @param {import("../common/direction").Direction} direction 
 * @returns {import("../types/typedef").Coordinate} 
 */

import { DIRECTION } from "../common/direction.js";
import { TILE_SIZE } from "../world/characters/config.js";


export function getTargetPositionFromGameObjectPositionAndDirection(currentPosition, direction){
   /** @type {import("../types/typedef").Coordinate} */
    const targetPosition = {...currentPosition}
    switch (direction) {
            case DIRECTION.DOWN:
                targetPosition.y += TILE_SIZE
                break;
            case DIRECTION.UP:
                targetPosition.y -= TILE_SIZE
                break;
            case DIRECTION.LEFT:
                targetPosition.x -= TILE_SIZE
                break;
            case DIRECTION.RIGHT:
                targetPosition.x += TILE_SIZE
                break;
            case DIRECTION.NONE:
                break;
                default:
                 
        }
        return targetPosition;
}
