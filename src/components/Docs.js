import { useEffect, useRef, useState } from "react"
import { ModalComponent } from "./ModalComponent"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export const Docs = ({ database }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const [title, setTitle] = useState('')
    const [docsData, setDocsData] = useState([])
    const isMounted = useRef()
    const navigate = useNavigate()
    const handleClose = () => { }
    const collectionRef = collection(database, 'docsData')
    const getID = (id) => {
        navigate(`/editDocs/${id}`)
    }
    const addData = () => {
        addDoc(collectionRef, {
            title: title,
            docsDesc:''
        })
            .then(() => {
                alert('Data Added')
                handleClose()
            })
            .catch(() => {
                alert('Cannot add data')
            })
    }
    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }))
        })
    }

    useEffect(() => {
        if (isMounted.current) {
            return
        }
        isMounted.current = true
        getData()
    })
    return (
        <div className="docs-main">
            <h1>Docs Clone</h1>
            <button className="add-docs"
                onClick={handleOpen}>
                Add a Document
            </button>
            <ModalComponent
                open={open}
                setOpen={setOpen}
                title={title}
                setTitle={setTitle}
                addData={addData} />
            <div className="grid-main">
                {docsData.map((doc) => {
                    return (
                        <div className="grid-child"
                            onClick={() => getID(doc.id)}>
                            <p>{doc.title}</p>
                            <div dangerouslySetInnerHTML={{ __html: doc.docsDesc }} style={{ fontWeight: 'Bold', fontStyle: 'Italic' }} />
                        </div>
                    )
                })}
            </div>
        </div >
    )
}