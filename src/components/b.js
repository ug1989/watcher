import React from 'react';
import { watch, notify } from '../utils/watcher';
import shareData from '../utils/data';

@watch(shareData)
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

  render() {
    console.log(`B render`, +new Date);

    return (
      <div>{ `${shareData.t}`.split('').join('-') }</div>
    );
  }

}