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
            docsDesc: ''
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
        <>

            <div className="docs-main">
                <h1>Docs Clone</h1>
                {/* <button className="add-docs"
                    onClick={handleOpen}>
                    Add a Document
                </button> */}
                <ModalComponent
                    open={open}
                    setOpen={setOpen}
                    title={title}
                    setTitle={setTitle}
                    addData={addData} />
                <div className="start-new-doc">
                    <div>
                        <img src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt="" onClick={handleOpen} />
                        <div>
                            <p>Blank</p>
                            <p></p>
                        </div>
                    </div>
                    <div>
                        <img src="https://ssl.gstatic.com/docs/templates/thumbnails/1wyFqxsRmKm9q--7j4WRmBMn694YdhV6hmNrfh4rVm2E_400.png" alt="" onClick={handleOpen} />
                        <div>
                            <p>Resume</p>
                            <p className="light-font">Serif</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://ssl.gstatic.com/docs/templates/thumbnails/10bJALGfGJG8BrzBSmG6EznIq6-84l1TZkQ-HC8jO368_400.png" alt="" onClick={handleOpen} />
                        <div>
                            <p>Resume</p>
                            <p className="light-font">Coral</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://ssl.gstatic.com/docs/templates/thumbnails/10e8_E36oj6_LuCRzckBFX_9oqbCHntmYB-jxB5U9gsw_400_2.png" alt="" onClick={handleOpen} />
                        <div>
                            <p>Letter</p>
                            <p className="light-font">Spearmint</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://ssl.gstatic.com/docs/templates/thumbnails/1XykI9TfWo4IoUqGLjQ-D8NIU4jZ1Ml9OI8-Euj5FrA0_400_3.png" alt="" onClick={handleOpen} />
                        <div>
                            <p>Project Proposal</p>
                            <p className="light-font">Topic</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://ssl.gstatic.com/docs/templates/thumbnails/1TojfPV3jurwEV2RpmVqnCCCR4z9g2eQBZ40XTHPBqk8_400_3.png" alt="" onClick={handleOpen} />
                        <div>
                            <p>Brochure</p>
                            <p className="light-font">Geometric</p>
                        </div>
                    </div>
                </div>
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
        </>
    )
}