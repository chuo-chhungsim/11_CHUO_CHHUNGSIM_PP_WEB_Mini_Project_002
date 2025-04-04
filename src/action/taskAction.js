"use server";
import UpdateTask from "@/components/UpdateTask";
import {
  createTaskService,
  deleteTaskService,
  updateTask,
  updateTaskStatusService,
} from "@/services/task/taskService";
import { revalidateTag } from "next/cache";

export const createTaskAction = async (request) => {
  const createTask = await createTaskService(request);
  revalidateTag("workspace");
  return createTask;
};
export const updateTaskAction = async (taskData) => {
  console.log("taskdata", taskData);
  // const { ...rest } = taskData;
  const updatedTask = await updateTask(
    taskData.taskId,
    taskData.workspaceId,
    taskData
  );
  revalidateTag("workspace");
  return updatedTask;
};
export const deleteTaskAction = async ({ taskId, workspaceId }) => {
  console.log("taskId", taskId + "workspaceId", workspaceId);
  await deleteTaskService(taskId, workspaceId);
  revalidateTag("workspace");
  return { success: true };
};

export const updateTaskStatusAction = async ({
  taskId,
  workspaceId,
  status,
}) => {
  console.log("taskId", taskId + "workspaceId", workspaceId + "status", status);
  const updateTaskStatus = await updateTaskStatusService(
    taskId,
    workspaceId,
    status
  );
  revalidateTag("workspace");
  return updateTaskStatus;
};
