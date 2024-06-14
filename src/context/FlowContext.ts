import React, { createContext } from "react";
import { Connection, Edge, EdgeChange, Node, NodeChange } from "reactflow";

const onConnect = (_params: Edge | Connection) => { return };

const onNodesChange = (_changes: NodeChange[]) => { return };

const onEdgesChange = (_changes: EdgeChange[]) => { return };

const addNode = (_type: string,_parentId?: string) => {
  console.log('I am the context function');
  return;
};

const removeNode = (_id: string) => { return };

const setCurrentPos = () => {};

const setAngle = () => {};

const setCode = () => {};

const FlowContext = createContext<{
  nodes: Node<{
    label?: string,
    steps?: number,
    direction?: string,
    times?: number,
    parentId?: string
  }>[],
  edges: Edge[],
  onConnect: (params: Edge | Connection) => void,
  onNodesChange: (changes: NodeChange[]) => void,
  onEdgesChange: (changes: EdgeChange[]) => void,
  addNode: (type: string, parentId?: string, parentLevel?: number) => void,
  removeNode: (id: string) => void,
  currentPos: {
    x: number,
    y: number
  },
  setCurrentPos: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
  angle: 0 | 90 | 180 | 270,
  setAngle: React.Dispatch<React.SetStateAction<0 | 90 | 180 | 270>>,
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}>({
  nodes: [],
  edges: [],
  onConnect,
  onNodesChange,
  onEdgesChange,
  addNode,
  removeNode,
  currentPos: {
    x: 40,
    y: 40
  },
  setCurrentPos,
  angle: 0,
  setAngle,
  code: "",
  setCode
})

export default FlowContext;