import React, { useEffect, useState } from "react";

import { BsCircleFill } from "react-icons/bs";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCalendar,
} from "react-icons/ai";

function Task(task) {
  return (
    <div className="flex flex-col justify-between p-4 text-black bg-white rounded-md shadow-lg md:flex-row md:items-center">
      <div className="space-y-2 md:space-x-2 md:space-y-0">
        {/* render buttons */}
        <div className="flex items-center space-x-2">
          <AiOutlineCalendar className="text-gray-600" />
          <p className="text-gray-600">{task.task}</p>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <BsCircleFill />
        <p>{task.status}</p>
      </div>
      <div className="flex items-center justify-center space-x-2 md:justify-end">
        {/* Render buttons */}
        <AiOutlineEdit className="text-2xl text-purple-400" />
        <AiOutlineDelete className="text-2xl text-red-500" />
      </div>
    </div>
  );
}

export default Task;
