import { useState, useEffect } from "react";
import { MetaFunction } from "@remix-run/node";
import axios from "axios";

//acernity
import { AuroraBackground } from "~/components/ui/aurora-background";

//component
import TaskContainer from "~/components/TaskContainer";
import Task from "~/components/Task";

export const meta: MetaFunction = () => {
  return [
    { title: "TaskTrail" },
    { name: "Built with Remix", content: "Welcome to TaskTrail" },
  ];
};

//props task dari api
interface TaskProps {
  id: number;
  item: string;
  isComplete: boolean;
}

export default function Index() {
  const [tasks, setTasks] = useState<TaskProps[]>([]); //state model task
  const [isPopupVisible, setIsPopupVisible] = useState(false); // untuk pop up add task
  const [newTask, setNewTask] = useState({ item: "", isComplete: false }); //state untuk dikirim ke post task

  //handle pop up form task
  const handlePopUp = () => {
    // console.log(isPopupVisible);
    setIsPopupVisible(!isPopupVisible);
  };

  //handle edit checkbox
  const handleCheckbox = async (id: number) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      );
      setTasks(updatedTasks);

      await axios.patch(`http://localhost:8080/todos/${id}`, {
        isComplete: updatedTasks.find((task) => task.id === id)?.isComplete,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  //handle delete task
  const handleDelete = async (id: number) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);

      await axios.delete(`http://localhost:8080/todos/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  //handle add task
  const handleAddTask = async () => {
    try {
      const response = await axios.post("http://localhost:8080/todos", newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ item: "", isComplete: false });
      setIsPopupVisible(false);

      try {
        const response = await axios.get("http://localhost:8080/todos");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/todos");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuroraBackground>
      <div className="flex items-center justify-center w-full h-full flex-col gap-10">
        <h1 className="text text-center text-white text-3xl">TaskTrail</h1>
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-lg rounded-xl py-3 px-5 text-white font-semibold shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:from-purple-500 hover:to-blue-500"
          onClick={handlePopUp}
        >
          Add New Task
        </button>
        <div className="gap-10 flex w-full justify-center items-center">
          <TaskContainer>
            <h1 className="text-white text-center">Todo</h1>
            {tasks
              .filter((task) => !task.isComplete)
              .map((task) => (
                <Task
                  key={task.id}
                  item={task.item}
                  isComplete={task.isComplete}
                  handleCheckbox={() => handleCheckbox(task.id)}
                  handleDelete={() => handleDelete(task.id)}
                />
              ))}
          </TaskContainer>
          <TaskContainer>
            <h1 className="text-center text-white">Done</h1>
            {tasks
              .filter((task) => task.isComplete)
              .map((task) => (
                <Task
                  key={task.id}
                  item={task.item}
                  isComplete={task.isComplete}
                  handleCheckbox={() => handleCheckbox(task.id)}
                  handleDelete={() => handleDelete(task.id)}
                />
              ))}
          </TaskContainer>
        </div>
      </div>
      {isPopupVisible && (
        <div className="absolute w-screen h-screen bg-black/30 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4 text-center">Add New Task</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTask();
              }}
            >
              <input
                type="text"
                className="border p-2 w-full mb-4"
                value={newTask.item}
                onChange={(e) =>
                  setNewTask({ ...newTask, item: e.target.value })
                }
                placeholder="Enter task"
              />
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded w-full"
                  onClick={handlePopUp}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AuroraBackground>
  );
}
