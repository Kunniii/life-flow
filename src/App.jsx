import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-xcode";
import { saveAs } from "file-saver";
import { useState } from "react";
import AceEditor from "react-ace";

function App() {
  const [code, setCode] = useState("");
  const [tasks, setTasks] = useState([]);
  const [flowName, setFlowName] = useState("Flow 0x001");
  const parse = (stringOfTasks) => {
    let lineOfCodes = stringOfTasks.trim().split("\n");
    let s = "the string";
    let tasks = [];
    for (let code of lineOfCodes) {
      if (!code.startsWith("- ")) {
        throw new Error("use list pls");
      }
      tasks.push({ task: code.split("- ")[1], completed: false });
    }
    return tasks;
  };
  const execute = () => {
    for (let task of tasks) {
      if (task.completed) {
        continue;
      } else {
      }
    }
  };

  const run = () => {
    try {
      setTasks(parse(code));
      execute(tasks);
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
    input.onchange = handleOpen;
    input.click();
  };

  const saveClicked = () => {
    if (flowName) {
      const filename = `${flowName}.md`;
      const content = code;
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      saveAs(blob, filename);
    }
  };

  return (
    <div className="mx-auto flex flex-col py-5 sm:w-96 md:w-[30rem] lg:w-[40rem] xl:w-[50rem]">
      <h1 className="py-10 text-center text-3xl font-bold uppercase">
        life flow
      </h1>
      <AceEditor
        mode="markdown"
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
  );
}

export default App;
