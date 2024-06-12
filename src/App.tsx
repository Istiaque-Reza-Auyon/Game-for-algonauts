import type { OnConnect } from "reactflow";
import Move from "./components/Move";
import LinkedList from "./utils/LinkedList";
import Game from "./game/Game1";
import { GameScene } from "./utils/gameScene";


import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";




export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  const [top, setTop] = useState(100);
  const [left, setLeft] = useState(50);
  const pixelDistance = 5;
  const chain = () => { const a = new LinkedList(); return a };
  const [movementChain, setMovementChain] = useState(chain());
  const [gameScene, setGameScene] = useState<GameScene | null>(null);

  // const destinationArray = [[105, 50], [105, 55], [100, 55], [100, 50]];

  // const move = useCallback((direction: string, counter: number) => {

  //   switch (direction) {
  //     // adding logic here to prevent div from leaving the area.
  //     // reddit comment
  //     case "up":
  //       destinationArray[counter][0] === top - pixelDistance ? setTop((top) => (top - pixelDistance >= 5 ? top - pixelDistance : 0)) : setTop(top);
  //       // for (let i = 0; i < 50; i += 1) {
  //       //   setTop(top - 1);
  //       // }
  //       break;
  //     case "down":
  //       destinationArray[counter][0] === top + pixelDistance ? setTop((top) =>
  //         top + pixelDistance <= 275 ? top + pixelDistance : 275
  //       ) : setTop(top);
  //       break;
  //     case "left":
  //       destinationArray[counter][1] === left - pixelDistance ? setLeft((left) =>
  //         left - pixelDistance >= 5 ? left - pixelDistance : 0
  //       ) : setLeft(left);
  //       break;
  //     default:
  //       destinationArray[counter][1] === left + pixelDistance ? setLeft((left) =>
  //         left + pixelDistance <= 275 ? left + pixelDistance : 275
  //       ) : setLeft(left);
  //       break;
  //   }
  // }, []);

  useEffect(() => {
    if (gameScene !== null) {
      console.log("gameScene initialized", gameScene);
    }
  }, [gameScene]);


  function traverseMovementChain(movementChain: any, gameScene: GameScene) {
    let startNode = movementChain.head;
    const moveWithDelay = (node: any) => {
      if (!node) return; // Base case: no more nodes to process

      const direction = node.value;
      gameScene.movePlayer(direction); // Move the player sprite

      // Delay the next move 
      setTimeout(() => {
        moveWithDelay(node.next);
      }, 1000);
    };
    moveWithDelay(startNode);
  }


  function seeEdges() {

    let startNode = edges.find(edge => edge.source == 'start');
    let index = edges.findIndex(edge => edge.source == 'start');

    startNode?.target ? setMovementChain(movementChain.addToHead(startNode?.target)) : setMovementChain(movementChain);


    while (edges.length > 0) {
      edges.splice(index, 1);
      index = edges.findIndex(edge => edge.source == startNode?.target);
      startNode = edges.find(edge => edge.source == startNode?.target);
      startNode ? setMovementChain(movementChain.addToTail(startNode?.target)) : setMovementChain(movementChain);
    };
    if (gameScene) {
      traverseMovementChain(movementChain, gameScene);
    } else {
      console.warn('gameScene is not initialized');
    }
  }

  return (
    <>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      <button className="" onClick={seeEdges}>see</button>
      {/* <FaUserAstronaut style={{color:'blue'}}/> */}
      {/* <Move top={top} left={left} /> */}
      <Game setGameScene={setGameScene} />

    </>
  );
}
