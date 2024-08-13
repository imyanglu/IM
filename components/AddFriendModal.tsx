import { useRef, useState } from 'react';
import { Pressable, View, Text } from 'react-native';

import AddChatModal from './AddChatModal';
import { router } from 'expo-router';

type AddFriendModal = {
  children: React.ReactNode;
  containerClassName?: string;
};

const AddFriendModal = ({ children, containerClassName }: AddFriendModal) => {
  const btnRef = useRef<View>(null);
  const [showModal, setShowModal] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const addChat = () => {
    router.push('/chat/search');
  };
  const selected = (k: string) => {
    setShowModal(false);
    switch (k) {
      case 'scan':
        break;
      case 'addChat':
        addChat();
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
