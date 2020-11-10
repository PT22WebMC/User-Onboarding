import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Form() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: true,
  });
  const [buttonDisable, setButtonDisabled] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });
  const [users, setUsers] = useState([]);
  const InputChange = (event) => {
    event.persist();
    const newData = {
      ...formState,
      [event.target.name]:
        event.target.name === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    validateChange(event);
    setFormState(newData);
  };
  const formSchema = yup.object().shape({
    name: yup.string().required("Name field is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email field is required"),
    password: yup.string().required("Password field is required"),
    terms: yup.boolean().oneOf([true], "Please agree with terms of service"),
  });
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);
  console.log("F ", formState);
  const validateChange = (event) => {
    yup
      .reach(formSchema, event.target.name)
      .validate(
        event.target.name === formState.terms
          ? event.target.checked
          : event.target.value
      )
      .then((valid) => {
        setErrors({ ...errors, [event.target.name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [event.target.name]: error.errors[0] });
      });
  };
  const formSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((response) => {
        const newUser = response.data;
        const newUsers = [...users, newUser];
        console.log(response);
        setUsers(newUsers);
        setFormState({
          name: "",
          email: "",
          password: "",
          terms: true,
        });
      })
      .catch((error) => console.log(error.response));
  };
  return (
    <div className='myform'>
      <form onSubmit={formSubmit}>
        <label htmlFor='name'>Name: </label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Full name'
          value={formState.name}
          onChange={InputChange}
        />
        {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}

        <br />

        <label htmlFor='email'>Email: </label>
        <input
          type='text'
          name='email'
          id='email'
          placeholder='email'
          value={formState.email}
          onChange={InputChange}
        />
        {errors.email.length > 0 ? (
          <p className='error'>{errors.email}</p>
        ) : null}

        <br />

        <label htmlFor='pasword'>Password: </label>
        <input
          type='text'
          name='password'
          id='password'
          placeholder='Password'
          value={formState.password}
          onChange={InputChange}
        />
        {errors.password.length > 0 ? (
          <p className='error'>{errors.password}</p>
        ) : null}

        <br />

        <label>
          <input
            type='checkbox'
            name='terms'
            id='terms'
            value={formState.terms}
            onChange={InputChange}
          />{" "}
          Agree terms of service
        </label>
        {errors.terms.length > 0 ? (
          <p className='error'>{errors.terms}</p>
        ) : null}
        <br />
        <button type='submit' disabled={buttonDisable}>
          Submit
        </button>
      </form>
      {users.length > 0
        ? users.map((user) => {
            return (
              <div key={user.id}>
                <h2>Email: {user.email} </h2>
                <h2>Name: {user.name} </h2>
                <h2>Password: {user.password} </h2>
                <h2>Agree to terms: {user.terms} </h2>
              </div>
            );
          })
        : null}
    </div>
  );
}
