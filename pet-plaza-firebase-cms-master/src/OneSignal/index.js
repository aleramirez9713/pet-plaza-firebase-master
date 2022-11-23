window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;

export const initOneSignal = async () => {
  await OneSignal.push(() => {
    OneSignal.init({
      appId: process.env.REACT_APP_ONE_SIGNAL_KEY,
      safari_web_id: process.env.REACT_APP_ONE_SIGNAL_SAFARI_WEB_ID,
      autoResubscribe: true,
      notifyButton: {
        enable: false,
      },
      allowLocalhostAsSecureOrigin: true,
      persistNotification: true,
    });
    OneSignal.showNativePrompt();
  });
};

export const showNativePrompt = () => OneSignal.showNativePrompt();

export const listenerNotifications = async (callback) => {
  await OneSignal.push(() => {
    OneSignal.on("notificationDisplay", (event) => {
      callback(event);
    });
  });
};

export const getUserIdOneSignal = async (callback) => {
  await OneSignal.push(async () => {
    let userId = await OneSignal.getUserId();
    callback(userId);
  });
};

export const isPushNotificationsEnabled = (callback) => {
  OneSignal.push(() => {
    OneSignal.isPushNotificationsEnabled((isEnabled) => {
      callback(isEnabled);
    });
  });
};
