
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



class SelectClass extends React.Component{
    constructor(props){
        super(props);
        const options = [
            { name: 'Lớp 12 A1', year: 2020 },
            { name: 'Lớp 12 A2', year: 2021 },
          ];
          this.state = {options:options,selectedClass:''};
    };

    handleChange = (e,value)=>{
      console.log('hanhdle change autocomplete = '+ value?.name);
      this.setState({selectedClass:value?.name});
      this.props.handleChange(value?.name);
    }

  render(){
    return(
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={this.state.options}
        getOptionLabel={(option)=> option.name}
        sx={{ width: 300 }}
        onChange={this.handleChange}
        renderInput={(params) => (
        <TextField 
        {...params} 
        label="" 
        variant="outlined"
        placeholder="Chọn lớp"
        />
        
        )}
      />
    );
  }

}

export default SelectClass;