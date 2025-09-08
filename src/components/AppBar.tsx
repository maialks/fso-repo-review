import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { ChevronLeft } from 'lucide-react-native';
import theme from '../theme';

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
const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log('return icon pressed')}>
        <ChevronLeft size={iconSize} stroke={'#fff'} />
      </Pressable>
      <ScrollView
        horizontal
        style={styles.tabsScroll}
        showsHorizontalScrollIndicator={false}
      >
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign In</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
