"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Edit } from "lucide-react";
import { updateWorkspaceAction } from "@/action/workspaceAction";

export default function ModalUpdateWorkspace({ workspace }) {
  const [isOpen, setIsOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(
    workspace.workspaceName || ""
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;

    setLoading(true);

    try {
      const updatedWorkspace = await updateWorkspaceAction(
        workspace, // Pass the workspace object
        { workspaceName: workspaceName } // Pass the updated name from state
      );

      if (!updatedWorkspace) {
        throw new Error("Failed to update workspace");
      }

      setIsOpen(false);
      console.log("Workspace updated successfully!");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="w-full flex items-center justify-evenly py-2 hover:bg-gray-100 rounded"
        onClick={() => setIsOpen(true)}
      >
        <Edit />
        Rename
      </button>

      {isOpen && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-black/30">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl w-96"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Update Workspace
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
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}
