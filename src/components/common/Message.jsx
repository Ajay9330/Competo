import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessage, selectMessageType, clearMessage } from './../../store';

const Message = () => {
  const message = useSelector(selectMessage);
  const messageType = useSelector(selectMessageType);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearMessage());
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className={`w-[500px] bg-opacity-50 backdrop-blur-3xl h-52 p-4 rounded shadow-lg flex justify-around items-center flex-col text-black ${messageType === 'error' ? 'bg-red-500 text-white' : (messageType === 'success' ? 'bg-green-600 text-white' : (messageType === '' ? 'bg-white' : 'bg-white'))}`}>

        <p className='text-2xl p-3  capitalize w-full text-center font-bold'>{message}</p>
        <button className="mt-2  px-4 py-[2px] bg-blue-500 text-white w-fit rounded hover:bg-blue-600" onClick={handleClose}>OK</button>
      </div>
    </div>
  );
};

export default Message;
