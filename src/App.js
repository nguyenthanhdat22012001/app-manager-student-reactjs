
import './App.css';
import React from 'react';
import moment from 'moment';
import Menu from './components/Menu';
import Myclass from './components/Myclass';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state= {selectedClass:'',newStudent:'',student:'', className:'',totalStudens:0};
  }

  handleClassChange = (selectedClass)=>{
    console.log('App selected : '+selectedClass);
    this.setState({selectedClass:selectedClass,className:selectedClass});
  }

  handleAddClass = ()=>{
    if(!this.state.selectedClass !== '' ){
      console.log('Add user in class : '+this.state.selectedClass);
      this.getData();
    }else{
      console.log('not add student')
    }
  }

  getData = () =>{
    console.log('get data');
    fetch("https://randomuser.me/api?results=1")
    .then(data => data.json())
    .then((data)=>{
      console.log(data.results)
      let newStudent =  data.results.map((item)=>{
         return {
          firstName: item.name.first,
          lastName: item.name.last,
          gender: item.gender,
          birthDay:  moment(item.dob.date).format("DD/MM/YYYY"),
          country: item.location.country,
          picture: item.picture.thumbnail,
        }
      });
      //  console.log("new student : "+newStudent[0]);
      this.setState({newStudent:newStudent[0]});
      this.setState({newStudent:''});
      console.log("remove new student app");
    },
    (error)=>{
      console.log('error ',error);
    });
  };

  removeNewStudent = ()=>{
    console.log('remove student app');
    this.setState({newStudent:''});
  }

  handleTotalStudents = (total)=>{
    console.log('total student',total);
    console.log("check total student"+this.state.totalStudens !== total);
    if(this.state.totalStudens !== total){
      this.setState({totalStudens:total});
    }
  }



  render(){
    return(
      <div className="App">
          <Menu 
          handleClassChange={this.handleClassChange}
          handleAddClass={this.handleAddClass} 
          totalStudens = {this.state.totalStudens}
          />
          <br/>
          <Myclass 
            newStudent={this.state.newStudent}
            classname={this.state.className}
            removeNewStudent={this.removeNewStudent}
            handleTotalStudents={this.handleTotalStudents}
          />
      </div>
    );
  }

}

export default App;
