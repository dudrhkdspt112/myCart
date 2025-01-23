import apiClient from "../utils/api-client";

//유저 가입하기 함수이다.
export async function signup(user, profile) {
    const body = new FormData(); //스크립트 폼데이터
    
    body.append("name", user.name);
    body.append("email", user.email);
    body.append("password", user.password);
    body.append("deliveryAddress", user.deliveryAddress);
    body.append("profilePic", profile);

    await apiClient.post('user/signup', body);
}
//apiClient를 불러와서 비동기방식으로 보낸는 것이다.