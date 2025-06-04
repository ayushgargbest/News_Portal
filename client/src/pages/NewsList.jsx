import React, { useEffect, useState } from 'react'
import axios from 'axios';
const NewsList = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/news');
                setNews(res.data);
            } catch (e) {
                console.error('Error fetching data', e);
            }
        };
        fetchNews();
    }, []);
    return (
        <div className='max-w-4xl mx-auto p-4'>
            <h2 className='text-2xl font-bold mb-4'>
                {news.map((item) => (
                    <div key={item._id} className='border rounded-lg shadow-md p-4 mb-6 bg-white'>
                        <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                        <p className='text-gray-700 mb-3'>{item.content}</p>
                        {item.imageUrl &&
                            <img src={item.imageUrl} alt='news' className='max-w-4xl max-h-100 object-cover rounded mb-3'/>
                        }
                        <p className='text-sm text-gray-500'>❤️{item.likes.length}</p>
                    </div>
                ))}
            </h2>
        </div>
    )
}
export default NewsList
