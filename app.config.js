import 'dotenv/config';

export default {
  expo: {
    name: 'repo-review',
    slug: 'repo-review',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#000000',
      },
      softwareKeyboardLayoutMode: 'pan',
      package: 'com.lkmss.reporeview',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      env: process.env,
    },
    plugins: [
      [
        'expo-font',
        {
          android: {
            fonts: [
              {
                fontFamily: 'Arial',
                fontDefinitions: [
                  {
                    path: './assets/fonts/arial.ttf',
                    weight: 400,
                  },
                  {
                    path: './assets/fonts/arialbd.ttf',
                    weight: 700,
                  },
                ],
              },
            ],
          },
          ios: {
            fonts: [
              {
                fontFamily: 'Arial',
                fontDefinitions: [
                  {
                    path: './assets/fonts/arial.ttf',
                    weight: 400,
                  },
                  {
                    path: './assets/fonts/arialbd.ttf',
                    weight: 700,
                  },
                ],
              },
            ],
          },
        },
      ],
    ],
  },
};
