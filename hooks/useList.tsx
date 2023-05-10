import { useEffect, useState } from "react"
import { Movie } from "../typing"
import { DocumentData, collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

const useList = (uid: string | undefined) => {
    const [list, setList] = useState<Movie[] | DocumentData[]>([])

    useEffect(() => { 
        if(!uid) return

        return onSnapshot(collection(db,"customers", uid, "myList"),(snapshot)=>{
            setList(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    ...doc.data()
                }))
            )
        })
    }, [])
    return (
        <div>useList</div>
    )
}

export default useList