"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateTaskAction } from "@/action/taskAction";

export default function UpdateTask({ task = {}, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    taskTitle: task.taskTitle || "",
    taskDetails: task.taskDetails || "",
    tag: task.tag || "",
    endDate: task.endDate
      ? new Date(task.endDate).toISOString().split("T")[0]
      : "",
    taskId: task.taskId || "",
    workspaceId: task.workspaceId || "",
  });
  const [error, setError] = useState(null);

  // Sync taskData with task prop when it changes
  useEffect(() => {
    setTaskData({
      taskTitle: task.taskTitle || "",
      taskDetails: task.taskDetails || "",
      tag: task.tag || "",
      endDate: task.endDate
        ? new Date(task.endDate).toISOString().split("T")[0]
        : "",
      taskId: task.taskId || "",
      workspaceId: task.workspaceId || "",
    });
  }, [task]);

  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (value) => {
    setTaskData({ ...taskData, tag: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.taskTitle.trim()) {
      setError("Task title is required");
      return;
    }

    const isoEndDate = taskData.endDate
      ? new Date(taskData.endDate).toISOString()
      : "";
    const taskPayload = {
      taskTitle: taskData.taskTitle,
      taskDetails: taskData.taskDetails,
      tag: taskData.tag || "DESIGN",
      endDate: isoEndDate,
      taskId: taskData.taskId,
      workspaceId: taskData.workspaceId,
    };
    console.log("Task Payload:", taskPayload);

    try {
      const updatedTask = await updateTaskAction(taskPayload);
      console.log("Task updated:", updatedTask);
      // Reset only editable fields, preserve taskId and workspaceId
      setTaskData({
        ...taskData,
        taskTitle: "",
        taskDetails: "",
        tag: "",
        endDate: "",
      });
      setIsOpen(false);
      setError(null);
      onClose();
    } catch (err) {
      setError("Failed to update task: " + err.message);
      console.error("Error:", err);
    }
  };

  const allowedTags = [
    "DESIGN",
    "HOMEWORK",
    "ASSIGNMENT",
    "DEPLOYMENT",
    "GIT",
    "DATABASE",
    "MINI_PROJECT",
    "DOCUMENTATION",
    "FEATURE",
  ];

  return (
    <>
      <button
        className="w-full flex items-center gap-2 justify-start transition-all"
        onClick={() => setIsOpen(true)}
      >
        <Edit />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg w-96"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Update Task
              </h2>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  onClose();
                }}
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <Input
                type="text"
                name="taskTitle"
                placeholder="Please type your task title"
                value={taskData.taskTitle}
                onChange={handleInputChange}
              />
              <Select
                value={taskData.tag || ""}
                onValueChange={handleTagChange}
              >
                <SelectTrigger className="w-full border rounded px-2 py-1">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent className={"bg-white border-none"}>
                  {allowedTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                name="endDate"
                value={taskData.endDate}
                onChange={handleInputChange}
              />
              <textarea
                name="taskDetails"
                className="w-full border rounded px-0.5"
                placeholder="Provide some details about your task (optional)"
                value={taskData.taskDetails}
                onChange={handleInputChange}
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                  onClick={() => {
                    setIsOpen(false);
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Update
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
