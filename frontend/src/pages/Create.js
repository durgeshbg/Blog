import { useState } from "react";
import {useNavigate} from "react-router-dom"

const Create = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [state, setState] = useState({
        title: "",
        subject: "",
        body: "",
        author: ""
    });
    const titleChange = (e) => setState({...state, title: e.target.value});
    const subjectChange = (e) => setState({...state, subject: e.target.value});
    const bodyChange = (e) => setState({...state, body: e.target.value});
    const authorChange = (e) => setState({...state, author: e.target.value});
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/blogs", {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError("Missing fields!");
        } else if (response.ok) {
            setState({
                title: "",
                subject: "",
                body: "",
                author: ""
            });
            setError(null);
            navigate("/");
        }
    };
    
    return ( 
        <div className="d-flex flex-column">
            <p className="display-2 mx-auto ">Create</p>

            <div className="row justify-content-center my-5">
                <div className="col-lg-4">
                    <p className="text-danger h4" >{error}</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title" className="form-label fs-3">Title:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-type-h1"></i>
                            </span>
                            <input value={state.title} onChange={titleChange} type="text" id="title" className="form-control" />
                        </div>

                        <label htmlFor="subject" className="form-label fs-3">Subject:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-chat-right-text-fill"></i>
                            </span>
                            <input value={state.subject} onChange={subjectChange} type="text" id="subject" className="form-control" />
                        </div>

                        <label htmlFor="body" className="form-label fs-3">Body:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-blockquote-right"></i>
                            </span>
                            <textarea value={state.body} onChange={bodyChange} id="body" className="form-control" rows="5"></textarea>
                        </div>

                        <label htmlFor="author" className="form-label fs-3">Author:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person-square"></i>
                            </span>
                            <input value={state.author} onChange={authorChange} type="text" id="author" className="form-control" />
                        </div>
                        <div className="mb-4 text-center">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Create;