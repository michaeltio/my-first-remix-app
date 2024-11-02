import type { MetaFunction } from "@remix-run/node";
import TaskContainer from "~/components/TaskContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "TaskTrail" },
    { name: "Built with Remix", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center w-full h-full flex-col gap-10">
        <h1 className="text-center">TaskTrail</h1>
        <div className="gap-10 flex w-full justify-center">
          <TaskContainer>asda</TaskContainer>
          <TaskContainer>asda</TaskContainer>
        </div>
      </div>
    </div>
  );
}
