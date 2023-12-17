import React, { useEffect, useState } from "react";

import { BsCircleFill } from "react-icons/bs";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCalendar,
  AiOutlinePlayCircle,
  AiOutlinePauseCircle,
  AiOutlineLogout,
  AiOutlineReload
} from "react-icons/ai";
import app from "../firebase/config";
import { getFirestore, updateDoc, onSnapshot, doc } from "firebase/firestore";

const db = getFirestore(app)
function Task({ task }) {

  const [localTask, setLocalTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState(localTask.task);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setNewTaskDescription(localTask.task);
  }

  const handlePause = async () => {
    try {
      const elapsed = localTask.startTime
        ? Date.now() - localTask.startTime
        : 0;
      const newTotalTime = (localTask.totalTime || 0) + elapsed;
      await updateDoc(doc(db, "tasks", localTask.id), {
        status: "paused",
        endTime: Date.now(),
        totalTime: newTotalTime,
      });
      const taskDoc = doc(db, "tasks", localTask.id);
      onSnapshot(taskDoc, (docSnap) => {
        if (docSnap.exists()) {
          setLocalTask({
            ...docSnap.data(),
            date: localTask.date,
            id: localTask.id,
          });
        }
      });
    } catch (error) {
      console.log("Error pausing task:", error);
    }
  };

  const handleRenderTaskDescription = () => { }

  async function handleStart() {
    try {
      await updateDoc(doc(db, "tasks", localTask.id), {
        status: "in_progress",
        startTime: Date.now()
      })
      const taskDoc = doc(db, "tasks", localTask.id)
      onSnapshot(taskDoc, (doc) => {
        if (doc.exists()) {
          setLocalTask({ ...doc.data(), id: localTask.id, date: localTask.date })
        }
      })
    } catch (error) {
      console.log(error);
    }
  }


  function handleDelete() { }

  const handleRenderButtons = () => {
    switch (localTask.status) {
      case "unstarted":
        return (
          <AiOutlinePlayCircle onClick={handleStart} className="text-2xl text-purple-400" />
        )
      case "in_progress":
        return (
          <AiOutlinePauseCircle onClick={handlePause} className="text-2xl text-green-400" />
        )
      default:
      case "unstarted":
        return (
          <AiOutlineReload onClick={handleStart} className="text-2xl text-green-400" />
        )
    }
  }

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
        <p>{localTask.status}</p>
      </div>
      <div className="flex items-center justify-center space-x-2 md:justify-end">
        {handleRenderButtons()}
        <AiOutlineEdit className="text-2xl text-purple-400" />
        <AiOutlineDelete className="text-2xl text-red-500" />
      </div>
    </div>
  );
}

export default Task;
