import { Handle, Position } from 'reactflow';


export default function MoveAndTurnNode({ data } : {data : {times : number, label: string}}) {

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='w-auto h-auto border-8 border-black border-solid'>
        <label htmlFor="text" className='text-4'>{data.label}</label>
        <div className='node-info'>
          <span>For </span>
          <input type="number" className='num-input' onChange={(e) => data.times = Number(e.target.value)} />
          <span> times</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}