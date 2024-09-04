import React, { useState } from "react";
import "./App.css";

function App() {
  
  const [formData, setFormData] = useState([
    { name: "", number: "", remarks: "" },
  ]);

  const addRow = () => {
    const newRow = { name: "", number: "", remarks: "" };
    setFormData([...formData, newRow]);
  };

  const removeRow = (index) => {
    const updatedFormData = formData.filter((_, i) => i !== index);
    setFormData(updatedFormData);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFormData = formData.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData(updatedFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasEmptyFields = formData.some((row) =>
      Object.values(row).some((value) => value.trim() === "")
    );

    if (hasEmptyFields) {
      
      return;
    }
    localStorage.clear();

    localStorage.setItem("formData", JSON.stringify(formData));

    setFormData([{ name: "", number: "", remarks: "" }]);
   
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="forma">
        {formData.map((item, index) => (
          <div key={index} className="forma2">
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Name"
              className="form-control"
            />
            <input
              type="number"
              name="number"
              value={item.number}
              onChange={(e) => handleChange(index, e)}
              placeholder="123"
              className="form-control"
            />
            <input
              type="text"
              name="remarks"
              value={item.remarks}
              onChange={(e) => handleChange(index, e)}
              placeholder="Remarks"
              className="form-control"
            />
            <button
              type="button"
              className="remove"
              onClick={() => removeRow(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <div>
          <button type="button" className="btn1" onClick={addRow}>
            Add Row
          </button>{" "}
          <br />
          <button type="submit" className="btn2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;