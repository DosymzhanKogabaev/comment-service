import axios from "axios"
import bcrypt from 'bcryptjs' 

const url = 'http://localhost:3001'

export async function getUsersList() {
    const res = await axios.get(`${url}/users`)
    return res.data
}

export async function getUserByID(id: string) {
    const res = await axios.get(`${url}/users/${id}`)
    return res.data
}

export async function changeUserPassword(id: string, newPassword: string) {
    const res = await axios.patch(`${url}/users/${id}`, 
        {
            "password": newPassword
        })
    return res.data
}

export function comparePasswords(rawPassword: string, hash: string) {
    return bcrypt.compareSync(rawPassword, hash)
}