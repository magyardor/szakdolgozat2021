(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{jkDv:function(t,n,e){"use strict";e.r(n),e.d(n,"AdminModule",function(){return et});var i=e("ofXK"),o=e("3Pt+"),a=e("tyNb"),c=e("PCNd"),r=e("fXoL"),s=e("KLmy"),l=e("hq03"),b=e("Xa2L"),d=e("QxiC"),m=e("bTqV"),u=e("kmnG"),g=e("NFeN"),p=e("sYmb");function h(t,n){1&t&&r.Pb(0,"mat-spinner")}function f(t,n){if(1&t){const t=r.Vb();r.Ub(0,"form",7),r.Ub(1,"div",8),r.Ub(2,"div",9),r.Hc(3),r.gc(4,"translate"),r.Tb(),r.Pb(5,"app-language-selector"),r.Tb(),r.Ub(6,"div",10),r.Ub(7,"div",11),r.Ub(8,"label"),r.Hc(9),r.gc(10,"translate"),r.Tb(),r.Ub(11,"div",12),r.Pb(12,"input",13),r.Tb(),r.Tb(),r.Ub(13,"div",11),r.Ub(14,"label"),r.Hc(15),r.gc(16,"translate"),r.Tb(),r.Ub(17,"div",12),r.Pb(18,"input",14),r.Ub(19,"button",15),r.bc("click",function(){r.zc(t);const n=r.fc();return n.hide=!n.hide}),r.Ub(20,"mat-icon"),r.Hc(21),r.Tb(),r.Tb(),r.Tb(),r.Tb(),r.Tb(),r.Ub(22,"div",16),r.Ub(23,"button",17),r.bc("click",function(){return r.zc(t),r.fc().login()}),r.Hc(24),r.gc(25,"translate"),r.Tb(),r.Tb(),r.Tb()}if(2&t){const t=r.fc();r.oc("formGroup",t.userForm),r.Db(3),r.Ic(r.hc(4,9,"GENERIC.LOGIN")),r.Db(6),r.Ic(r.hc(10,11,"FORM.LOGIN.EMAIL")),r.Db(6),r.Ic(r.hc(16,13,"FORM.LOGIN.PASSWORD")),r.Db(3),r.oc("type",t.hide?"password":"text"),r.Db(1),r.Eb("aria-label","Hide password")("aria-pressed",t.hide),r.Db(2),r.Ic(t.hide?"visibility_off":"visibility"),r.Db(3),r.Ic(r.hc(25,15,"GENERIC.LOGIN"))}}let v=(()=>{class t{constructor(t,n){this.service=t,this.alertService=n,this.isLoading=!1,this.submitted=!1,this.hide=!0,this.userForm=new o.g({email:new o.e("",o.s.required),password:new o.e("",o.s.required)})}ngOnInit(){}login(){if(this.userForm.invalid)return this.alertService.warn("ALERT.WARN.INVALID_FORM"),this.userForm.markAllAsTouched(),void(this.isLoading=!1);this.submitted=!0,this.isLoading=!0,this.service.logIn(this.userForm.value.email,this.userForm.value.password)}}return t.\u0275fac=function(n){return new(n||t)(r.Ob(s.a),r.Ob(l.a))},t.\u0275cmp=r.Ib({type:t,selectors:[["app-login"]],decls:7,vars:2,consts:[["id","page-login"],["id","logo-bg",1,"col-md-7","d-none","d-sm-flex"],["src","..\\..\\..\\assets\\logos\\logo_monogram.png","id","logo-monogram"],[2,"border","1px solid #C4C4C4","height","50%","display","flex","align-self","center"],["id","login-container",1,"col-md-5","col-sm-12","container"],[4,"ngIf"],["class","form-group",3,"formGroup",4,"ngIf"],[1,"form-group",3,"formGroup"],[1,"title-login"],["id","add-user-text"],[2,"display","grid","justify-content","center"],[1,"app-form-field"],[2,"display","flex"],["formControlName","email","type","email","placeholder","Email","required","","email","",2,"padding","0.6rem 1rem !important"],["formControlName","password","placeholder","Password","required","","password","",2,"padding","0.6rem 1rem !important",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["id","button-container"],["mat-raised-button","",1,"btn",3,"click"]],template:function(t,n){1&t&&(r.Ub(0,"div",0),r.Ub(1,"div",1),r.Pb(2,"img",2),r.Tb(),r.Pb(3,"div",3),r.Ub(4,"div",4),r.Fc(5,h,1,0,"mat-spinner",5),r.Fc(6,f,26,17,"form",6),r.Tb(),r.Tb()),2&t&&(r.Db(5),r.oc("ngIf",n.isLoading),r.Db(1),r.oc("ngIf",!n.isLoading))},directives:[i.n,b.b,o.t,o.n,o.h,d.a,o.c,o.m,o.f,o.r,o.d,m.a,u.g,g.a],pipes:[p.b],styles:["#page-login[_ngcontent-%COMP%]{height:100vh;display:flex}#logo-bg[_ngcontent-%COMP%]{height:100%;display:flex;justify-content:center;align-items:center}img[_ngcontent-%COMP%]{width:80%}.app-form-field[_ngcontent-%COMP%]{display:grid!important;align-self:center!important}#login-container[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;justify-content:space-around;align-items:center}#login-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{width:90%}#login-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .title-login[_ngcontent-%COMP%]{display:flex;justify-content:space-between}#login-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   #add-user-text[_ngcontent-%COMP%]{font-size:32px;color:var(--highlighter-color);font-weight:700;padding-bottom:50px}#login-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   #button-container[_ngcontent-%COMP%]{display:flex;justify-content:center}#login-container[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{background:var(--main-color);box-shadow:inset -10px 0 20px var(--highlighter-color);border-radius:5px;color:var(--light-color)}"]}),t})();var T=e("qFsG");function C(t,n){1&t&&r.Pb(0,"mat-spinner")}function U(t,n){if(1&t){const t=r.Vb();r.Ub(0,"form",3),r.Ub(1,"div",4),r.Hc(2,"Add user"),r.Tb(),r.Ub(3,"mat-form-field",5),r.Ub(4,"mat-label"),r.Hc(5,"User Email"),r.Tb(),r.Pb(6,"input",6),r.Ub(7,"mat-error"),r.Hc(8,"Please enter a valid email."),r.Tb(),r.Tb(),r.Ub(9,"mat-form-field",5),r.Ub(10,"mat-label"),r.Hc(11,"Password"),r.Tb(),r.Pb(12,"input",7),r.Ub(13,"mat-error"),r.Hc(14,"Please enter a valid password"),r.Tb(),r.Ub(15,"button",8),r.bc("click",function(){r.zc(t);const n=r.fc();return n.hide=!n.hide}),r.Ub(16,"mat-icon"),r.Hc(17),r.Tb(),r.Tb(),r.Tb(),r.Ub(18,"div",9),r.Ub(19,"button",10),r.bc("click",function(){return r.zc(t),r.fc().addUser()}),r.Hc(20,"Add user"),r.Tb(),r.Tb(),r.Tb()}if(2&t){const t=r.fc();r.oc("formGroup",t.addUserForm),r.Db(12),r.oc("type",t.hide?"password":"text"),r.Db(3),r.Eb("aria-label","Hide password")("aria-pressed",t.hide),r.Db(2),r.Ic(t.hide?"visibility_off":"visibility")}}let M=(()=>{class t{constructor(t,n){this.service=t,this.alertService=n,this.isLoading=!1,this.hide=!0,this.addUserForm=new o.g({email:new o.e(""),password:new o.e("")})}ngOnInit(){}addUser(){if(this.addUserForm.invalid)return this.alertService.warn("ALERT.WARN.INVALID_FORM"),this.addUserForm.markAllAsTouched(),void(this.isLoading=!1);this.isLoading=!0,this.service.addUser(this.addUserForm.value.email,this.addUserForm.value.password),this.addUserForm.reset()}}return t.\u0275fac=function(n){return new(n||t)(r.Ob(s.a),r.Ob(l.a))},t.\u0275cmp=r.Ib({type:t,selectors:[["app-add-user"]],decls:3,vars:2,consts:[[1,"secondary-box-shadow","add-user-box"],[4,"ngIf"],["class","form-group",3,"formGroup",4,"ngIf"],[1,"form-group",3,"formGroup"],["id","add-user-text"],["appearance","outline"],["id","useremail","matInput","","formControlName","email","type","email","placeholder","Email","required","","email",""],["matInput","","formControlName","password","placeholder","Password","required","","password","",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],["id","button-container"],["mat-raised-button","",1,"btn-secondary",3,"click"]],template:function(t,n){1&t&&(r.Ub(0,"div",0),r.Fc(1,C,1,0,"mat-spinner",1),r.Fc(2,U,21,5,"form",2),r.Tb()),2&t&&(r.Db(1),r.oc("ngIf",n.isLoading),r.Db(1),r.oc("ngIf",!n.isLoading))},directives:[i.n,b.b,o.t,o.n,o.h,u.c,u.f,T.b,o.c,o.m,o.f,o.r,o.d,u.b,m.a,u.g,g.a],styles:["#add-user-text[_ngcontent-%COMP%]{font-size:32px;color:var(--white-color);font-weight:700;padding-bottom:50px}#button-container[_ngcontent-%COMP%], .add-user-box[_ngcontent-%COMP%]{display:flex;justify-content:center}.add-user-box[_ngcontent-%COMP%]{width:100%}"]}),t})(),w=(()=>{class t{constructor(t,n){this.router=t,this.authService=n}canActivate(t,n){return this.authService.getIsAuth()||(this.router.navigate(["/login"]),!1)}}return t.\u0275fac=function(n){return new(n||t)(r.Yb(a.c),r.Yb(s.a))},t.\u0275prov=r.Kb({token:t,factory:t.\u0275fac}),t})();var D=e("/t3+"),O=e("XhcP"),P=e("MutI");const x=["sidenav"],E=function(t){return{"opened-menu":t}},_=function(){return["/home"]},I=function(t){return{opened:t}},S=function(){return["selected"]},y=function(){return["/admin/products-list/add-products"]},L=function(){return["/admin/products-list"]},H=function(){return["/admin/news-list/create"]},N=function(){return["/admin/news-list"]},k=function(){return["/admin/messages-list"]},A=function(){return["/admin/add-user"]};let F=(()=>{class t{constructor(t){this.service=t,this.showSubmenu=!1,this.isShowing=!1,this.showSubSubMenu=!1}ngOnInit(){}mouseenter(){this.isExpanded||(this.isShowing=!0)}mouseleave(){this.isExpanded||(this.isShowing=!1)}logOut(){this.service.logout()}}return t.\u0275fac=function(n){return new(n||t)(r.Ob(s.a))},t.\u0275cmp=r.Ib({type:t,selectors:[["app-navbar"]],viewQuery:function(t,n){if(1&t&&r.Mc(x,1),2&t){let t;r.vc(t=r.cc())&&(n.sidenav=t.first)}},inputs:{isExpanded:"isExpanded"},decls:68,vars:101,consts:[[1,"example-container"],["mode","side","opened","true",1,"example-sidenav",3,"ngClass","mouseenter","mouseleave"],["sidenav",""],["id","sidenav"],[1,"p-0"],[3,"routerLink"],[1,"material-icons","m-3","noselect"],[1,"full-width","animated-text",3,"ngClass"],[1,"subMenuTitle","animated-text",3,"ngClass"],[3,"routerLinkActive","routerLink"],[1,"pb-2"],[3,"click"],[1,"material-icons","m-3","noselect","logout"],[1,"example-sidenav-content",2,"margin","15px"]],template:function(t,n){1&t&&(r.Ub(0,"mat-sidenav-container",0),r.Ub(1,"mat-sidenav",1,2),r.bc("mouseenter",function(){return n.mouseenter()})("mouseleave",function(){return n.mouseleave()}),r.Ub(3,"div",3),r.Ub(4,"mat-nav-list",4),r.Ub(5,"mat-list-item",5),r.Ub(6,"span",6),r.Hc(7," home "),r.Tb(),r.Ub(8,"span",7),r.Hc(9),r.gc(10,"translate"),r.Tb(),r.Tb(),r.Ub(11,"div",8),r.Hc(12),r.gc(13,"translate"),r.Tb(),r.Ub(14,"mat-list-item",9),r.Ub(15,"span",6),r.Hc(16," add "),r.Tb(),r.Ub(17,"span",7),r.Hc(18),r.gc(19,"translate"),r.Tb(),r.Tb(),r.Ub(20,"mat-list-item",9),r.Ub(21,"span",6),r.Hc(22," list "),r.Tb(),r.Ub(23,"span",7),r.Hc(24),r.gc(25,"translate"),r.Tb(),r.Tb(),r.Ub(26,"div",8),r.Hc(27),r.gc(28,"translate"),r.Tb(),r.Ub(29,"mat-list-item",9),r.Ub(30,"span",6),r.Hc(31," add "),r.Tb(),r.Ub(32,"span",7),r.Hc(33),r.gc(34,"translate"),r.Tb(),r.Tb(),r.Ub(35,"mat-list-item",9),r.Ub(36,"span",6),r.Hc(37," list "),r.Tb(),r.Ub(38,"span",7),r.Hc(39),r.gc(40,"translate"),r.Tb(),r.Tb(),r.Ub(41,"div",8),r.Hc(42),r.gc(43,"translate"),r.Tb(),r.Ub(44,"mat-list-item",9),r.Ub(45,"span",6),r.Hc(46," list "),r.Tb(),r.Ub(47,"span",7),r.Hc(48),r.gc(49,"translate"),r.Tb(),r.Tb(),r.Tb(),r.Ub(50,"mat-nav-list",10),r.Ub(51,"div",8),r.Hc(52),r.gc(53,"translate"),r.Tb(),r.Ub(54,"mat-list-item",9),r.Ub(55,"span",6),r.Hc(56," add "),r.Tb(),r.Ub(57,"span",7),r.Hc(58),r.gc(59,"translate"),r.Tb(),r.Tb(),r.Ub(60,"mat-list-item",11),r.bc("click",function(){return n.logOut()}),r.Ub(61,"span",12),r.Hc(62," power_off "),r.Tb(),r.Ub(63,"span",7),r.Hc(64),r.gc(65,"translate"),r.Tb(),r.Tb(),r.Tb(),r.Tb(),r.Tb(),r.Ub(66,"div",13),r.Pb(67,"router-outlet"),r.Tb(),r.Tb()),2&t&&(r.Db(1),r.oc("ngClass",r.rc(62,E,n.isExpanded||n.isShowing)),r.Db(4),r.oc("routerLink",r.qc(64,_)),r.Db(3),r.oc("ngClass",r.rc(65,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(10,38,"SIDE_MENU.GENERIC.HOME")),r.Db(2),r.oc("ngClass",r.rc(67,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(13,40,"SIDE_MENU.PRODUCTS.TITLE")),r.Db(2),r.oc("routerLinkActive",r.qc(69,S))("routerLink",r.qc(70,y)),r.Db(3),r.oc("ngClass",r.rc(71,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(19,42,"SIDE_MENU.PRODUCTS.ADD_PRODUCT")),r.Db(2),r.oc("routerLinkActive",r.qc(73,S))("routerLink",r.qc(74,L)),r.Db(3),r.oc("ngClass",r.rc(75,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(25,44,"SIDE_MENU.PRODUCTS.MANAGE_PRODUCTS")),r.Db(2),r.oc("ngClass",r.rc(77,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(28,46,"SIDE_MENU.NEWS.TITLE")),r.Db(2),r.oc("routerLinkActive",r.qc(79,S))("routerLink",r.qc(80,H)),r.Db(3),r.oc("ngClass",r.rc(81,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(34,48,"SIDE_MENU.NEWS.ADD_NEWS")),r.Db(2),r.oc("routerLinkActive",r.qc(83,S))("routerLink",r.qc(84,N)),r.Db(3),r.oc("ngClass",r.rc(85,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(40,50,"SIDE_MENU.NEWS.MANAGE_NEWS")),r.Db(2),r.oc("ngClass",r.rc(87,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(43,52,"SIDE_MENU.MESSAGES.TITLE")),r.Db(2),r.oc("routerLinkActive",r.qc(89,S))("routerLink",r.qc(90,k)),r.Db(3),r.oc("ngClass",r.rc(91,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(49,54,"SIDE_MENU.MESSAGES.MENAGE_MESSAGES")),r.Db(3),r.oc("ngClass",r.rc(93,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(53,56,"SIDE_MENU.ACCOUNT.TITLE")),r.Db(2),r.oc("routerLinkActive",r.qc(95,S))("routerLink",r.qc(96,A)),r.Db(3),r.oc("ngClass",r.rc(97,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(59,58,"SIDE_MENU.ACCOUNT.ADD_USER")),r.Db(5),r.oc("ngClass",r.rc(99,I,n.isExpanded||n.isShowing)),r.Db(1),r.Ic(r.hc(65,60,"GENERIC.LOGOUT")))},directives:[O.b,O.a,i.l,P.c,P.a,a.d,a.e,a.g],pipes:[p.b],styles:[".mat-list-base[_ngcontent-%COMP%]   .mat-list-item[_ngcontent-%COMP%]{color:var(--light-color)}.mat-sidenav-content[_ngcontent-%COMP%]{display:contents}.mat-drawer[_ngcontent-%COMP%]{background-color:var(--main-color);color:var(--light-color);justify-content:space-between}.example-container[_ngcontent-%COMP%]{height:calc(100vh - 64px);background-color:var(--white-color)}.example-sidenav[_ngcontent-%COMP%]{-webkit-user-select:none;user-select:none;width:50px;transition:.3s ease-in-out;box-shadow:-20px 0 20px 20px #000}.example-sidenav-content[_ngcontent-%COMP%]{display:flex;height:100%;align-items:center;justify-content:center}.full-width[_ngcontent-%COMP%]{width:100%}.menu-button[_ngcontent-%COMP%]{transition:.3s ease-in-out;transform:rotate(0deg)}.menu-button.rotated[_ngcontent-%COMP%]{transform:rotate(180deg)}.submenu[_ngcontent-%COMP%]{overflow-y:hidden;transition:transform .3s ease;transform:scaleY(0);transform-origin:top;padding-right:30px}.submenu.expanded[_ngcontent-%COMP%]{transform:scaleY(1)}#sidenav[_ngcontent-%COMP%]{height:100%;display:flex!important;flex-direction:column!important;justify-content:space-between!important}mat-list-item[_ngcontent-%COMP%]:hover{background-color:var(--input-color)!important;color:var(--light-color)!important;transition:background-color .5s ease!important}.selected[_ngcontent-%COMP%]{transition:background-color .3s ease-in-out;background-color:var(--light-color)!important;color:var(--white-color)!important}  .example-sidenav-content{height:auto!important}.subMenuTitle[_ngcontent-%COMP%]{color:var(--highlighter-color);font-style:bold;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:4px;padding-left:10px;margin:25px 0 0 10px;border-bottom:1px solid #b9b9b94d}.opened[_ngcontent-%COMP%]{opacity:1!important;visibility:visible!important}.animated-text[_ngcontent-%COMP%]{opacity:0;visibility:hidden;transition:.3s ease-in-out}.opened-menu[_ngcontent-%COMP%]{width:220px!important}"]}),t})(),R=(()=>{class t{constructor(){this.isShowing=!0,this.i=0}ngOnInit(){}open(t){0==this.i?(this.isShowing=!1,this.i++):(this.isShowing=!0,this.i--)}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=r.Ib({type:t,selectors:[["app-admin"]],decls:9,vars:1,consts:[[1,"toolbar",2,"box-shadow","0px -20px 20px 20px #000"],[1,"material-icons","pointer","noselect",3,"click"],[1,"toolbar-left"],[1,"logo-name"],["src","../../assets/logos/logo_monogram_dark.png"],[3,"isExpanded"]],template:function(t,n){1&t&&(r.Ub(0,"mat-toolbar",0),r.Ub(1,"span",1),r.bc("click",function(t){return n.open(t)}),r.Hc(2,"menu"),r.Tb(),r.Ub(3,"div",2),r.Ub(4,"div"),r.Pb(5,"app-language-selector"),r.Tb(),r.Ub(6,"div",3),r.Pb(7,"img",4),r.Tb(),r.Tb(),r.Tb(),r.Pb(8,"app-navbar",5)),2&t&&(r.Db(8),r.oc("isExpanded",n.isShowing))},directives:[D.a,d.a,F],styles:[".toolbar[_ngcontent-%COMP%]{background-color:var(--main-color);color:var(--light-color);height:64px;justify-content:space-between}.toolbar-left[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center}.logo-name[_ngcontent-%COMP%]{display:contents}img[_ngcontent-%COMP%]{width:5%}"]}),t})();var q=e("HiVs"),G=e("+0xr"),j=e("M9IT"),z=e("STbY");function W(t,n){1&t&&(r.Ub(0,"th",10),r.Hc(1),r.gc(2,"translate"),r.Tb()),2&t&&(r.Db(1),r.Ic(r.hc(2,1,"TABLE.FULL_NAME")))}function V(t,n){if(1&t&&(r.Ub(0,"td",11),r.Hc(1),r.Tb()),2&t){const t=n.$implicit;r.Db(1),r.Kc("",t.lastName," ",t.firstName,"")}}function Y(t,n){1&t&&(r.Ub(0,"th",10),r.Hc(1),r.gc(2,"translate"),r.Tb()),2&t&&(r.Db(1),r.Ic(r.hc(2,1,"TABLE.EMAIL")))}function B(t,n){if(1&t&&(r.Ub(0,"td",11),r.Hc(1),r.Tb()),2&t){const t=n.$implicit;r.Db(1),r.Ic(t.email)}}function K(t,n){1&t&&(r.Ub(0,"th",10),r.Hc(1),r.gc(2,"translate"),r.Tb()),2&t&&(r.Db(1),r.Ic(r.hc(2,1,"TABLE.DESCRIPTION")))}function X(t,n){if(1&t&&(r.Ub(0,"td",11),r.Hc(1),r.Tb()),2&t){const t=n.$implicit;r.Db(1),r.Ic(t.description)}}function $(t,n){1&t&&(r.Ub(0,"th",10),r.Hc(1),r.gc(2,"translate"),r.Tb()),2&t&&(r.Db(1),r.Ic(r.hc(2,1,"TABLE.MENU")))}function J(t,n){if(1&t){const t=r.Vb();r.Ub(0,"td",11),r.Ub(1,"button",12),r.Hc(2,"..."),r.Tb(),r.Ub(3,"mat-menu",13,14),r.Ub(5,"button",15),r.bc("click",function(){r.zc(t);const e=n.$implicit;return r.fc().onDelete(e.id)}),r.Ub(6,"span",16),r.Hc(7," delete "),r.Tb(),r.Hc(8),r.gc(9,"translate"),r.Tb(),r.Tb(),r.Tb()}if(2&t){const t=r.wc(4);r.Db(1),r.oc("matMenuTriggerFor",t),r.Db(7),r.Jc(" ",r.hc(9,2,"GENERIC.ACTION.DELETE")," ")}}function Q(t,n){1&t&&r.Pb(0,"tr",17)}function Z(t,n){1&t&&r.Pb(0,"tr",18)}const tt=function(){return[5,10,20]},nt=[{path:"login",component:v},{path:"",component:R,canActivate:[w],children:[{path:"add-user",component:M},{path:"news-list",loadChildren:()=>e.e(5).then(e.bind(null,"D5Wi")).then(t=>t.NewsListModule)},{path:"products-list",loadChildren:()=>e.e(6).then(e.bind(null,"HqHl")).then(t=>t.ProductsListModule)},{path:"messages-list",component:(()=>{class t{constructor(t){this.contactService=t,this.displayedColumns=["fullName","email","description","menu"],this.messages=[],this.isLoading=!1}ngOnInit(){this.isLoading=!0,this.contactService.getMessage(),this.msgSub=this.contactService.getUpdateMessageListener().subscribe(t=>{this.isLoading=!1,this.messages=t})}onDelete(t){this.contactService.deleteMessages(t)}ngOnDestroy(){this.msgSub.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(r.Ob(q.a))},t.\u0275cmp=r.Ib({type:t,selectors:[["app-messages"]],decls:17,vars:5,consts:[["mat-table","",3,"dataSource"],["matColumnDef","fullName"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","email"],["matColumnDef","description"],["matColumnDef","menu"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","","aria-label","Select page of periodic elements",3,"pageSizeOptions"],["mat-header-cell",""],["mat-cell",""],["mat-button","",3,"matMenuTriggerFor"],[1,"btn-main"],["menu","matMenu"],["mat-menu-item","",3,"click"],[1,"material-icons"],["mat-header-row",""],["mat-row",""]],template:function(t,n){1&t&&(r.Ub(0,"div"),r.Ub(1,"table",0),r.Sb(2,1),r.Fc(3,W,3,3,"th",2),r.Fc(4,V,2,2,"td",3),r.Rb(),r.Sb(5,4),r.Fc(6,Y,3,3,"th",2),r.Fc(7,B,2,1,"td",3),r.Rb(),r.Sb(8,5),r.Fc(9,K,3,3,"th",2),r.Fc(10,X,2,1,"td",3),r.Rb(),r.Sb(11,6),r.Fc(12,$,3,3,"th",2),r.Fc(13,J,10,4,"td",3),r.Rb(),r.Fc(14,Q,1,0,"tr",7),r.Fc(15,Z,1,0,"tr",8),r.Tb(),r.Pb(16,"mat-paginator",9),r.Tb()),2&t&&(r.Db(1),r.oc("dataSource",n.messages),r.Db(13),r.oc("matHeaderRowDef",n.displayedColumns),r.Db(1),r.oc("matRowDefColumns",n.displayedColumns),r.Db(1),r.oc("pageSizeOptions",r.qc(4,tt)))},directives:[G.j,G.c,G.e,G.b,G.g,G.i,j.a,G.d,G.a,m.a,z.d,z.a,z.b,G.f,G.h],pipes:[p.b],styles:["table[_ngcontent-%COMP%]{background-color:var(--white-color)!important;width:100%}table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:var(--light-color);border:1px solid var(--light-color);color:var(--white-color)!important}table[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%]{text-align:center}table[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%]:first-of-type{padding-left:0}table[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%]:last-of-type{padding-right:0}table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border:1px solid var(--light-color);color:var(--light-color)!important}table[_ngcontent-%COMP%]   td.mat-cell[_ngcontent-%COMP%]:first-of-type{padding-left:0}table[_ngcontent-%COMP%]   td.mat-cell[_ngcontent-%COMP%]:last-of-type{padding-right:0}table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background-color:var(--input-color)}"]}),t})()},{path:"**",redirectTo:"products-list",pathMatch:"full"}]},{path:"**",redirectTo:"login",pathMatch:"full"}];let et=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=r.Mb({type:t}),t.\u0275inj=r.Lb({providers:[w],imports:[[i.c,c.a,a.f.forChild(nt),o.i,o.q]]}),t})()}}]);