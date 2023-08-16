import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LogBox} from 'react-native';
import GameScreen from './Rapidpages/GameScreen.js';

LogBox.ignoreAllLogs();

const App = createStackNavigator(
  {
    GameScreen: {
      screen: GameScreen,
      navigationOptions: {
        headerShown: false, // Hide the header for this screen
      },
    },
  },
  {
    initialRouteName: 'GameScreen',
  },
);
export default createAppContainer(App);
