import { useReducer } from "react";
import formFields from "../formData.json";
import axios from "axios";

// In this format, the keys are not enclosed in double quotes, which is how you typically define an object in JavaScript.
//  You can use this format directly as the initial state in your useReducer hook.

const initialState = {
  agreeOnTakeTest: false,
  name: "",
  email: "",
  yearOfExperience: 0,
  rateOptimization: 0,
  github: "",
  linkedin: "",
  phone: "",
  techstack: [
    "ReactJS",
    "HTML",
    "CSS",
    "Javascript",
    "Tailwind CSS",
    "React-Router",
    "React-Query",
  ],
  relocatable: false,
  goal: "",
  achievement: "",
  why: "",
  reason: "",
  currentSalary: 0,
  expectedSalary: 0,
  noticePeriod: 0,
  react: 0,
  typescript: 0,
  next: 0,
  sass: 0,
  figma: 0,
  semanticHtml: 0,
  storybook: 0,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "Set_Fields":
      return {
        ...state,
        [action.field]: action.value,
        // value:type === 'checkbox'?checked : value
      };
  }
};

const JobApplicationForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = async (e) => {
    e.preventDefault();

    console.log(e.target.name);

    const { name, value, checked, type } = e.target;

    dispatch({
      type: "Set_Fields",
      field: name, ////// field: name(this name is like e.target.name value is like e.target.value , attributes of the input field)
      value: type === "checkbox" ? checked : value, // it could be written like this field : name ,value , to use them here extract in e.target object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(
        "Hitting URL:",
        "https://asia-northeast1-willeder-official.cloudfunctions.net/api/apply/frontend"
      );

      console.log(state);
      const response = await axios.post(
        "https://asia-northeast1-willeder-official.cloudfunctions.net/api/apply/frontend",
        state
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
      if (error.response) {
        console.error("Server responded with", error.response.data);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        flexBasis: "120px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {formFields.map((field, index) => (
          <label key={index}>
            {field.fieldName}
            <input
              type={field.type}
              name={field.fieldName}
              value={state[formFields.fieldName]}
              onChange={handleChange}
              checked={
                field.type === "checkbox" ? state[field.fieldName] : undefined
              }
            />
          </label>
        ))}
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
