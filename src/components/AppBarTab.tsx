import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    marginRight: 16,
  },
  text: { fontSize: 22 },
});

const AppBarTab = ({
  to,
  children,
  disabled,
  onPress,
}: React.PropsWithChildren<{
  to: string;
  onPress?: () => void;
  disabled?: boolean;
}>) => {
  return (
    <Link to={to} style={styles.tab} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{children}</Text>
    </Link>
  );
};

export default AppBarTab;
