import { View, StyleSheet, Image } from 'react-native';
import Text from './../Text';
import type { Repository as ItemProps } from '../../types';
import theme from '../../theme';
import { CircleSmall, GitFork, Star, StarHalf } from 'lucide-react-native';
import { addAlphaChannel } from '../../utils/generic';

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    JavaScript: '#b45309',
    TypeScript: '#1d4ed8',
    Python: '#047857',
    Java: '#9a3412',
    'C#': '#6b21a8',
    PHP: '#4338ca',
    'C++': '#9d174d',
    CSS: '#86198f',
    HTML: '#991b1b',
    Ruby: '#9f1239',
    Go: '#155e75',
  };
  return colors[language] || theme.colors.textSecondary;
};

const formatNum = (num: number): string =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num.toString();

const Rating = ({ ratingAverage }: { ratingAverage: number }) => {
  const fullStars = Math.floor(ratingAverage / 20);
  const halfStar = ratingAverage % 20 >= 0.5;

  return (
    <View style={styles.starsContainer}>
      {/* Stars de fundo */}
      <View style={styles.starRow}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={`empty-${index}`} size={14} fill="#111" stroke="#fbbf24" />
        ))}
      </View>

      {/* Stars preenchidas */}
      <View
        style={[
          styles.starRow,
          styles.starsOverlay,
          { width: (ratingAverage / 100) * 5 * 14 },
        ]}
      >
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            size={14}
            fill="#fbbf24"
            stroke="#fbbf24"
          />
        ))}
        {halfStar && (
          <StarHalf key="half" size={14} fill="#fbbf24" stroke="#fbbf24" />
        )}
      </View>

      <Text color="textSecondary" style={styles.ratingText}>
        {`Rating: \n${ratingAverage} / 100`}
      </Text>
    </View>
  );
};

function RepositoryItem(repo: ItemProps) {
  return (
    <View style={styles.container}>
      {/* Desc and Avatar */}
      <View style={styles.topContainer}>
        <Image
          source={{ uri: repo.ownerAvatarUrl }}
          style={{
            alignSelf: 'center',
            marginRight: 10,
            borderRadius: 30,
          }}
          height={50}
          width={50}
          resizeMode="contain"
        />
        <View style={styles.titleAndDesc}>
          <Text fontSize="heading" fontWeight="bold">
            {repo.fullName}
          </Text>
          <Text color="textSecondary" numberOfLines={3}>
            {repo.description}
          </Text>
          {/* Rating */}
        </View>
        <Rating ratingAverage={repo.ratingAverage} />
      </View>
      <View style={styles.statsRow}>
        {/* Lang */}
        <View style={styles.statItem}>
          <View style={[styles.statRow, { alignSelf: 'flex-start' }]}>
            <CircleSmall size={14} fill={getLanguageColor(repo.language)} />
            <Text fontSize="subheading"> {repo.language}</Text>
          </View>
        </View>
        {/* Stars */}
        <View style={styles.statItem}>
          <View style={styles.statRow}>
            <Star size={14} stroke="#fff" />
            <Text fontSize="subheading" style={styles.statText}>
              {formatNum(repo.stargazersCount)}
            </Text>
          </View>
        </View>
        {/* Forks */}
        <View style={styles.statItem}>
          <View style={styles.statRow}>
            <GitFork size={14} stroke={'#fff'} />
            <Text fontSize="subheading">{formatNum(repo.forksCount)}</Text>
          </View>
        </View>
        {/* Reviews */}
        <View style={styles.statItem}>
          <Text fontSize="subheading">
            {formatNum(repo.reviewCount)} Reviews
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: addAlphaChannel(theme.colors.primary, 35),
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 15,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  topContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  titleAndDesc: {
    flex: 1,
    marginRight: 4,
  },
  statsRow: {
    flexDirection: 'row',
    paddingTop: 8,
    borderTopColor: addAlphaChannel('#ffffff', 8),
    borderTopWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 2,
  },
  starsContainer: {
    position: 'relative',
    width: 5 * 14,
  },
  starRow: {
    flexDirection: 'row',
  },
  starsOverlay: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
  },
  ratingText: {
    paddingTop: 2,
  },
});

export default RepositoryItem;
