import React from 'react';

import A from './components/a';
import B from './components/b';
import C from './components/c';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      num: 100
    };
  }

  componentDidMount() {
    setInterval(_ => {
      this.setState({
        // num: (this.state.num + 1) % 24
      });
    }, 10000);
  }

  render() {
    const { num } = this.state;
    console.log('I render', +new Date);

    return (
      <div>
        {num % 2 && <A /> || null}
        {num % 3 && <A /> || null}
        {num % 6 && <A /> || null}
        {num % 8 && <B /> || null}
        {num % 12 && <B /> || null}
        {num % 24 && <C /> || null}
      </div>
    )
  }
}