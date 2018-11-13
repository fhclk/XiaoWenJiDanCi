import Root from './src';

//忽略react-navigation的isMounted警告
console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated in plain JavaScript React classes. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.'];

if (__DEV__) {
    global.XMLHttpRequest = global.originalXMLHttpRequest ?
        global.originalXMLHttpRequest :
        global.XMLHttpRequest;
    global.FormData = global.originalFormData ?
        global.originalFormData :
        global.FormData;
    global.Blob = global.originalBlob ?
        global.originalBlob :
        global.Blob;
    global.FileReader = global.originalFileReader ?
        global.originalFileReader :
        global.FileReader;
}
