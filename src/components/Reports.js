import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { getAuth } from "firebase/auth";
import { getFirestore, query, collection, where, onSnapshot } from "firebase/firestore";
import { startOfMonth, endOfMonth, startOfWeek, endOfDay, isWithinInterval, format, addMilliseconds } from "date-fns";
import { Link } from "react-router-dom";
import Task from "./Task";
import app from "../firebase/config";

function Report() {

    const auth = getAuth(app);
    const db = getFirestore(app);

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [totalTime, setTotalTime] = useState(0);
    const [thisWeekTotal, setThisWeekTotal] = useState(0);
    const [thisMonthTotal, setThisMonthTotal] = useState(0);

    useEffect(() => {
        let unsubscribe = null; // Initialize variable to hold the unsubscribe function

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                if (auth.currentUser) {
                    const tasksRef = collection(db, "tasks");
                    const q = query(tasksRef, where("userId", "==", auth.currentUser.uid));
                    // Directly assign the return value of onSnapshot to unsubscribe
                    unsubscribe = onSnapshot(q, (querySnapshot) => {
                        if (querySnapshot.docs.length) {
                            let weekTotal = 0;
                            let monthTotal = 0;
                            let total = 0;
                            const now = new Date();
                            const weekStart = startOfWeek(now);
                            const weekEnd = endOfDay(now);
                            const monthStart = startOfMonth(now);
                            const monthEnd = endOfMonth(now);

                            querySnapshot.docs.forEach((doc) => {
                                const data = doc.data();
                                const taskDate = new Date(data.startTime)
                                const taskTime = data.totalTime || 0
                                if (isWithinInterval(taskDate, { start: weekStart, end: weekEnd })) {
                                    weekTotal += taskTime
                                }
                                if (isWithinInterval(taskDate, { start: monthStart, end: monthEnd })) {
                                    monthTotal += taskTime
                                }
                                total += taskTime
                            })

                            setThisWeekTotal(weekTotal);
                            setThisMonthTotal(monthTotal);
                            setTotalTime(total);

                            const tasks = querySnapshot.docs.map((doc) => ({
                                ...doc.data(),
                                id: doc.id,
                                date: new Date(doc.data().startTime).toISOString()
                            }));
                            setTasks(tasks);
                            setLoading(false);
                        }
                    });
                } else {
                    setError("User not logged in");
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            if (unsubscribe) {
                unsubscribe(); // Call the unsubscribe function if it has been set
            }
        };
    }, []); // Empty dependency array means this effect will only run once (like componentDidMount)

    const exportTasks = () => {
        //Generate export data
        const exportData = tasks.map((task) => {
            return {
                name: task.task,
                date: format(new Date(task.date), "do MMM yyy"),
                status: task.status,
            };
        });
        //Convert the data to csv format
        const csvContent =
            "data:text/csv;charset=utf-8," +
            exportData.map((row) => Object.values(row).join(",")).join("\n");

        //Download
        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.target = "_blank";
        link.download = "tasks.csv";
        link.click();
    };

    function formatTIme(timeInMillis) {
        const date = addMilliseconds(new Date(0), timeInMillis);
        return format(date, "HH:mm:ss");
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <div className="container px-4 py-10 mx-auto">
                <header className="flex justify-between py-6">
                    <h1 className="text-4xl font-bold text-white">Time Tracker</h1>
                    <button className="text-white" title="Logout">
                        <AiOutlineLogout className="text-2xl" />
                    </button>
                </header>
                <div className="max-w-md p-4 mx-auto my-6 text-black bg-white rounded-md">
                    <h2 className="mb-2 text-lg font-semibold">User Profile</h2>
                    <div className="flex items-center">
                        <img className="w-16 h-16 rounded-full" src={auth.currentUser.photoURL || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} alt="profile" />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">{auth.currentUser.displayName || "Username"}</h3>
                            <p className="text-gray-600">{auth.currentUser.email || "Email"}</p>
                            <p className="text-gray-600">Last Login: {auth.currentUser.metadata.lastSignInTime || "Last Sign In Time"}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-8 text-center sm:grid-cols-2 md:grid-cols-3">
                    <div className="p-4 text-white rounded-md shadow-lg bg-gradient-to-r from-green-400 to-blue-500">
                        <h2 className="text-lg font-semibold">This Week</h2>
                        <p className="text-2xl font-bold">{formatTIme(thisWeekTotal)}</p>
                    </div>
                    <div className="p-4 text-white rounded-md shadow-lg bg-gradient-to-r from-purple-400 to-pink-500">
                        <h2 className="text-lg font-semibold">This Month</h2>
                        <p className="text-2xl font-bold">{formatTIme(thisMonthTotal)}</p>
                    </div>
                    <div className="p-4 text-white rounded-md shadow-lg bg-gradient-to-r from-red-400 to-yellow-500">
                        <h2 className="text-lg font-semibold">Total</h2>
                        <p className="text-2xl font-bold">{formatTIme(totalTime)}</p>
                    </div>
                </div>

                <div className="max-w-3xl p-4 mx-auto rounded-md shadow-lg bg-gradient-to-r from-red-400 to-yellow-500">
                    <div className="flex flex-col justify-between mb-4 sm:flex-row">
                        <Link
                            to="/create-task"
                            className="w-full p-2 mb-4 text-white rounded sm:w-auto bg-gradient-to-r sm:mr-4 sm:mb-0 from-red-500 to-pink-500"
                        >
                            Add New Task
                        </Link>
                        <button onClick={exportTasks} className="w-full p-2 text-white rounded sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500">
                            Export
                        </button>
                    </div>

                    <div className="space-y-4">{
                        tasks.map((task) => (
                            <Task
                                key={task.id}
                                task={task}
                            />
                        ))
                    }</div>
                </div>
            </div>
        </div>
    );
}

export default Report;
