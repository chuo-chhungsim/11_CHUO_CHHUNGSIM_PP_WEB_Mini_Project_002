"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusSquare, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createTaskAction } from "@/action/taskAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AddNewTask({ workspace }) {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState({
    taskTitle: "",
    taskDetails: "",
    tag: "",
    endDate: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleTagChange = (value) => {
    setTask({ ...task, tag: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.taskTitle.trim()) {
      setError("Task title is required");
      return;
    }

    // Convert endDate to ISO format
    const isoEndDate = task.endDate ? new Date(task.endDate).toISOString() : "";
    const taskPayload = {
      taskTitle: task.taskTitle,
      taskDetails: task.taskDetails,
      tag: task.tag || "DESIGN", // Default to DESIGN if empty
      endDate: isoEndDate,
    };

    try {
      const newTask = await createTaskAction({
        ...taskPayload,
        workspaceId: workspace.workspaceId,
      });
      console.log("Task created:", newTask);
      setTask({ taskTitle: "", taskDetails: "", tag: "", endDate: "" });
      setIsOpen(false);
      setError(null);
    } catch (err) {
      setError("Failed to create task: " + err.message);
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
        className="w-full flex items-center text-white bg-black justify-center px-4 py-3 rounded-full hover:bg-gray-700 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <PlusSquare /> Create New Task
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
                Create New Task
              </h2>
              <Button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <Input
                type="text"
                name="taskTitle"
                placeholder="Please type your task title"
                value={task.taskTitle}
                onChange={handleInputChange}
              />
              <Select onValueChange={handleTagChange}>
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
                value={task.endDate}
                onChange={handleInputChange}
              />
              <textarea
                name="taskDetails"
                className="w-full border rounded px-0.5"
                placeholder="Provide some details about your task (optional)"
                value={task.taskDetails}
                onChange={handleInputChange}
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Create
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
