import axios from "axios";

let instance=axios.create({
    baseURL:"https://burgerbuilder-c52ae-default-rtdb.firebaseio.com/",
});

export default instance;