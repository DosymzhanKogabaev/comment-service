import axios from "axios";
const url = 'https://comment-service-backend.onrender.com'
export async function getCommentByID(id: string) {
    const res = await axios.get(`${url}/comments/${id}`)
    return res.data
}