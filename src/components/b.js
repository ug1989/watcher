import React from 'react';
import { watch, notify } from '../utils/watcher';
import shareData from '../utils/data';

@watch(shareData)
export default class B extends React.Component {

  constructor(props) {
    super();
    this.state = {
      num: 6
    }
  }

  componentDidMount() {
  }

  render() {
    console.log(`render B`, +new Date);
    const { num } = this.state;

    return (
      <div>
        <span>{shareData.t}</span>
      </div>
    );
  }

}