(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8f9e564c"],{"0c12":function(t,e,s){"use strict";var i=s("2b0e");e["a"]=new i["default"]},"2e50":function(t,e,s){},a685:function(t,e,s){"use strict";var i=s("2e50"),n=s.n(i);n.a},bb51:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-container",{staticClass:"home-container"},[s("el-aside",{staticClass:"my-aside",attrs:{width:t.isOpen?"200px":"64px"}},[s("div",{staticClass:"logo",class:{minLogo:!t.isOpen}}),s("el-col",{attrs:{width:"200px"}},[s("el-menu",{staticStyle:{"border-right":"none"},attrs:{router:"","default-active":t.$route.path,"background-color":"#002233","text-color":"#fff","active-text-color":"#ffd04b",collapse:!t.isOpen,"collapse-transition":!1}},[s("el-menu-item",{attrs:{index:"/"}},[s("i",{staticClass:"el-icon-s-home"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("首页")])]),s("el-menu-item",{attrs:{index:"/articles"}},[s("i",{staticClass:"el-icon-document"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("内容管理")])]),s("el-menu-item",{attrs:{index:"/image"}},[s("i",{staticClass:"el-icon-picture"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("素材管理")])]),s("el-menu-item",{attrs:{index:"/publish"}},[s("i",{staticClass:"el-icon-s-promotion"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("发布文章")])]),s("el-menu-item",{attrs:{index:"/comment"}},[s("i",{staticClass:"el-icon-chat-dot-round"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("评论管理")])]),s("el-menu-item",{attrs:{index:"/fans"}},[s("i",{staticClass:"el-icon-present"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("粉丝管理")])]),s("el-menu-item",{attrs:{index:"/setting"}},[s("i",{staticClass:"el-icon-setting"}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v("个人设置")])])],1)],1)],1),s("el-container",[s("el-header",{staticClass:"my-header"},[s("span",{staticClass:"el-icon-s-fold icon",on:{click:function(e){return t.toggleAisde()}}}),s("span",{staticClass:"text"},[t._v("江苏传智播客科技教育有限公司")]),s("el-dropdown",{staticClass:"my-dropdown",on:{command:t.handelClick}},[s("span",{staticClass:"el-dropdown-link"},[s("img",{staticClass:"user-avatar",attrs:{src:t.userPhoto}}),s("span",{staticClass:"user-name"},[t._v(t._s(t.userName))]),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"setting",icon:"el-icon-setting"}},[t._v("个人设置")]),s("el-dropdown-item",{attrs:{command:"logout",icon:"el-icon-unlock"}},[t._v("退出登录")])],1)],1)],1),s("el-main",[s("router-view")],1)],1)],1)},n=[],o=(s("b0c0"),s("5f87")),a=s("0c12"),l={name:"my-home",data:function(){return{isOpen:!0,userName:"",userPhoto:""}},created:function(){var t=this,e=o["a"].getUser();this.userName=e.name,this.userPhoto=e.photo,a["a"].$on("updateUserName",(function(e){t.userName=e})),a["a"].$on("updateUserPhoto",(function(e){t.userPhoto=e}))},methods:{toggleAisde:function(){this.isOpen=!this.isOpen},setting:function(){this.$router.push("/setting")},logout:function(){o["a"].delUser(),this.$router.push("/login")},handelClick:function(t){this[t]()}}},r=l,c=(s("a685"),s("2877")),u=Object(c["a"])(r,i,n,!1,null,"6092bfc6",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-8f9e564c.fcfded07.js.map