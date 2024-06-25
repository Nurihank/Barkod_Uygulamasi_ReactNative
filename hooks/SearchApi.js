import api from "../api/api"
import { useEffect, useState } from "react"

export default () => {
    const UrunGetir = async (urunAra) => {
        
        const response = await api.get("/UrunGetir", {
            params: {
                urunAdi: urunAra
            }
        }) 
       // console.log(response.data.message )
        return response.data.message 
    }
     
    const KategoriGetir = async (kategoriAra) => {
        
        const response = await api.get("/KategoriGetir", {
            params: {
                kategoriAdi:kategoriAra
            }
        }) 
       // console.log(response.data.message )
        return response.data.message 
    }  

    useEffect(() => {  
     
    }, [])
 
    return [UrunGetir,KategoriGetir]
}
