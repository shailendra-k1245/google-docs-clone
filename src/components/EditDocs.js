import { useParams } from "react-router-dom"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from "react"
import { updateDoc, collection, doc, onSnapshot } from "firebase/firestore"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


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
                .then(() => {
                    toast.success('Document Saved', {
                        autoClose: 2000
                    })

                })
                .catch(() => {
                    toast.error('Cannot Save Document', {
                        autoClose: 2000
                    })
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
        <div className="editDocs-main">
            <h1>
                {documentTitle}
            </h1>
            <div className="editDocs-inner">
                <ReactQuill
                    className="react-quill"
                    value={docsDesc}
                    onChange={getQuillData} />
            </div>
            <ToastContainer />
        </div>
    )
}