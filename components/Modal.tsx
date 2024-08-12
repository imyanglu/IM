import { ReactNode } from 'react';
import { Modal as NativeModal, Pressable } from 'react-native';
type Modal = {
  children: ReactNode;
  onClose: () => void;
  visible: boolean;
};

const Modal = ({ children }: Modal) => {
  return (
    <NativeModal transparent visible statusBarTranslucent>
      <Pressable className="absolute top-0 left-0 right-0 bottom-0 bg-[#00000010]">
        {children}
      </Pressable>
    </NativeModal>
  );
};
export default Modal;
