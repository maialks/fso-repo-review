import { SafeAreaView, StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import '@expo/metro-runtime';

import Main from './src/components/Main';
import theme from './src/theme';

export default function App() {
  return (
    <>
      <NativeRouter>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" backgroundColor={theme.colors.appBar} />
          <Main />
        </SafeAreaView>
      </NativeRouter>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fundo escuro
  },
});
