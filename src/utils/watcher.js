import React from 'react';
import { Map, Set } from 'core-js';

const classWatchedData = new Map;
const componentsDataCare = new Map;

class hookComponent extends React.Component {

    constructor() {
        super();

        classWatchedData[this.constructor].forEach(dataClassWatched => {
            componentsDataCare[dataClassWatched] = componentsDataCare[dataClassWatched] || new Set;
            componentsDataCare[dataClassWatched].add(this);
        });

        // 覆写观察数据的组件实例 componentWillUnmount 方法
        const thisPrototype = this.constructor.prototype;
        const thisComponentWillUnmount = thisPrototype.componentWillUnmount;
        const hookComponentWillUnmount = hookComponent.prototype.componentWillUnmount;
        const inheritComponentWillUnmount = thisComponentWillUnmount == hookComponentWillUnmount;
        
        this.componentWillUnmount = inheritComponentWillUnmount ? hookComponentWillUnmount : () => {
            thisComponentWillUnmount.call(this);
            hookComponentWillUnmount.call(this);
        };
    }

    componentWillUnmount() {
        classWatchedData[this.constructor].forEach(dataClassWatched => {
            componentsDataCare[dataClassWatched].delete(this)
        });
    }
}

function watch(bindData) {
    return (classFn) => {
        classWatchedData[classFn] = classWatchedData[classFn] || new Set;
        if (classWatchedData[classFn].has(bindData)) return;
        classWatchedData[classFn].add(bindData);
        Object.setPrototypeOf(classFn, hookComponent);
        Object.setPrototypeOf(classFn.prototype, hookComponent.prototype);
    }
}

// 通知变量更新，同步更新组件
function notify(bindData) {
    (componentsDataCare[bindData] || []).forEach(component => {
        component.forceUpdate();
    });
}

export { watch, notify }
