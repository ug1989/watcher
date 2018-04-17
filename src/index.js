import React from 'react';
import ReactDOM from 'react-dom';

import A from './components/a';
import B from './components/b';
import C from './components/c';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      num: 0
    };
  }

  componentDidMount() {
    setInterval(_ => {
      this.setState({
        num: Math.ceil(Math.random() * 100)
      });
    }, 300);
  }

  render() {
    const { num } = this.state;

    return (
      <div>
        {num % 3 && <A /> || null}
        {num % 5 && <B /> || null}
        {num % 7 && <C /> || null}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);