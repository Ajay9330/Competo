import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser,selectUserdata } from './../../store';

import CompleteRegStudent from '../completeprofile/CompleteRegStudent';

export default function StudentDash() {
  const user = useSelector(selectUserdata);

  return (
    <>
      {!user?.profileCompleted && <CompleteRegStudent />}
    </>
  );
}
