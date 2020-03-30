import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { firebase } from "../firebase";

// Helpers
import { collatedTasksExist } from "../helpers";

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let usersTasks = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "QKeBi7YwyxXTyZKCwgLv");

    usersTasks =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (usersTasks = usersTasks.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (usersTasks = usersTasks.where(
            "date",
            "==",
            dayjs().format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (usersTasks = usersTasks.where("date", "==", ""))
        : usersTasks;

    usersTasks = usersTasks.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }));

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              task =>
                dayjs(task.date, "DD/MM/YYYY").diff(dayjs(), "day") <= 7 &&
                task.archived === false
            )
          : newTasks.filter(task => task.archived === false)
      );

      setArchivedTasks(newTasks.filter(task => task.archived === true));
    });
    return () => {
      usersTasks();
    };
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", "QKeBi7YwyxXTyZKCwgLv")
      .orderBy("projectId")
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          docId: project.id,
          ...project.data()
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
