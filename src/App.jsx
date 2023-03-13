import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-xcode";
import { saveAs } from "file-saver";
import { useState } from "react";
import AceEditor from "react-ace";
import Execute from "./Execute";

function App() {
  const [code, setCode] = useState("");
  const [running, setRunning] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [flowName, setFlowName] = useState("Flow 0x001");

  const parse = (stringOfTasks) => {
    const syntax = ["if", "elif", "else"];
    let lineOfCodes = stringOfTasks.trim().split("\n");
    let tasks = [];
    for (let index in lineOfCodes) {
      let data = lineOfCodes[index].split(' "');
      if (!syntax.includes(data[0])) {
        throw new Error(`Syntax Error on line ${Number.parseInt(index) + 1}`);
      }
      tasks.push({
        condition: lineOfCodes[index].split(' "')[1].replaceAll('"', ""),
        task: lineOfCodes[index].split(' "')[2].replaceAll('"', ""),
        completed: false,
      });
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
      setCode(reader.result);
    };
  };

  const loadClicked = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".flow";
    input.onchange = handleOpen;
    input.click();
  };

  const saveClicked = () => {
    if (flowName) {
      const filename = `${flowName}.flow`;
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
            className="mx-auto mt-20 w-24 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-lime-600"
            onClick={() => setRunning(false)}
          >
            Exit
          </button>
        </div>
      ) : (
        <div className="mx-auto flex flex-col py-5 sm:w-96 md:w-[30rem] lg:w-[40rem] xl:w-[50rem]">
          <h1 className="py-10 text-center text-3xl font-bold uppercase">
            life flow
          </h1>
          <AceEditor
            mode="python"
            theme="xcode"
            value={code}
            onChange={(value) => setCode(value)}
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
              className="mx-auto w-24 rounded bg-lime-500 px-4 py-2 font-bold text-white hover:bg-lime-600"
              onClick={run}
            >
              RUN
            </button>
            <button
              className="mx-auto w-24 rounded bg-cyan-500 px-4 py-2 font-bold text-white hover:bg-cyan-600"
              onClick={saveClicked}
            >
              SAVE
            </button>
            <button
              className="mx-auto w-24 rounded bg-amber-500 px-4 py-2 font-bold text-white hover:bg-amber-600"
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
