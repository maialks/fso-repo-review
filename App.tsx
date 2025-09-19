import { StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import '@expo/metro-runtime';
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
const authStorage = new AuthStorage('accessToken');

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStorageContext from './src/contexts/AuthStorageContext';

import Main from './src/components/Main';
import theme from './src/theme';

const apolloClient = createApolloClient(authStorage);

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <SafeAreaProvider style={styles.container}>
              <StatusBar style="light" backgroundColor={theme.colors.appBar} />
              <Main />
            </SafeAreaProvider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
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
