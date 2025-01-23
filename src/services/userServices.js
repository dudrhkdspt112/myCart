import apiClient from "../utils/api-client";

//유저 가입하기 함수이다.
export async function signup(user, profile) {
    const body = new FormData(); //스크립트 폼데이터, 파일이 있어서 폼데이터 사용 
    
    body.append("name", user.name);
    body.append("email", user.email);
    body.append("password", user.password);
    body.append("deliveryAddress", user.deliveryAddress);
    body.append("profilePic", profile);

    const {data} = await apiClient.post('user/signup', body);
    localStorage.setItem("token", data.token);
}
//apiClient를 불러와서 비동기방식으로 보낸는 것이다.

//유저 로그인 함수
export async function login(user) {
    const {data} = await apiClient.post('user/login', user);
    localStorage.setItem("token", data.token);
    }

    