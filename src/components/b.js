import React from 'react';
import { watch, notify } from '../utils/watcher';
import shareData from '../utils/data';

let renderTimes = 1;

@watch(shareData)
export default class B extends React.Component {

  constructor(props) {
    super();
  }

  componentDidMount() {
    console.log('B componentDidMount');
  }

  componentWillUnmount() {
    console.log('B componentWillUnmount');
  }

  render() {
    console.log(`B render`, +new Date, renderTimes++);
    const t = `${shareData.t}`;

    return (
      <div style={{color: `#${+t.slice(-6).split('').reverse().join('') - 32641}`}}>{ t }</div>
    );
  }

}