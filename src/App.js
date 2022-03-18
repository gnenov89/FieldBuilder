
import "./index.css";
import { useState, useEffect, useRef } from "react";
import MockService from "./api/MockService";
import Button from "./components/Shared.jsx/Button";


function App() {
  const [formValues, setFormValues] = useState({
    label: "",
    default: ""
  });
  const [message, setMessage] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
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
        setMessage(null)
      } else if (e.target.value !== "" && e.target.value.trim().length <= 10) {
        setFormValues({ ...formValues, label: e.target.value })
        setBtnDisabled(true)
        setMessage('Text must be at least 10 characters')

        // console.log(e.target.value)
      }
      else {
        setFormValues({ ...formValues, label: e.target.value });
        setMessage(null)
        setBtnDisabled(false)

      }
    }

    if (e.target.name === "choices") {
      console.log(e.target.value);
      textAreaElement.current.value = e.target.value;
    }

    if (e.target.name === "multiSelect") {
      setFormValues({ ...formValues, required: e.target.checked });
      // console.log(e.target.value);
    }

    if (e.target.name === "alphabetical") {
      setFormValues({ ...formValues, displayAlpha: e.target.checked });
      // console.log(e.target.value);
    }
  };

  const labelInput = useRef(null)
  const defValue = useRef(null)
  const textAreaElement = useRef(null);
  const inputCheckbox = useRef(null)
  const alphaInput = useRef(null)

  const clearInputFields = (form) => {
    // setFormValues({})
    form.preventDefault()
    textAreaElement.current.value = ""
    labelInput.current.value = ""
    defValue.current.value = ""
    inputCheckbox.current.checked = false
    alphaInput.current.checked = false
    console.log(formValues)
  }
  const submitFormToApi = (form) => {
    form.preventDefault();
    let choices = textAreaElement.current.value.split("\n");
    let defAult = defValue.current.value
    if (!choices.includes(defAult)) {
      choices.push(defAult)
      let defAdd = textAreaElement.current.value.concat(",", defValue.current.value)
      setFormValues({ ...formValues, choices: defAdd });
    }

    MockService.saveField({ ...formValues, choices });

    // let myArr = textAreaElement.current.value.split("\n")
    // if (!myArr.includes(defAult)) {
    //   myArr.push(defAult)
    // }
    // console.log(myArr)
    // MockService.saveField({ ...formValues, myArr });

  };

  return (
    <>
      <form id="fieldBuilderForm" onSubmit={submitFormToApi}>
        <label htmlFor="salesRegion">Label</label>
        <input
          type="text"
          id="salesRegion"
          name="label"
          ref={labelInput}
          // value={formValues.label !== undefined && formValues.label}
          onChange={handleFormChange}
        ></input>
        <br></br>

        {message && <div className="message">{message}</div>}

        <label htmlFor="Default Value">Default </label>
        <input
          ref={defValue}
          type="text"
          id="salesRegion"
          name="default"
          value={formValues.default}
          onChange={handleFormChange}
        ></input>
        <br></br>

        <label htmlFor="MultiSelect">MultiSelect</label>
        <input
          ref={inputCheckbox}
          type="checkbox"
          id="MultiSelect"
          name="multiSelect"
          value={formValues.required}
          onChange={handleFormChange}
        ></input>
        <br></br>

        <label htmlFor="formChoices">CHOICES</label>
        <textarea
          id="formChoices"
          ref={textAreaElement}
          rows={10}
          name="choices"
          defaultValue={
            formValues.choices !== undefined
              ? formValues.choices
              : ""
          }
          onChange={handleFormChange}
        ></textarea>
        <br></br>



        <label htmlFor="alphabetical">alphabetical</label>
        <input
          ref={alphaInput}
          type="checkbox"
          id="Alphabetical"
          name="alphabetical"
          value={formValues.displayAlpha}
          onChange={handleFormChange}
        ></input>
        <br></br>


        <Button type="submit" onClick={submitFormToApi} isDisabled={btnDisabled}>SUBMIT</Button>

        <Button type="reset" onClick={clearInputFields} version="secondary">CLEAR</Button>
      </form>
    </>
  );
}

export default App;




