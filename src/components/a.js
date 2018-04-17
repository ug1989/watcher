import React from 'react';
import { watch, notify } from '../utils/watcher';
import shareData from '../utils/data';
import C from './c';

@watch(shareData)
export default class A extends React.Component {

  constructor(props) {
    super();
    this.state = {
      num: 2
    }
  }

  componentDidMount() {

  }

  render() {
    console.log(`render A`, +new Date);
    const { num } = this.state;

    return (
      <div>{ num - (shareData.t || 0) }</div>
    );
  }

}