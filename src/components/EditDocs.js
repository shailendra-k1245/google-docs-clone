import { useParams, useNavigate } from "react-router-dom"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from "react"
import { updateDoc, collection, doc, onSnapshot } from "firebase/firestore"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { CiTimer } from "react-icons/ci"
import { BiCommentDetail } from "react-icons/bi"
import { MdVideoCall } from "react-icons/md"
import { CgProfile } from "react-icons/cg"
import { Dialog, DialogTitle } from "@mui/material"


export const EditDocs = ({ database }) => {
    const params = useParams()
    const [docsDesc, setDocsDesc] = useState('')
    const [documentTitle, setDocumentTitle] = useState('')
    const collectionRef = collection(database, 'docsData')
    const navigate = useNavigate()
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

    const [openDialog, handleDisplay] = useState(false);

    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        handleDisplay(true);
    };

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
        <div>
            <div className="document-title-image">
                <img src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_256px.png" alt="docs logo" className="docs-logo"
                    onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
                <div className="document-title-inner">
                    <h3>
                        {documentTitle}
                    </h3>
                    <div className="upper-toolbar">
                        <p>File</p>
                        <p>Edit</p>
                        <p>View</p>
                        <p>Insert</p>
                        <p>Format</p>
                        <p>Tools</p>
                        <p>Extensions</p>
                        <p>Help</p>
                    </div>
                </div>
                <div className="share-bar">
                    <CiTimer />
                    <BiCommentDetail />
                    <MdVideoCall />
                    <img src="https://2.bp.blogspot.com/-wuhkBGAM8bQ/Vt-Kz80of4I/AAAAAAAAUJU/v99P5XMEnLA/s320/share-button.png" alt="share"
                        onClick={openDialogBox} />
                    <CgProfile />
                </div>
            </div>
            <div className="editDocs-main">
                <div className="editDocs-inner">
                    <ReactQuill
                        className="react-quill"
                        value={docsDesc}
                        onChange={getQuillData} />
                </div>
                <ToastContainer />
            </div>
            <Dialog onClose={handleClose} open={openDialog}>
                <DialogTitle> Link to the Doc </DialogTitle>
                <h3 style={{ padding: '20px', cursor: 'pointer' }}
                    onClick={() => {
                        navigator.clipboard.writeText('https://google-docs-clone-murex-nine.vercel.app/editDocs/' + params.id);
                        toast.success('Link copied', {
                            autoClose: 2000
                        })
                    }}>
                    {'https://google-docs-clone-murex-nine.vercel.app/editDocs/' + params.id}
                </h3>
            </Dialog>
        </div>
    )
}