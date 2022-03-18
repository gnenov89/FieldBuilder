import "./index.css";
import { useState, useEffect, useRef } from "react";
import MockService from "./api/MockService";
import Button from "./components/Shared.jsx/Button";


function App() {
  //Set global state
  const [formValues, setFormValues] = useState({ label: "" });
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')



  const textAreaElement = useRef(null);
  const labelInput = useRef(null)
  const inputCheckbox = useRef(null)
  const alphaInput = useRef(null)
  useEffect(() => {
    // Call api.
    setFormValues(MockService.getField());
  }, []);




  const handleFormChange = (e) => {
    e.preventDefault();
    if (e.target.name === "label") {
      // console.log(e.target.value)
      if (e.target.value === "") {
        setFormValues({ ...formValues, label: "" });
        setBtnDisabled(true)
        setMessage(null)
      }
      else if (e.target.value !== "" && e.target.value.trim().length <= 10) {
        setBtnDisabled(true)
        setMessage('Text must be at least 10 characters')
        setFormValues({ ...formValues, label: e.target.value })
      }
      else {
        setFormValues({ ...formValues, label: e.target.value });
        setMessage(null)
        setBtnDisabled(false)

      }

    }



    if (e.target.name === "choices") {
      // let stringValues = e.target.value
      // let defaultValue = formValues.default
      // const myArray = stringValues.split("\n")
      // if (!stringValues.includes(formValues.default)) {
      //   stringValues.push(formValues.default)
      // }

      textAreaElement.current.value = e.target.value;

      // if (!myArray.includes(formValues.default)) {
      //   myArray.push(formValues.default)
      //  

      // }



    }

    if (e.target.name === "multiSelect" && e.target.checked) {
      setFormValues({ ...formValues, required: true });
      // console.log(formValues);
    } else {

      setFormValues({ ...formValues, required: false });
      // console.log(formValues);
    }


    if (e.target.name === "alphabetical") {
      setFormValues({ ...formValues, displayAlpha: e.target.checked });
      console.log(e.target.value);
    }

  };

  //Clear Input field 
  const clearInputFields = (form) => {
    form.preventDefault()
    setFormValues({
    })
    textAreaElement.current.value = ""
    labelInput.current.value = ""
    inputCheckbox.current.checked = false
    alphaInput.current.checked = false
    console.log(formValues)
  }
  // Submit to API 
  const submitFormToApi = (form) => {
    form.preventDefault();
    const choices = textAreaElement.current.value.split("\n");
    MockService.saveField({ ...formValues, choices });
    console.log(formValues)
  }

  return (


    <form id="fieldBuilderForm" className="container" onSubmit={submitFormToApi}>

      <header>FieldBuilder</header>



      <label htmlFor="salesRegion">Label</label>
      <input
        ref={labelInput}
        type="text"
        id="salesRegion"
        name="label"
        // value={formValues.label !== undefined && formValues.label}
        placeholder="Sales Region"
        onChange={handleFormChange}
      ></input>
      <br></br>


      {message && <div className="message">{message}</div>}


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
            ? formValues.choices.join("\n")
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


      {/* <button name="reset" type="reset" className="btn-primary" onClick={clearInputFields}>Reset</button> */}

      {/* <button type="submit" onClick={submitFormToApi}>SUBMIT</button> */}

      <Button type="submit" onClick={submitFormToApi} isDisabled={btnDisabled}>SUBMIT</Button>

      <Button type="reset" onClick={clearInputFields} version="secondary">CLEAR</Button>



    </form >

  );
}

export default App;





