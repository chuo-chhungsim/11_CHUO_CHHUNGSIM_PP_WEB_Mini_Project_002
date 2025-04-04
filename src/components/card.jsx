"use client";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";
import { updateTaskStatusAction } from "@/action/taskAction";

export default function CardComponent({
  taskId,
  workspaceId,
  taskTitle,
  taskDetails,
  tag,
  status,
  endDate,
}) {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [error, setError] = useState(null);

  const task = {
    taskId,
    workspaceId,
    taskTitle,
    taskDetails,
    tag,
    endDate,
  };

  const handleStatusChange = async (newStatus) => {
    console.log(
      "Attempting to change status from",
      currentStatus,
      "to",
      newStatus
    );
    try {
      const updateTaskStatus = await updateTaskStatusAction({
        taskId,
        workspaceId,
        status: newStatus,
      });
      console.log("Status changed successfully:", updateTaskStatus);
      setCurrentStatus(newStatus);
      setError(null);
    } catch (error) {
      console.error("Error updating task status:", error.message);
      setError(
        `Failed to update status from ${currentStatus} to ${newStatus}: ${error.message}`
      );
    }
  };

  return (
    <>
      <motion.div
        className="border border-gray-300 rounded-xl mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold capitalize">{taskTitle}</h2>
            <div className="flex gap-2">
              <UpdateTask
                task={task}
                onClose={() => setIsUpdateOpen(false)}
                key={taskId}
              />
              <DeleteTask task={task} onClose={() => setIsDeleteOpen(false)} />
            </div>
          </div>

          <p className="line-clamp-2 text-light-steel-blue my-2 h-12">
            {taskDetails ? taskDetails : "No description available"}
          </p>

          <div className="flex justify-between items-center mt-4">
            <p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-2xl">
              {tag}
            </p>
            <div
              className={`rounded-full w-8 h-8 ${
                currentStatus === "IN_PROGRESS"
                  ? "bg-blue-500"
                  : currentStatus === "NOT_STARTED"
                  ? "bg-red-700"
                  : "bg-green-700"
              }`}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-t-gray-300 p-5">
          <Select value={currentStatus} onValueChange={handleStatusChange}>
            <SelectTrigger
              className={`w-36 rounded-2xl ${
                currentStatus === "NOT_STARTED"
                  ? "border-red-700 text-red-700"
                  : currentStatus === "IN_PROGRESS"
                  ? "border-blue-500 text-blue-500"
                  : "border-green-700 text-green-700"
              }`}
            >
              <SelectValue placeholder={currentStatus} />
            </SelectTrigger>
            <SelectContent className="bg-white border-none">
              <SelectItem value="NOT_STARTED">NOT_STARTED</SelectItem>
              <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
              <SelectItem value="FINISHED">FINISHED</SelectItem>
            </SelectContent>
          </Select>

          <p className="flex gap-3 text-light-steel-blue">
            <Clock size={22} /> {new Date(endDate).toDateString()}
          </p>
        </div>
        {error && <p className="text-red-500 p-5">{error}</p>}
      </motion.div>
    </>
  );
}
