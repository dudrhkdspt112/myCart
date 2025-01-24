import apiClient from "../utils/api-client";

//제품id 와 수량을 디비에 저장한다.
export function addToCartAPI(id, quantity) {
    return apiClient.post(`cart/${id}`, {quantity});
}

//유저별로 저장된 카트정보를 가져오기
export function getCartAPI() {
    return apiClient.get('/cart');
}

//장바구니에 제품 삭제하기
export function removeFromCartAPI(id) {
    return apiClient.patch(`/cart/remove/${id}`); //patch사용한 이유는 업데이트랑 같음(수정) 제품을 지우기 위해 사용
  }