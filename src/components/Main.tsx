import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

import { Route, Routes, Navigate } from 'react-router-native';
import Form from './Form';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    // backgroundColor: '#181818',
    backgroundColor: '#000',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<Form />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
