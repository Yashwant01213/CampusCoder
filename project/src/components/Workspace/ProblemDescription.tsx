

// const ProblemDescription = ({ problem }) => {
//   return (
//     <div className="p-4 bg-gray-800 text-white">
//       <h2 className="text-xl font-bold mb-2">{problem.title}</h2>
//       <p className="mb-4">{problem.description}</p>
//       <h3 className="font-semibold">Constraints:</h3>
//       <ul className="list-disc list-inside mb-4">
//         {problem.constraints.map((constraint, index) => (
//           <li key={index}>{constraint}</li>
//         ))}
//       </ul>
//       <h3 className="font-semibold">Example Cases:</h3>
//       {problem.examples.map((example, index) => (
//         <div key={index} className="mb-2 p-2 bg-gray-700 rounded">
//           <p><strong>Input:</strong> {example.input}</p>
//           <p><strong>Output:</strong> {example.output}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProblemDescription;


const ProblemDescription = ({ problem }) => {
  if (!problem) {
    return (
      <div className="p-4 bg-gray-800 text-white w-1/2 h-full overflow-auto">
        <p>Loading problem...</p>
      </div>
    );
  }

  return (
    <div className=" p-4 bg-gray-800 text-white w-fit h-full overflow-auto">
      <h2 className="text-xl font-bold mb-2">{problem.title}</h2>
      <p className="mb-4">{problem.description}</p>

      <h3 className="font-semibold">Constraints:</h3>
      <ul className="list-disc list-inside mb-4">
        {problem.constraints.map((constraint, index) => (
          <li key={index}>{constraint}</li>
        ))}
      </ul>

      <h3 className="font-semibold">Example Cases:</h3>
      {/* {problem.examples.map((example, index) => (
        <div key={index} className="mb-2 p-2 bg-gray-700 rounded">
          <p><strong>Input:</strong> {example.input}</p>
          <p><strong>Output:</strong> {example.output}</p>
        </div>
      ))} */}
    </div>
  );
};

export default ProblemDescription;

