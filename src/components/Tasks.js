import React, { useEffect } from "react";

// Components
import { Checkbox } from "./Checkbox";
import { AddTask } from "./AddTask";

// Constants
import { collatedTasks } from "../constants";

// Context
import { useSelectedProjectValue, useProjectsValue } from "../context";

// Helpers
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";

// Hooks
import { useTasks } from "../hooks";

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = "";

  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist Clone`;
  });

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="tasks">{projectName}</h2>

      <ul className="tasks__list">
        {tasks.map(task => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
};
