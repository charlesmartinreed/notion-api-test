import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");

  function clearFields() {
    setName("");
    setPhoneNumber("");
    setNotes("");
  }

  function submitFormToNotion() {
    let URL = `http://localhost:4000/`;
    let endpoint = `submitFormToNotion`;
    if (name === "" || phoneNumber === "" || notes === "") {
      console.log("empty fields");
      return;
    }

    // calling our local endpoint
    fetch(URL + endpoint, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phoneNumber,
        notes,
      }),
    });

    clearFields();
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Employee Details</h1>
        <h4>Please help keep our files up to date!</h4>

        <div>
          <p>Name</p>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <p>Phone Number</p>
          <input
            type="text"
            id="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <p>Notes, Comments, etc.</p>
          <textarea
            id="notes"
            cols={60}
            rows={15}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div>
          <button onClick={submitFormToNotion}>Submit To Notion</button>
        </div>
      </div>
    </div>
  );
}

export default App;
