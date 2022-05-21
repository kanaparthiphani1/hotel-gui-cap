import axios from "axios"
const ROOM_API_URL = "https://0114-49-204-77-246.ngrok.io/roomapi/"

class RoomService {
    getRooms(){
        return axios.get(ROOM_API_URL + 'findAllRooms');
    }



}

export default new RoomService();
