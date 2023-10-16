module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {},
  },
  plugins: [
    ['@babel/plugin-proposal-optional-catch-binding'],
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          _components: './app/components',
          _screens: './app/screens',
          _services: './app/services',
          _models: './app/models',
          _theme: './app/theme',
          _DI: './app/DI',
          _navigators: './app/navigators',
          _utils: './app/utils',
          _hooks: './app/hooks',
        },
      },
    ],
  ],
};
