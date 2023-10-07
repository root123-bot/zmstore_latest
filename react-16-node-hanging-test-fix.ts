// https://github.com/callstack/react-native-testing-library/issues/1283#issuecomment-1402805813
// See https://github.com/facebook/react/issues/20756
// This fix is only useful in a test environment with
// Node 15+, jsdom, and React < 17.1.0.

// It must be imported *before* any imports of 'react-dom'.

const version = require('react').version;
const semverGt = require('semver/functions/gt');

if (Object.prototype.toString.call(process) !== '[object process]') {
  throw Error(
    'The `react-16-node-hanging-test-fix` package must only be used in a Node environment. ' +
    'Remove this import from your application code.'
  );
}

if (semverGt(version, '17.0.2')) {
  console.error(
    'The `react-16-node-hanging-test-fix` package is no longer needed ' +
    'with React ' + version + ' and may cause issues. Remove this import.'
  )
}

// This is the "fix".
delete global.MessageChannel;