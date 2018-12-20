/** 
    decoratorClassList = [ class1, class2, class3 ]; 
    classWatchedData = { 
        calss1_index: [ data1, data2 ], 
        class2_index: [ data2 ], 
        class3_index: [ data1 ] 
    }; 
    allDataWatched = [ data1, data2 ]; 
    componentsDataCare = { 
        data1_index: [ class1_entity, class3_entity ], 
        data2_index: [ class2_entity ] 
    } 
*/

import React from 'react';

const decoratorClassList = [];      // classes call @watch
const classWatchedData = {};        // data class watched
const classWatchedKeys = {};        // keys class watched
const allDataWatched = [];          // all data watched
const componentsDataCare = {};      // components data care

// 纪录依赖自身state之外需要更新的组件实例到对应数据关联的列表里
class hookComponent extends React.Component {

    constructor() {
        super();
        const classIndex = decoratorClassList.indexOf(this.constructor);
        if (classIndex == -1) return;

        // 绑定观察数据需要更新的组件实例
        classWatchedData[classIndex].forEach(dataClassWatched => {
            const dataIndex = allDataWatched.indexOf(dataClassWatched);
            if (dataIndex == -1) return;
            (componentsDataCare[dataIndex] = componentsDataCare[dataIndex] || []).push(this);
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
        const classIndex = decoratorClassList.indexOf(this.constructor);
        if (classIndex == -1) return;

        // 解绑观察数据需要更新的组件实例
        classWatchedData[classIndex].forEach(dataClassWatched => {
            const dataIndex = allDataWatched.indexOf(dataClassWatched);
            if (dataIndex == -1) return;
            const componentsList = componentsDataCare[dataIndex];
            const thisIndex = componentsList.indexOf(this);
            if (thisIndex == -1) return;
            componentsList.splice(thisIndex, 1);
        });
    }
}

// 标记组件构造器与依赖变量的关系，方便 hookComponent 安排依赖组建位置
function watch(bindData, watchKey) {
    allDataWatched.indexOf(bindData) == -1 && allDataWatched.push(bindData);
    return (classFn) => {
        const classBase = classFn.prototype;
        const classIndex = decoratorClassList.indexOf(classFn);
        if (classIndex == -1) {
            decoratorClassList.push(classFn);
            Object.setPrototypeOf(classFn, hookComponent);
            Object.setPrototypeOf(classFn.prototype, hookComponent.prototype);
        }
        const classFnIndex = decoratorClassList.indexOf(classFn);
        const classFnData = classWatchedData[classFnIndex] = classWatchedData[classFnIndex] || [];
        classWatchedKeys[classFnIndex] = watchKey;
        classFnData.indexOf(bindData) == -1 && classFnData.push(bindData);
    }
}

// 通知变量更新，同步更新组件
function notify(bindData, changeKey) {
    const dataIndex = allDataWatched.indexOf(bindData);
    if (dataIndex == -1) return;
    (componentsDataCare[dataIndex] || []).forEach(component => {
        const classFnIndex = decoratorClassList.indexOf(component.constructor);
        const componentWatchedKey = classWatchedKeys[classFnIndex];
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

export {watch, notify, hookComponent}
