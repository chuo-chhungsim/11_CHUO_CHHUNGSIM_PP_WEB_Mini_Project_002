"use client";
import { motion } from "framer-motion";
import { Clock, Ellipsis } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function CardComponent({
  taskTitle,
  taskDetails,
  tag,
  status,
  startDate,
  endDate,
}) {
  return (
    <motion.div
      className="border border-gray-300 rounded-xl mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold capitalize">{taskTitle}</h2>
          <Ellipsis />
        </div>

        {/* task details */}
        <p className="line-clamp-2 text-light-steel-blue my-2 h-12">
          {taskDetails ? taskDetails : "No description available"}
        </p>

        <div className="flex justify-between items-center mt-4">
          {/* tag */}
          <p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-2xl">
            {tag}
          </p>

          {/* status */}
          <div
            className={`rounded-full w-8 h-8 ${
              status === "IN_PROGRESS"
                ? "bg-blue-500"
                : status === "NOT_STARTED"
                ? "bg-red-700 "
                : "bg-green-700"
            }`}
          ></div>
        </div>
      </div>

      {/* progress */}
      <div className="flex justify-between items-center border-t border-t-gray-300 p-5">
        <Select>
          <SelectTrigger
            className={`w-36 rounded-2xl ${
              status === "NOT_STARTED"
                ? " border-red-700 text-red-700"
                : status === "IN_PROGRESS"
                ? " border-blue-500 text-blue-500"
                : "border-green-700 text-green-700"
            }  `}
          >
            <SelectValue placeholder={status} />
          </SelectTrigger>
          <SelectContent className={"bg-white border-none"}>
            <SelectItem value="NOT_STARTED">NOT_STARTED</SelectItem>
            <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
            <SelectItem value="FINISHED">FINISHED</SelectItem>
          </SelectContent>
        </Select>

        {/* date */}
        <p className="flex gap-3 text-light-steel-blue">
          <Clock size={22} /> {new Date(startDate).toDateString()}
        </p>
      </div>
    </motion.div>
  );
}
