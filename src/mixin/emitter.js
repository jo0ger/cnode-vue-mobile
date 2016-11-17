"use strict";
/**
 * 父子组件之间事件通信
 */
function dispatch(componentName, eventName, params) {
    let parentComponent = this.$parent,
        name = parentComponent.$options.name;
    if(!parentComponent){
        return;
    }else {
        if(name === componentName){
            parentComponent.$emit.apply(parentComponent, [eventName, params]);
        }else {
            dispatch.apply(parentComponent, [componentName, eventName, params]);
        }
    }
}
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        let name = child.$options.name;
        if(name === componentName){
            child.$emit.apply(child, [eventName, params]);
        }else {
            broadcast.apply(child, [componentName, eventName, params])
        }
    });
}
export default {
    methods: {
        //子组件 ==> 父组件，一旦找到就不再上发
        dispatch (componentName, eventName, params){
            dispatch.call(this, componentName, eventName, params);
        },
        //父组件 ==> 子组件，所有符合条件的后代组件均会emit
        broadcast (componentName, eventName, params){
            broadcast.call(this, componentName, eventName, params);
        }
    }
};
