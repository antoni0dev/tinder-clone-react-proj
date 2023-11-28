import { styled } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

const Modal = ({ title, children, isOpen, setIsOpen }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <Dialog.Description asChild>{children}</Dialog.Description>
          <DialogCloseBtn>X</DialogCloseBtn>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
`;

const DialogContent = styled(Dialog.Content)`
  background-color: #bebebe;
  border-radius: 6px;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 600px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
`;

const DialogTitle = styled(Dialog.Title)`
  margin-top: 15px;
  font-size: 20px;
  line-height: 1.3;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary};
  margin-bottom: 15px;
`;

const DialogCloseBtn = styled(Dialog.Close)`
  position: absolute;
  font-size: 20px;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 50%;

  &:hover {
    background: linear-gradient(45deg, #fe3072, #ff5948);
  }
`;

export default Modal;
