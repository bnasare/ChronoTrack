import React, { useEffect, useState } from "react";
import { format } from 'date-fns'

import { BsCircleFill } from "react-icons/bs";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCalendar,
  AiOutlinePlayCircle,
  AiOutlinePauseCircle,
  AiOutlineReload
} from "react-icons/ai";
import app from "../firebase/config";
import { FaCheck, FaTimes } from 'react-icons/fa'
import { getFirestore, updateDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";

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

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "tasks", localTask.id), {
        task: newTaskDescription
      });
      setLocalTask({
        ...localTask,
        task: newTaskDescription
      });
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating task:", error);
    }
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

  const handleRenderTaskDescription = () => {
    if (isEditing) {
      return (
        <div className="flex space-x-2">
          <input
            type="text"
            className="px-2 py-1 border border-purple-300 rounded"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <FaCheck onClick={handleUpdate} className="text-green-400 cursor-pointer" />
          <FaTimes onClick={handleCancelEdit} className="text-red-400 cursor-pointer" />
        </div>
      )
    }

    return <p className="text-gray-600">{task.task}</p>

  }

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


  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "tasks", localTask.id));
      alert("Task deleted successfully");
    } catch (error) {
      alert("Task deleted failed");
    }
  };

  const handleRenderButtons = () => {
    switch (localTask.status) {
      case "unstarted":
        return (
          <AiOutlinePlayCircle onClick={handleStart} className="text-2xl text-purple-400 cursor-pointer" />
        )
      case "in_progress":
        return (
          <AiOutlinePauseCircle onClick={handlePause} className="text-2xl text-green-400 cursor-pointer" />
        )
      default:
      case "unstarted":
        return (
          <AiOutlineReload onClick={handleStart} className="text-2xl text-green-400 cursor-pointer" />
        )
    }
  }

  return (
    <div className="flex flex-col justify-between p-4 text-black bg-white rounded-md shadow-lg md:flex-row md:items-center">
      <div className="space-y-2 md:space-x-2 md:space-y-0">
        {/* render buttons */}
        {handleRenderTaskDescription()}
        <div className="flex items-center space-x-2">
          <AiOutlineCalendar className="text-gray-600 cursor-pointer" />
          <p>{format(new Date(localTask.date), "do MMM yyyy")}</p>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <BsCircleFill color={
          localTask.status === "paused"
            ? "red" :
            localTask.status === "in_progress"
              ? "green"
              : "yellow"
        } />
        <p>{localTask.status}</p>
      </div>
      <div className="flex items-center justify-center space-x-2 md:justify-end">
        {handleRenderButtons()}
        <AiOutlineEdit onClick={handleEdit} className="text-2xl text-purple-400 cursor-pointer" />
        <AiOutlineDelete onClick={handleDelete} className="text-2xl text-red-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default Task;
