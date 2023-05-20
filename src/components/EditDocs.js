import { useParams } from "react-router-dom"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from "react"
import { updateDoc, collection, doc, onSnapshot } from "firebase/firestore"

export const EditDocs = ({ database }) => {
    const params = useParams()
    const [docsDesc, setDocsDesc] = useState('')
    const [documentTitle, setDocumentTitle] = useState('')
    const collectionRef = collection(database, 'docsData')
    const isMounted = useRef()
    const getQuillData = (value) => {
        setDocsDesc(value)
    }
    const getData = () => {
        const document = doc(collectionRef, params.id)
        onSnapshot(document, (docs) => {
            // console.log(docs.data().docsDesc)
            setDocumentTitle(docs.data().title)
            setDocsDesc(docs.data().docsDesc)
        })
    }

    useEffect(() => {
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, params.id)
            updateDoc(document, {
                docsDesc: docsDesc
            })
                .then(() => { alert('Saved') })
                .catch(() => {
                    alert('Cannot Save')
                })
        }, 1000)
        return () => clearTimeout(updateDocsData)
    }, [docsDesc])

    useEffect(() => {
        if (isMounted.current) {
            return
        }
        isMounted.current = true
        getData()
    }, [])
    return (
        <div>
            <h1>
                {documentTitle}
            </h1>
            <ReactQuill
                value={docsDesc}
                onChange={getQuillData} />
        </div>
    )
}