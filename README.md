# react-native-uport-connect
Library for integrating uPort into your React Native app

## Demo app

[Checkout our demo app](https://github.com/uport-project/uport-react-native-demo)

## Usage

1. `yarn add react-native-uport-connect`
2. Add `"react-native-uport-connect/babel-preset.js"` to `.babelrc`

3. Configure iOS
  - Add URL scheme `{YOUR_DAPP_MNID}` to Info.plist

```xml
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleTypeRole</key>
      <string>Editor</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG</string>
      </array>
    </dict>
  </array>
```
  - Add this code to `AppDelegate.m`

```obj-c
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```


4. Configure Android
  - Add `android:launchMode="singleTask"` and `<data android:scheme="{YOUR_DAPP_MNID}" />` to `src/main/AndroidManifest.xml`

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask"
  >
  <intent-filter
    android:label="@string/app_name"
    android:autoVerify="true"
    >
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG" />
  </intent-filter>
```

## Sample usage

**Warning:** this API will likely change in the near future

```javascript
import configureUportConnect from 'react-native-uport-connect'

const { uport, MNID } = configureUportConnect({
  appName: 'uPort Demo',
  appAddress: '2oeXufHGDpU51bfKBsZDdu7Je9weJ3r7sVG',
  privateKey: 'c818c2665a8023102e430ef3b442f1915ed8dc3abcaffbc51c5394f03fc609e2',
})

const web3 = uport.getWeb3()

uport.requestCredentials({
  requested: ['name', 'avatar'],
}).then((result) => {
  console.log(result)
  console.log(MNID.decode(result.address).address)
}).catch( error => {
  console.log(error)
})

```