import React from 'react';

const decoratorClassList = [];      // classes call @watch
const classWatchedData = {};        // data class watched
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
            console.log(decoratorClassList, classWatchedData, allDataWatched, componentsDataCare);
        });
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
            console.log(decoratorClassList, classWatchedData, allDataWatched, componentsDataCare);
        });
    }
}

let hookClass = null;

// 标记组件构造器与依赖变量的关系，方便 hookComponent 安排依赖组建位置
function watch(bindData) {
    allDataWatched.indexOf(bindData) == -1 && allDataWatched.push(bindData);
    return (classFn) => {
        const classBase = classFn.prototype;
        if (classBase !== hookClass) {
            hookClass = classBase;
            Object.setPrototypeOf(classFn, hookComponent);
            Object.setPrototypeOf(classFn.prototype, hookComponent.prototype);
        }
        decoratorClassList.indexOf(classFn) == -1 && decoratorClassList.push(classFn);
        const classFnIndex = decoratorClassList.indexOf(classFn);
        const classFnData = classWatchedData[classFnIndex] = classWatchedData[classFnIndex] || [];
        classFnData.indexOf(bindData) == -1 && classFnData.push(bindData);
    }
}

// 通知变量更新，同步更新组件
function notify(bindData) {
    const dataIndex = allDataWatched.indexOf(bindData);
    if (dataIndex == -1) return;
    (componentsDataCare[dataIndex] || []).forEach(component => {
        component.forceUpdate();
    });
}

export {watch, notify, hookComponent}
