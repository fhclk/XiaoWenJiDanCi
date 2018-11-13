package com.misses;

import com.baidu.tts.client.SpeechSynthesizer;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class VoiceModule extends ReactContextBaseJavaModule {

    private VoiceUtils utis;
    private SpeechSynthesizer mSpeechSynthesizer;

    public VoiceModule(ReactApplicationContext reactContent) {
        super(reactContent);
    }

    @Override
    public String getName() {
        return "VoiceModule";
    }

    @ReactMethod
    public void speak(String msg, int speaker) {
        utis = new VoiceUtils();
        utis.init(getReactApplicationContext(), speaker);
        mSpeechSynthesizer = utis.getSyntheszer();
        this.mSpeechSynthesizer.speak(msg);
    }

    @Override
    public void onCatalystInstanceDestroy() {
        this.mSpeechSynthesizer.release();
        super.onCatalystInstanceDestroy();
    }
}
