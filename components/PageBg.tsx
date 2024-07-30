import { Image } from 'expo-image';
import { View } from 'react-native';

const PageBg = () => {
  return (
    <View className="absolute top-0 bottom-0 left-0 right-0 z-[-1]">
      <Image className="h-full w-full" source={require('@/assets/images/bg.png')} />
    </View>
  );
};

export default PageBg;
