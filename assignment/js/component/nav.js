export class Nav extends React.Component {
  constructor() {
    super();
    this.onHandleClick = this.onHandleClick.bind(this);
  }
  
  onHandleClick(event) {
    event.preventDefault();
    console.log('action click');
    this.props.onClick(event.target.value);
  }
  
  render() {
    return (
      <nav className="navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">WebSiteName</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="active"><a href="#" onClick={this.onHandleClick} value="java">Java</a></li>
            <li><a href="#" onClick={this.onHandleClick} value="php">PHP</a></li>
            <li><a href="#" onClick={this.onHandleClick} value="oracle">Oracle</a></li>
            <li><a href="#" onClick={this.onHandleClick} value="python">Python</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
