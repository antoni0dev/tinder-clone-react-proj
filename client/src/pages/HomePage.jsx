import { styled } from 'styled-components';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import AuthForm from '../components/forms/AuthForm';
import { FORM_TYPES } from '../lib/constants';
import Typography from '../components/Typography';

const HomePage = () => {
  const userInfo = false;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState();

  const openModal = () => setIsModalOpen(true);

  const handleOpenLoginFormModal = () => {
    setFormType(FORM_TYPES.LOGIN);
    openModal();
  };

  const handleOpenRegisterFormModal = () => {
    setFormType(FORM_TYPES.REGISTER);
    openModal();
  };

  return (
    <Overlay>
      <Navbar openModal={handleOpenLoginFormModal} minimal={false} />
      <ContentWrapper>
        <SignupSectionWrapper>
          <LandingHeading variant='xl'>Swipe Right</LandingHeading>
          <Button variant='accent' onClick={handleOpenRegisterFormModal}>
            {userInfo ? 'Sign out' : 'Create Account'}
          </Button>
        </SignupSectionWrapper>
        {createPortal(
          <Modal
            title={
              formType === FORM_TYPES.REGISTER
                ? 'Create your account on Tinder!'
                : 'Log into your account!'
            }
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          >
            <AuthForm type={formType} />
          </Modal>,
          document.getElementById('landing-page-overlay')
        )}
      </ContentWrapper>
    </Overlay>
  );
};

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url('/landing-page-pic.webp');

  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LandingHeading = styled(Typography)`
  color: white;
`;

const SignupSectionWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* SAME VALUE AS THE HEIGHT OF THE NAVBAR TO MAKE SURE THIS IS CENTERED ON THE PAGE */
  margin-bottom: 70px;
`;

export default HomePage;
