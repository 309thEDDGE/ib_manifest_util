"use strict";(self.webpackChunkclassic=self.webpackChunkclassic||[]).push([[927],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>f});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(t),f=r,m=d["".concat(s,".").concat(f)]||d[f]||u[f]||o;return t?a.createElement(m,i(i({ref:n},c),{},{components:t})):a.createElement(m,i({ref:n},c))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=t[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},5617:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=t(7462),r=(t(7294),t(3905));const o={sidebar_position:1,sidebar_label:"IB Manifest Basics"},i="Running ib_manifest_util",l={unversionedId:"user-guide/basics",id:"user-guide/basics",title:"Running ib_manifest_util",description:"Once you've completed the installation instructions, downloaded the",source:"@site/docs/user-guide/basics.md",sourceDirName:"user-guide",slug:"/user-guide/basics",permalink:"/ib_manifest_util/user-guide/basics",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,sidebar_label:"IB Manifest Basics"},sidebar:"tutorialSidebar",previous:{title:"User Guide",permalink:"/ib_manifest_util/category/user-guide"},next:{title:"Updating an Iron Bank Repo",permalink:"/ib_manifest_util/user-guide/updating_repos"}},s={},p=[{value:"API documentation",id:"api-documentation",level:3}],c={toc:p};function u(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"running-ib_manifest_util"},"Running ib_manifest_util"),(0,r.kt)("p",null,"Once you've completed the ",(0,r.kt)("a",{parentName:"p",href:"../getting-started/installation"},"installation instructions"),", downloaded the\n",(0,r.kt)("a",{parentName:"p",href:"https://repo1.dso.mil/dsop"},"Iron Bank Container repo"),", and made changes to the\n",(0,r.kt)("inlineCode",{parentName:"p"},"local_channel_env.yaml")," in the repo, you can run ",(0,r.kt)("inlineCode",{parentName:"p"},"ib_manifest_util")," by running:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"update_repository(\n    repo_dir='path_to_repo',\n    dockerfile_version='dockerfile_version',\n)\n")),(0,r.kt)("p",null,"From there, all the files you need to update in the repo will be generated:\n",(0,r.kt)("inlineCode",{parentName:"p"},"repodata.json"),"(s), ",(0,r.kt)("inlineCode",{parentName:"p"},"Dockerfile"),", and ",(0,r.kt)("inlineCode",{parentName:"p"},"hardening_manifest.yaml"),"."),(0,r.kt)("h3",{id:"api-documentation"},"API documentation"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'def update_repo(\n    repo_dir: str | Path,\n    dockerfile_version: str,\n    local_env_path: str | Path = "local_channel_env.yaml",\n    startup_scripts_path: str | Path | None = None,\n    output_hardening_path: str | Path | None = None,\n    output_dockerfile_path: str | Path | None = None,\n    dockerfile_template_path: str | Path = None,\n):\n    """High level function to update an Iron Bank repository with a new environment.\n\n    The workflow:\n    1) User manually updates/adds a package into local_channel_env.yaml\n    2) run conda-vendor vendor using the local_channel_env.yaml to construct a local channel\n    3) copy both linux-64/repodata.json and noarch/repodata.json from the local channel to /config in the IB repo\n    4) run conda-vendor ironbank-gen using the local_channel_env.yaml to create ib_manifest.yaml\n    5) copy the ib_manifest.yaml contents into hardening_manifest.yaml\n    6) Create a new Dockerfile with updated COPY statements for new package(s)\n\n    Once those steps are done, users manually commit linux-64/repodata.json,\n    noarch/repodata.json, hardening_manifest.yaml and Dockerfile to git, which\n    then kicks off an Iron Bank pipeline\n\n    Args:\n        repo_dir: Full path to local copy of Iron Bank manifest repository.\n        dockerfile_version: dockerfile version to add to hardening manifest.\n        local_env_path: Optional. Full path to updated version of\n            `local_channel_env.yaml`.Default: \'local_channel_env.yaml\'\n        startup_scripts_path: Optional. Full path to yaml file with additional startup scripts.\n        output_hardening_path: output path for the new `hardening_manifest.yaml`. Use `None` to\n            overwrite the version in the repo\n        output_dockerfile_path: output path for the new `Dockerfile`. Use `None` to\n            overwrite the version in the repo\n')))}u.isMDXComponent=!0}}]);