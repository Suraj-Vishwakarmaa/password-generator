import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const copyPassword = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_-{}[]~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const passwordCopyToClipboard = useCallback(() => {
    copyPassword.current?.select();
    // copyPassword.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 p-5 mt-20 bg-gray-400 rounded-xl">
        <h1 className="text-xl text-white text-center">Passoword Generator</h1>
        <div>
          <input type="text" placeholder="Password" value={password} ref={copyPassword} className="w-4/5 rounded-l-xl py-3 pl-5 mt-5 text-orange-600 outline-none" readOnly />
          <button className="w-1/5 uppercase bg-blue-800 p-3 text-white rounded-r-xl tracking-widest hover:bg-blue-950" onClick={passwordCopyToClipboard}>
            Copy
          </button>
        </div>
        <div className="flex gap-10">
          <div className="flex align-middle mt-4 gap-2">
            <input type="range" minLength={6} maxLength={100} value={length} onChange={(e) => setLength(e.target.value)} />
            <label className="text-white">Length {length}</label>
          </div>
          <div className="flex align-middle mt-4 gap-2">
            <input
              type="checkbox"
              defaultValue={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="" className="text-white">
              Number
            </label>
          </div>
          <div className="flex align-middle mt-4 gap-2">
            <input
              type="checkbox"
              defaultValue={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="" className="text-white">
              Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

