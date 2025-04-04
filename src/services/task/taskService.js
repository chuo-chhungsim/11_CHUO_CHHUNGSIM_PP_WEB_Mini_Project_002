import headerToken from "@/lib/headerToken";

export const getTaskbyWorkspaceById = async (workspaceId) => {
  const headers = await headerToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/tasks/workspace/${workspaceId}`,
    {
      headers,
      next: { tags: ["workspace"] },
    }
  );
  const data = await response.json();
  // console.log("data :", data.payload);
  return data.payload;
};
export const createTaskService = async (request) => {
  console.log("workspace Id : ", request.workspaceId);
  const headers = await headerToken();
  console.log("Headers:", headers);
  console.log("Request:", request);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/workspace/${request.workspaceId}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        taskTitle: request.taskTitle,
        taskDetails: request.taskDetails,
        tag: request.tag,
        endDate: request.endDate,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.log("Error Response:", response.status, errorText);
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Response Data:", data);
  return data.payload;
};

export const updateTask = async (taskId, workspaceId, taskData) => {
  const headers = await headerToken();
  console.log("Update Headers:", headers);
  console.log("Update Body:", taskData);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(taskData),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.log("Error Response:", response.status, errorText);
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Update Response Data:", data);
  return data.payload;
};

export const deleteTaskService = async (taskId, workspaceId) => {
  console.log("taskId:", taskId);
  console.log("workspaceId:", workspaceId);
  const headers = await headerToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}`,
    {
      method: "DELETE",
      headers,
    }
  );
  if (!response.ok) {
    console.log("Error Response:", response.status, response.statusText);
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }
  console.log("Delete successful");
  return true;
};
