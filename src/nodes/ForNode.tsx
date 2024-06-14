import { useContext } from 'react';
import { Handle, Position } from 'reactflow';
import FlowContext from '../context/FlowContext';
import close from '../assets/close.svg';
import loop from '../assets/loop.svg';

function ForNode({ id, data, selected }: {
  id: string,
  data: {
    label: string,
    level: number,
    times?: number
  },
  selected: boolean
}) {

  const ctx = useContext(FlowContext);

//   const numOfChild = ctx.nodes.reduce((count, node) => node.parentId == id ? count + 1 : count, 0);

  return (
    <div className={"base-node for-node bg-[rgb(244,209,255)]" + (selected ? "selected-node" : "")} style={{ height: `${(1 * 6) + 6}rem`, width: (350 - (20 * data.level)) }}>
      <div className='flex'>
        <div className='node-icon flex-center'><img src={loop} /></div>
        <div className='flex-grow'>
          <div className='node-info'>
            <span>For </span>
            <input type="number" className='num-input' onChange={(e) => data.times = Number(e.target.value)} />
            <span> times</span>
          </div>
          
            {<div className="for-btn-container">
              <button onClick={() => ctx.addNode('right')}>+ move right</button>
              <button onClick={() => ctx.addNode('left')}>+ move left</button>
              <button onClick={() => ctx.addNode('up')}>+ move up</button>
              <button onClick={() => ctx.addNode('down')}>+ move down</button>
              { data.level < 2 &&
                <button onClick={() => ctx.addNode('for', id)}>+ For</button>
              }
            </div>}
          
        </div>

        <div className="close-btn-container"><img className="close-btn" src={close}  onClick={() => ctx.removeNode(id)} /></div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default ForNode