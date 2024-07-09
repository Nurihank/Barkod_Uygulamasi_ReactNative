import api from "../api/api"
import { useEffect, useState } from "react"

export default () => {
    const UrunGetir = async (urunAra) => {
        const response = await api.get("/UrunControllers/"+urunAra) 
        return response.data  
    }
     
    const KategoriGetir = async (kategoriAra) => {       
        const response = await api.get("/KategoriControllers") 
        return response.data 
    }  

    useEffect(() => {  
    
    }, [])
 
    return [UrunGetir,KategoriGetir]
}
