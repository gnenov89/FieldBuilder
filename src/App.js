import './index.css';
import MockService from './api/MockService';
import { useState, useEffect } from 'react'

function App() {

  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    // Call api.
    setFormValues(MockService.getField());
    console.log(formValues)
  }, []);


  return (
    <div className="App">

    </div>
  );
}

export default App;
