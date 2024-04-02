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
      <div className={`bg-white p-4 rounded shadow-lg ${messageType === 'error' ? 'text-red-600' : (messageType === 'success' ? 'text-green-600' : 'text-black')}`}>
        <p>{message}</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleClose}>OK</button>
      </div>
    </div>
  );
};

export default Message;
