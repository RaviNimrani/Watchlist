import { createContext, useContext, useState } from "react"; // Importing necessary modules from React

// Creating a context for editing values
const editContext = createContext();

// Custom hook to use the edit context
export const useEditValue = () => {
  const value = useContext(editContext); // Accessing context value
  return value; // Returning context value
};

// Provider component for the edit context
const EditContextProvider = ({ children }) => {
  const [isEdited, setIsEdited] = useState({ status: false, index: null }); // State for tracking editing status

  return (
    <>
      <editContext.Provider value={{ isEdited, setIsEdited }}>
        {" "}
        {/* Providing edit context value */}
        {children} {/* Rendering child components */}
      </editContext.Provider>
    </>
  );
};

export default EditContextProvider; // Exporting the EditContextProvider component
