import { useMemo, useState } from "react";
import { generateRSAKeys, encryptMessage, decryptMessage } from "./rsa.ts";

function App() {
  const [n, e, d] = useMemo(() => generateRSAKeys(), []);

  const [plainText, setPlainText] = useState("");
  const [plainTextEncrypted, setPlainTextEncrypted] = useState("");
  const handlePlaintextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPlainText(event.target.value);
    setPlainTextEncrypted(encryptMessage(event.target.value, e, n));
  };

  const [encryptedText, setEncryptedText] = useState("");
  const [encryptedTextDecrypted, setEncryptedTextDecrypted] = useState("");
  const handleEncryptedTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEncryptedText(event.target.value);
    setEncryptedTextDecrypted(decryptMessage(event.target.value, d, n));
  };

  // Handle copying to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(plainTextEncrypted);
  };

  return (
    <>
      <div className="wrapper">
        <h1>
          Public Key: ({e},{n})
        </h1>
        <h1>
          Private Key: ({d},{n})
        </h1>
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
            <div className="copy-container">
              <h1>Encrypted plaintext (Output)</h1>
              <button className="copy-to-clipboard" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
            <div className="field">
              <textarea
                readOnly
                name=""
                className="textfield"
                value={plainTextEncrypted}
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
                value={encryptedTextDecrypted}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
