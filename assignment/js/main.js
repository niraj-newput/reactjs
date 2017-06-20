// import { Nav } from "component/nav.js";
// require(["nav"],function(nav){
// ReactDOM.render(<MainComponent />, document.getElementById('root'));
// });

//Navbar Component
class Nav extends React.Component {
  constructor() {
    super();
    this.onHandleClick = this.onHandleClick.bind(this);
  }
  
  onHandleClick(event) {
    event.preventDefault();
    $('li').removeClass('active');
    this.props.onClick(event.target.value);
  }
  
  render() {
    return (
      <nav className="navbar-default navbar-inverse">
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

//sidebar component
class SideBar extends React.Component {
  render() {
    return (
      <div className="sidebar-nav">
        <ul className="nav menu">
          <li className="btn btn-primary">Java <sup><span class="badge">{this.props.likeCount.java.like}</span></sup></li>
          <li className="btn btn-primary">PHP <sup>{this.props.likeCount.php.like}</sup></li>
          <li className="btn btn-primary">Oracle <sup>{this.props.likeCount.oracle.like}</sup></li>
          <li className="btn btn-primary">python <sup>{this.props.likeCount.python.like}</sup></li>
        </ul>
      </div>
    );
  }
}
// List component 
class List extends React.Component {
  
  constructor(props) {
    super(props);
    this.like = this.like.bind(this);
  }
  
  checkLikeStatus(bookName, id) {
    if(this.props.likeCount[bookName].hasOwnProperty(id)) {
      return 'unlike';
    }else {
      return 'like';
    }
  }
  
  like(event) {
    event.preventDefault();
    var buttonText = event.target.innerHTML;
    var bookName = event.target.value;
    var id = event.target.id;
    if(buttonText == 'like') {
      event.target.innerHTML = 'unlike';
    }else if(buttonText == 'unlike'){
      event.target.innerHTML = 'like';
    }
    this.props.onLike(buttonText, bookName, id);
  }
  
  createList(book) {
    return (
      <li key={book.ID}className="list-item">
        <div className="row">
          <div className="col-xs-2">
            <div className="book-image">
              <img src={book.Image}/>
            </div>
          </div>
          <div className="col-xs-10">
            <h3 className="text-center">{book.Title}</h3>
            <h5 className="text-center">{book.SubTitle}</h5>
            <div>
              <label className="pull-left">ISBN NO.:{book.isbn}</label>
              <label className="pull-right">BOOK ID :{book.ID}</label>
            </div>
            <div className="btn-section">
              <button id={book.ID} className="btn btn-primary btn-xs pull-right like-btn" onClick={this.like} value={this.props.bookName}>{this.checkLikeStatus(this.props.bookName,book.ID)}</button>
            </div>
          </div>
        </div>
      </li>
    );
  }
  
  showBook() {
    const books = this.props.listBook;
    const length = this.props.listBook.length;
    var li = [];
    for(var i = 0; i < length; i++) {
      li.push(this.createList(books[i]));
    }
    return li;
  }
  
  render() {
    return (
      <ul>{this.showBook()}
      </ul>
    );
  }
}

//main component
class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.actionOnLink = this.actionOnLink.bind(this);
    this.likeCounter = this.likeCounter.bind(this);
    
    this.state = {
      listBook: [],
      likeCount: {
        java: {
          like: 0,
        }, 
        php: {
          like: 0,
        },
        oracle: {
          like: 0,
        },
        python: {
          like: 0,
        }
      },
      currentBook:'',
    }
  }
  
  componentWillMount() {
    console.log('mount');
    var self = this;
    var promise = this.searchBook('java');
    promise.then(function(data) {
      self.setState((prevState) => ({
        listBook: data,
        currentBook: 'java'
      }));
    });
  }
    
  incrementLike(bookName, id) {
    this.setState(function(prevState) {
      this.state.likeCount[bookName].like = prevState.likeCount[bookName].like + 1;
      this.state.likeCount[bookName][id]= true
    });
  }
  
  decrementLike(bookName, id) {
    this.setState(function(prevState) {
      this.state.likeCount[bookName].like = prevState.likeCount[bookName].like - 1;
      delete this.state.likeCount[bookName][id];
    });
  }
  
  likeCounter(buttonText, bookName, id) {
    if(buttonText == 'like') {
      this.incrementLike(bookName, id);
    }else if(buttonText =='unlike') {
      this.decrementLike(bookName, id);
    }
  }
  
  searchBook(name) {
    var promise = new Promise(function(resolve, reject) {
      $.getJSON('js/books/' + name + '.json').then(function(data) {
        resolve(data);
      }); 
    });
    return promise;
  }
  
  actionOnLink(bookName) {
    var self = this;
    var promise = this.searchBook(bookName);
    promise.then(function(data) {
      self.setState((prevState) => ({
        listBook: data,
        currentBook: bookName
      }));
    });
  }
  
  render() {
    return (
      <div>
        <Nav onClick={this.actionOnLink} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-2">
              <SideBar likeCount={this.state.likeCount}/>
            </div>
            <div className="col-xs-10">
              <div className="row">
                <div className="col-xs-12">
                  <List listBook = {this.state.listBook} bookName={this.state.currentBook} onLike={this.likeCounter} likeCount={this.state.likeCount}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MainComponent />, document.getElementById('root'));