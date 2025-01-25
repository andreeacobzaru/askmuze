// Handles input change and updates the state
export const handleInputChange = (event, setInput) => {
    setInput(event.target.value);
  };
  
  // Handles form submission
  export const handleSubmit = (input, setInput) => {
    if (input.trim() !== "") {
      console.log(`User input: ${input}`);
      setInput("");
    } else {
      console.log("Input is empty. Please enter something.");
    }
  };