import { ReactNode } from "react";

interface TaskContainerProps {
  children: ReactNode;
}

function TaskContainer({ children }: TaskContainerProps) {
  return <div className="bg-white rounded-xl w-1/3 h-64">{children}</div>;
}

export default TaskContainer;
