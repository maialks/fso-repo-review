import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import AppBarTab from './AppBarTab';

import { Route, Routes, Navigate } from 'react-router-native';
import Form from './SignInForm';
import { useState } from 'react';
import { useApolloClient } from '@apollo/client/react';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#000',
  },
});

const Main = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  /**
   * must be called after client.resetStore / client.clearStore to avoid Apollo `AbortErrors`
   */
  const setAuth = (newState: boolean): void => {
    setAuthenticated(newState);
    setLoading(false);
  };
  const signOut = useSignOut();

  return (
    <View style={styles.container}>
      <AppBar>
        <AppBarTab to="/">Repositories</AppBarTab>
        {authenticated ? (
          <AppBarTab
            to="/signin"
            onPress={async () => {
              setLoading(true);
              await signOut();
              setAuth(false);
              setLoading(false);
            }}
            disabled={loading}
          >
            Sign Out
          </AppBarTab>
        ) : (
          <AppBarTab
            to="/signin"
            disabled={loading}
            onPress={() => setLoading(true)}
          >
            Sign In
          </AppBarTab>
        )}
      </AppBar>
      <Routes>
        <Route path="/signin" element={<Form setAuth={setAuth} />} />
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
