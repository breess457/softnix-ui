import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
interface TypeAlert{
    text:string,
    setClose:React.Dispatch<React.SetStateAction<boolean>>
  }
  
  const Alert:React.FC<TypeAlert> = ({text, setClose})=>{
    return (
        <div className="flex items-center px-4 py-3 mb-4 text-red-800 rounded-lg bg-red-50">
            <div className="sr-only">Info</div>
            <div className="ms-3 text-sm font-medium">
                {text}
            </div>
            <button 
                type="button" 
                className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
                onClick={()=>setClose(false)}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
  }

  export default Alert;