import React, { Component } from 'react';
import './App.css';
import Annotator from './Annotator/Annotator'

const text = `Dark Angel is an American cyberpunk television series that premiered in October 2000.
              Created by James Cameron and Charles H. Eglee, it starred Jessica Alba (pictured) in her breakthrough role. 
              Set in 2019, the series chronicles the life of Max Guevara (Alba), a genetically enhanced super-soldier who escapes from a covert military facility as a child. 
              In a post-apocalyptic Seattle, she tries to lead a normal life, while eluding capture by government agents and searching for 
              her siblings scattered in the aftermath of their escape. The first season received mainly positive reviews and won several awards,
              including the People's Choice Award for Favorite New TV Drama. The second (final) season received some criticism for new plot elements. 
              A series of novels continued the storyline, and a video game adaptation was released. Dark Angel has gothic 
              and female empowerment themes, and Max has been compared to other strong female characters in Cameron's work,
              including Sarah Connor and Ellen Ripley.`


class App extends Component {
  state = {
    value: [],
  }
  async componentDidMount() {
    try{
      const res = await fetch('http://localhost:8080/api/getTokens');
      const value = await res.json();
      this.setState({value})
    } catch(err){
      console.log(err)
    }
  }

  handleChange = (value, deletedToken) => {
    this.setState({value})
    try{
      if(deletedToken){
        fetch('http://localhost:8080/api/deleteToken', {
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({_id: deletedToken._id})
              })
      }else{
        fetch('http://localhost:8080/api/addToken', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(value[value.length - 1])
              });
      }
    } catch(err){
      console.log(err)
    }
  }

  render() {
    return (
      <div className="App App-header ">
        <header className="font-size-16">
          <p>
            <b>Welcome to Text Annotator Website</b>
          </p>
        </header>
        <Annotator
              className = "Annotator margin-left-right-10"
              tokens={text.split(' ')}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={span => ({
                ...span,
              })}
        />
      </div>
    );
  }
}

export default App;
