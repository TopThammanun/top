export const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");d.dataset.theme=t==="light"||t==="dark"?t:"dark"}catch(e){d.dataset.theme="dark"}})()`;
