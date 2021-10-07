import {useEffect, useState} from 'react'
import axios from 'axios'

export default function useFetch(lat, lng, range) {
    const [loading, setLoading] = useState(true) //initially loading is true
    const [error, setError] = useState(null)//initially error is null
    const [data, setData] = useState([]) //data is initially empty array
    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNDE5Y2QyZjEwNGNjMTVlNzE0Y2FkYyIsImVtYWlsIjoiYWdhaEBsaXZlY2FydC5haSJ9LCJpYXQiOjE2MzM1OTQ1ODksImV4cCI6MTYzNDE5OTM4OX0.hE-WoMCaWRi9BbXJPSA80iYIP3tkYp8VsWSWOPJ8Fzk'
            }, //token
            url: `https://dev-box.livecart-production.com:3000/shopper/search-nearby/5f419cd2f104cc15e714cadc?page=1&limit=200&offerSearch=false&latt=${lat}&long=${lng}&range=${range}`,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setData([...res.data.data]) //setting response data
            setLoading(false) //sets loading to false
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(e)
        })
        return () => cancel()
    }, [range,lat,lng])

    return {loading, error, data}
}