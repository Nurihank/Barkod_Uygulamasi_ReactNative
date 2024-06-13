import api from "../api/api"
import { useEffect, useState } from "react"

export default () => {
    const UrunGetir = async (urunAra) => {
        const response = await api.get("/UrunGetir", {
            params: {
                urunAdi: urunAra
            }
        })
        return response.data.message 
    }

    useEffect(() => {
     
    }, [])

    return [UrunGetir]
}
