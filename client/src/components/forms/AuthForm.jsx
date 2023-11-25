import * as Form from '@radix-ui/react-form';
import { useState } from 'react';
import { styled } from 'styled-components';
import Button from '../Button';
import { FORM_TYPES, PATHS, BASE_URL } from '../../lib/constants';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, setCookie] = useCookies();
  const navigate = useNavigate();

  if (!type) return;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}${type === FORM_TYPES.REGISTER ? 'signup' : 'login'}`,
        {
          email,
          password,
        }
      );

      setCookie('AuthToken', response.data.token);
      setCookie('UserId', response.data.userId);

      if (type === FORM_TYPES.REGISTER) {
        // On register
        navigate(PATHS.onboardingUsers);
      } else {
        // On login
        navigate(PATHS.dashboard);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormRoot onSubmit={handleSubmit}>
      <FormField name='email'>
        <FormControl asChild>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
          />
        </FormControl>
        <FormMessage match='valueMissing' />
        <FormMessage match='typeMismatch'>
          Please provide a valid email!
        </FormMessage>
      </FormField>
      <FormField name='password'>
        <FormControl
          type='password'
          required
          minLength='8'
          maxLength='50'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />

        <FormMessage match='valueMissing' />
        <FormMessage match='tooLong'>
          Password has to be at most 50 characters
        </FormMessage>
        <FormMessage match='tooShort'>
          Password has to be at least 8 characters
        </FormMessage>
        <FormMessage match='typeMismatch'>
          Please provide a valid password!
        </FormMessage>
      </FormField>
      {type === FORM_TYPES.REGISTER && (
        <FormField name='confirm-password'>
          <FormControl
            type='password'
            required
            min='8'
            max='50'
            placeholder='Confirm password'
          />
          <FormMessage match='valueMissing' />

          <FormMessage match={(value) => value !== password}>
            Passwords do not match!
          </FormMessage>
        </FormField>
      )}
      <Form.Submit asChild>
        <Button variant='accent'>
          {type === FORM_TYPES.REGISTER ? 'Register' : 'Login'}
        </Button>
      </Form.Submit>
    </FormRoot>
  );
};

const FormRoot = styled(Form.Root)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FormField = styled(Form.Field)`
  align-self: stretch;
`;

const FormControl = styled(Form.Control)`
  padding: 5px 8px;
  width: 100%;
  border-radius: 12px;
  border: none;
`;

const FormMessage = styled(Form.FormMessage)`
  display: block;
  margin-top: 5px;
  font-weight: 500;
  color: #ff3333;
  font-size: 14px;
`;

export default AuthForm;
