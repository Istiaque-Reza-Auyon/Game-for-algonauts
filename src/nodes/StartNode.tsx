import { Handle, Position } from 'reactflow';


export default function StartNode({ data } : {data : { label: string}}) {

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='w-auto h-auto border-8 border-black border-solid'>
        <label htmlFor="text" className='text-4'>{data.label}</label>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}