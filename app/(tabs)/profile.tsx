import { PageBg } from '@/components';
import { MeContext } from '@/Contexts/MeContext';
import { Image } from 'expo-image';
import { useContext } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Profile = () => {
  const [me] = useContext(MeContext);
  const { top } = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-[#fff] px-[16px] relative" style={{ paddingTop: top }}>
      <PageBg />
      <View>
        {me.avatar && (
          <Image
            source={{ uri: me.avatar }}
            className="w-[80px] h-[80px] rounded-[40px] bg-slate-400"
          />
        )}
      </View>
    </View>
  );
};
export default Profile;
