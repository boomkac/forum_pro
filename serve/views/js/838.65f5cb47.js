"use strict";(self["webpackChunkforum_static"]=self["webpackChunkforum_static"]||[]).push([[838],{8838:function(t,e,n){n.r(e),n.d(e,{default:function(){return k}});var s=n(3396),o=n(7139),a=n(9242);const c={class:"main_body clearfix"},l={class:"message_top"},i={class:"title"},r={class:"comment_body"},m=(0,s._)("div",null,[(0,s._)("p",null,"  发表评论：")],-1),u={class:"comment_content"},p={class:"comment_operate"},_=(0,s._)("div",null,[(0,s._)("img",{src:"/public/img/表情.png"})],-1);function d(t,e,n,d,g,v){return(0,s.wg)(),(0,s.iD)("div",c,[(0,s._)("div",l,[(0,s._)("div",i,[(0,s._)("p",null,(0,o.zw)(d.title),1)])]),(0,s._)("div",r,[m,(0,s._)("div",u,[(0,s.wy)((0,s._)("textarea",{name:"content","onUpdate:modelValue":e[0]||(e[0]=t=>d.content=t)},null,512),[[a.nr,d.content]])]),(0,s._)("div",p,[(0,s._)("button",{onClick:e[1]||(e[1]=(...t)=>d.postComment&&d.postComment(...t))},"发表"),_])])])}var g=n(4870),v=n(678),h=n(65),f=n(6265),w=n.n(f),C={name:"NewComment",setup(){const t=(0,h.oR)(),e=(0,v.tv)(),n=(0,v.yj)(),o=n.query.messageID;(0,s.wF)((()=>{w().get("/api/isLogin").then((t=>{"YES"!==t.data&&(sessionStorage.removeItem("user"),alert("请登录"),e.push("/login"))})).catch((t=>{alert("服务器错误"),e.go(-1)}))}));const a=n.query.title;let c=(0,g.iH)("");const l=()=>{w().post("/api/new_comment",{messageID:o,content:c.value}).then((t=>{alert("发表成功"),e.push(`/message?ID=${o}`)})).catch((t=>{alert("发表失败，稍后重试")}))},i=t.state.user;return i||(alert("请登录"),e.push("/login")),{postComment:l,title:a,content:c}}},b=n(89);const y=(0,b.Z)(C,[["render",d]]);var k=y}}]);