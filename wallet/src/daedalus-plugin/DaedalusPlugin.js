import AccountRegisterPage from './ui/AccountRegisterPage';
import AccountStatus from './ui/AccountStatus';
import Bridge from './Bridge';

export default class DaedalusPlugin {
  initializePlugin(pluginContext) {
    this._pluginContext = pluginContext;

    pluginContext.addPage('/register-account', AccountRegisterPage);
    pluginContext.addElement('home-top', AccountStatus);

    this.bridge = new Bridge();
  }
}
