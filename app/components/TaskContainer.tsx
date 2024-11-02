import { ReactNode } from "react";

interface TaskContainerProps {
  children: ReactNode;
}

function TaskContainer({ children }: TaskContainerProps) {
  return (
    <div className="backdrop-blur-sm bg-white/30 rounded-2xl w-1/3 h-96 p-3 flex flex-col gap-1 overflow-auto">
      {children}
    </div>
  );
}

export default TaskContainer;
