import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getTaskbyWorkspaceById } from "@/services/task/taskService";
import ProfileComponent from "./../../../../components/profileComponent";
import { getWorkSpaceById } from "@/services/workspace/workspaceService";
import CardComponent from "@/components/card";
import StarComponent from "@/components/starComponent";
import AddNewTask from "@/components/AddNewTask";

const page = async ({ params }) => {
  const { id } = await params;
  const task = await getTaskbyWorkspaceById(id);
  const workspace = await getWorkSpaceById(id);
  // console.log("task list", task);
  // console.log("workspace", workspace);

  return (
    <div>
      <div className="flex flex-row items-center justify-between border-b border-gray-300">
        <Breadcrumb>
          <BreadcrumbList className={"text-lg"}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/workspace/${id}`}>
                {workspace.workspaceName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProfileComponent />
      </div>
      <div className="px-10 py-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-3xl font-semibold">{workspace.workspaceName}</h2>
          <StarComponent
            workspaceId={workspace.workspaceId}
            isFavorite={workspace.isFavorite}
          />
        </div>
        <div className="grid grid-cols-3 gap-10 pt-6">
          <div>
            <h3 className="text-red-700 border-b text-xl">Not Started</h3>
            {task
              .filter((item) => item.status === "NOT_STARTED")
              .map((item) => (
                <CardComponent
                  key={item.taskId}
                  workspaceId={workspace.workspaceId}
                  taskId={item.taskId}
                  taskTitle={item.taskTitle}
                  taskDetails={item.taskDetails}
                  tag={item.tag}
                  status={item.status}
                  startDate={item.startDate}
                  endDate={item.endDate}
                />
              ))}
          </div>
          <div>
            <h3 className="text-blue-700 border-b text-xl">In Progress</h3>
            {task
              .filter((item) => item.status === "IN_PROGRESS")
              .map((item) => (
                <CardComponent
                  key={item.taskId}
                  workspaceId={workspace.workspaceId}
                  taskId={item.taskId}
                  taskTitle={item.taskTitle}
                  taskDetails={item.taskDetails}
                  tag={item.tag}
                  status={item.status}
                  startDate={item.startDate}
                  endDate={item.endDate}
                />
              ))}
          </div>
          <div>
            <h3 className="text-green-700 border-b text-xl">Finished</h3>
            {task
              .filter((item) => item.status === "FINISHED")
              .map((item) => (
                <CardComponent
                  key={item.taskId}
                  workspaceId={workspace.workspaceId}
                  taskId={item.taskId}
                  taskTitle={item.taskTitle}
                  taskDetails={item.taskDetails}
                  tag={item.tag}
                  status={item.status}
                  startDate={item.startDate}
                  endDate={item.endDate}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-5 right-6">
        <AddNewTask workspace={workspace} />
      </div>
    </div>
  );
};

export default page;
