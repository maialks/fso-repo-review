// src/components/Spinner.tsx
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  ViewStyle,
  StyleProp,
  AccessibilityProps,
} from 'react-native';

type SpinnerProps = {
  size?: number;
  color?: string;
  trackColor?: string;
  speed?: number;
  style?: StyleProp<ViewStyle>;
} & AccessibilityProps;

const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  color = '#ffffff',
  trackColor = 'rgba(255,255,255,0.15)',
  speed = 800,
  style,
  accessibilityLabel = 'Loading',
  accessible = true,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // animação contínua
    const anim = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: speed,
        useNativeDriver: true,
      }),
    );
    anim.start();

    return () => anim.stop();
  }, [rotateAnim, speed]);

  // interpolamos 0..1 -> 0deg..360deg
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const borderWidth = Math.max(2, Math.round(size * 0.12)); // borda proporcional

  return (
    <Animated.View
      accessible={accessible}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth,
          borderColor: trackColor, // cor do track (todas as bordas)
          borderTopColor: color, // parte "ativa"
          borderLeftColor: trackColor,
          borderRightColor: trackColor,
          borderBottomColor: trackColor,
          transform: [{ rotate: spin }],
        },
        styles.container,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Spinner;
