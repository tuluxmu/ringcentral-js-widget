import SDK from 'ringcentral';
import RingCentralClient from 'ringcentral-client';
import { combineReducers } from 'redux';

import RcModule from 'ringcentral-integration/lib/RcModule';

import AccountExtension from 'ringcentral-integration/modules/AccountExtension';
import AccountInfo from 'ringcentral-integration/modules/AccountInfo';
import Alert from 'ringcentral-integration/modules/Alert';
import Auth from 'ringcentral-integration/modules/Auth';
import Brand from 'ringcentral-integration/modules/Brand';
import Call from 'ringcentral-integration/modules/Call';
import CallingSettings from 'ringcentral-integration/modules/CallingSettings';
import ConnectivityMonitor from 'ringcentral-integration/modules/ConnectivityMonitor';
import DialingPlan from 'ringcentral-integration/modules/DialingPlan';
import Environment from 'ringcentral-integration/modules/Environment';
import ExtensionInfo from 'ringcentral-integration/modules/ExtensionInfo';
import ExtensionPhoneNumber from 'ringcentral-integration/modules/ExtensionPhoneNumber';
import ForwardingNumber from 'ringcentral-integration/modules/ForwardingNumber';
import GlobalStorage from 'ringcentral-integration/modules/GlobalStorage';
import Locale from 'ringcentral-integration/modules/Locale';
import Presence from 'ringcentral-integration/modules/Presence';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import Ringout from 'ringcentral-integration/modules/Ringout';
import RolesAndPermissions from 'ringcentral-integration/modules/RolesAndPermissions';
import Softphone from 'ringcentral-integration/modules/Softphone';
import Storage from 'ringcentral-integration/modules/Storage';
import Subscription from 'ringcentral-integration/modules/Subscription';
import TabManager from 'ringcentral-integration/modules/TabManager';
import RouterInteraction from '../src/modules/RouterInteraction';

export default class Phone extends RcModule {
  constructor({
    apiConfig,
    brandConfig,
    appVersion,
    ...options,
  }) {
    super();
    this.addModule('client', new RingCentralClient(new SDK({
      ...options,
      ...apiConfig,
    })));
    this.addModule('alert', new Alert({
      ...options,
      getState: () => this.state.alert,
    }));
    this.addModule('brand', new Brand({
      ...options,
      ...brandConfig,
      getState: () => this.state.brand,
    }));
    this.addModule('softphone', new Softphone({
      ...options,
      brand: this.brand,
    }));
    this.addModule('locale', new Locale({
      ...options,
      getState: () => this.state.locale,
    }));
    this.addModule('tabManager', new TabManager({
      ...options,
      getState: () => this.state.tabManager,
    }));
    this.addModule('globalStorage', new GlobalStorage({
      ...options,
      getState: () => this.state.globalStorage,
    }));
    this.addModule('environment', new Environment({
      ...options,
      client: this.client,
      globalStorage: this.globalStorage,
      sdkConfig: {
        ...apiConfig,
      },
      getState: () => this.state.environment,
    }));
    this.addModule('auth', new Auth({
      ...options,
      alert: this.alert,
      brand: this.brand,
      client: this.client,
      environment: this.environment,
      locale: this.locale,
      tabManager: this.tabManager,
      getState: () => this.state.auth,
    }));
    this.addModule('ringout', new Ringout({
      ...options,
      auth: this.auth,
      client: this.client,
      getState: () => this.state.ringout,
    }));
    this.addModule('connectivityMonitor', new ConnectivityMonitor({
      ...options,
      client: this.client,
      environment: this.environment,
      getState: () => this.state.connectivityMonitor,
    }));
    this.addModule('rateLimiter', new RateLimiter({
      ...options,
      client: this.client,
      environment: this.environment,
      globalStorage: this.globalStorage,
      getState: () => this.state.rateLimiter,
    }));
    this.addModule('storage', new Storage({
      ...options,
      auth: this.auth,
      getState: () => this.state.storage,
    }));
    this.addModule('accountExtension', new AccountExtension({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.accountExtension,
    }));
    this.addModule('accountInfo', new AccountInfo({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.accountInfo,
    }));
    this.addModule('extensionInfo', new ExtensionInfo({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.extensionInfo,
    }));
    this.addModule('rolesAndPermissions', new RolesAndPermissions({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      extensionInfo: this.extensionInfo,
      tabManager: this.tabManager,
      getState: () => this.state.rolesAndPermissions,
    }));
    this.addModule('dialingPlan', new DialingPlan({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.dialingPlan,
    }));
    this.addModule('extensionPhoneNumber', new ExtensionPhoneNumber({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.extensionPhoneNumber,
    }));
    this.addModule('forwardingNumber', new ForwardingNumber({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.forwardingNumber,
    }));
    this.addModule('regionSettings', new RegionSettings({
      ...options,
      storage: this.storage,
      extensionInfo: this.extensionInfo,
      dialingPlan: this.dialingPlan,
      alert: this.alert,
      tabManager: this.tabManager,
      getState: () => this.state.regionSettings,
    }));
    this.addModule('callingSettings', new CallingSettings({
      ...options,
      alert: this.alert,
      brand: this.brand,
      extensionInfo: this.extensionInfo,
      extensionPhoneNumber: this.extensionPhoneNumber,
      forwardingNumber: this.forwardingNumber,
      storage: this.storage,
      rolesAndPermissions: this.rolesAndPermissions,
      tabManager: this.tabManager,
      getState: () => this.state.callingSettings,
    }));
    this.addModule('call', new Call({
      ...options,
      alert: this.alert,
      client: this.client,
      storage: this.storage,
      regionSettings: this.regionSettings,
      callingSettings: this.callingSettings,
      softphone: this.softphone,
      ringout: this.ringout,
      accountExtension: this.accountExtension,
      getState: () => this.state.call,
    }));
    this.addModule('subscription', new Subscription({
      ...options,
      auth: this.auth,
      client: this.client,
      storage: this.storage,
      tabManager: this.tabManager,
      getState: () => this.state.subscription,
    }));
    this.addModule('presence', new Presence({
      ...options,
      auth: this.auth,
      client: this.client,
      subscription: this.subscription,
      getState: () => this.state.presence,
    }));
    this.addModule('router', new RouterInteraction({
      ...options,
      getState: () => this.state.router,
    }));
    this._reducer = combineReducers({
      accountExtension: this.accountExtension.reducer,
      accountInfo: this.accountInfo.reducer,
      alert: this.alert.reducer,
      auth: this.auth.reducer,
      app: (state = {
        name: brandConfig.appName,
        version: appVersion,
      }) => state,
      call: this.call.reducer,
      callingSettings: this.callingSettings.reducer,
      connectivityMonitor: this.connectivityMonitor.reducer,
      environment: this.environment.reducer,
      extensionInfo: this.extensionInfo.reducer,
      extensionPhoneNumber: this.extensionPhoneNumber.reducer,
      forwardingNumber: this.forwardingNumber.reducer,
      brand: this.brand.reducer,
      dialingPlan: this.dialingPlan.reducer,
      locale: this.locale.reducer,
      storage: this.storage.reducer,
      globalStorage: this.globalStorage.reducer,
      presence: this.presence.reducer,
      rateLimiter: this.rateLimiter.reducer,
      rolesAndPermissions: this.rolesAndPermissions.reducer,
      regionSettings: this.regionSettings.reducer,
      ringout: this.ringout.reducer,
      router: this.router.reducer,
      subscription: this.subscription.reducer,
      tabManager: this.tabManager.reducer,
      lastAction: (state = null, action) => {
        console.log(action);
        return action;
      },
    });
  }

  get name() {
    return this.state.app.name;
  }

  get version() {
    return this.state.app.version;
  }
}
