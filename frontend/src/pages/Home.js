import { useState, useEffect } from "react";
import Blog from "../components/Blog";

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    
    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch('/blogs');
            const json = await response.json();

            if (response.ok) {
                setBlogs(json);
            }
        }
        fetchBlogs();
    }, [])

    return ( 
        <div className="d-flex flex-column gap-5" >
            <p className="display-2 mx-auto">Home</p>
            {blogs && blogs.map((blog) => (
                <Blog key={blog._id} blog={blog} />
            ))}
        </div>
    );
}

export default Home;