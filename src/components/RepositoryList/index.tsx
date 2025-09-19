import { FlatList, View, StyleSheet } from 'react-native';
import type { Repository } from '../../types';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepository';
import Spinner from '../Spinner';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { loading, repositories } = useRepositories();

  if (loading)
    return <Spinner style={{ alignSelf: 'center', marginTop: '100%' }} />;

  const repositoryNodes: Repository[] = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return <RepositoryItem {...item} />;
      }}
      keyExtractor={(item) => item.id}
      style={{ marginTop: 10 }}
    />
  );
};

export default RepositoryList;
