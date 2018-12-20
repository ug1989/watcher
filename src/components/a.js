import React from 'react';
import { watch } from '../utils/watcher';
import shareData, { setShareData }  from '../utils/data';

let renderTimes = 1;

setInterval(() => {
  setShareData('key2', shareData.key1 * 2);
}, 300);

@watch(shareData, 'key1')
export default class A extends React.Component {

  constructor(props) {
    super();
  }

  componentDidMount() {
    console.log('A componentDidMount');
  }

  render() {
    console.log(`A render`, +new Date, renderTimes++);
    const t = `${shareData.key1}`;

    return (
      <div style={{background: `#${+t.slice(-6).split('').reverse().join('') + 15641}`}}>{ t }</div>
    );
  }

}