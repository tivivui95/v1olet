import React, { Component } from 'react';
var RNFS = require('react-native-fs');
const path = RNFS.DocumentDirectoryPath + '/hello.wav';
import QRCode from 'react-native-qrcode-generator';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import { View, Text, AppRegistry,
  StyleSheet,
  TextInput } from 'react-native';

  import { Appbar, Headline, Button, Divider } from 'react-native-paper';





export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      text: '',
      ui: '',
      color: 'white'
    };

    RNFS.writeFile(path, 'data', 'base64')
      .then(success => {
        console.log('FILE WRITTEN!');
      })
      .catch(err => {
        console.log(err.message);
      });


    onStartRecord = async () => {
      // const path = RNFS.DocumentDirectoryPath + '/hello.wav';
      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };
      console.log('audioSet', audioSet);
      const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
      this.audioRecorderPlayer.addRecordBackListener(e => {
        this.setState({
          recordSecs: e.current_position,
          recordTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
        });
      });
      console.log(`uri: ${uri}`);
    };

    onStopRecord = async () => {
      const result = await this.audioRecorderPlayer.stopRecorder();
      this.audioRecorderPlayer.removeRecordBackListener();
      this.setState({
        recordSecs: 0,
      });
      console.log(result);
    };

    onStartPlay = async e => {
      console.log('onStartPlay');
      // const path = RNFS.DocumentDirectoryPath + '/hello.wav';
      const msg = await this.audioRecorderPlayer.startPlayer(path);
      this.audioRecorderPlayer.setVolume(1.0);
      console.log(msg);
      this.audioRecorderPlayer.addPlayBackListener(e => {
        if (e.current_position === e.duration) {
          console.log('finished');
          this.audioRecorderPlayer.stopPlayer();
        }
        this.setState({
          currentPositionSec: e.current_position,
          currentDurationSec: e.duration,
          playTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
          duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    };

    onPausePlay = async e => {
      await this.audioRecorderPlayer.pausePlayer();
    };

    onStopPlay = async e => {
      console.log('onStopPlay');
      this.audioRecorderPlayer.stopPlayer();
      this.audioRecorderPlayer.removePlayBackListener();
    };


    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }

  onStartRecord = async () => {
    // const path = RNFS.DocumentDirectoryPath + '/hello.wav';
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener(e => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
      });
    });
    console.log(`uri: ${uri}`);
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  onStartPlay = async e => {
    console.log('onStartPlay');
    // const path = RNFS.DocumentDirectoryPath + '/hello.wav';
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    this.audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  onPausePlay = async e => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async e => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  confirmAPI = () => {

    var details = {
      'username': 'engine',
      'password': 'aicovidvn2021##'
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('https://api.aicovidvn.org/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(response => {
        console.debug(response);
        // ...
      }).catch(error => {
        console.error(error);
      });
    // console.log(Response);
  }

  sendAPI = async () => {
    // const path = RNFS.DocumentDirectoryPath + '/hello.wav';
    const formData = new FormData();
    formData.append('meta', JSON.stringify({
      "uuid": "v1olet",
      "subject_gender": "string",
      "subject_age": 0,
      "subject_cough_type": "string",
      "subject_health_status": "string",
      "note": "string"
    }));
  const file = await RNFS.readFile(RNFS.DocumentDirectoryPath + '/hello.wav', 'base64') // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  formData.append('audio_file', file);
  // formData.append('audio_file', 'test');
  // console.log(formData);
  fetch('https://node-relay-ai-covid.herokuapp.com/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  }).then((response) => response.json())
  .then((json) => {
    console.log(json.assessment);
    this.setState({
      text: json.assessment.recommended_label + '|' + json.assessment.recommended_prob,
      ui: 'Result: ' + json.assessment.recommended_label + '\nAccuracy: ' + json.assessment.recommended_prob,
      color: 'black'
    })
  })
  .catch((error) => {
    console.error(error);
  });
  }

  render() {
    return (
      <View
        style={{
          // flex: 1,
          // flexDirection: 'row',
          // alignItems: 'center',
          // alignContent: 'center',
          // alignSelf: 'center'
        }}>
        <Appbar.Header>
        {/* <Appbar.BackAction /> */}
        <Appbar.Content title="AI-COVID" subtitle="Detect COVID-19 from sound" />
        <Appbar.Action icon="magnify"  />
        <Appbar.Action icon="dots-vertical"  />
      </Appbar.Header>
        <View style={{
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 48
          }}>
        <View>
            <QRCode
            value={this.state.text}
            size={200}
            bgColor={this.state.color}
            fgColor='white'/>
            <Text style={{alignSelf: 'center'}}>{this.state.ui}</Text>
          </View>   
          <Headline style={{alignSelf: 'center', margin: 2}}>Record Your Sound</Headline>
          <Text style={{alignSelf: 'center', margin: 2}}>{this.state.recordTime}</Text>
          <Button
            icon="record"
            mode="outlined"
            // onPress={() => this.onStartRecord()}
            onPress={() => {
              return this.onStartRecord()
                .then(result => {
                  console.log(result);
                })
                .catch(error => {
                  console.log(error);
                });
            }}
            onPress={onStartRecord}
          >Record</Button>
          <Text></Text>
          <Button icon="stop" mode="outlined" onPress={() => this.onStopRecord()} >stop</Button>

          <Text></Text>
          <Divider />
          <Text></Text>
          <Button icon="send" mode="outlined" onPress={() => this.sendAPI()} >send</Button>
          
                 
          
        </View>
      </View>
    );
  }
}