import React, { Component } from 'react';



class Home extends Component {
    
    componentDidMount() {
        console.log(window.freedom);

        // check this out.
        console.log('props: ', this.props.freedom)
    }

    render() {
      if(!this.props.freedom) {
        return (
          <div>Just a beautiful loading screen......</div>
        )
      } else {
        return (
          <div>
            <ul>
              <li>{this.props.freedom[0].firstname}</li>
              <li>{this.props.freedom[1].firstname}</li>
            </ul>
          </div>
        );
      }
    }
  }
  
  export default Home;
  