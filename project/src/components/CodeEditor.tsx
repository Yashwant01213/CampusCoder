// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import Editor from "@monaco-editor/react";
// // import axios from "axios";
// // import { Button } from "../components/layout/ui//Button";
// // import { mockProblems } from "../pages/Problems";
// // import ProblemDescription from "./Workspace/ProblemDescription";

// // const themes = ["vs-dark", "light", "hc-black"];
// // const languages = {
// //   javascript: { id: 63, name: "JavaScript", boilerplate: "console.log('Hello, World!');" },
// //   python: { id: 71, name: "Python", boilerplate: "print('Hello, World!')" },
// //   java: { id: 62, name: "Java", boilerplate: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}` },
// //   c: { id: 50, name: "C", boilerplate: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}" },
// //   cpp: { id: 54, name: "C++", boilerplate: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\\n\";\n    return 0;\n}" },
// // };

// // const encode = (text) => btoa(unescape(encodeURIComponent(text)));
// // const decode = (text) => decodeURIComponent(escape(atob(text)));

// // const postSubmission = async (language_id, source_code, stdin) => {
// //   const options = {
// //     method: "POST",
// //     url: "https://judge0-ce.p.rapidapi.com/submissions",
// //     params: { base64_encoded: "true", fields: "*" },
// //     headers: {
// //       "content-type": "application/json",
// //       "X-RapidAPI-Key": "b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1",
// //       "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
// //     },
// //     data: JSON.stringify({
// //       language_id,
// //       source_code,
// //       stdin,
// //     }),
// //   };
// //   const res = await axios.request(options);
// //   return res.data.token;
// // };

// // const getOutput = async (token) => {
// //   const options = {
// //     method: "GET",
// //     url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
// //     params: { base64_encoded: "true", fields: "*" },
// //     headers: {
// //       "X-RapidAPI-Key": "b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1",
// //       "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
// //     },
// //   };
// //   const res = await axios.request(options);
// //   if (res.data.status_id <= 2) {
// //     await new Promise((resolve) => setTimeout(resolve, 1500));
// //     return await getOutput(token);
// //   }
// //   return res.data;
// // };

// // const CodeEditor = () => {
// //   const { id } = useParams();
// //   const [problem, setProblem] = useState(null);
// //   const [language, setLanguage] = useState("javascript");
// //   const [theme, setTheme] = useState("vs-dark");
// //   const [code, setCode] = useState("");
// //   const [stdin, setStdin] = useState("");
// //   const [output, setOutput] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const USE_DUMMY_DATA = true;

// //   useEffect(() => {
// //     if (!USE_DUMMY_DATA) {
// //       const fetchProblem = async () => {
// //         try {
// //           const res = await axios.get(`http://localhost:4000/api/problems/${id}`);
// //           setProblem(res.data);
// //           setCode(languages[language].boilerplate);
// //         } catch (err) {
// //           console.error("Failed to fetch problem", err);
// //         }
// //       };
// //       fetchProblem();
// //     } else {
// //       const found = mockProblems.find((p) => p.id.toString() === id);
// //       setProblem(found);
// //       setCode(languages[language].boilerplate);
// //     }
// //   }, [id, language]);

// //   const handleEditorChange = (value) => setCode(value);
// //   const handleInputChange = (e) => setStdin(e.target.value);
// //   const handleLanguageChange = (e) => {
// //     const selectedLanguage = e.target.value;
// //     setLanguage(selectedLanguage);
// //     setCode(languages[selectedLanguage].boilerplate);
// //   };

// //   const runCode = async () => {
// //     setLoading(true);
// //     const token = await postSubmission(
// //       languages[language].id,
// //       encode(code),
// //       encode(stdin)
// //     );
// //     const res = await getOutput(token);
// //     const decodedOutput = decode(res.stdout || "");
// //     const decodedError = decode(res.stderr || res.compile_output || "");
// //     const finalOutput =
// //       res.status_id === 3 ? decodedOutput : `❌ ${res.status.description}\n${decodedError}`;
// //     setOutput(finalOutput);
// //     setLoading(false);
// //   };

// //   const loadFileContent = (e, setter) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onload = (e) => setter(e.target.result);
// //     reader.readAsText(file);
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-gray-900 text-white">
// //       {/* Left: Problem Description */}
// //       <div className="w-1/2-screen overflow-auto p-6 border-r border-gray-800">
// //         {problem ? (
// //           <ProblemDescription problem={problem} />
// //         ) : (
// //           <div>Problem not found.</div>
// //         )}
// //       </div>

// //       {/* Right: Editor */}
// //       <div className="w-1/2 p-6 flex flex-col">
// //         <div className="flex gap-4 mb-4">
// //           <select
// //             value={language}
// //             onChange={handleLanguageChange}
// //             className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
// //           >
// //             {Object.keys(languages).map((lang) => (
// //               <option key={lang} value={lang}>
// //                 {languages[lang].name}
// //               </option>
// //             ))}
// //           </select>
// //           <select
// //             value={theme}
// //             onChange={(e) => setTheme(e.target.value)}
// //             className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
// //           >
// //             {themes.map((t) => (
// //               <option key={t} value={t}>
// //                 {t}
// //               </option>
// //             ))}
// //           </select>
// //           <input
// //             type="file"
// //             accept=".txt,.js,.py,.java,.cpp,.c"
// //             onChange={(e) => loadFileContent(e, setCode)}
// //             className="text-sm text-gray-300"
// //           />
// //         </div>

// //         <Editor
// //           height="400px"
// //           language={language}
// //           theme={theme}
// //           value={code}
// //           onChange={handleEditorChange}
// //           options={{ fontSize: 14, minimap: { enabled: false } }}
// //         />

// //         <textarea
// //           placeholder="Custom Input (stdin)"
// //           value={stdin}
// //           onChange={handleInputChange}
// //           rows={4}
// //           className="mt-4 p-2 rounded w-full bg-gray-800 border border-gray-700 text-white resize-none"
// //         />

// //         <Button
// //           className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
// //           onClick={runCode}
// //           disabled={loading}
// //         >
// //           {loading ? "Running..." : "Run Code"}
// //         </Button>

// //         <pre className="mt-6 p-4 bg-black rounded-lg text-green-400 text-sm whitespace-pre-wrap overflow-auto max-h-64">
// //           {output || "Output will be displayed here..."}
// //         </pre>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CodeEditor;
// // CodeEditor.tsx
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Editor from "@monaco-editor/react";
// import { Button } from "../components/layout/ui/Button";
// import { mockProblems } from "../pages/Problems";
// import ProblemDescription from "./Workspace/ProblemDescription";
// import { v4 as uuidv4 } from "uuid";

// const themes = ["vs-dark", "light", "hc-black"];
// const languages = {
//   javascript: { id: 63, name: "JavaScript", boilerplate: "console.log('Hello, World!');" },
//   python: { id: 71, name: "Python", boilerplate: "print('Hello, World!')" },
//   java: { id: 62, name: "Java", boilerplate: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}` },
//   c: { id: 50, name: "C", boilerplate: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}" },
//   cpp: { id: 54, name: "C++", boilerplate: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\\n\";\n    return 0;\n}" },
// };

// const dummyEvaluate = (code: string): 'accepted' | 'wrong_answer' | 'runtime_error' => {
//   if (code.includes("Hello")) return "accepted";
//   if (code.includes("error")) return "runtime_error";
//   return "wrong_answer";
// };

// const CodeEditor = () => {
//   const { id } = useParams();
//   const [problem, setProblem] = useState(null);
//   const [language, setLanguage] = useState("javascript");
//   const [theme, setTheme] = useState("vs-dark");
//   const [code, setCode] = useState("");
//   const [stdin, setStdin] = useState("");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [submissions, setSubmissions] = useState([]);

//   const USE_DUMMY_DATA = true;

//   useEffect(() => {
//     if (USE_DUMMY_DATA) {
//       const found = mockProblems.find((p) => p.id.toString() === id);
//       setProblem(found);
//       setCode(languages[language].boilerplate);
//     }
//   }, [id, language]);

//   const handleEditorChange = (value) => setCode(value);
//   const handleInputChange = (e) => setStdin(e.target.value);
//   const handleLanguageChange = (e) => {
//     const selectedLanguage = e.target.value;
//     setLanguage(selectedLanguage);
//     setCode(languages[selectedLanguage].boilerplate);
//   };

//   const handleSubmit = () => {
//     setLoading(true);
//     setTimeout(() => {
//       const status = dummyEvaluate(code);
//       const newSubmission = {
//         id: uuidv4(),
//         problemId: id,
//         code,
//         language,
//         status,
//         createdAt: new Date().toISOString(),
//         runtime: Math.floor(Math.random() * 100) + 50,
//         memory: Math.floor(Math.random() * 10000) + 30000,
//       };
//       setSubmissions((prev) => [newSubmission, ...prev]);
//       setOutput(
//         status === "accepted"
//           ? "✅ Output is correct!"
//           : status === "runtime_error"
//           ? "❌ Runtime Error"
//           : "❌ Wrong Answer"
//       );
//       setLoading(false);
//     }, 1000);
//   };

//   const loadFileContent = (e, setter) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (e) => setter(e.target.result);
//     reader.readAsText(file);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       {/* Left: Problem Description */}
//       <div className="w-1/2-screen overflow-auto p-6 border-r border-gray-800">
//         {problem ? <ProblemDescription problem={problem} /> : <div>Problem not found.</div>}
//       </div>

//       {/* Right: Editor + Output */}
//       <div className="w-1/2 p-6 flex flex-col">
//         <div className="flex gap-4 mb-4">
//           <select value={language} onChange={handleLanguageChange} className="p-2 rounded bg-gray-800 border border-gray-700 text-white">
//             {Object.keys(languages).map((lang) => (
//               <option key={lang} value={lang}>
//                 {languages[lang].name}
//               </option>
//             ))}
//           </select>
//           <select value={theme} onChange={(e) => setTheme(e.target.value)} className="p-2 rounded bg-gray-800 border border-gray-700 text-white">
//             {themes.map((t) => (
//               <option key={t} value={t}>
//                 {t}
//               </option>
//             ))}
//           </select>
//           <input
//             type="file"
//             accept=".txt,.js,.py,.java,.cpp,.c"
//             onChange={(e) => loadFileContent(e, setCode)}
//             className="text-sm text-gray-300"
//           />
//         </div>

//         <Editor
//           height="400px"
//           language={language}
//           theme={theme}
//           value={code}
//           onChange={handleEditorChange}
//           options={{ fontSize: 14, minimap: { enabled: false } }}
//         />

//         <textarea
//           placeholder="Custom Input (stdin)"
//           value={stdin}
//           onChange={handleInputChange}
//           rows={4}
//           className="mt-4 p-2 rounded w-full bg-gray-800 border border-gray-700 text-white resize-none"
//         />

//         <Button
//           className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Code"}
//         </Button>

//         <pre className="mt-6 p-4 bg-black rounded-lg text-green-400 text-sm whitespace-pre-wrap overflow-auto max-h-64">
//           {output || "Output will be displayed here..."}
//         </pre>

//         {/* Submissions Section */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-2">Submission History</h2>
//           <ul className="space-y-2">
//             {submissions.map((sub) => (
//               <li key={sub.id} className="p-2 rounded bg-gray-800 border border-gray-700">
//                 <p className="text-sm">
//                   <span className="font-bold">Status:</span> {sub.status.toUpperCase()} | <span className="font-bold">Runtime:</span>{" "}
//                   {sub.runtime}ms | <span className="font-bold">Memory:</span> {sub.memory}KB
//                 </p>
//                 <code className="block mt-1 text-gray-400 text-xs max-h-24 overflow-auto">{sub.code.slice(0, 300)}...</code>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "../components/layout/ui/Button";
import { mockProblems } from "../pages/Problems";
import ProblemDescription from "./Workspace/ProblemDescription";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

const themes = ["vs-dark", "light", "hc-black"];
const languages = {
  javascript: { id: 63, name: "JavaScript", boilerplate: "console.log('Hello, World!');" },
  python: { id: 71, name: "Python", boilerplate: "print('Hello, World!')" },
  java: {
    id: 62, name: "Java", boilerplate: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`
  },
  c: {
    id: 50, name: "C", boilerplate: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}"
  },
  cpp: {
    id: 54, name: "C++", boilerplate: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\\n\";\n    return 0;\n}"
  },
};

const dummyEvaluate = (code: string): 'accepted' | 'wrong_answer' | 'runtime_error' => {
  if (code.includes("Hello")) return "accepted";
  if (code.includes("error")) return "runtime_error";
  return "wrong_answer";
};

const CodeEditor = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [showSubmissions, setShowSubmissions] = useState(false);

  const USE_DUMMY_DATA = true;

  useEffect(() => {
    if (USE_DUMMY_DATA) {
      const found = mockProblems.find((p) => p.id.toString() === id);
      setProblem(found);
      setCode(languages[language].boilerplate);
    }
  }, [id, language]);

  const handleEditorChange = (value) => setCode(value);
  const handleInputChange = (e) => setStdin(e.target.value);
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(languages[selectedLanguage].boilerplate);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const status = dummyEvaluate(code);
      const newSubmission = {
        id: uuidv4(),
        problemId: id,
        code,
        language,
        status,
        createdAt: new Date().toISOString(),
        runtime: Math.floor(Math.random() * 100) + 50,
        memory: Math.floor(Math.random() * 10000) + 30000,
      };
      setSubmissions((prev) => [newSubmission, ...prev]);
      setOutput(
        status === "accepted"
          ? "✅ Output is correct!"
          : status === "runtime_error"
          ? "❌ Runtime Error"
          : "❌ Wrong Answer"
      );
      setLoading(false);
    }, 1000);
  };

  const loadFileContent = (e, setter) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setter(e.target.result);
    reader.readAsText(file);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Panel with Toggle */}
      <div className="w-1/2 overflow-auto p-6 border-r border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            {problem ? problem.title : "Loading..."}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowSubmissions(false)}
              className={`px-3 py-1 rounded ${!showSubmissions ? "bg-blue-600" : "bg-gray-700"}`}
            >
              Problem Description
            </button>
            <button
              onClick={() => setShowSubmissions(true)}
              className={`px-3 py-1 rounded ${showSubmissions ? "bg-blue-600" : "bg-gray-700"}`}
            >
              Submission History
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!problem ? (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              Problem not found.
            </motion.div>
          ) : showSubmissions ? (
            <motion.div
              key="submissions"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-xl font-semibold mb-2">Submission History</h2>
              <ul className="space-y-2">
                {submissions.length === 0 && (
                  <li className="text-gray-400">No submissions yet.</li>
                )}
                {submissions.map((sub) => (
                  <li key={sub.id} className="p-2 rounded bg-gray-800 border border-gray-700">
                    <p className="text-sm">
                      <span className="font-bold">Status:</span> {sub.status.toUpperCase()} |{" "}
                      <span className="font-bold">Runtime:</span> {sub.runtime}ms |{" "}
                      <span className="font-bold">Memory:</span> {sub.memory}KB
                    </p>
                    <code className="block mt-1 text-gray-400 text-xs max-h-24 overflow-auto">
                      {sub.code.slice(0, 300)}...
                    </code>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="description"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ProblemDescription problem={problem} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-6 flex flex-col">
        <div className="flex gap-4 mb-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
          >
            {Object.keys(languages).map((lang) => (
              <option key={lang} value={lang}>
                {languages[lang].name}
              </option>
            ))}
          </select>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700 text-white"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {/* <input
            type="file"
            accept=".txt,.js,.py,.java,.cpp,.c"
            onChange={(e) => loadFileContent(e, setCode)}
            className="text-sm text-gray-300"
          /> */}
        </div>

        <Editor
          height="400px"
          language={language}
          theme={theme}
          value={code}
          onChange={handleEditorChange}
          options={{ fontSize: 14, minimap: { enabled: false } }}
        />

        <textarea
          placeholder="Custom Input (stdin)"
          value={stdin}
          onChange={handleInputChange}
          rows={4}
          className="mt-4 p-2 rounded w-full bg-gray-800 border border-gray-700 text-white resize-none"
        />

        <Button
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Code"}
        </Button>

        <pre className="mt-6 p-4 bg-black rounded-lg text-green-400 text-sm whitespace-pre-wrap overflow-auto max-h-64">
          {output || "Output will be displayed here..."}
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
