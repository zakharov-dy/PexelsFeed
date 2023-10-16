import {Platform} from 'react-native';

export const ANDROID_STATUS_BAR_HEIGHT = 24;

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';

export const keyboardAvoidingViewBehavior = isIOS ? 'padding' : undefined;
