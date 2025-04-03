"use server";
import { createTaskService } from "@/services/task/taskService";
import { revalidateTag } from "next/cache";

export const createTaskAction = async (request) => {
  const createTask = await createTaskService(request);
  revalidateTag("workspace");
  return createTask;
};
export const updateTaskAction = async (taskData) => {
  const { taskId, workspaceId, ...rest } = taskData;
  const updatedTask = await updateTask(taskId, workspaceId, rest);
  revalidateTag("workspace"); // Refresh workspace data
  return updatedTask;
};
