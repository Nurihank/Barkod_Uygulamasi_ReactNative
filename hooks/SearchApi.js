import api from "../api/api"
import { useEffect, useState } from "react"

export default () => {
    const UrunGetir = async (urunAra) => {
        const response = await api.get("/UrunGetir", {
            params: {
                urunAdi: urunAra
            }
        })
        console.log("SEARCH API TERM: " + urunAra)
        console.log("SEARCH API MESSAGE: " + response.data.message)
        return response.data.message // Dönen veriyi geri döndür
    }

    useEffect(() => {
        // İlk render sırasında bir şey yapmıyor
    }, [])

    return [UrunGetir]
}
