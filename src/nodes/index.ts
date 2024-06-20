import type { Node, NodeTypes } from "reactflow";
import TextUpdaterNode from "./MoveAndTurnNode";
import ForNode from "./ForNode";
import StartNode from "./StartNode";

export const initialNodes = [
  {
    id: 'start',
    type: 'startNode',
    position: { x: 0, y: 0 },
    data: { label: 'start' },
  }
] satisfies Node[];

export const nodeTypes = {
 "textUpdater": TextUpdaterNode, 
 "forNode": ForNode,
 "startNode": StartNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;
