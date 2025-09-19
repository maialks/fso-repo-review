import { SafeAreaView, StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import '@expo/metro-runtime';
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/apolloClient';

import Main from './src/components/Main';
import theme from './src/theme';

const apolloClient = createApolloClient();

export default function App() {
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <SafeAreaView style={styles.container}>
            <StatusBar style="light" backgroundColor={theme.colors.appBar} />
            <Main />
          </SafeAreaView>
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
