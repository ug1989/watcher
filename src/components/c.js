import React from 'react';
import { watch, notify } from '../utils/watcher';
import shareData from '../utils/data';

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
    }, 40);
  }

  componentWillUnmount() {
    console.log('C componentWillUnmount');
    clearInterval(this.timer);
  }

  render() {
    console.log(`C render`, +new Date);

    return (
      <div>{ `${shareData.t}`.split('').join('_') }</div>
    );
  }

}