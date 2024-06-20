import { GameScene } from "./gameScene";

export function traverseMovementChain(movementChain: any, gameScene: GameScene) {
    let startNode = movementChain.head;
    
    const moveWithDelay = (node: any) => {
      if (!node) return; // Base case: no more nodes to process

      const direction = node.value;
      gameScene.movePlayer(direction); // Move the player sprite

      // Delay the next move 
      setTimeout(() => {
        moveWithDelay(node.next);
      }, 1050);
    };
    moveWithDelay(startNode);
  }