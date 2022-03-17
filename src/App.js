import "./index.css";
import { useState, useEffect, useRef } from "react";
import MockService from "./api/MockService";

function App() {
  const [formValues, setFormValues] = useState({

  });

  const textAreaElement = useRef(null);

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

    if (e.target.name === "choices") {
      console.log(e.target.value);
      textAreaElement.current.value = e.target.value;
    }

    if (e.target.name === "multiSelect") {
      setFormValues({ ...formValues, required: e.target.checked });
      console.log(e.target.value);
    }

    if (e.target.name === "alphabetical") {
      setFormValues({ ...formValues, displayAlpha: e.target.checked });
      console.log(e.target.value);
    }
  };

  const submitFormToApi = (form) => {
    form.preventDefault();
    const choices = textAreaElement.current.value.split("\n");

    MockService.saveField({ ...formValues, choices });
  };

  return (
    <div>
      <form id="fieldBuilderForm" onSubmit={submitFormToApi}>
        <div className="form-row">
          <label htmlFor="salesRegion">Label</label>

          <input
            type="text"
            id="salesRegion"
            name="label"
            // value={formValues.label !== undefined && formValues.label}
            onChange={handleFormChange}

          ></input>
          <br></br>
        </div>


        <div className="form-row">
          <label htmlFor="MultiSelect">MultiSelect</label>
          <input
            type="checkbox"
            id="MultiSelect"
            name="multiSelect"
            value={formValues.required}
            onChange={handleFormChange}
          ></input>
          <br></br>
        </div>

        <div className="form-row">
          <label htmlFor="formChoices">CHOICES</label>
          <textarea
            id="formChoices"
            ref={textAreaElement}
            rows={10}
            name="choices"
            defaultValue={
              formValues.choices !== undefined
                ? formValues.choices.join("\n")
                : ""
            }
            onChange={handleFormChange}
          ></textarea>
          <br></br>
        </div>

        <div className="form-row">
          <label htmlFor="alphabetical">alphabetical</label>
          <input
            type="checkbox"
            id="Alphabetical"
            name="alphabetical"
            value={formValues.displayAlpha}
            onChange={handleFormChange}
          ></input>
          <br></br>
        </div>

        <div className="form-row">
          <button type="submit" onClick={submitFormToApi}>SUBMIT</button>

          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  );
}

export default App;