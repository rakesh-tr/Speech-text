import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Select ,Layout} from 'antd';

import FileUpload from '../src/Component/Upload/Upload';
import SpeechRecognitionService from '../src/Component/Speech/Speech';
import {Const} from '../src/Component/Languages/langs';

const Option = Select.Option;
const { Header, Footer, Sider, Content } = Layout;

const AppComponent=(props)=>{
  return(
  <div className="App" >
     <Layout>
  <Header >
    <p className="App-header">Speech -Text  Sample Application</p>        
  </Header>
  <Content style={{ padding: '0 50px' }}>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <p>Select the language to recognize</p>
  <button onClick={props.toogleRecognition}>{props.recognition ? 'Stop' : 'Start'} Recognition</button>
  <p>{props.speechOutput}</p>  
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a language"
    optionFilterProp="children"
    onChange={props.handleChange}
    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
  >
    <Option value="ta-IN">Tamil (தமிழ் -இந்தியா)</Option>
    <Option value="ta-SG">Tamil (தமிழ் -சிங்கப்பூர)்</Option>
    <Option value="ta-LK">Tamil (தமிழ் -இலங்கை)</Option>
    <Option value="ta-MY">Tamil (தமிழ் -மலேசியா)</Option>
    <Option value="en-AU">English -Australia</Option>
    <Option value="en-CA">English -Canada</Option>
    <Option value="en-IN">English -India</Option>
    <Option value="en-GB">English -United Kingdom</Option>
    <Option value="en-US">English -United States</Option>
    <Option value="en-ZA">English -South Africa</Option>
    <Option value="hi-IN">Hindi (हिन्दी)</Option>
  </Select>
        </Content>
      </Layout>
      </Content>
  <Footer style={{ textAlign: 'center' }}>
    <p>© 2018 All Rights Reserved Rakesh</p>
    </Footer>
    </Layout>
</div>);
}
class App extends Component {

  constructor(props){
    super(props);
    this.state = { recognition: false,speechOutput:"" };
    this.recognition= new SpeechRecognitionService();
    
  }

    startSpeechRego(){
      this.setState({ recognition: true });
      this.recognition.Start();

      this.recognition.onResult((props)=>{
        
        this.setState({ speechOutput: this.state.speechOutput+props });
      })
    }

    stopSpeechRego ()  {
      this.setState({ recognition: false });
      this.recognition.Stop();
    }
    toogleRecognition(){      
        this.state.recognition ? this.stopSpeechRego() : this.startSpeechRego();          
    }

    handleChange(e){      
      this.recognition.Stop();
      this.recognition= new SpeechRecognitionService(e);
      this.setState({ recognition: false });
    }
  render() {
    return (
      <AppComponent
      recognition={this.state.recognition}      
      speechOutput={this.state.speechOutput}
      handleChange={this.handleChange.bind(this)}
      toogleRecognition={this.toogleRecognition.bind(this)}
      />
    );
  }
}

export default App;
