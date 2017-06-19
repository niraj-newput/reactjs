
class UserList extends React.Component {
  render() {
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{
          this.props.user.map((value) =>(
            <tr key={value.key}>
              <td>{value.name} </td>
              <td>{value.contact}</td>
              <td>
                <button className="btn btn-primary btn-space" onClick={this.props.deleteUser} value={value.key}>Delete</button>
                <button className="btn btn-primary btn-space"  onClick={this.props.onEdit} value={value.key}>Edit</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.onHandleChange = this.onHandleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      editUser: '',
      isShow: false,
      user: [],
      name: '',
      contact:''
    };
  
  }
  
  searchUser(id) {
    for(var i = 0; i <   this.state.user.length; i++) {
      if(this.state.user[i].key == id ){
        return this.state.user[i];
      }
    }
    return null;
  }
  
  editUser(event) {
    var user = this.searchUser(event.target.value);
    this.setState( {
      editUser: user,
      isShow : true
    });
  }
  
  showEditForm() {
    if(!this.state.isShow) {
      return '';
    }
    return (<EditComponent onUpdate={this.updateUser} user={this.state.editUser}/>);
  }
  
  updateUser(obj) {
  console.log('FORM UPDA');
  console.log(obj);
  }
  
  deleteUser(event) {
    var index = null;
    event.persist();
    this.setState(function(prevState) {
      var user = prevState.user;
      var length = prevState.user.length;
      for(var i = 0; i < length; i++) {
        if(user[i].key == event.target.value) {
          index = user.indexOf(user[i]);
        }
      }
      this.state.user = prevState.user.splice(index,1);
    }
    );
  }
  
  onHandleChange(event) {
    var name = event.target.name;
    var value = event.target.value; 
    this.setState({
      [name]: value
    });
  }
  
  submit(event){
    event.preventDefault();
    var newUser = { name: this.state.name, contact: this.state.contact, key: new Date().getTime().toString()}; 
    this.setState(function(prevState) {
      this.state.user = prevState.user.push(newUser);
      this.state.name = '';
      this.state.contact = '';
    });
  }
  
  render() {
    return (
      <div className="row form-container">
        <div className="col-xs-6">
          <div className="row ">
            <div className="col-xs-offset-3 col-xs-6 ">
              <form className="form-horizontal" onSubmit={this.submit}>
                <div className="form-group">
                  <label className="label-control">Name:</label>
                  <input name="name" className="form-control" type="text" onChange={this.onHandleChange} value={this.state.name}/>
                </div>
                <div className="form-group">
                  <label className="label-control">Contact:</label>
                  <input name="contact" className="form-control"  type="text" onChange={this.onHandleChange} value={this.state.contact}/>
                </div>
                <div className="form-group">
                  <input type="submit" value="Add User" className="btn btn-primary"/>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xs-6">
          <h2 className="text-center">User List</h2>
          <UserList user={this.state.user} deleteUser={this.deleteUser.bind(this)} onEdit={this.editUser.bind(this)}/>
          {this.showEditForm()}
        </div>
      </div>
    );
  }
}

class EditComponent extends React.Component {
  constructor() {
    super();
    this.update = this.update.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.state = {
      name: '',
      contact: '',
      key: ''
    };
  }
  
  componentWillMount() {
    console.log(',ount');
    this.setState(function(prevState, props){});
  }
  
  onHandleChange(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name] : value
    });
    console.log('edit on change');
  }
  
  update(event) {
    event.preventDefault();
    console.log('update');
    var name = this.state.name;
    var contact = this.state.contact;
    var obj = {
      name: name,
      contact: contact,
      key: this.props.user.key
    }
    console.log('update');
    console.log(obj);
    this.props.onUpdate(obj);
  }
  
  render() {
    var name = this.props.user.name;
    var contact = this.props.user.contact
    return (
      <div className="form-group">
        <form className="form-group" onSubmit={this.update}>
          <input name="name" className="form-control" type="text" onChange={this.onHandleChange} value={this.props.user.name}/>
          <input name="name" type="text" className="form-control" onChange={this.onHandleChange} value={name} />
          <input name="contact" type="text" className="form-control" onChange={this.onHandleChange} value={contact} />
          <input type="submit" value="update" className="btn btn-primary"/>
        </form>
      </div>
    );
  }
}

class MainComponent extends React.Component {
  render() {
    return (
      <Form />
    );
  }
}

ReactDOM.render(
  <MainComponent />,
  document.getElementById('form')
);