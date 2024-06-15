import type { OnConnect } from "reactflow";
import LinkedList from "./utils/LinkedList";
import Game from "./game/Game1";
import { GameScene } from "./utils/gameScene";
import FlowContext from "./context/FlowContext";


import { useCallback, useContext, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";


export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([{
    id: 'start',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { label: 'start' },
  }]);
  const { getNode } = useReactFlow();
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );


  const chain = () => { const a = new LinkedList(); return a };
  const [movementChain, setMovementChain] = useState(chain());
  const [gameScene, setGameScene] = useState<GameScene | null>(null);


  const addNode = (dir: string, parentId?: string) => {

    if (parentId) {
      const parentIndex = nodes.findIndex(node => node.id === parentId);
      if (parentIndex === -1) return;
    }

    const newNode = { id: `${nodes.length + 1}`, data: { label: dir === 'for' ? 'for' : `${dir}`, parentId, dir }, position: parentId ? { x: 0, y: 0 } : { x: 200, y: 200 }, type: dir === 'for' ? 'forNode' : 'textUpdater' };
    setNodes((nds) => [...nds, newNode]);
  };

  function traverseMovementChain(movementChain: any, gameScene: GameScene) {
    let startNode = movementChain.head;
    const moveWithDelay = (node: any) => {
      if (!node) return; // Base case: no more nodes to process

      console.log(node.value, 'value')
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
    setMovementChain(null);

    let startEdge = edges.find(edge => edge.source == 'start');
    let index = edges.findIndex(edge => edge.source == 'start');
    let startNode = getNode(startEdge?.target)

    if (startNode) {
      for (let i = 1; i <= startNode?.data.times; i++) {
        setMovementChain(movementChain.addToHead(startNode?.data.dir))
      }
    } else setMovementChain(movementChain);

    console.log(startNode);
    while (edges.length > 0) {
      edges.splice(index, 1);
      index = edges.findIndex(edge => edge.source == startEdge?.target);
      startEdge = edges.find(edge => edge.source == startEdge?.target);
      let startNode = getNode(startEdge?.target);
      
      
      if (startNode) {
        for (let i = 1; i <= startNode?.data.times; i++) {
          setMovementChain(movementChain.addToTail(startNode?.data.dir))
        }
      } else setMovementChain(movementChain);
    };
    if (gameScene) {
      traverseMovementChain(movementChain, gameScene);
    } else {
      console.warn('gameScene is not initialized');
    }
  }

  return (
    <FlowContext.Provider
      value={{
        onNodesChange,
        onEdgesChange,
        addNode,
      }}
    >
      <div className='editor-container'>
        <div className='toolbar'>
          <button className='toolbar-btn' onClick={() => addNode('right')}>+ Right</button>
          <button className='toolbar-btn' onClick={() => addNode('left')}>+ Left</button>
          <button className='toolbar-btn' onClick={() => addNode('down')}>+ Down</button>
          <button className='toolbar-btn' onClick={() => addNode('turn')}>+ Turn</button>
          <button className='toolbar-btn' onClick={() => addNode('for')}>+ For</button>
        </div>
      </div>
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
        <Controls />
      </ReactFlow>
      <button className="" onClick={seeEdges}>see</button>
      <Game setGameScene={setGameScene} />
    </FlowContext.Provider>
  );
}
