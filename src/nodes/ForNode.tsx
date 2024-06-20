import { useContext } from 'react';
import { Handle, Position } from 'reactflow';
import FlowContext from '../context/FlowContext';
// import close from '../assets/close.svg';
import loop from '../assets/loop.svg';

function ForNode({ id, data }: {
  id: string,
  data: {
    label: string,
    level: number,
    times?: number
  },
  selected: boolean
}) {

  const ctx = useContext(FlowContext);

  const numOfChild = ctx.nodes.reduce((count, node) => node.parentNode == id ? count + 1 : count, 0);

  return (
    <div className={" relative"} style={{ height: `${(numOfChild * 10) + 6}rem`, width: 'auto' }}>
      <div className='flex'>
        <div className='node-icon flex-center'><img src={loop} /></div>
        <div className='flex-grow'>
          <div className='node-info'>
            <span>For </span>
            <input type="number" className='num-input' onChange={(e) => data.times = Number(e.target.value)} />
            <span> times</span>
          </div>
          <div className="for-btn-container">
            <button onClick={() => ctx.addNode('move', id)}>+ Move</button>
            <button onClick={() => ctx.addNode('turn', id)}>+ Turn</button>
          </div>
        </div>
        {/* <div className="close-btn-container"><img className="close-btn" src={close} onClick={() => ctx.removeNode(id)} /></div> */}
      </div>
      <Handle type="target" position={Position.Top} id="a" />
      <Handle type="source" position={Position.Top} id="a" />
      <Handle type="target" position={Position.Bottom} id="b" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  )
}

export default ForNode