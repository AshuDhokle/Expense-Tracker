import React from 'react'

export const DeleteRecord = (props) => {
    console.log(props.id); 
    return (
      props.trig ? (
        <div className="fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-4">
            <h1 className="text-xl font-bold mb-4">Confirm!</h1>
            <p className="text-gray-700 mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end">
              <button onClick={() => props.deleteHandler(props.id)} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Yes</button>
              <button onClick={() => props.resetTrig()} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">No</button>
            </div>
          </div>
        </div>
      ) : null
    );
  }
  