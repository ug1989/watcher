import React from 'react';
import { watch, notify } from '../utils/watcher';
import shareData from '../utils/data';
import C from './c';

// @watch(shareData)
export default class A extends React.Component {

  constructor(props) {
    super();
  }

  componentDidMount() {
    console.log('A componentDidMount');
  }

  render() {
    console.log(`A render`, +new Date);
    const t = `${shareData.t}`;

    return (
      <div style={{color: `#${+t.slice(-6).split('').reverse().join('') + 15641}`}}>{ t }</div>
    );
  }

}