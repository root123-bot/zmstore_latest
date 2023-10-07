import '@testing-library/jest-native/extend-expect';
import './react-16-node-hanging-test-fix'
// import 'leaked-handles'
// leaked.set({
//     fullStack: true, // use full stack traces
//     timeout: 30000, // run every 30 seconds instead of 5.
//     debugSockets: true // pretty print tcp thrown exceptions.
// })
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // https://stackoverflow.com/questions/59587799/how-to-resolve-animated-usenativedriver-is-not-supported-because-the-native
