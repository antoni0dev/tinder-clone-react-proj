import * as Form from '@radix-ui/react-form';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Button from '../Button';
import { FORM_TYPES, PATHS } from '../../lib/constants';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuthenticateUserMutation } from '../../lib/queries/useAuthenticateUserMutation';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, setCookie] = useCookies();
  const navigate = useNavigate();

  const {
    mutate: handleAuthenticateUser,
    isSuccess,
    isPending,
    data,
    error,
  } = useAuthenticateUserMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleAuthenticateUser({ authType: type, data: { email, password } });
  };

  useEffect(() => {
    if (isSuccess) {
      setCookie('AuthToken', data.token);
      setCookie('UserId', data.userId);

      if (type === FORM_TYPES.REGISTER) {
        // On register
        navigate(PATHS.onboardingUsers);
      } else {
        // On login
        navigate(PATHS.dashboard);
      }
    }
  }, [isSuccess, navigate, setCookie, data, type]);

  if (!type) {
    console.error('Specifying an auth type is mandatory!');
    return;
  }

  return (
    <FormRoot onSubmit={handleSubmit}>
      <FormField name='email'>
        <FormControl asChild>
          <input
            disabled={isPending}
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
          disabled={isPending}
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
            disabled={isPending}
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
        <Button disabled={isPending} variant='accent'>
          {type === FORM_TYPES.REGISTER ? 'Register' : 'Login'}
        </Button>
      </Form.Submit>
      <p style={{ color: '#ff3333' }}>{error}</p>
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
  padding: 4px 12px;
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
