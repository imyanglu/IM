import AntDesign from '@expo/vector-icons/AntDesign';
import Modal from './Modal';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, View, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const Links = [
  {
    key: 'scan',
    label: '扫一扫',
    icon: <Ionicons name="qr-code-sharp" size={20} color="#fff" />,
  },
  { key: 'addChat', label: '添加朋友', icon: <AntDesign name="adduser" size={20} color="#fff" /> },
  {
    key: 'search',
    label: '搜索用户',
    icon: <MaterialIcons name="person-search" size={20} color="#fff" />,
  },
];

type AddChatModal = {
  visible: boolean;
  position: Record<'x' | 'y' | 'w' | 'h', number>;
  onClose: () => void;
};

const AddChatModal = ({ visible, position }: AddChatModal) => {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });
  return (
    <Modal visible={visible} onClose={() => {}}>
      <Animated.View
        className="py-[5px] justify-center absolute  w-[130px] bg-[#434242]  pl-[8px] rounded-[8px]"
        style={[
          {
            height: Links.length * 45 + 10,
            transform: [{ translateY: 38 }, { translateX: -120 }],
            left: position.x + position.w,
            top: position.y,
          },
          ,
          animatedStyle,
        ]}>
        <View className="absolute border-[10px] right-[10px] top-[-18px] border-transparent border-b-[#434242]" />
        {Links.map((link) => (
          <Pressable onPress={() => {}} key={link.key} className="flex-row h-[45px] items-center ">
            <View className="justify-center items-center w-[30px] h-[30px] ">{link.icon}</View>
            <Text className="text-[#fff] ml-[4px] text-[16px]">{link.label}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </Modal>
  );
};
export default AddChatModal;
