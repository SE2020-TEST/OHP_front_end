import {postFetch} from "./fetchRequest";

export function logIn(uid,password,role,history){
    postFetch("/user/login",{
        uid:uid,
        password:password,
        role:role,
    },(rsp)=>{
        let user = rsp;
        sessionStorage.setItem("userId", user.userId);//——返回的是用户的所有数据
        sessionStorage.setItem("role", user.role);
        sessionStorage.setItem("roleId", user.id);
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("Email", user.email);
        sessionStorage.setItem("userAvatar", user.avatar);
        sessionStorage.setItem("userPhone", user.phone);
        history.push("/home");//完成之后的跳转
    });
}
