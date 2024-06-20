import { createContext } from "react";
import type { Node } from "reactflow";


const addNode = (_type: string,_parentId?: string) => {
  return;
};

// const removeNode = (_id: string) => { return };


const FlowContext = createContext<{
  addNode: (type: string, parentId?: string) => void,
  nodes: Node[]
  // removeNode: (id: string) => void,
}>({
  addNode,
  nodes: []
})

export default FlowContext;