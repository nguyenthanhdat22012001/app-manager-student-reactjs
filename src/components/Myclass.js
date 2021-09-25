
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

class Myclass extends React.Component {
  constructor(props) {
    super(props);
    // const rows = [
    //     { id: 1, col1: 'Hello', col2: 'World' },
    //     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    //     { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
    //   ];

    const columns = [
      { field: 'id', headerName: 'ID', width: 150 },
      { field: 'firstName', headerName: 'First Name', width: 150 },
      { field: 'lastName', headerName: 'Last Name', width: 150 },
      { field: 'gender', headerName: 'gender', width: 150 },
      { field: 'birthDay', headerName: 'birthDay', width: 150 },
      { field: 'country', headerName: 'country', width: 150 },
      { field: 'picture', headerName: 'picture', width: 150 ,
      renderCell: (params) => (
      <div><Avatar alt="" src={params.value} /></div>)
      },
      {
        field: 'action', headerName: '', width: 150,
        renderCell: (params) => (
          <strong>
            <IconButton aria-label="" color="inherit">
              <EditIcon onClick={() => this.btnEditStudent(params.value)} />
            </IconButton>
            <IconButton aria-label="" color="inherit">
              <DeleteOutlineIcon onClick={() => this.btnDeleteStudent(params.value)} />
            </IconButton>
          </strong>
        ),
      },

    ];
    this.state = { 
      students: new Array(), 
      uuid: 0, 
      columns: columns, 
      className: '', 
      DialogOpen: false, 
      textDialog: '', 
      deleteId: '', 
      SnackBarOpen: false, 
      textSnackBar: '',
      DialogOpenEdit: false, 
      editStudent:''
    };
    this.inputEditFirstName = React.createRef();

  };

  static getDerivedStateFromProps(props, state) {
    // console.log(
    //   'Myclass getDerivedStateFromProps',
    //   props.newStudent,
    //   props.classname
    // );
    let totalStudent = 0;
    if (!props.classname || props.classname === '') {
      totalStudent = state.students.length;
    } else {
      let listStudent = [...state.students];
      const filterStudentByClassName = listStudent.filter((item) => item.className === props.classname)
      totalStudent = filterStudentByClassName.length;
    }


    if (props.newStudent && props.classname) {
      let newStudent = props.newStudent;
      newStudent.id = state.uuid + 1;
      newStudent.className = props.classname;
      newStudent.action = state.uuid + 1;


      const NewArrStudent = [...state.students, newStudent];
      // console.log('newStudent', newStudent);
      // console.log('ArrStudents', NewArrStudent);
      return { students: NewArrStudent, className: props.classname, uuid: state.uuid + 1, SnackBarOpen: true, textSnackBar: "Add student successfully" };

    }
    else {
      props.handleTotalStudents(totalStudent);
      return { className: props.classname };
    }

  };

  btnEditStudent = (id) => {
    // console.log('edit id ',id)
    let listStudent = this.state.students;
    const editStudent = listStudent.find((item) => item.id === id);
    this.setState({editStudent:editStudent});
    // console.log('edit student ', editStudent);
    this.handleDialogEdit(true);
  }

  btnDeleteStudent = (id) => {
    // console.log('delete student ', id); 
    this.setState({ deleteId: id });
    this.handleDialog(true, `Are you sure delete id = ${id}`);
  }

  deleteStudent = (boolean) => {
    if (boolean) {
      let listStudent = [...this.state.students];
      const filterStudentByClassName = listStudent.filter((item) => item.id !== this.state.deleteId)
      this.setState({ students: filterStudentByClassName, deleteId: '', DialogOpen: false });
      this.hanldeOpenSnackBar(boolean, `Success Deleted!`);
    } else {
      this.setState({ deleteId: '', DialogOpen: boolean });
    }
  }

  handleDialog = (boolean, text = "") => {
    this.setState({ DialogOpen: boolean, textDialog: text });
    // console.log(`status dialog ${boolean}`);
  }

  hanldeOpenSnackBar = (boolean, text = "") => {
    this.setState({ SnackBarOpen: boolean, textSnackBar: text });
  }

  handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ SnackBarOpen: false, textSnackBar: '' });
  }

  handleDialogEdit = (boolean) => {
    this.setState({ DialogOpenEdit: boolean});
    // console.log(`status dialog ${boolean}`);
  }

  editStudent = (boolean)=>{
    if (boolean) {
      
      let firstName = this.inputEditFirstName.current.children[1].firstChild.value;
      
      const listStudent = this.state.students;
       let editStudent = this.state.editStudent;
       let filterStudent = listStudent.filter((item) => item.id !== editStudent.id);
       editStudent.firstName = firstName;
       console.log('editStudent ',editStudent)
      const students = [...filterStudent,editStudent];
       this.setState({  editId: '', DialogOpenEdit: false , students: students});
       this.hanldeOpenSnackBar(boolean, `Success edit!`);
    } else {
      this.setState({ editId: '', DialogOpenEdit: boolean });
    }
  }

 

  render() {
    console.log("render my class")
    // console.log('newStudent',this.state.students);
    //  console.log('className',this.state.className);
    let listStudents = [...this.state.students];
    if (this.state.className) {
      // console.log("myClass have clasSname")
      listStudents = listStudents.filter((item) => item.className === this.state.className);
    }
    return (
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={listStudents} columns={this.state.columns} />

        <Dialog
          open={this.state.DialogOpen}
          onClose={() => this.deleteStudent(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.textDialog}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.deleteStudent(false)}>Disagree</Button>
            <Button onClick={() => this.deleteStudent(true)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        
        <Dialog open={this.state.DialogOpenEdit} onClose={()=> this.editStudent(false)}>
          <DialogTitle> 
            `Do you want edit {this.state.editStudent.firstName} {this.state.editStudent.lastName}?`
            <Avatar alt="" src={this.state.editStudent.picture} />
            </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={this.state.editStudent.firstName}
              ref={this.inputEditFirstName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> this.editStudent(false)}>Cancel</Button>
            <Button onClick={()=> this.editStudent(true)}>Edit</Button>
          </DialogActions>
        </Dialog>

        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={this.state.SnackBarOpen} autoHideDuration={3000} onClose={this.handleCloseSnackBar}>
          <MuiAlert onClose={this.handleCloseSnackBar} elevation={6} variant="filled" severity="success" sx={{ width: '100%' }}>
            {this.state.textSnackBar}
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }



}

export default Myclass;