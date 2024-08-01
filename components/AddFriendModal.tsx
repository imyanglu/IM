import { useRef, useState } from 'react';
import { Modal, Pressable, View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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
  const [showModal, setShowModal] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });
  const selected = (k: string) => {};
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
          opacity.value = withTiming(1);
          setShowModal(true);
        }}
        className={`relative ${containerClassName} `}>
        {children}
        {
          <Modal statusBarTranslucent visible={showModal} transparent>
            <Pressable
              onPress={() => {
                setShowModal(false);
                opacity.value = withTiming(0);
              }}
              className="absolute top-0 left-0 right-0 bottom-0 bg-[#00000010]"
            />
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
              {Links.map((link) => (
                <Pressable
                  onPress={() => {
                    selected(link.key);
                  }}
                  key={link.key}
                  className="flex-row h-[45px] items-center ">
                  <View className="justify-center items-center w-[30px] h-[30px] ">
                    {link.icon}
                  </View>
                  <Text className="text-[#fff] ml-[4px] text-[16px]">{link.label}</Text>
                </Pressable>
              ))}
            </Animated.View>
          </Modal>
        }
      </Pressable>
    </>
  );
};
export default AddFriendModal;
