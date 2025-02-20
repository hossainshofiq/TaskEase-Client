import React from 'react';

const TaskCard = ({toDo}) => {
    console.log(toDo);
    return (
        <div>
            <h1>{toDo.taskTitle}</h1>
        </div>
    );
};

export default TaskCard;