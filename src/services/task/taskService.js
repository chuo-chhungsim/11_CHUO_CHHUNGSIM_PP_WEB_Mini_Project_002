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
  const headers = await headerToken();
  console.log("Headers:", headers);
  console.log("Request:", request);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${request.workspaceId}`,
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
