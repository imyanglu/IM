import { useRef, useState } from 'react';
import { Modal, Pressable, View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AddChatModal from './AddChatModal';

type AddFriendModal = {
  children: React.ReactNode;
  containerClassName?: string;
};

const Links = [
  {
    key: 'scan',
    label: '扫一扫',
    icon: <Ionicons name="qr-code-sharp" size={20} color="#fff" />,
  },
  { key: 'addChat', label: '发起聊天', icon: <AntDesign name="adduser" size={20} color="#fff" /> },
  {
    key: 'search',
    label: '搜索用户',
    icon: <MaterialIcons name="person-search" size={20} color="#fff" />,
  },
];

const AddFriendModal = ({ children, containerClassName }: AddFriendModal) => {
  const btnRef = useRef<View>(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const selected = (k: string) => {
    switch (k) {
      case 'addChar':
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
      <AddChatModal visible={showModal} position={position} onClose={() => setShowModal(false)} />
    </>
  );
};
export default AddFriendModal;
