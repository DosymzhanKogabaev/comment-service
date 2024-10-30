import axios from "axios";
import bcrypt from 'bcryptjs' 

const url = 'http://localhost:3001'

export async function getCompaniesList() {
    const res = await axios.get(`${url}/companies`)
    return res.data
}

export async function getCompanyByID(id: string) {
    const res = await axios.get(`${url}/companies/${id}`)
    return res.data
}

export async function getCompanyByName(companyName: string) {
    const companies = await getCompaniesList()
    for(let i in companies) {
        if(companies[i].companyName.toLowerCase() === companyName.toLowerCase()) return companies[i]
    }
    return null
}

export async function changeCompanyPassword(id: string, newPassword: string) {
    const res = await axios.patch(`${url}/companies/${id}`, 
        {
            "password": newPassword
        })
    return res.data
}

export function comparePasswords(rawPassword: string, hash: string) {
    return bcrypt.compareSync(rawPassword, hash)
}