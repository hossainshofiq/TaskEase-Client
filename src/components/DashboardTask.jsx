import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";
import TaskCard from "./TaskCard";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import { MdAddTask } from "react-icons/md";
import moment from "moment";
import Swal from "sweetalert2";
import { FaTasks } from "react-icons/fa";

const DashboardTask = () => {

    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [modalFormData, setModalFormData] = useState({});

    const { data: initialTasks = [], refetch, isPending } = useQuery({
        queryKey: ["taskList", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks?email=${user?.email}`);
            return res.data;
        },
    });
    // console.log(initialTasks);

    // Function to group tasks into columns
    const groupTasksByCategory = (tasks) => ({
        toDo: tasks.filter((task) => task.taskCategory === "toDo"),
        inProgress: tasks.filter((task) => task.taskCategory === "inProgress"),
        done: tasks.filter((task) => task.taskCategory === "done"),
    });

    // State for grouped tasks
    const [tasks, setTasks] = useState(groupTasksByCategory(initialTasks));

    // Update tasks when data is fetched
    useEffect(() => {
        setTasks(groupTasksByCategory(initialTasks));
    }, [initialTasks]);

    // console.log(tasks)

    const updateTaskCategory = (updateInfo) => {
        // console.log("mutation hitted");
        // console.log(updateInfo);

        axiosSecure.patch("/tasks", updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                }
            })

    }

    // Handle drag-and-drop
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceColumn = source.droppableId;
        const destColumn = destination.droppableId;

        const sourceTasks = [...tasks[sourceColumn]];
        const destTasks = [...tasks[destColumn]];
        const [movedTask] = sourceTasks.splice(source.index, 1);

        movedTask.category = destColumn; // Update category locally

        if (sourceColumn === destColumn) {
            sourceTasks.splice(destination.index, 0, movedTask);
            setTasks({ ...tasks, [sourceColumn]: sourceTasks });
        } else {
            destTasks.splice(destination.index, 0, movedTask);
            setTasks({ ...tasks, [sourceColumn]: sourceTasks, [destColumn]: destTasks });

            // Send update request to backend
            updateTaskCategory({ taskId: movedTask._id, newCategory: destColumn });
        }
    };


    const handleAddTask = (e) => {
        e.preventDefault();

        const taskTitle = e.target.title.value;
        const taskDescription = e.target.description.value;
        const addedBy = user?.email;
        const date = moment().toISOString();
        const taskCategory = "toDo"
        const addedTask = { taskTitle, taskDescription, addedBy, date, taskCategory };
        // console.log(addedTask);

        axiosSecure.post("/tasks", addedTask)
            .then(res => {
                if (res?.data?.insertedId) {
                    e.target.reset();
                    document.getElementById('my_modal_5').close();
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your new task added successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => console.log(error));
    }

    const handleDeleteTask = (id) => {
        // console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/task/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }


    const handleEditInfo = (id) => {

        document.getElementById('my_modal_4').showModal();
        axiosSecure.get(`/aTask?id=${id}`)
            .then(res => {
                setModalFormData(res.data);
            })
            .catch(error => console.log(error))

    }

    const handleUpdateTask = (event, id) => {
        event.preventDefault();
        console.log(id);

        const taskId = id;
        const taskTitle = event.target.title.value;
        const taskDescription = event.target.taskDescription.value;
        const taskCategory = event.target.taskCategory.value;

        const updatedTask = {
            taskId,
            taskTitle,
            taskDescription,
            taskCategory,
        };

        console.log(updatedTask)

        document.getElementById('my_modal_4').close();

        // Sending the update request
        axiosSecure.put(`/updateATask`, updatedTask)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Your task has been updated successfully.",
                        icon: "success",
                    });
                    refetch();
                }
            })
            .catch(error => {
                console.error("Error updating task:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update the task. Please try again.",
                    icon: "error",
                });
            });
    }

    return (
        <div className="w-11/12 mx-auto font-semibold mt-16 mb-2 p-4">

            <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 mb-2">
                <MdAddTask className="text-xl"></MdAddTask>
                Add New Task
            </button>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-wrap justify-between flex-col lg:flex-row gap-8 h-auto">
                    {Object.entries(tasks).map(([columnId, columnTasks]) => (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="rounded flex-1 p-6 bg-base-200">
                                    <h2 className="text-lg font-bold capitalize flex items-center justify-between">{columnId}<FaTasks className="text-blue-700"></FaTasks></h2>
                                    <div className="divider"></div>
                                    {columnTasks.map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="p-2 my-2 bg-white rounded shadow"
                                                >
                                                    <TaskCard idx={index} key={task?._id} handleEditInfo={handleEditInfo} handleDeleteTask={handleDeleteTask} refetch={refetch} task={task} ></TaskCard>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            {/* add task modal */}
            <div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="card-body rounded-md min-w-md bg-base-100">
                        <div>
                            <form onSubmit={handleAddTask} className='fieldset'>
                                <div className='space-y-4'>
                                    <label className="fieldset-label">Title</label>
                                    <input required name='title' maxLength={50} type="text" className="w-full input input-bordered" placeholder="Enter Task Name" />
                                </div>
                                <div className='space-y-4'>
                                    <label className="fieldset-label">Description</label>
                                    <textarea maxLength={200} required name='description' type="textarea" className="w-full textarea input-bordered" placeholder="Enter Task Description" />
                                    <button className="w-full btn bg-blue-600 text-white hover:bg-blue-700 shadow-none mt-4">Add Task</button>
                                </div>
                            </form>
                        </div>
                        <div className="">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn w-full bg-red-600 text-white hover:bg-red-700">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

            {/* update task modal */}
            <div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}

                <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
                    <div className="card-body rounded-md min-w-md bg-base-100">
                        <div>
                            <form onSubmit={(event) => handleUpdateTask(event, modalFormData?._id)} className='fieldset space-y-4'>
                                <div className=''>
                                    <label className="fieldset-label">Title</label>
                                    <input required defaultValue={modalFormData?.taskTitle} name='title' maxLength={50} type="text" className="w-full input input-bordered" placeholder="Enter Task Name" />
                                </div>
                                <div className=''>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Category</span>
                                        </div>
                                        <select name="taskCategory" className="select w-full input-bordered" defaultValue={modalFormData?.taskCategory} key={modalFormData?.taskCategory}>
                                            <option value="toDo">To-Do</option>
                                            <option value="inProgress">In Progress</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </label>
                                </div>
                                <div className=''>
                                    <label className="fieldset-label">Description</label>
                                    <textarea defaultValue={modalFormData?.taskDescription} maxLength={200} required name='taskDescription' type="textarea" className="w-full textarea input-bordered" placeholder="Enter Task Description" />
                                    <button className="w-full btn bg-blue-600 text-white hover:bg-blue-700 shadow-none mt-4">Update Task</button>
                                </div>
                            </form>
                        </div>
                        <div className="">
                            <form method="dialog">
                                <button onClick={() => document.getElementById('my_modal_4').close()} className="btn w-full bg-red-600 text-white hover:bg-red-700">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default DashboardTask;
