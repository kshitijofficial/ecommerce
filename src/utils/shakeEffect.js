// Shake effect function
const shakeInput = (ref) => {
  ref.current.classList.add("shake");
  setTimeout(() => {
    ref.current.classList.remove("shake");
  }, 500);
};

// Apply red border function
const applyRedBorder = (ref) => {
  ref.current.style.border = "2px solid red";
};

// Reset border styles on input focus
const handleInputFocus = (ref) => {
  ref.current.style.border = "";
};

export { shakeInput, applyRedBorder, handleInputFocus };
