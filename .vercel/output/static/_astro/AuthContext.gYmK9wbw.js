import{r as c}from"./index.Dy6lLLXr.js";var x={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p;function f(){if(p)return i;p=1;var o=Symbol.for("react.transitional.element"),s=Symbol.for("react.fragment");function r(n,t,e){var u=null;if(e!==void 0&&(u=""+e),t.key!==void 0&&(u=""+t.key),"key"in t){e={};for(var a in t)a!=="key"&&(e[a]=t[a])}else e=t;return t=e.ref,{$$typeof:o,type:n,key:u,ref:t!==void 0?t:null,props:e}}return i.Fragment=s,i.jsx=r,i.jsxs=r,i}var h;function v(){return h||(h=1,x.exports=f()),x.exports}var R=v();const j=c.createContext({user:null,token:null,login:async(o,s)=>{const r=await fetch("http://localhost:8080/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:o,password:s})}),n=await r.json();r.ok&&n.jwt&&(setToken(n.jwt),setUser(n.user))}});function T({children:o}){const[s,r]=c.useState(null),[n,t]=c.useState(null),e=async(u,a)=>{const d=await fetch("http://localhost:8080/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:u,password:a})}),l=await d.json();console.log({error:l.errors}),d.ok&&l.jwt&&(r(l.jwt),t(l.user))};return R.jsx(j.Provider,{value:{user:n,token:s,login:e},children:o})}function E(){return c.useContext(j)}export{T as A,R as j,E as u};
