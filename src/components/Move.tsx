import React from 'react';
import { FaUserAstronaut } from "react-icons/fa";

type MoveProps = {
    top: number;
    left: number;
};

const Move:React.FC<MoveProps> = ({top, left}) => {
    
    return (
        (
            <div className="relative w-96 h-96 border-solid border-black border-2 m-auto">         
              <div
                style={{ top: `${top}px`, left: `${left}px` }}
                className="move-div absolute  h-10 w-10"   
              >
                <FaUserAstronaut style={{color:'blue'}} className='h-full w-full'/>
              </div>
            </div>
          )
      );
}
export default Move;