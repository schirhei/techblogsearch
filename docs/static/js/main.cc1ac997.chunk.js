(this.webpackJsonptechblogsearch=this.webpackJsonptechblogsearch||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(3),o=n.n(s),i=(n(14),n(15),n(4)),c=n(5),l=n(7),u=n(6),h=n(1),m=n(8),f=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).state={repo:"",users:[],sites:[]},e.findLinks=e.findLinks.bind(Object(h.a)(e)),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"findLinks",value:function(){var e=this;this.setState({sites:[]}),this.setState({users:[]}),fetch("https://api.github.com/repos/".concat(this.state.repo,"/contributors")).then((function(e){return e.json()})).then((function(t){if(t.message)e.setState({sites:r.a.createElement("div",{id:"message"},r.a.createElement("h2",null,"Github says: "),t.message)});else for(var n=0;n<t.length;n++)e.state.users.push(t[n].url)})).then((function(t){return e.loadLinks()})).catch((function(e){return console.log(e)}))}},{key:"loadLinks",value:function(){var e=this,t=this.state.users;if(t.length>0)for(var n=t.length,a=0;a<t.length;a++)fetch(t[a]).then((function(e){return e.json()})).then((function(t){""===t.blog||t.blog.includes("twitter")||e.setState({sites:e.state.sites.concat(r.a.createElement("p",{key:Math.round(10*Math.random()),className:"cluster"},r.a.createElement("img",{href:t.blog,className:"avatar",src:t.avatar_url,alt:"github profile picture of "+t.login}),r.a.createElement("br",null),r.a.createElement("a",{href:t.blog},t.blog.replace("http://","").replace("https://",""))))}),0===(n-=1)&&e.state.sites.length<1&&e.setState({sites:r.a.createElement("div",{id:"message"},"There are no blogs!")})})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{id:"about",href:"about.html"},"about"),r.a.createElement("div",{id:"search"},r.a.createElement("h2",{style:{color:"yellowgreen"}},"techblogsearch"),r.a.createElement("input",{type:"text",placeholder:"owner/repo",onInput:function(t){return e.setState({repo:t.target.value})}}),r.a.createElement("button",{onClick:this.findLinks},"Go")),r.a.createElement("br",null),this.state.sites)}}]),t}(a.Component);var g=function(){return r.a.createElement("div",null,r.a.createElement(f,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.cc1ac997.chunk.js.map