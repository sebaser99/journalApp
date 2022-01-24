import { db } from "../firebase/firebase-config";
import { getDocs, collection, orderBy, query } from "firebase/firestore";

export const loadNotes = async (uid)=> {
    const  noteSnap = await getDocs(query(collection(db, `${uid}/journal/notes`), orderBy('date', 'desc')))
    const notes = [];
    noteSnap.forEach(doc =>{
        notes.push({
            id: doc.id,
            ...doc.data()
        })
    })

        return notes
}