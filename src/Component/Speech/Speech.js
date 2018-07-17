//var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
 var speech = function () {   
   
       if (typeof speechRecognition !=="undefined") {
          return new window.speechRecognition();
      } else if (typeof msSpeechRecognition !=="undefined") {
          return new window.msSpeechRecognition();
       } else if (typeof mozSpeechRecognition !=="undefined") {
          return new window.mozSpeechRecognition();
       } else if (typeof webkitSpeechRecognition!== "undefined") {
          return new window.webkitSpeechRecognition();
    }
      return 'No';
  };

export default class SpeechRecognitionService{

    constructor(props) {
        this.recognition =speech();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang =props!=undefined?props: 'en-US';
        this.recognition.maxAlternatives = 1;
    }

      Start(){
        this.recognition.start();          
  }
  onResult = (callback) => {
    this.recognition.onresult = (props) => {          
      if (!props.results) {
        return;
      }
      
      const lastResult = props.results[props.results.length - 1];
      if (!lastResult.isFinal) {
      return;
      }      
      callback(lastResult[0].transcript);
    };
  }
      Stop(){        
        this.recognition.stop();
      }
    }


