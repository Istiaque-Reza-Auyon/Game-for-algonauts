import { Handle, Position } from 'reactflow';


export default function StartNode({ data } : {data : { label: string}}) {

  return (
    <>
      <div className='flex justify-center items-center bg-black w-[5rem] h-[5rem] border-2 border-yellow-500 border-solid'>
        <label htmlFor="text" className='text-4 text-yellow-500 text-2xl'>{data.label}</label>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}