import { useEffect, useState } from "react";

export default function Execute(props) {
  const [tasks, setTasks] = useState(props.tasks || []);
  const [currentIndex, setCurrentIndex] = useState(() => {
    let i = 0;
    while (tasks[i].completed) {
      i++;
      if (i == tasks.length) {
        break;
      }
    }
    return i;
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.keyCode === 39) {
      document.getElementById("the-next-button")?.click();
    }
    if (event.keyCode == 37) {
      document.getElementById("the-back-button")?.click();
    }
  };

  const handleButtonClick = (yes) => {
    let i = currentIndex;
    if (yes) {
      tasks[i].completed = true;
      while (tasks[i].completed) {
        i++;
        if (i == tasks.length) {
          break;
        }
      }
      setCurrentIndex(i);
    } else {
      if (currentIndex == 0) {
        return;
      }
      tasks[currentIndex].completed = false;
      setCurrentIndex(currentIndex - 1);
    }
    saveChangeToLocal();
  };

  const turnTasksObjectIntoText = () => {
    let tasksStr = "";
    for (let task of tasks) {
      if (task.completed) {
        tasksStr += "+ " + task.task + "\n";
      } else {
        tasksStr += "- " + task.task + "\n";
      }
    }
    return tasksStr;
  };

  const saveChangeToLocal = () => {
    let tasks = turnTasksObjectIntoText();
    localStorage.setItem("tasks", tasks);
  };

  return (
    <>
      {currentIndex < tasks.length ? (
        <>
          <div className="mx-auto flex flex-col py-5 sm:w-96 md:w-[30rem] lg:w-[40rem] xl:w-[50rem]">
            <h1 className="py-10 text-center text-3xl font-bold uppercase">
              life flow
            </h1>
            <div className="mx-auto w-96 rounded border py-4 text-center shadow">
              <>
                <p>Let complete this task!</p>
                <p className="mx-auto my-5 w-fit py-2 px-4 text-center">
                  <b>{tasks[currentIndex].task}</b>
                </p>
                <div className="flex justify-around">
                  <button
                    id="the-back-button"
                    className="mt-5 rounded bg-red-500 px-4 py-2 font-bold text-white duration-150 hover:scale-110"
                    onClick={() => handleButtonClick(false)}
                  >
                    BACK
                  </button>
                  <button
                    id="the-next-button"
                    className="mt-5 rounded bg-lime-500 px-4 py-2 font-bold text-white duration-150 hover:scale-110"
                    onClick={() => handleButtonClick(true)}
                  >
                    NEXT
                  </button>
                </div>
              </>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto flex flex-col py-5 sm:w-96 md:w-[30rem] lg:w-[40rem] xl:w-[50rem]">
            <h1 className="py-10 text-center text-3xl font-bold uppercase">
              life flow
            </h1>
            <div className="mx-auto w-96 rounded border py-4 text-center shadow">
              <p>NICE!</p>
              <p className="mx-auto my-5 w-fit py-2 px-4 text-center">
                <b>YOU HAVE DONE ALL THE TASKS!</b>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
