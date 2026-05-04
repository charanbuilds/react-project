import React from "react";

class Userclass extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                Count:100,
                Count2:200
            }
    }
    render(){
        const {name,location} = this.props;
        const {Count,Count2} = this.state;
        return(
            <div className="user-card">
                <button onClick={()=>{
                    this.setState({
                        Count:this.state.Count+1
                    })
                }}>increase count</button>
                  <h1>Count is : {Count}</h1>
                  <h1>Count2 is : {Count2}</h1>
              <h1>this is {name}</h1>
              <h2>location is {location}</h2>
            </div>
            
        )
    }
}


export default Userclass;