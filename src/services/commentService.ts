import axios from "axios";
const url = 'http://localhost:3001'
export async function getCommentByID(id: string) {
    const res = await axios.get(`${url}/comments/${id}`)
    return res.data
}