import { useRef, useState } from 'react';
import { Pressable, View, Text } from 'react-native';

import AddChatModal from './AddChatModal';

type AddFriendModal = {
  children: React.ReactNode;
  containerClassName?: string;
};

const AddFriendModal = ({ children, containerClassName }: AddFriendModal) => {
  const btnRef = useRef<View>(null);
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const selected = (k: string) => {
    console.log(k);
    setShowModal(false);
    switch (k) {
      case 'scan':
        break;
      case 'addCha':
        break;
      case 'search':
        break;
    }
  };

  return (
    <>
      <Pressable
        ref={btnRef}
        onLayout={() => {
          btnRef.current?.measure((_, _y, w, h, px, py) => {
            setPosition({ x: px, y: py, w, h });
          });
        }}
        onPress={() => {
          setShowModal(true);
        }}
        className={`relative ${containerClassName} `}>
        {children}
      </Pressable>
      <AddChatModal
        visible={showModal}
        position={position}
        onClose={() => setShowModal(false)}
        onSelect={selected}
      />
    </>
  );
};
export default AddFriendModal;
