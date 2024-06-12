import api from "../api/api"
import { useEffect,useState } from "react"
export default ()=>{

const [result, setresult] = useState([])

    const UrunGetir = async (urunAra) => {
        console.log(urunAra)
        const response = await api.get("/UrunGetir",{
          params:{
            urunAdi:urunAra 
          }
        }) 
        console.log(response.data.message)
        setresult(response.data.message)
    }
    useEffect(() => {
      UrunGetir()
    }, [])
    

    return[result,UrunGetir]
} 