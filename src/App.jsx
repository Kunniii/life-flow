import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-xcode";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import Execute from "./Execute";

function App() {
  const [code, setCode] = useState("");
  const [running, setRunning] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [flowName, setFlowName] = useState("Flow 0x001");
  const [closeHelper, setCloseHelper] = useState(true);

  useEffect(() => {
    let tasks = localStorage.getItem("tasks");
    setCode(tasks);
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [code]);

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.keyCode === 13) {
      document.getElementById("the-run-button")?.click();
    }
    if (event.keyCode == 27) {
      document.getElementById("the-exit-button")?.click();
    }
  };

  const parse = (stringOfTasks) => {
    let lineOfCodes = stringOfTasks.trim().split("\n");
    let tasks = [];
    for (let index in lineOfCodes) {
      let codeStr = lineOfCodes[index].trim();
      if (codeStr.startsWith("- ")) {
        tasks.push({
          task: codeStr.replace("- ", ""),
          completed: false,
        });
      } else if (codeStr.startsWith("+ ")) {
        tasks.push({
          task: codeStr.replace("+ ", ""),
          completed: true,
        });
      } else {
        throw new Error(`Syntax error at line ${Number.parseInt(index) + 1}`);
      }
    }
    return tasks;
  };

  const run = () => {
    try {
      setTasks(parse(code));
      setRunning(true);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleOpen = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      localStorage.setItem("tasks", reader.result);
      setCode(reader.result);
    };
  };

  const loadClicked = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".flow.md";
    input.onchange = handleOpen;
    input.click();
  };

  const saveClicked = () => {
    if (flowName) {
      const filename = `${flowName}.flow.md`;
      const content = code;
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      saveAs(blob, filename);
    }
  };

  return (
    <>
      {running ? (
        <div className="mx-auto flex flex-col">
          <Execute tasks={tasks} />
          <button
            id="the-exit-button"
            className="mx-auto mt-20 w-24 rounded bg-orange-500 px-4 py-2 font-bold text-white duration-150 hover:scale-110 hover:bg-orange-600"
            onClick={() => setRunning(false)}
          >
            Exit
          </button>
        </div>
      ) : (
        <div className="mx-auto flex flex-col py-5 sm:w-96 md:w-[30rem] lg:w-[40rem] xl:w-[50rem]">
          <h1 className="py-2 text-center text-3xl font-bold uppercase">
            life flow
          </h1>
          {closeHelper ? (
            <div className="w-96text-center mx-auto my-2">
              <p>
                <u
                  onClick={() => {
                    setCloseHelper(false);
                  }}
                >
                  Show help!
                </u>
              </p>
            </div>
          ) : (
            <div>
              <div className="mx-auto my-5 w-96 rounded-xl border p-2 text-justify">
                <p>
                  To begin, please make a list in markdown, make sure to begin
                  with <pre className="inline">- (dash)</pre>. The tasks which
                  start with <pre className="inline">+ (plus)</pre> is the
                  completed tasks and will not be shown when you RUN.{" "}
                  <u
                    onClick={() => {
                      setCloseHelper(true);
                    }}
                  >
                    (Click to close)
                  </u>
                </p>
              </div>
              <div className="mx-auto my-5 w-96 rounded-xl border p-2 text-justify">
                <p>
                  <b>
                    <u>Shortcuts:</u>
                  </b>
                  <table className="w-full table-fixed border-separate border-gray-700">
                    <thead className="bg-gray-100 font-bold">
                      <td>Key</td>
                      <td>Definition</td>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-bold">ctrl + enter</td>
                        <td>RUN the current Flow</td>
                      </tr>
                      <tr>
                        <td className="font-bold">Right arrow &gt; </td>
                        <td>Toggle next task</td>
                      </tr>
                      <tr>
                        <td className="font-bold">Left arrow &lt; </td>
                        <td>Move to previous task</td>
                      </tr>
                      <tr>
                        <td className="font-bold">ESC</td>
                        <td>Exit</td>
                      </tr>
                    </tbody>
                  </table>
                </p>
              </div>
            </div>
          )}
          <hr />

          <AceEditor
            mode="markdown"
            theme="xcode"
            value={code}
            onChange={(value) => {
              setCode(value);
              localStorage.setItem("tasks", value);
            }}
            fontSize={18}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
            style={{ width: "100%" }}
          />
          <br />
          <input
            className="my-4 mx-auto mb-10 w-1/2 rounded border px-4 py-2"
            placeholder="Name your flow...."
            onChange={(e) => setFlowName(e.target.value)}
            type="text"
            id="flowName"
            value={flowName}
          />
          <div className="flex justify-center">
            <button
              id="the-run-button"
              className="mx-auto w-24 rounded bg-lime-500 px-4 py-2 font-bold text-white duration-150 hover:scale-110 hover:bg-lime-600"
              onClick={run}
            >
              RUN
            </button>
            <button
              className="mx-auto w-24 rounded bg-cyan-500 px-4 py-2 font-bold text-white duration-150 hover:scale-110 hover:bg-cyan-600"
              onClick={saveClicked}
            >
              SAVE
            </button>
            <button
              className="mx-auto w-24 rounded bg-amber-500 px-4 py-2 font-bold text-white duration-150 hover:scale-110 hover:bg-amber-600"
              onClick={loadClicked}
            >
              LOAD
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
