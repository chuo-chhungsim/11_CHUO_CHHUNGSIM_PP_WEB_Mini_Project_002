import headerToken from "@/lib/headerToken";

export const getAllWorkspaces = async () => {
  const headers = await headerToken();
  // console.log("header:", headers);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspaces`,
    {
      headers,
      next: { tags: ["workspace"] },
    }
  );
  const data = await response.json();
  // console.log("data :", data);
  return data.payload;
};
export const getWorkSpaceById = async (workSpaceId) => {
  const headers = await headerToken();
  // console.log("header:", headers);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${workSpaceId}`,
    {
      headers,
    }
  );
  const data = await response.json();
  // console.log("data :", data);
  return data.payload;
};
export const createWorkSpace = async (request) => {
  try {
    const headers = await headerToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.payload;
  } catch (error) {
    // console.error("Error creating workspace:", error.message);
    return null; // Handle UI feedback
  }
};

export const updateWorkSpace = async (workspaceId, request) => {
  // console.log("request: ", request);

  const headers = await headerToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${workspaceId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(request),
    }
  );
  // console.log("REsposed workspace:", response);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }
  const data = await response.json();
  console.log(" data : ", data);

  return data.payload;
};

export const updateFavoriteWorkspaceStatus = async (
  workspaceId,
  isFavorite
) => {
  const headers = await headerToken();
  // console.log("isFavorite:", isFavorite);
  // console.log("header:", headers);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${workspaceId}/favorite?favorite=${isFavorite}`,
    {
      method: "PATCH",
      headers,
    }
  );
  // console.log("Base URL:", process.env.NEXT_PUBLIC_AUTH_BASE_URL);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data.payload;
};
