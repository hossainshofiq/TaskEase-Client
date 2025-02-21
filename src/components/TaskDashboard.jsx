import React, { useContext } from 'react';
import { MdAddTask } from 'react-icons/md';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import TaskCard from './TaskCard';
import moment from 'moment';
import { FaFilter } from 'react-icons/fa';

const TaskDashboard = () => {

    const { user, loading } = useContext(AuthContext);
    console.log(user);
    const axiosSecure = useAxiosSecure();

    const { data: toDoTasksList = [], refetch: toDoRefetch, isPending: toDoIsPending } = useQuery({
        queryKey: ["toDoTaskLists", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks?email=${user?.email}&category=toDo`);
            console.log(res.data);
            return res.data;
        }
    })

    const { data: inProgressTasksList = [], refetch: inProgressRefetch, isPending: inProgressIsPending } = useQuery({
        queryKey: ["inProgressTasksList", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks?email=${user?.email}&category=inProgress`);
            return res.data;
        }
    })
    const { data: doneTasksList = [], refetch: doneRefetch, isPending: doneIsPending } = useQuery({
        queryKey: ["doneTasksList", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks?email=${user?.email}&category=done`);
            return res.data;
        }
    })


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
                    toDoRefetch();
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

    return (
        <div>
            <div className='w-11/12 mx-auto'>
                <div className='flex flex-wrap justify-between flex-col md:flex-row gap-5 my-10'>
                    {/* to-do task */}
                    <div className='flex-1 border p-4 rounded-md bg-base-200'>
                        <h3 className='font-bold flex items-center justify-between'>To-Do <FaFilter></FaFilter></h3>
                        <div className='divider'></div>
                        <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn w-full flex gap-2 bg-blue-600 text-white hover:bg-blue-700">
                            <MdAddTask></MdAddTask>
                            Add New Task
                        </button>

                        <div className='lg:flex flex-col gap-5 mt-5'>
                            {
                                toDoTasksList.map((toDo, idx) => <TaskCard idx={idx} key={toDo._id} toDo={toDo}></TaskCard>)
                            }
                        </div>
                    </div>

                    {/* running task */}
                    <div className='flex-1 border p-4 rounded-md bg-base-200'>
                        <h3 className='font-bold flex items-center justify-between'>In Progress <FaFilter></FaFilter></h3>
                        <div className='divider'></div>
                    </div>

                    {/* done task */}
                    <div className='flex-1 border p-4 rounded-md bg-base-200'>
                        <h3 className='font-bold flex items-center justify-between'>Done <FaFilter></FaFilter></h3>
                        <div className='divider'></div>
                    </div>
                </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}></button>
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
    );
};

export default TaskDashboard;