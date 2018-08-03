export default {
        changeLogin(state,data){
          state.isLogin = data;
        },
    changeCity(state,city){
        state.city = city;
        try {
            localStorage.city = city
        } catch (error) {
            
        }
       
    }
}