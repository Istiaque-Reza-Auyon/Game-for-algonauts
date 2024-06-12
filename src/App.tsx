import type { OnConnect } from "reactflow";
import LinkedList from "./utils/LinkedList";
import Game from "./game/Game1";
import { GameScene } from "./utils/gameScene";


import { useCallback, useState } from "react";
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

  const chain = () => { const a = new LinkedList(); return a };
  const [movementChain, setMovementChain] = useState(chain());
  const [gameScene, setGameScene] = useState<GameScene | null>(null);


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
      <Game setGameScene={setGameScene} />
    </>
  );
}
