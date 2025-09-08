import { StyleSheet } from 'react-native';
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
}: React.PropsWithChildren<{ to: string }>) => {
  return (
    <Link to={to} style={styles.tab}>
      <Text style={styles.text}>{children}</Text>
    </Link>
  );
};

export default AppBarTab;
