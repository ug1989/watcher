import React from 'react';
import { watch, notify } from '../utils/watcher';
import shareData from '../utils/data';

let renderTimes = 1;

@watch(shareData)
export default class C extends React.Component {

  constructor(props) {
    super();
    this.state = {}
  }

  componentDidMount() {
    console.log('C componentDidMount');
    this.timer = setInterval(() => {
      shareData.t = +new Date;
      notify(shareData);
      console.log('C.timer', new Date);
    }, 400);
  }

  componentWillUnmount() {
    console.log('C componentWillUnmount');
    clearInterval(this.timer);
  }

  render() {
    console.log(`C render`, +new Date, renderTimes++);
    const t = `${shareData.t}`;
    return (
      <div style={{color: `#${+t.slice(-6).split('').reverse().join('') + 15641}`}}>{ t }</div>
    );
  }

}