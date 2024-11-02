import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import axios from "axios";

//acernity
import { AuroraBackground } from "~/components/ui/aurora-background";

//components
import TaskContainer from "~/components/TaskContainer";
import Task from "~/components/Task";

export const meta: MetaFunction = () => {
  return [
    { title: "TaskTrail" },
    { name: "Built with Remix", content: "Welcome to Remix!" },
  ];
};

//task props
interface Task {
  id: number;
  item: string;
  isComplete: boolean;
}

export default function Index() {
  //task container
  const [tasks, setTasks] = useState<Task[]>([]);

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

  //handle delete button
  const handleDelete = async (id: number) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);

      await axios.delete(`http://localhost:8080/todos/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    //get all data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/todos");
        // console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuroraBackground>
      <div className="w-screen h-screen z-10">
        <div className="flex items-center justify-center w-full h-full flex-col gap-10">
          <h1 className="text text-center text-white text-3xl">TaskTrail</h1>
          <button className="bg-red-500 text-xl rounded-xl p-2">
            add new task
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
      </div>
    </AuroraBackground>
  );
}
