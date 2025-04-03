"use client";
import { updateWorkspaceFavoriteAction } from "@/action/workspaceAction";
import { Star } from "lucide-react";

export default function StarComponent({ workspaceId, isFavorite }) {
  console.log(
    "Sending request with workspaceId:",
    workspaceId,
    "isFavorite:",
    isFavorite
  );
  console.log("Base URL:", process.env.NEXT_PUBLIC_AUTH_BASE_URL);
  const handleClick = async (id) => {
    const newFavoriteStatus = !isFavorite;
    await updateWorkspaceFavoriteAction(id, newFavoriteStatus);
  };
  return (
    <div>
      <Star
        size={24}
        fill={isFavorite ? "gold" : "white"}
        stroke={isFavorite ? "gold" : "black"}
        onClick={() => handleClick(workspaceId)}
      />
    </div>
  );
}
