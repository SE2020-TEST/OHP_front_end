import {postFetch} from "./fetchRequest";

export function logIn(uid,password,role,history){
    postFetch("/user/login",{
        uid:uid,
        password:password,
        role:role,
    },(rsp)=>{
        let user = rsp;
        sessionStorage.setItem("userId", user.id);//——返回的是用户的所有数据
        sessionStorage.setItem("userName", user.username);
        sessionStorage.setItem("userIcon", user.icon);
        sessionStorage.setItem("userRoot", user.root);//这些返回值就看有没有了，然后是全部存在session storage里面
        sessionStorage.setItem("userState", user.state);
        history.push("/home");//完成之后的跳转
    });
}
