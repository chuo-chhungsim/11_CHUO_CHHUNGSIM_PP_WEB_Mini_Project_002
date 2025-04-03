"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createWorkspaceAction } from "@/action/workspaceAction";
export default function ModalAddWorkspace() {
  const [isOpen, setIsOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;

    setLoading(true);
    try {
      const workspace = await createWorkspaceAction({ workspaceName });

      if (!workspace) {
        throw new Error("Failed to create workspace");
      }

      setWorkspaceName(""); // Clear input after success
      setIsOpen(false); // Close modal
      console.log("Workspace created successfully!");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        className="bg-black text-white py-2 px-3 w-7 h-7"
        onClick={() => setIsOpen(true)}
      >
        <Plus />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg w-96"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Create New Workspace
            </h2>
            <form className="mt-4" onSubmit={handleSubmit}>
              <Input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
                placeholder="Workspace Name"
                disabled={loading}
              />
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-700"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
