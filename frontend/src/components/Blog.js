import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
    const link = "/blogs/"+blog._id;
    const handleDelete = async () => {
        const deletedItem = await fetch('/blogs/' + blog._id, {
            method: "DELETE"
        })
        window.location.reload(false);
    }
    return (
        <div className='container mb-3 d-flex bg-light p-5 justify-content-between align-items-center'>
        <Link to={link} className='nav-link'>
            <div>
                <div className='h1 text-primary'>{blog.title}</div>
                <p><strong>Subject:</strong> {blog.subject}</p>
                <p><strong>Written by:</strong> {blog.author}</p>
                <p><strong>Created:</strong> {formatDistanceToNow(new Date(blog.createdAt), {addSuffix: true})}</p>
            </div> 
        </Link>
        <button onClick={handleDelete} className='btn btn-danger'>
                <i className='bi bi-trash fs-2'></i>
        </button>
        </div>
    );
};

export default Blog;
