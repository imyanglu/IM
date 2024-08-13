import { ReactNode } from 'react';
import { Modal as NativeModal, Pressable } from 'react-native';
type Modal = {
  children: ReactNode;
  onBgClick: () => void;
  visible: boolean;
};

const Modal = ({ children, visible, onBgClick }: Modal) => {
  return (
    <NativeModal transparent visible={visible} statusBarTranslucent>
      <Pressable
        className="absolute top-0 left-0 right-0 bottom-0 bg-[#00000010]"
        onPress={onBgClick}
      />
      {children}
    </NativeModal>
  );
};
export default Modal;
