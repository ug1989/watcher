import React from 'react';
import { watch } from '../utils/watcher';
import shareData, { setShareData } from '../utils/data';

let renderTimes = 1;

setInterval(() => {
  // setShareData('key3', shareData.key2 * 2);
}, 1000);

@watch(shareData, ['key2', 'key3'])
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

  componentDidCatch(err) {
    console.log(err)
  }

  render() {
    console.log(`B render`, +new Date, renderTimes++);
    const t = `${shareData.key2}`;

    return (
      <div style={{background: `#${+t.slice(-6).split('').reverse().join('') - 32641}`}}>{ t }</div>
    );
  }

}