import { useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Size = { w: number; h: number };

const Input = ({
  label,
  value,
  onChangeText,
  containerClassName,
  ...props
}: { label: string; containerClassName?: string } & TextInputProps) => {
  const [containerSize, setContainerSize] = useState<Size>();
  const [labelSize, setLabelSize] = useState<Size>();
  const [status, setStatus] = useState<'idle' | 'focus'>('idle');
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });
  return (
    <Pressable
      className={`relative pt-[22px] pb-[2px] px-[12px]  border-[1px] border-[#ccc] rounded-[12px] ${containerClassName}`}
      onLayout={({ nativeEvent: { layout } }) => {
        if (!containerSize) setContainerSize({ w: layout.width, h: layout.height });
      }}
      onPress={() => {
        console.log('hello world');
        if (!containerSize || !labelSize) return;
        translateX.value = -containerSize.w - labelSize.w;
      }}>
      <Animated.Text
        className={'text-center absolute px-[4px] py-[0px] text-[12px] text-[#ccc]'}
        style={[
          {
            opacity: labelSize ? 1 : 0,
            left: (containerSize?.w ?? 0) / 2 - (labelSize?.w ?? 0) / 2,
            top: (containerSize?.h ?? 0) / 2 - (labelSize?.h ?? 0) / 2,
          },
          ,
          textAnimatedStyle,
        ]}
        onLayout={({ nativeEvent: { layout } }) => {
          setLabelSize({ w: layout.width, h: layout.height });
        }}>
        {label}
      </Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          console.log('hhh');
          if (!containerSize || !labelSize) return;
          const w = (containerSize?.w ?? 0) / 2 - (labelSize?.w ?? 0) / 2 - 4;
          const h = containerSize.h / 2 - labelSize.h / 2;
          translateX.value = withTiming(-w);
          translateY.value = withTiming(-h + 4);
        }}
      />
    </Pressable>
  );
};
export default Input;
