import { ReactNode, useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const CountdownTimer = ({ seconds, onTimeDown }: { seconds: number; onTimeDown: () => void }) => {
  const [s, setS] = useState(seconds + '');
  useEffect(() => {
    const nowDate = new Date().getTime();
    const interval = setInterval(() => {
      const time = new Date().getTime();
      const timeInterval = (seconds - (time - nowDate) / 1000).toFixed(0);
      if (Number(timeInterval) === 0) {
        clearInterval(interval);
        onTimeDown();
      }
      setS(timeInterval);
    }, 1000);
  }, [seconds]);
  return (
    <View>
      <Text className="text-[#fff]">{s}</Text>
    </View>
  );
};
export default CountdownTimer;
