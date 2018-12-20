import React from 'react';
import { watch } from '../utils/watcher';
import shareData, { setShareData } from '../utils/data';
import B from '../components/b';

let renderTimes = 1;

@watch(shareData, ['key3', 'key2'])
export default class C extends B {

  constructor(props) {
    super();
    this.state = {}
  }

  componentDidMount() {
    console.log('C componentDidMount');
    this.timer = setInterval(() => {
      setShareData('key1', +new Date);
    }, 40);
  }

  componentWillUnmount() {
    console.log('C componentWillUnmount');
    clearInterval(this.timer);
  }

  render() {
    console.log(`C render`, +new Date, renderTimes++);
    const t = `${shareData.key3}`;
    return (
      <div style={{background: `#${+t.slice(-6).split('').reverse().join('') + 15641}`}}>{ t }</div>
    );
  }

}