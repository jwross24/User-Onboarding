import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    terms: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [users, setUsers] = useState([]);
  const [postData, setPostData] = useState([]);

  const formSchema = yup.object().shape({
    name: yup.string().required('You must provide a name.'),
    email: yup
      .string()
      .email('You must provide a valid email address.')
      .notOneOf(['waffle@syrup.com'], 'That email is already taken.')
      .required('You must provide an email address.'),
    password: yup
      .string()
      .required('You must provide a password.')
      .min(8, 'Passwords must be at least 8 characters long.'),
    terms: yup
      .boolean()
      .oneOf([true], 'You must accept the Terms and Conditions.'),
  });

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formSchema, formData]);

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    const updatedInfo = type === 'checkbox' ? checked : value;
    yup
      .reach(formSchema, name)
      .validate(updatedInfo)
      .then(() => {
        setErrors({ ...errors, [name]: '' });
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
      });
    setFormData({ ...formData, [name]: updatedInfo });
  };

  useEffect(() => {
    setUsers((users) => [...users, postData]);
  }, [postData]);

  const formSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted!');
    axios
      .post('https://reqres.in/api/users', formData)
      .then((res) => {
        setPostData(res.data);
        setFormData({
          name: '',
          email: '',
          password: '',
          terms: false,
        });
        console.log('Success!', res);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <form onSubmit={(event) => formSubmit(event)}>
        <label htmlFor="nameInput">
          Name:{' '}
          <input
            id="nameInput"
            value={formData.name}
            name="name"
            type="text"
            onChange={handleChange}
          />
        </label>
        {errors.name.length > 0 && <p className="error">{errors.name}</p>}
        <label htmlFor="emailInput">
          Email:{' '}
          <input
            id="emailInput"
            value={formData.email}
            name="email"
            type="text"
            onChange={handleChange}
          />
        </label>
        {errors.email.length > 0 && <p className="error">{errors.email}</p>}
        <label htmlFor="passwordInput">
          Password:{' '}
          <input
            id="passwordInput"
            value={formData.password}
            name="password"
            type="text"
            onChange={handleChange}
          />
        </label>
        {errors.password.length > 0 && (
          <p className="error">{errors.password}</p>
        )}
        <label htmlFor="termsInput">
          Do you agree to the terms and conditions?
          <input
            id="termsInput"
            type="checkbox"
            name="terms"
            value={formData.terms}
            onChange={handleChange}
          />
        </label>
        {errors.terms.length > 0 && <p className="error">{errors.terms}</p>}
        <button disabled={buttonDisabled}>Submit!</button>
      </form>
      <div className="user-wrapper">
        {users.map((user, index) => (
          <pre key={index}>{JSON.stringify(user, null, 2)}</pre>
        ))}
      </div>
    </>
  );
}
