export const signUpInputes = [
  {
    label: "First Name",
    name: "fName",
    type: "text",
    required: true,
    placeholder: "Your first name",
  },
  {
    label: "Last Name",
    name: "lName",
    type: "text",
    required: true,
    placeholder: "Your last name ",
  },
  {
    label: " Email",
    name: "email",
    type: "text",
    required: true,
    placeholder: "Your email",
  },
  {
    label: "Phone Number",
    name: "phone", // <-- rename to match backend validator
    type: "text", // <-- keep phone as text (handles +61 / leading 0)
    required: true,
    placeholder: "e.g. +61412...",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
    placeholder: "xxxxx",
  },
  {
    label: "Confrim Password",
    name: "confirmPassword",
    type: "password",
    required: true,
    placeholder: "xxxxx",
  },
];
