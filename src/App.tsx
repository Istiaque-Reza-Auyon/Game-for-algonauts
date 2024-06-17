import type { Edge, OnConnect } from "reactflow";
import LinkedList from "./utils/LinkedList";
import Game from "./game/Game1";
import { GameScene } from "./utils/gameScene";
import FlowContext from "./context/FlowContext";
import { useCallback, useState } from "react";
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
import { nodeTypes } from "./nodes";
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
    const newNode = { id: `${nodes.length + 1}`, parentNode: parentId, data: { label: dir === 'for' ? 'for' : `${dir}`, dir }, position: parentId ? { x: 10, y: 10 } : { x: 0, y: 0 }, type: dir === 'for' ? 'forNode' : 'textUpdater', ...(parentId ? { extent: 'parent' } : {}) };
    setNodes((nds) => [...nds, newNode]);
  };

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
    let startEdge = edges.find(edge => edge.source == 'start');
    let index = edges.findIndex(edge => edge.source == 'start');
    let startNode = getNode(startEdge?.target);

    if (startNode && startNode?.type === 'forNode') {
      let startEdgeInForNode: Edge<any> | undefined, startNodeInForNode, indexInForNode = [];
      for (let i = 1; i <= startNode?.data.times; i++) {
        startEdgeInForNode = edges.find(edge => edge.source == startEdge?.target && edge.sourceHandle == 'a');
        if (i == startNode?.data.times) indexInForNode.push(edges.findIndex(edge => edge.source == startEdge?.target && edge.sourceHandle == 'a'));
        startNodeInForNode = getNode(startEdgeInForNode?.target);
        for (let j = 1; j <= startNodeInForNode?.data.times; j++) {
          i==1? setMovementChain(movementChain.addToHead(startNodeInForNode?.data.dir)): setMovementChain(movementChain.addToTail(startNodeInForNode?.data.dir))
        }
        while (startEdgeInForNode?.targetHandle !== 'b') {
          startEdgeInForNode = edges.find(edge => edge.source == startEdgeInForNode?.target && edge.sourceHandle == 'a');
          startNodeInForNode = getNode(startEdgeInForNode?.target);
          if (i == startNode?.data.times && startNodeInForNode?.type !== 'forNode') indexInForNode.push(edges.findIndex(edge => edge.source == startEdgeInForNode?.target && edge.sourceHandle == 'a'));
          
          if (startNodeInForNode && startNodeInForNode?.type !== 'forNode') {
            for (let k = 1; k <= startNodeInForNode?.data.times; k++) {
              setMovementChain(movementChain.addToTail(startNodeInForNode?.data.dir))
            }
          }
        }

        let counter = 0;
        if (i == startNode?.data.times) {
          indexInForNode.forEach(i =>{
           edges.splice(i-counter, 1);
           counter++;
          });}
      }
    } else if (startNode) {
      for (let i = 1; i <= startNode?.data.times; i++) {
        setMovementChain(movementChain.addToHead(startNode?.data.dir))
      }
    } else setMovementChain(movementChain);

    while(edges.length>0) {
      edges.splice(index , 1);
      index = edges.findIndex(edge => edge.source == startEdge?.target);
      startEdge = edges.find(edge => edge.source == startEdge?.target);
      let startNode = getNode(startEdge?.target);

      if (startNode && startNode?.type === 'forNode') {
        let startEdgeInForNode: Edge<any> | undefined, startNodeInForNode, indexInForNode = [];
        for (let i = 1; i <= startNode?.data.times; i++) {
          startEdgeInForNode = edges.find(edge => edge.source == startEdge?.target && edge.sourceHandle == 'a');
          if (i == startNode?.data.times) indexInForNode.push(edges.findIndex(edge => edge.source == startEdge?.target && edge.sourceHandle == 'a'));
          startNodeInForNode = getNode(startEdgeInForNode?.target);
          for (let j = 1; j <= startNodeInForNode?.data.times; j++) {
            setMovementChain(movementChain.addToTail(startNodeInForNode?.data.dir))
          }
          while (startEdgeInForNode?.targetHandle !== 'b') {
            startEdgeInForNode = edges.find(edge => edge.source == startEdgeInForNode?.target);
            startNodeInForNode = getNode(startEdgeInForNode?.target);
            if (i == startNode?.data.times && startNodeInForNode?.type !== 'forNode') indexInForNode.push(edges.findIndex(edge => edge.source == startEdgeInForNode?.target));
            if (startNodeInForNode && startNodeInForNode?.type !== 'forNode') {
              for (let k = 1; k <= startNodeInForNode?.data.times; k++) {
                setMovementChain(movementChain.addToTail(startNodeInForNode?.data.dir))
              }
            }
          }

          let counter = 0;
          if (i == startNode?.data.times) indexInForNode.forEach(index => {
            edges.splice(index-counter, 1);
            counter++;       
          });
        }
      } else if (startNode) {
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
        nodes
      }}
    >
      <div className='editor-container'>
        <div className='toolbar'>
          <button className='toolbar-btn' onClick={() => addNode('move')}>+ Move</button>
          {/* <button className='toolbar-btn' onClick={() => addNode('left')}>+ Left</button>
          <button className='toolbar-btn' onClick={() => addNode('down')}>+ Down</button> */}
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

