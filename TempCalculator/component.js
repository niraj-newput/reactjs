const scaleName = {
  c : 'celsius',
  f : 'Fahrenheit'
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConverter(temperature, convert) {
  const input = parseFloat(temperature);
  if(Number.isNaN(input)){
    return '';
  }
  
  var output = convert(input);
  return output;
}

//BoilingTemp Component
function BoilingTemp (props) {
  if(props.celsius >= 100) {
    return (<p> The water would boil.</p>);
  }
  return (<p> The water would not boil.</p>);
}

//Temperature Component
class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    // this.setState({temperature: event.target.value});
    this.props.onChange(event.target.value);
  }
  
  render() {
    const temperature = this.props.value;
    const scale = this.props.scale;
    return(
      <div>
        <p>Enter temperature in {scaleName[scale]}</p>
        <input value={temperature} onChange={this.handleChange} />
        <BoilingTemp celsius={parseFloat(this.props.value)} />
      </div>
    );
  }
}

// Calculator Component 
class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      scale: 'c',
      temperature: ''
    }
  }
  
  onHandleFahrenheit(celsius) {
    this.setState({
      scale: 'f',
      temperature: celsius
    });
  }
  
  onHandleCelsius(fehrenheit) {
    this.setState({
      scale: 'c',
      temperature: fehrenheit
    });
  }
  
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'c' ? tryConverter(temperature, toCelsius) : temperature;
    const fehrenheit = scale === 'f' ? tryConverter(temperature, toFahrenheit) : temperature;
    console.log(celsius);
    console.log(fehrenheit);
    return (
      <div>
        <Temperature scale="c" onChange={this.onHandleFahrenheit.bind(this)} value={celsius}/>
        <Temperature scale="f" onChange={this.onHandleCelsius.bind(this)} value={fehrenheit}/>
      </div>
    );
  }
}


ReactDOM.render(
  <Calculator />,
  document.getElementById('temp')
);

