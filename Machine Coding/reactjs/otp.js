import { useState, useRef, useEffect } from "react";
import "./styles.css";

/**
 * 🚀 Problem Statement:
 * Implement an OTP input field where users can enter a one-time password digit by digit.
 * - Each input box should accept only a single numeric digit.
 * - On entering a digit, focus should automatically shift to the next input box.
 * - On pressing "Backspace" in an empty input box, focus should shift to the previous box.
 * - On the first render, the focus should automatically be set on the first input box.
 */

const OTP_DIGITS_COUNT = 5;

const App = () => {
  const [otpInput, setOtpInput] = useState(Array(OTP_DIGITS_COUNT).fill(""));
  const isFocused = useRef(false);
  const ref = useRef([]);

  useEffect(() => {
    if (!isFocused.current) {
      ref.current[0]?.focus();
      isFocused.current = true; // Prevents re-focusing on re-renders
    }
  }, []);

  const handleChange = (event, index) => {
    const value = event.target.value?.trim();
    if (!isNaN(value)) {
      const newValue = value.slice(-1);
      const currentValue = [...otpInput];
      currentValue[index] = newValue;
      setOtpInput(currentValue);

      value && ref.current[index + 1]?.focus();
    }
  };

  const handleKeyChange = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      ref.current[index - 1]?.focus();
    }
  };

  return (
    <div className="otp-container">
      {otpInput.map((input, index) => (
        <input
          key={index}
          className="otp-input"
          type="text"
          value={otpInput[index]}
          onChange={(event) => handleChange(event, index)}
          onKeyDown={(event) => handleKeyChange(event, index)}
          ref={(el) => (ref.current[index] = el)}
        />
      ))}
    </div>
  );
};

// .otp-input {
//   margin: 5px;
//   width: 40px;
//   height: 40px;
//   padding: 5px;
//   text-align: center;
//   font-size: 2rem;
//   border: solid gray 2px;
//   border-radius: 5px;
// }

export default App;
