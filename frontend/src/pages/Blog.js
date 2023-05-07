import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Blog = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState({});
    const [error, setError] = useState(null);
    
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
    return (
        <div className="m-5">
            {error && 
                <p className="display-4 text-danger text-center">{error}</p>
            }
            {!(JSON.stringify(blog) === '{}') && 
                <div className="container bg-light p-5">
                    <p className="display-2 text-center">
                        {blog.title}
                    </p>
                    <p className="display-6 py-3 px-5">
                        <strong>Subject:</strong> {blog.subject}
                    </p>
                    <p className="display-6 py-3 px-5" >
                        <strong>Body:</strong> {blog.body}
                    </p>
                    <p className="display-6 py-3 px-5" >
                        <strong>Written by:</strong> {blog.author}
                    </p>
                    <p className="display-6 py-3 px-5" >
                        <strong>Created:</strong> {formatDistanceToNow(new Date(blog.createdAt), {addSuffix: true})}
                    </p>
                    <Link to={`/update/${id}`} className="py-3 px-5">
                        <button className="btn btn-info">
                            <i className="bi bi-pencil-square fs-2">Edit</i>
                        </button>
                    </Link>
                </div>
            }
        </div>
    );
}

export default Blog;