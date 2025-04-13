// import Split from "react-split";
// import { useState, useEffect } from "react";
// import ProblemDetail from "../problems/ProblemDetail";
// import CodeEditor from "../CodeEditor";

// function Workspace() {
//     const [details, setDetails] = useState({});
//   const [code, setCode] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const onChange = (data) => {
//     setCode(data);
//   };}
  
//   useEffect(() => {
//     async function fetchDetails() {
//       try {
//         // Instead of fetching from API, use a dummy problem for now
//         setDetails({
//           title: "Two Sum",
//           description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
//           testcases: [
//             { input: "2 7 11 15\n9", output: "0 1" },
//             { input: "3 2 4\n6", output: "1 2" },
//           ],
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchDetails();
//   }, []);
  
//     return (
//         <Split className="split" minSize={0}>
//           <ProblemDetail details={details} />
//           <Split className="split-vertical" direction="vertical">
//             <CodeEditor onChange={onChange} />
//             {/* <TestCases
//               handleCompile={handleCompile}
//               testcases={testcases}
//               processing={processing}
//             /> */}
//           </Split>
//         </Split>
//       );

// // }
// // export default Workspace;
// import { useState, useEffect, SetStateAction } from "react";
// import Split from "react-split";
// import ProblemDescription from "./ProblemDescription";
// import CodeEditor from "./CodeEditor";
// // import TestCases from "./TestCases";

// function Workspace() {
//   // const urlPathname = window.location.pathname;
//   // const segments = urlPathname.split("/");
//   // const problem = segments[segments.length - 1];

//   const [details, setDetails] = useState({});
//   const [setCode] = useState("");
//   // const [processing, setProcessing] = useState(false);

//   // const testcases = details.testcases;

//   // useEffect(() => {
//   //   async function fetchDetails() {
//   //     try {
//   //       const response = await axios.get(
//   //         `http://localhost:3000/problem/${problem}`
//   //       );
//   //       setDetails(response.data);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   }
//   //   fetchDetails();
//   // }, [problem]);
//   useEffect(() => {
//     async function fetchDetails() {
//       try {
//         // Instead of fetching from API, use a dummy problem for now
//         setDetails({
//           title: "Two Sum",
//           description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
//           testcases: [
//             { input: "2 7 11 15\n9", output: "0 1" },
//             { input: "3 2 4\n6", output: "1 2" },
//           ],
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchDetails();
//   }, []);
  

//   const onChange = (data) => {
//     setCode(data);
//   };

//   // const handleCompile = async () => {
//   //   setProcessing(true);
//   //   const formData = {
//   //     language_id: 63,
//   //     source_code: btoa(code),
//   //     stdin: btoa(details?.testcases[0].input),
//   //   };

//   //   const options = {
//   //     method: "POST",
//   //     url: process.env.REACT_APP_RAPID_API_URL,
//   //     params: { base64_encoded: "true", fields: "*" },
//   //     headers: {
//   //       "content-type": "application/json",
//   //       "Content-Type": "application/json",
//   //       "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
//   //       "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//   //     },
//   //     data: formData,
//   //   };

//   //   try {
//   //     const response = await axios.request(options);
//   //     const token = response.data.token;
//   //     checkStatus(token);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   // const checkStatus = async (token) => {
//   //   const options = {
//   //     method: "GET",
//   //     url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
//   //     params: { base64_encoded: "true", fields: "*" },
//   //     headers: {
//   //       "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
//   //       "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//   //     },
//   //   };

//   //   try {
//   //     const response = await axios.request(options);
//   //     const statusId = await response.data.status_id;
//   //     if (statusId === 1 || statusId === 2) {
//   //       setTimeout(() => {
//   //         checkStatus(token);
//   //       }, 2000);
//   //       return;
//   //     } else {
//   //       const output = atob(response.data.stdout);
//   //       const reqOutput = details.testcases[0].output;

//   //       if (output.trim() === reqOutput.trim()) {
//   //         toast.success("Congrats! TestCase Passesd");
//   //       } else {
//   //         toast.error("Oops! Output Didn't Matched");
//   //       }
//   //       setProcessing(false);
//   //       return;
//   //     }
//   //   } catch (error) {
//   //     setProcessing(false);
//   //     console.log(error);
//   //   }
//   // };

//   return (
//     <Split className="split" minSize={0}>
//       <ProblemDescription details={details} />
//       <Split className="split-vertical" direction="vertical">
//         <CodeEditor onChange={onChange} />
//         {/* <TestCases
//           handleCompile={handleCompile}
//           testcases={testcases}
//           processing={processing}
//         /> */}
//       </Split>
//     </Split>
//   );
// }



// export default Workspace;