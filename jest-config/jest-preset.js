// https://stackoverflow.com/questions/65753374/react-native-test-failed-when-using-formik-and-yup-as-validation-schema

const reactNativePreset = require('react-native/jest-preset');

module.exports = Object.assign({}, reactNativePreset, {
  setupFiles: [require.resolve('./save-promise.js')]
    .concat(reactNativePreset.setupFiles)
    .concat([require.resolve('./restore-promise.js')]),
});
