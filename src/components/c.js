import React from 'react';
import { watch, notify } from '../utils/watcher';
import shareData from '../utils/data';

const start = +new Date(1234567890);

@watch(shareData)
export default class C extends React.Component {

  constructor(props) {
    super();
    this.state = {}
  }

  componentDidMount() {
    shareData.t = +new Date;
    notify(shareData);
  }

  render() {
    console.log(`render C`, +new Date);
    const { num } = this.state;

    return (
      <div>{`${shareData.t - start}`}</div>
    );
  }

}