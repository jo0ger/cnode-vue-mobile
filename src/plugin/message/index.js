"use strict";

import Vue from "vue";

let MessageTpl = require("./message.vue");
let MessageConstructor = Vue.extend(MessageTpl);

const Message = function(options){
    //只能允许一个message框
    if(document.getElementsByClassName('cvm-message').length > 0){
        return {
            show (){
                return;
            }
        }
    }
    let ins = new MessageConstructor({
        data: options
    }),
        id = "message-" + new Date().getTime();

    let vm = ins.$mount(),
        dom = vm.$el;

    ins.id = dom.id = id;
    document.body.appendChild(dom);

    return {
        show (){
            ins.show = true;
        }
    }
};

export default Message;
