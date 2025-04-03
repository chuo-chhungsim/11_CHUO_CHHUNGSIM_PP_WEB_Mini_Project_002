"use server";
import { createTaskService } from "@/services/task/taskService";
import { revalidateTag } from "next/cache";

export const createTaskAction = async (request) => {
  const createTask = await createTaskService(request); 
  revalidateTag("workspace");
  return createTask;
};
