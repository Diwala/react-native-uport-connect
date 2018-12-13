# react-native-uport-connect
Library for integrating uPort into your React Native app

## Demo app

[Checkout our demo app](https://github.com/uport-project/uport-react-native-demo)

## Installation

1. `yarn add react-native-uport-connect`
2. Add `"react-native-uport-connect/babel-preset.js"` to `.babelrc`

3. Configure iOS
  - Add custom URL scheme `uportdemoapp` to Info.plist

```xml
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleTypeRole</key>
      <string>Editor</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>uportdemoapp</string>
      </array>
    </dict>
  </array>
  <key>LSApplicationQueriesSchemes</key>
  <array>
    <string>me.uport</string>
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
  - Add `android:launchMode="singleTask"` and `<data android:scheme="mnid{YOUR_DAPP_MNID}" />` to `src/main/AndroidManifest.xml`

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
    <data android:scheme="uportdemoapp" />
  </intent-filter>
```

## Usage

```javascript
import configureUportConnect, { isUportAppInstalled } from 'react-native-uport-connect'
import Web3 from 'web3'

const uport = configureUportConnect({
  appName: 'uPort Demo',
  appUrlScheme: 'uportdemoapp',
  did: 'did:ethr:0xa2d0905267a93995ba1b98a449e1aebbbbf1c57f',
  privateKey: '7ab83c1068eca322c7e15b9137bd80387a1ff1c2307d8ba8b73d822713f67ecb',
  vc: ['/ipfs/QmcsqEgFwfJE5jo43DW495sKSY9GiYJ2ZstNyjiM3vjvpM'],
})

const web3 = new Web3(uport.getProvider())

uport.onResponse('disclosureReq').then(res => console.log(res.payload))

isUportAppInstalled().then(isInstalled => {
  if(isInstalled) {
    uport.requestDisclosure({
      requested: ['name', 'avatar'],
      accountType: 'keypair',
      network_id: '0x4',
      notifications: false,
    })
  } else {
    Alert.alert('uPort app not installed')
  }
})

```