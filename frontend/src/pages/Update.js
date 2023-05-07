import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Update = () => {

    const {id} = useParams();
    const [blog, setBlog] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/blogs/'+id);
            const json = await response.json()
            if (response.ok) {
                setBlog(json);
            } else if (!response.ok) {
                setError(json.error);
            }
        }
        fetchBlogs();
    }, [])

    const titleChange = (e) => setBlog({...blog, title: e.target.value});
    const subjectChange = (e) => setBlog({...blog, subject: e.target.value});
    const bodyChange = (e) => setBlog({...blog, body: e.target.value});
    const authorChange = (e) => setBlog({...blog, author: e.target.value});

    const handleUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch("/blogs/"+id, {
            method: "PATCH",
            body: JSON.stringify(blog),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError("Missing fields!");
        } else if (response.ok) {
            setBlog({});
            setError(null);
            navigate("/blogs/"+id);
        }
    }
    
    return ( 
        <div className="m-5">
            {error && 
                <p className="display-4 text-danger text-center">{error}</p>
            }
            {!(JSON.stringify(blog) === '{}') && 
                <div className="d-flex flex-column">
                <p className="display-2 mx-auto ">Update</p>
                <div className="row justify-content-center my-5">
                <div className="col-lg-4">
                <form onSubmit={handleUpdate}>
                        <label htmlFor="title" className="form-label fs-3">Title:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-type-h1"></i>
                            </span>
                            <input value={blog.title} onChange={titleChange} type="text" id="title" className="form-control" />
                        </div>

                        <label htmlFor="subject" className="form-label fs-3">Subject:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-chat-right-text-fill"></i>
                            </span>
                            <input value={blog.subject} onChange={subjectChange} type="text" id="subject" className="form-control" />
                        </div>

                        <label htmlFor="body" className="form-label fs-3">Body:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-blockquote-right"></i>
                            </span>
                            <textarea value={blog.body} onChange={bodyChange} id="body" className="form-control" rows="5"></textarea>
                        </div>

                        <label htmlFor="author" className="form-label fs-3">Author:</label>
                        <div className="mb-4 input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person-square"></i>
                            </span>
                            <input value={blog.author} onChange={authorChange} type="text" id="author" className="form-control" />
                        </div>
                        <div className="mb-4 text-center">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                </form>
                </div>
                </div>
                </div>
            }
        </div>
    );
}

export default Update;