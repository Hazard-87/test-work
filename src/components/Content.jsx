import React, {useState} from "react";
import {Button} from "react-bootstrap";
import axios from 'axios'

const Content = () => {
    const API_KEY = 'gTJAO48YcpmrADUyo4opy4ES4g7iDBxx'
    const [images, setImages] = useState([])
    const [text, setText] = useState([])
    const [tags, setTags] = useState([])
    const [loading, setLoading] = useState(false)
    const [group, setGroup] = useState(false)
    let randomText = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10)
    let arr = []

    const fetchImage = async (i) => {

        let response = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${text[i]}`)
        arr = [...arr, {
            url: `${response.data.data.image_url}`,
            categories: `${text[i] === 'delay' ? randomText : text[i]}`
        }]
        imgload(arr)
        addTags(text[i])
        setText('')
        setLoading(false)
    }

    function imgload(arr) {
        setImages([...images, ...arr])
    }

    const loadImages = () => {
        try {
            if (text[0] === 'delay') {
                setLoading(true)
                let i = 1
                let delay = 5000
                while (i < 6) {
                    setTimeout((word) =>
                            fetchImage(word)
                        , delay * i)
                    i++
                }
            } else if (text) {
                setLoading(true)
                for (let i = 0; i < text.length; i++) {
                    fetchImage(i)
                }
            } else {
                alert('заполните поле "тег"')
            }
        } catch {
            alert('Произошла http ошибка')
        }
    }

    const onChange = (e) => {
        let value = e.target.value
        value = value.replace(/[^A-Za-z ,]/ig, '')
        let newText = value.split(',')
        setText(newText)
    }

    const addTags = (text) => {

        let tag = tags.includes(text)
        if (!tag) {
            setTags([...tags, text])
        }

    }

    const clearImages = () => {
        setText('')
        setImages([])
        setTags([])
        setGroup(false)
    }

    const onGroup = () => {
        setGroup(!group)
    }
    console.log(tags)
    return (
        <div>
            <header className={'header'}>
                <input onChange={onChange} value={text} type='text' placeholder={'введите тег'}/>
                {loading
                    ? <Button disabled variant="success">Загрузка...</Button>
                    : <Button onClick={loadImages} variant="success">Загрузить</Button>}
                <Button onClick={clearImages} variant="danger">Очистить</Button>
                {!group
                    ? <Button onClick={onGroup} variant="primary">Группировать</Button>
                    : <Button onClick={onGroup} variant="primary">Разгуппировать</Button>}
            </header>

            <div>
                {group
                    ? <div>
                        {tags.map((tag, index) => <div key={index} className={'content'}>
                                <div><p>{tag}</p></div>
                                {images.filter(img => img.categories === tag)
                                    .map((i, index) => <div key={index}><img alt='image' src={i.url}/></div>)}
                            </div>
                        )
                        }
                    </div>
                    : <div className={'content'}>
                        {
                            images.map((image, index) => <img alt={'photo'} onClick={() => setText(image.categories)}
                                                              key={index}
                                                              src={image.url}/>)
                        }
                    </div>}
            </div>
        </div>)
}

export default Content