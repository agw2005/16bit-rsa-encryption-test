import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="wrapper">
        <div className="section-container">
          <div className="field"></div>
          <div className="field"></div>
        </div>
        <div className="section-container">
          <div className="field"></div>
          <div className="field"></div>
        </div>
      </div>
    </>
  );
}

export default App;
