/** 
    classWatchedData = { 
        { calss1 } : [ data1, data2 ], 
        { class2 } : [ data2 ], 
        { class3 } : [ data1 ] 
    }; 
    classWatchedKeys = {
        { calss1 } : [ key1, key2 ], 
        { class2 } : key2, 
        { class3 } :  
    };
    componentsDataCare = { 
        { data1 } : [ class1_entity, class3_entity ], 
        { data2 } : [ class2_entity ] 
    } 
*/

import React from 'react';
import { Set, WeakMap } from 'core-js';

const classWatchedData = new WeakMap;
const classWatchedKeys = new WeakMap;
const componentsDataCare = new WeakMap;

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

// 监听某个对象或该对象的某个值
function watch(bindData, watchKey) {
    return (classFn) => {
        classWatchedKeys[classFn] = watchKey;
        classWatchedData[classFn] = classWatchedData[classFn] || new Set;
        if (classWatchedData[classFn].has(bindData)) return;
        classWatchedData[classFn].add(bindData);
        Object.setPrototypeOf(classFn, hookComponent);
        Object.setPrototypeOf(classFn.prototype, hookComponent.prototype);
    }
}

// 通知组件更新
function notify(bindData, changeKey) {
    (componentsDataCare[bindData] || []).forEach(component => {
        const componentWatchedKey = classWatchedKeys[component.constructor];
        if (!componentWatchedKey || !changeKey) {
            return component.forceUpdate();
        }
        if (!Array.isArray(componentWatchedKey) && !Array.isArray(changeKey)) {
            return (componentWatchedKey === changeKey) && component.forceUpdate();
        }
        if (Array.isArray(componentWatchedKey) && Array.isArray(changeKey)) {
            return componentWatchedKey.some(key => changeKey.includes(key)) && component.forceUpdate();
        }
        if (Array.isArray(componentWatchedKey) && !Array.isArray(changeKey)) {
            return componentWatchedKey.includes(changeKey) && component.forceUpdate();
        }
        if (!Array.isArray(componentWatchedKey) && Array.isArray(changeKey)) {
            return changeKey.includes(componentWatchedKey) && component.forceUpdate();
        }
    });
}

export { watch, notify }
