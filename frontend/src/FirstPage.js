import React,{Component} from 'react';
import axios from 'axios';
class FirstPage extends Component{
    constructor(props){
        super(props);
        this.state={
          num:'',
          valid:true,
          count:null
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

 handleChange(e){
    this.setState({
          num:e.target.value,
        })
  }

handleSubmit(e){
      e.preventDefault();
      if(isNaN(this.state.num)){
        this.setState({
          valid:false
        })
      }
      else
      {
      axios.get(`/users/number/${this.state.num}`)
      .then((res)=>{
        this.setState({count:res.data})
      })
      .catch(err=>{
        console.log(err);
      })
      this.setState({valid:true})
          }
  }
    render(){
        return(
        <>
          <div className="container">
            <div className="col-xs-10 col-md-5 col-xs-offset-1 col-md-offset-4 block" id="banner-content1">
              <center>
                <img  src="lockicon.svg" alt="" width="72" height="72"/>
                <h2>Terribly Tiny Tales</h2>
              </center>
              <form  method="post" onSubmit={this.handleSubmit}>
                {(()=>{
                  if(this.state.valid===false){
                    return(
                      <div class="alert alert-danger" role="alert">
                        Enter Number Only
                      </div>
                    )
                  }
                })()}
                  <div className="form-group">
                    <label htmlFor="num">Enter Number</label>
                      <input type="text"
                          name="num"
                          id="email"
                          value={this.state.num}
                          onChange={this.handleChange} 
                          className="form-control" 
                          required 
                          //pattern="[0-9]+"
                          autoFocus/>
                  </div>
                 <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
              </form>
          {/* ---------------------------------------Displaying Table------------------------------------- */}
                {(()=>{
                    if(this.state.count!=null){
                      return(
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Serial No.</th>
                                        <th>Word</th>
                                        <th>Count Frequency</th>
                                
                                    </tr>
                                </thead>
                                <tbody>
                                  {this.state.count.map((item,idx)=>{
                                        return(
                                            <tr className="success" key={idx}>
                                                <td>{idx}</td>
                                                <td>{item.name}</td>
                                                <td>{item.total}</td>
                                            </tr>
                                            )
                                    })}
                                </tbody>
                            </table>
                            )
                    }
            })()}
          
            </div>
        </div>
        </>)
    }
}

export default FirstPage;