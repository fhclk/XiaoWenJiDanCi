//
//  BDVoiceManager.m
//  Misses
//
//  Created by xy on 2018/11/6.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "BDVoiceManager.h"

#import "BDSSpeechSynthesizer.h"
#import <AVFoundation/AVFoundation.h>

#define READ_SYNTHESIS_TEXT_FROM_FILE (NO)
static BOOL isSpeak = YES;
static BOOL textFromFile = READ_SYNTHESIS_TEXT_FROM_FILE;
static BOOL displayAllSentences = !READ_SYNTHESIS_TEXT_FROM_FILE;

//#error 请在官网新建app，配置bundleId，并在此填写相关参数
NSString* APP_ID = @"14656116";
NSString* API_KEY = @"BXP2SGKzjbvouLcY2wXBbpx2";
NSString* SECRET_KEY = @"vtHWAIaYfpyWEHcmi05YGkTy9mT3vEMh";

#define TestNativeJsonData @"{\"callback1\":\"123\",\"callback2\":\"asd\"}"

@implementation BDVoiceManager
{
  RCTPromiseResolveBlock _resolveBlock;
  RCTPromiseRejectBlock _rejectBlock;
}
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initBaiduVoiceSDK) {
  [self configureSDK];
}

RCT_EXPORT_METHOD(speak:(NSString *)logString) {
  [self speakContent:logString];
}

RCT_EXPORT_METHOD(setVoiceSpeed:(int)speed) {
  [self setSpeed:speed];
}

RCT_EXPORT_METHOD(setVoicePitch:(int)pitch) {
  [self setPitch:pitch];
}

RCT_EXPORT_METHOD(cancelSpeak) {
  [self cancel];
}

RCT_EXPORT_METHOD(setVoiceVolume:(float)volume) {
  [self setPlayerVolume:volume];
}


-(void)speakContent:(NSString*)text {
  NSAttributedString* string = [[NSAttributedString alloc] initWithString:text];
  NSError* err = nil;
  [[BDSSpeechSynthesizer sharedInstance] speakSentence:[string string] withError:&err];
  if(err == nil){
    
  }
}


-(void)configureSDK{
  NSLog(@"TTS version info: %@", [BDSSpeechSynthesizer version]);
  [BDSSpeechSynthesizer setLogLevel:BDS_PUBLIC_LOG_VERBOSE];
//  [[BDSSpeechSynthesizer sharedInstance] setSynthesizerDelegate:self];
  [self configureOnlineTTS];
  [self configureOfflineTTS];
  
}


-(void)configureOnlineTTS{
  
  [[BDSSpeechSynthesizer sharedInstance] setApiKey:API_KEY withSecretKey:SECRET_KEY];
  
  [[AVAudioSession sharedInstance]setCategory:AVAudioSessionCategoryPlayback error:nil];
  //    [[BDSSpeechSynthesizer sharedInstance] setSynthParam:@(BDS_SYNTHESIZER_SPEAKER_DYY) forKey:BDS_SYNTHESIZER_PARAM_SPEAKER];
  //    [[BDSSpeechSynthesizer sharedInstance] setSynthParam:@(10) forKey:BDS_SYNTHESIZER_PARAM_ONLINE_REQUEST_TIMEOUT];
  
}

-(void)configureOfflineTTS{
  
  NSError *err = nil;
  // 在这里选择不同的离线音库（请在XCode中Add相应的资源文件），同一时间只能load一个离线音库。根据网络状况和配置，SDK可能会自动切换到离线合成。
  NSString* offlineEngineSpeechData = [[NSBundle mainBundle] pathForResource:@"Chinese_And_English_Speech_Female" ofType:@"dat"];
  
  NSString* offlineChineseAndEnglishTextData = [[NSBundle mainBundle] pathForResource:@"Chinese_And_English_Text" ofType:@"dat"];
  
  err = [[BDSSpeechSynthesizer sharedInstance] loadOfflineEngine:offlineChineseAndEnglishTextData speechDataPath:offlineEngineSpeechData licenseFilePath:nil withAppCode:APP_ID];
  if(err){
    return;
  }
  
}

-(void)setPitch:(int)pitch {
  [[BDSSpeechSynthesizer sharedInstance] setSynthParam:[NSNumber numberWithInt:pitch] forKey:BDS_SYNTHESIZER_PARAM_PITCH];
}

-(void)setSpeed:(int)speed {
  [[BDSSpeechSynthesizer sharedInstance] setSynthParam:[NSNumber numberWithInt:speed] forKey:BDS_SYNTHESIZER_PARAM_SPEED];
}

-(void)cancel{
  [[BDSSpeechSynthesizer sharedInstance] cancel];
}

-(void)setPlayerVolume:(float)volume {
  [[BDSSpeechSynthesizer sharedInstance] setPlayerVolume:volume];
}

@end
