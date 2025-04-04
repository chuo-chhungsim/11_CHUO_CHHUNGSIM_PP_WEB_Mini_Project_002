"use server";
import {
  createWorkSpace,
  updateFavoriteWorkspaceStatus,
  updateWorkSpace,
} from "@/services/workspace/workspaceService";
import { revalidateTag } from "next/cache";

export const createWorkspaceAction = async (request) => {
  const workspace = await createWorkSpace(request);
  revalidateTag("workspace"); // This will now run on the server
  return workspace;
};
export const updateWorkspaceAction = async (workspace, request) => {
  // console.log("rfdafjsfljsa : ", request);
  const { workspaceId } = workspace;
  // console.log("id : ", workspaceId);

  const response = await updateWorkSpace(workspaceId, request);
  // console.log("workspace updated:" + workspace);
  revalidateTag("workspace");
  return response;
};

export const updateWorkspaceFavoriteAction = async (
  workspaceId,
  isFavorite
) => {
  const updateWorkspaceStatus = await updateFavoriteWorkspaceStatus(
    workspaceId,
    isFavorite
  );
  console.log("Base URL:", process.env.NEXT_PUBLIC_AUTH_BASE_URL);
  console.log("workspace updated:", updateWorkspaceStatus);
  revalidateTag("workspace");
  return updateWorkspaceStatus;
};
