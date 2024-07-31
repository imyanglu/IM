import { View, Text } from 'react-native';

const Separator = () => {
  return (
    <View className="flex-row w-full h-[6px] ">
      <View className="bg-[#4e7282] h-full basis-[35%]" />
      <View className="border-[#5eb1c5] border-t-[transparent] border-r-[transparent] border-[3px]" />
      <View className="border-[#999] border-b-[transparent] border-l-[transparent] border-[3px] translate-x-[-1px]" />
      <View className="bg-[#999] flex-1 translate-x-[-1px]" />
    </View>
  );
};

export default Separator;
