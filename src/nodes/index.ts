import type { Node, NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";
import TextUpdaterNode from "../textUpdaterNode";
import ForNode from "./ForNode";

export const initialNodes = [
  { id: "right", type: "textUpdater", position: { x: 0, y: 0 }, data: { label: "move right" } },
  {
    id: "left",
    type: "textUpdater",
    position: { x: -100, y: 100 },
    data: { label: "move left" },
  },
  { id: "down", position: { x: 100, y: 100 }, data: { label: "move down" },  type: "textUpdater", },
  {
    id: "up",
    type: "textUpdater",
    position: { x: 0, y: 200 },
    data: { label: "move up" },
  },
  {
    id: 'start',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123, label:'start' },
  },
] satisfies Node[];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
 "textUpdater": TextUpdaterNode, 
 "forNode": ForNode
  // Add any of your custom nodes here!
} satisfies NodeTypes;
