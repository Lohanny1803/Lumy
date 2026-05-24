import {AppRegistry} from 'react-native';
import App from '../App';
import appConfig from '../app.json';
import MaterialIconsFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

const iconFontStyles = `@font-face {
  src: url(${MaterialIconsFont});
  font-family: MaterialIcons;
}`;
const style = document.createElement('style');
style.appendChild(document.createTextNode(iconFontStyles));
document.head.appendChild(style);

const appName = appConfig.name;

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
