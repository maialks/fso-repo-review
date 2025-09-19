import type { Theme } from './types';
import { Platform } from 'react-native';

const theme: Theme = {
  colors: {
    textPrimary: '#f3f4f6',
    textSecondary: '#808894',
    primary: '#1f2937',
    appBar: '#4d0d0b',
    error: '#ae2012',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
