(this.webpackJsonptechblogsearch=this.webpackJsonptechblogsearch||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(3),s=n.n(r),l=(n(14),n(15),n(4)),c=n(5),i=n(7),h=n(6),u=n(1),m=n(8),b=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(h.a)(t).call(this))).state={repo:"",users:[],sites:[]},e.findLinks=e.findLinks.bind(Object(u.a)(e)),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"findLinks",value:function(){var e=this;this.setState({sites:[]}),this.setState({users:[]}),fetch("http://techblogsearch.herokuapp.com/".concat(this.state.repo)).then((function(e){return e.json()})).then((function(t){if(t.message)e.setState({sites:o.a.createElement("div",{id:"message"},o.a.createElement("h2",null,"Github says: "),t.message)});else for(var n=0;n<t.length;n++)e.loadLinks(t[n])})).catch((function(e){return console.log(e)}))}},{key:"loadLinks",value:function(e){""===e.blog||e.blog.includes("twitter")||(e.blog.includes("http")||(e.blog="http://"+e.blog),this.setState({sites:this.state.sites.concat(o.a.createElement("p",{key:Math.round(1e4*Math.random()),className:"cluster"},o.a.createElement("img",{href:e.blog,className:"avatar",src:e.avatar_url,alt:"github profile picture of "+e.login}),o.a.createElement("br",null),o.a.createElement("a",{href:e.blog},e.blog.replace("http://","").replace("https://",""))))}))}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("a",{id:"about",href:"about.html"},"about"),o.a.createElement("div",{id:"search"},o.a.createElement("h2",{style:{color:"yellowgreen"}},"techblogsearch"),o.a.createElement("input",{type:"text",placeholder:"owner/repo",onKeyDown:function(t){13===t.keyCode&&e.findLinks(),e.setState({repo:t.target.value})}}),o.a.createElement("button",{onClick:this.findLinks},"Go")),o.a.createElement("br",null),this.state.sites)}}]),t}(a.Component);var d=function(){return o.a.createElement("div",null,o.a.createElement(b,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.43f9d80a.chunk.js.map