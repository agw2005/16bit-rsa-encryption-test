import { useState } from "react";

function App() {
  const [plainText, setPlainText] = useState("");
  const handlePlaintextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPlainText(event.target.value);
  };

  const [encryptedText, setEncryptedText] = useState("");
  const handleEncryptedTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEncryptedText(event.target.value);
  };

  return (
    <>
      <div className="wrapper">
        <div className="section-container">
          <div className="field-container">
            <h1>Plaintext (Input)</h1>
            <div className="field">
              <textarea
                name=""
                className="textfield"
                value={plainText}
                placeholder="Type here..."
                onChange={handlePlaintextChange}
              ></textarea>
            </div>
          </div>
          <div className="field-container">
            <h1>Encrypted plaintext (Output)</h1>
            <div className="field">
              <textarea
                readOnly
                name=""
                className="textfield"
                value={plainText}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="section-container">
          <div className="field-container">
            <h1>Encrypted text (Input)</h1>
            <div className="field">
              <textarea
                name=""
                className="textfield"
                value={encryptedText}
                placeholder="Type here..."
                onChange={handleEncryptedTextChange}
              ></textarea>
            </div>
          </div>
          <div className="field-container">
            <h1>Decrypted text (Output)</h1>
            <div className="field">
              <textarea
                readOnly
                name=""
                className="textfield"
                value={encryptedText}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
