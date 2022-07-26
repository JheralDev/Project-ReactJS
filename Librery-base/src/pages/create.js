import { useState } from 'react'
import { useAppContext } from '../store/store';
import { useNavigate } from 'react-router-dom'

import Layout from '../components/layout';

export default function Create() {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [cover, setCover] = useState("");
    const [intro, setIntro] = useState("");
    const [completed, setCompleted] = useState(false);
    const [review, setReview] = useState("");

    const store = useAppContext()

    const navigate = useNavigate()

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value

        switch(name) {
            case 'title':
                setTitle(value)
                break
                
            case 'author':
                setAuthor(value)
                break

            case 'intro':
                setIntro(value)
                break
            
            case 'completed':
                setCompleted(e.target.checked)
                break
                
            case 'review':
                setReview(value)
                break
                    
            default:
        }
    }
    
    function handleChangeFile(e) {
        const element = e.target
        const file = element.files[0]
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = function() {
            setCover(reader.result.toString())
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        const newBook = {
            id: crypto.randomUUID(),
            title,
            author,
            cover,
            intro,
            completed,
            review,
        }

        store.createItem(newBook)
        navigate("/")
    }

    return(
        <Layout>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>title</div>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            value={title}
                        />
                        {title}
                    </div>

                    <div>
                        <div>author</div>
                        <input
                            type="text"
                            name="author"
                            onChange={handleChange}
                            value={author}
                        />
                        {author}
                    </div>

                    <div>
                        <div>cover</div>
                        <input
                            type="file"
                            name="cover"
                            onChange={handleChangeFile}
                        />
                        <div>
                            {
                                !!cover 
                                    ? <img src={cover} widht="400" alt='preview' /> 
                                    : ""
                            }
                        </div>
                    </div>

                    <div>
                        <div>introduction</div>
                        <input
                            type="text"
                            name="intro"
                            onChange={handleChange}
                            value={intro}
                        />
                        {intro}
                    </div>

                    <div>
                        <div>completed</div>
                        <input
                            type="checkbox"
                            name="completed"
                            onChange={handleChange}
                            value={completed}
                        />
                    </div>

                    <div>
                        <div>review</div>
                        <input
                            type="text"
                            name="review"
                            onChange={handleChange}
                            value={review}
                        />
                    </div>

                    <input type="submit" value="Register Book" />
                </form>
            </div>
        </Layout>
    )
}