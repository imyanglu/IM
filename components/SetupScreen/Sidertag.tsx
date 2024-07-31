import { View, Text } from 'react-native';

type SidertagProps = {
  label: string;
};
const SideTag = ({ label }: SidertagProps) => {
  return (
    <View>
      <View className="flex-row items-center">
        <View className="bg-[#4e7282] flex-grow-0 pl-[20px] pr-[5px] h-[24px] justify-center items-center">
          <Text className="color-[#fff]">{label}</Text>
        </View>
        <View className="border-[#4e7282] border-[12px] border-t-[transparent] border-r-[transparent]" />
        <View className="h-[24px] overflow-hidden  w-[50px] translate-x-[-22px]">
          <View className="bg-[#4e7282] w-[3px] h-[50px] rotate-[-45deg] translate-x-[20px]" />
        </View>
        <View className="h-[24px] overflow-hidden  w-[50px] translate-x-[-62px]">
          <View className="bg-[#4e7282] w-[6px] h-[50px] rotate-[-45deg] translate-x-[20px]" />
        </View>
      </View>
      <View className="absolute bottom-0 translate-y-[16px] border-[rgb(38,74,90)] border-[8px] flex-row w-0 h-0 border-l-[transparent] border-b-[transparent]" />
    </View>
  );
};

export default SideTag;
