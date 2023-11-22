import * as Form from '@radix-ui/react-form';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { styled } from 'styled-components';
import { useState } from 'react';
import Button from '../Button';

const OnboardingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    gender: '',
    showGender: false,
    interest: '',
    matches: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target ?? e;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    e;
  };

  return (
    <FormRoot>
      <Form.Field name='firstName'>
        <FormLabel>First Name</FormLabel>
        <Form.Control asChild>
          <TextInput
            type='text'
            min='2'
            max='20'
            placeholder='John'
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </Form.Control>
        <FormMessage match='valueMissing' />
        <FormMessage match='typeMismatch' />
      </Form.Field>
      <Form.Field name='lastName'>
        <FormLabel>Last Name</FormLabel>
        <Form.Control asChild>
          <TextInput
            type='text'
            min='2'
            max='20'
            placeholder='Doe'
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </Form.Control>
        <FormMessage match='valueMissing' />
        <FormMessage match='typeMismatch' />
      </Form.Field>
      <Form.Field name='birthday'>
        <FormLabel>Birthday</FormLabel>
        <Form.Control asChild>
          <TextInput
            type='date'
            min='1950-01-01'
            max='2005-01-01'
            value={formData.birthday}
            onChange={handleInputChange}
            required
          />
        </Form.Control>
        <FormMessage match='valueMissing' />
        <FormMessage match='typeMismatch' />
      </Form.Field>
      <RadioFormField name='gender'>
        <FormLabel>Gender</FormLabel>
        <Form.Control asChild>
          <RadioGroupRoot
            value={formData.gender}
            onValueChange={(value) =>
              handleInputChange({ value, name: 'gender' })
            }
            defaultValue='man'
            aria-label='gender'
          >
            <RadioItemGroup>
              <Item value='man' id='man'>
                <RadioGroupIndicator />
              </Item>
              <Label htmlFor='man'>Man</Label>
            </RadioItemGroup>
            <RadioItemGroup>
              <Item value='woman' id='woman'>
                <RadioGroupIndicator />
              </Item>
              <Label htmlFor='woman'>Woman</Label>
            </RadioItemGroup>
            <RadioItemGroup>
              <Item value='other' id='other'>
                <RadioGroupIndicator />
              </Item>
              <Label htmlFor='other'>Other</Label>
            </RadioItemGroup>
          </RadioGroupRoot>
        </Form.Control>
        <FormMessage match='valueMissing' />
        <FormMessage match='typeMismatch' />
      </RadioFormField>
      <CheckboxFormField>
        <FormLabel>Show gender on my profile</FormLabel>
        <CheckboxRoot
          checked={formData.showGender}
          onCheckedChange={(value) =>
            setFormData({ ...formData, showGender: value })
          }
        >
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </CheckboxRoot>
      </CheckboxFormField>
      <RadioFormField name='interest'>
        <FormLabel>Interested in</FormLabel>
        <Form.Control asChild>
          <RadioGroupRoot
            value={formData.interest}
            onValueChange={(value) =>
              handleInputChange({ value, name: 'interest' })
            }
            defaultValue='interest-man'
            aria-label='interest'
          >
            <RadioItemGroup>
              <Item value='interest-man'>
                <RadioGroupIndicator />
              </Item>
              <Label htmlFor='interest-man'>Man</Label>
            </RadioItemGroup>
            <RadioItemGroup>
              <Item value='interest-woman'>
                <RadioGroupIndicator />
              </Item>
              <Label htmlFor='interest-woman'>Woman</Label>
            </RadioItemGroup>
            <RadioItemGroup>
              <Item value='interest-everyone'>
                <RadioGroupIndicator />
              </Item>
              <Label htmlFor='interest-everyone'>Everyone</Label>
            </RadioItemGroup>
          </RadioGroupRoot>
        </Form.Control>
        <FormMessage match='valueMissing' />
        <FormMessage match='typeMismatch' />
      </RadioFormField>
      <Form.Field name='aboutMe'>
        <FormLabel>About me</FormLabel>
        <Form.Control asChild>
          <TextInput
            type='text'
            value={formData.aboutMe}
            onChange={handleInputChange}
            placeholder='I love BJJ'
          />
        </Form.Control>
        <FormMessage match='valueMissing' />
        <FormMessage match='typeMismatch' />
      </Form.Field>
      <Form.Submit asChild>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </Form.Submit>
    </FormRoot>
  );
};

const FormRoot = styled(Form.Root)`
  display: flex;
  flex-direction: column;
  gap: 35px;
  position: fixed;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
`;

const FormLabel = styled(Form.Label)`
  margin-right: 15px;
  text-align: left;
  display: inline-block;
  min-width: 120px;
`;

const TextInput = styled.input`
  padding: 12px 18px;
  border-radius: 12px;
  border: 0.5px solid #bebebe;
`;

const SubmitButton = styled(Button)`
  border: 1px solid #bebebe;
`;

const FormMessage = styled(Form.FormMessage)`
  display: block;
  margin-top: 5px;
  font-weight: 500;
  color: #ff3333;
  font-size: 14px;
`;

/* Radios */

const RadioFormField = styled(Form.Field)`
  display: flex;
`;

const RadioGroupRoot = styled(RadioGroup.Root)`
  display: inline-flex;
  gap: 15px;
`;

const RadioItemGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Item = styled(RadioGroup.Item)`
  background-color: white;
  border: 0.5px;
  width: 15px;
  height: 15px;
  padding: 0px;

  border-radius: 100%;
  box-shadow: 0 2px 10px black;

  &:hover {
    background-color: #d2cedd;
  }

  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

const Label = styled.label`
  font-size: 16px;
`;

const RadioGroupIndicator = styled(RadioGroup.Indicator)`
  display: flex;

  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #6550b9;
  }
`;

/* Checkbox */

const CheckboxFormField = styled(Form.Field)`
  display: flex;
`;

const CheckboxRoot = styled(Checkbox.Root)`
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 0px black;
`;

export default OnboardingForm;
