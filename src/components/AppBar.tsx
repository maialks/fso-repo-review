import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { ChevronLeft } from 'lucide-react-native';
import theme from '../theme';
import { type PropsWithChildren, useRef } from 'react';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 2,
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  tabsScroll: {
    flexDirection: 'row',
    flex: 1,
  },
});

const iconSize = 28;
const AppBar = ({ children }: PropsWithChildren) => {
  const tabScrollRef = useRef<ScrollView | null>(null);

  const onBackwardsTouch = () => {
    if (tabScrollRef) tabScrollRef.current?.scrollTo({ x: 0, animated: true });
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => onBackwardsTouch()}>
        <ChevronLeft size={iconSize} stroke={'#fff'} />
      </Pressable>
      <ScrollView
        horizontal
        style={styles.tabsScroll}
        showsHorizontalScrollIndicator={false}
        ref={tabScrollRef}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default AppBar;
