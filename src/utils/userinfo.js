export function setUserinfo(userinfo){
    sessionStorage.setItem('userinfo',JSON.stringify(userinfo));
}

export function getUserinfo(){
    return JSON.parse(sessionStorage.getItem('userinfo'));
}

export function removeUserinfo(){
    sessionStorage.removeItem('userinfo');
}