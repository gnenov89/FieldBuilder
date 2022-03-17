import "./index.css";
import { useState, useEffect } from "react";
import MockService from "./api/MockService";
import { Grid } from '@mui/material'

function App() {


  const [formValues, setFormValues] = useState({
    label: ""

  });

  useEffect(() => {
    // Call api.
    setFormValues(MockService.getField());
  }, []);

  const handleFormChange = (e) => {
    e.preventDefault();

    if (e.target.name === "label") {
      console.log(e.target.value);
      if (e.target.value === "") {
        setFormValues({ ...formValues, label: "" });
      } else {
        setFormValues({ ...formValues, label: e.target.value });
      }
    }

    if (e.target.name === "choices" && formValues.choices.includes(e.target.value)) {
      // setFormValues({ ...formValues, choices: e.target.value })
      console.log(e.target.value)

    }

    if (e.target.name === "multiSelect") {
      setFormValues({ ...formValues, required: e.target.checked })
      console.log(e.target.value)
    }

    if (e.target.name === "alphabetical") {
      setFormValues({ ...formValues, displayAlpha: e.target.checked })
      console.log(e.target.value)
    }
  };

  const submitFormToApi = (form) => {
    form.preventDefault();
    MockService.saveField(formValues);
  };




  return (

    <>
      <form id="fieldBuilderForm" onSubmit={submitFormToApi}>

        <label htmlFor="salesRegion">Label</label>
        <input
          type="text"
          id="salesRegion"
          name="label"
          value={formValues.label !== undefined && formValues.label}
          onChange={handleFormChange}
        ></input>

        <label htmlFor="MultiSelect">MultiSelect</label>
        <input
          type="checkbox"
          id="MultiSelect"
          name="multiSelect"
          value={formValues.required}
          onChange={handleFormChange}
        ></input>


        <label htmlFor="formChoices">CHOICES</label>
        <select name="choices" id="formChoices" onChange={handleFormChange}>
          {formValues.choices !== undefined &&
            formValues.choices.map((choice, key) => {
              return formValues.default === choice ? (
                <option key={key} value={choice}>
                  {choice}
                </option>
              ) : (
                <option key={key} value={choice} >
                  {choice}
                </option>
              );
            })}
        </select>



        <label htmlFor="alphabetical">alphabetical</label>
        <input
          type="checkbox"
          id="Alphabetical"
          name="alphabetical"
          value={formValues.displayAlpha}
          onChange={handleFormChange}
        ></input>

        <button type="submit">SUBMIT</button>

        <button type="reset">Reset</button>
      </form>

    </>
  );
}

export default App;