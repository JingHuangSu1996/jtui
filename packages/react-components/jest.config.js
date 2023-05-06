const { join } = require('path');

module.exports = {
  displayName: 'react-components',
  rootDir: join(__dirname, '..'),
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
