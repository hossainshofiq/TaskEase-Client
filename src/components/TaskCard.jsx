import moment from 'moment';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';

const TaskCard = ({ task, idx, handleEditInfo, handleDeleteTask }) => {
    // console.log(task);


    return (
        <>
            <div className='card-body rounded-md bg-base-100'>
                <div className="text-3xl font-thin opacity-30 tabular-nums">{String(idx + 1).padStart(2, 0)}</div>
                <div>
                    <div className='text-lg'>{task?.taskTitle}</div>
                </div>
                <div className="text-xs inline-flex items-center gap-1 uppercase font-semibold opacity-60"> <MdAccessTime></MdAccessTime> {moment(task?.date).format("DD-MM-YYYY hh:mm A")}</div>
                <p className="text-xs">
                    {task?.taskDescription}
                </p>
                <div className='flex items-center gap-3 mt-2'>
                    <button onClick={() => handleEditInfo(task._id)} className='btn btn-sm'><FaEdit className='text-green-600'></FaEdit></button>
                    <button onClick={() => handleDeleteTask(task._id)} className='btn btn-sm'><FaTrash className='text-red-600'></FaTrash></button>
                </div>
            </div>
        </>
    );
};

export default TaskCard;