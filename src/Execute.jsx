import { useState } from "react";

export default function Execute(props) {
  const [tasks, setTasks] = useState(props.tasks || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNext, setShowNext] = useState(true);

  const handleButtonClick = (yes) => {
    if (yes) {
      tasks[currentIndex].completed = true;
      setCurrentIndex(currentIndex + 1);
      setShowNext(true);
    } else {
      setShowNext(false);
    }
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
              {!showNext ? (
                <>
                  <p>Let's complete this task</p>
                  <p className="mx-auto my-5 w-fit py-2 px-4 text-center">
                    <b>{tasks[currentIndex].task}</b>
                  </p>
                  <div className="flex justify-around">
                    <button
                      className="mt-5 rounded bg-lime-500 px-4 py-2 font-bold text-white"
                      onClick={() => handleButtonClick(true)}
                    >
                      DONE
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>Does this condition satisfied?</p>
                  <p className="mx-auto my-5 w-fit py-2 px-4 text-center">
                    <b>{tasks[currentIndex].condition}</b>
                  </p>
                  <div className="flex justify-around">
                    <button
                      className="mt-5 rounded bg-lime-500 px-4 py-2 font-bold text-white"
                      onClick={() => handleButtonClick(true)}
                    >
                      YES
                    </button>
                    <button
                      className="mt-5 rounded bg-red-500 px-4 py-2 font-bold text-white"
                      onClick={() => handleButtonClick(false)}
                    >
                      NO
                    </button>
                  </div>
                </>
              )}
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

// import { useState } from "react";

// function App() {
//   const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showNext, setShowNext] = useState(false);

//   const handleUserInput = (input) => {
//     setShowNext(input);
//     setCurrentIndex(currentIndex + 1);
//   };

//   return (
//     <>
//       <div>{items[currentIndex]}</div>
//       {!showNext && <button onClick={() => handleUserInput(false)}>No</button>}
//       {!showNext && <button onClick={() => handleUserInput(true)}>Yes</button>}
//       {showNext && <div>{items[currentIndex]}</div>}
//     </>
//   );
// }
// export default App;
