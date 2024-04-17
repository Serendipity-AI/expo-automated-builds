import { ExpoConfig, ConfigContext } from '@expo/config';

import * as app from './package.json';

const configVariables = {
    name: 'expo-automated-builds',
    slug: 'expo-automated-builds',
    scheme: 'expo-automated-builds',
    icon: './assets/images/icon.png',
    bundleIdentifier: 'ai.serendipity.expo-automated-builds',
    iosTeamId: '____',
    easProjectId: '____',
};

const IOS_VERSION = app.version;
const IOS_BUILD_NUMBER = 21;
const ANDROID_BUILD_NUMBER = 19;

export default ({ config }: ConfigContext): ExpoConfig => {

    return {
        ...config,
        owner: 'owner',
        name: configVariables.name,
        slug: configVariables.slug,
        scheme: configVariables.scheme,
        version: IOS_VERSION,
        orientation: 'default',
        platforms: ['ios', 'android', 'web'],
        icon: configVariables.icon,
        jsEngine: 'jsc',
        ios: {
            ...config.ios,
            buildNumber: `${IOS_BUILD_NUMBER}`,
            bundleIdentifier: configVariables.bundleIdentifier,
            jsEngine: 'hermes',
            entitlements: {
                'keychain-access-groups': [`${configVariables.iosTeamId}.*`, 'com.apple.token'],
            },
            config: {
                usesNonExemptEncryption: false // needed for app store submission without manual step. Alternatively you can configure encryption settings this in the Apple Developer Console
            },
            supportsTablet: true,
        },
        android: {
            ...config.android,
            package: configVariables.bundleIdentifier,
            versionCode: ANDROID_BUILD_NUMBER,
            icon: configVariables.icon,
        },
    };
};
