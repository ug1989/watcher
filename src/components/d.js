import React from 'react';
import { watch } from '../utils/watcher';
import shareData, { setShareData } from '../utils/data';
import shareData2, { setShareData2 } from '../utils/data2';
import B from './b';

setInterval(() => {
  setShareData2('key2', shareData.key1 * 2 || 0);
}, 500);

@watch(shareData, ['key1', 'key2'])
@watch(shareData2, ['key3'])
export default class D extends B {

  constructor(props) {
    super();
    this.state = {}
  }

  render() {
    console.log('dddddd')
    return (
      <div style={{background: '#acf'}}>
        <div>{shareData.key3}</div>
        <div>{shareData2.key2}</div>
      </div>
    );
  }

}