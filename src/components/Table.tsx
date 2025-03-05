import {Link} from 'react-router-dom';
import React, { useEffect, useState, } from "react";

interface Prop{
  columItem: any;
  dataItem: [];
}
const Table:React.FC<Prop> = ({columItem, dataItem}) => {
 
  return (
    <div className="p-4">
      <table className='w-full border-collapse border border-gray-300'>
        <thead>
          <tr>
            {columItem.map((item: any, index: number) => (
              <th key={index} className='border border-gray-300'>{item}</th>
            ))}
          </tr>
          <tbody>
            {dataItem.map((item: any, index: number) => (
              <tr key={index}>
                {Object.keys(item).map((key: any, index: number) => (
                  <td key={index} className='border border-gray-300'>{item[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </thead>
      </table>
    </div>
  )
}

export default Table;