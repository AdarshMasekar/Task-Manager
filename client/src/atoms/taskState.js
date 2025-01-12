import { atom, selector } from "recoil";
import axios from "axios";

export const tasksAtom = atom({
  key: "taskatom",
  default: [],
});

// Placeholder function to get the token
const getToken = () => {
  // Replace this with your actual token retrieval logic
  return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzgyODViMmNlMGVhMTgwZGZiYTU1ZWQiLCJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJ1c2VyIiwiZW1haWwiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJpYXQiOjE3MzY2MDcxNjd9.hy4tfKcSy0HaHr370o-QBoRnL6Ei_POoqlt-kraLmHc";
};

export const fetchTasksSelector = selector({
  key: "taskselector",
  get: async () => {
    try {
      const token = getToken();

      const response = await axios.get("http://localhost:3000/api/tasks", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      throw error; // Propagate the error to the component
    }
  },
});

export const deleteTask = async (taskId, { get, set }) => {
  try {
    const token = getToken();
    await axios.delete(`http://localhost:3000/api/tasks/${taskId}`, {
      headers: {
        Authorization: token,
      },
    });
    const tasks = get(tasksAtom);
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    set(tasksAtom, updatedTasks);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
