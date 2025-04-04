"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Trash, X } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTaskAction } from "@/action/taskAction";

export default function DeleteTask({ task = {}, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const taskPayload = {
      taskId: task.taskId || "",
      workspaceId: task.workspaceId || "",
    };
    console.log("Delete Payload:", taskPayload);

    try {
      await deleteTaskAction(taskPayload);
      console.log("Task deleted successfully");
      setIsOpen(false);
      setError(null);
      onClose(); // Notify CardComponent to refresh or update state
    } catch (err) {
      setError("Failed to delete task: " + err.message);
      console.error("Error:", err);
    }
  };

  return (
    <>
      <button
        className="flex items-center text-red-700 gap-2 justify-start transition-all"
        onClick={() => setIsOpen(true)}
      >
        <Trash size={20} />
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
                Delete Task
              </h2>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsOpen(false);
                  onClose();
                }}
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </Button>
            </div>

            <p className="mt-4">Are you sure you want to delete this task?</p>
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex justify-end gap-2 mt-6">
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
                type="button"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
