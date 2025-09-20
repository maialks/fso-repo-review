import { useEffect, useRef } from 'react';
import { Animated, Keyboard } from 'react-native';

const useKeyboardShift = () => {
  const shift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      Animated.timing(shift, {
        toValue: -e.endCoordinates.height / 8,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(shift, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return shift;
};

export default useKeyboardShift;
