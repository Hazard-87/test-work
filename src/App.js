import React, {useState} from 'react';

import {Button} from 'react-bootstrap';
import axios from 'axios';

function App() {
    const API_KEY = 'gTJAO48YcpmrADUyo4opy4ES4g7iDBxx';
    const [images, setImages] = useState([]);
    const [text, setText] = useState([]);
    const [inputText, setInputText] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState(false);

    let arr = [];

    const fetchImage = async (i) => {
        let randomText = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(0, 10);
        console.log(text[i]);
        let response = await axios.get(
            `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${
                text[i] === 'delay' ? randomText : text[i]
            }`,
        );
        arr = [
            ...arr,
            {
                url: `${response.data.data.image_url}`,
                categories: text[i],
            },
        ];
        imgLoad(arr);
        addTags(text);
        setText([]);
        setInputText('');
        setLoading(false);
    };

    function imgLoad(arr) {
        setImages([...images, ...arr]);
    }

    const loadImages = () => {
        try {
            if (text[0] === 'delay') {
                setLoading(true);
                let i = 1;
                let delay = 5000;
                while (i < 6) {
                    setTimeout(() => fetchImage(0), delay * i);
                    i++;
                }
            } else if (text) {
                setLoading(true);
                for (let i = 0; i < text.length; i++) {
                    fetchImage(i);
                }
            } else {
                alert('заполните поле "тег"');
            }
        } catch {
            alert('Произошла http ошибка');
        }
    };

    const onChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^A-Za-z, ]/gi, '');
        let newText = value.split(', ');
        setText(newText);
        setInputText(value);
    };

    const addTags = (text) => {
        for (let i = 0; i < text.length; i++) {
            let tag = tags.includes(text[i]);
            if (!tag) {
                tags.push(text[i]);
            }
        }
    };

    const clearImages = () => {
        setText('');
        setImages([]);
        setTags([]);
        setGroup(false);
    };

    const onGroup = () => {
        setGroup(!group);
    };

    return (
        <div className={'app'}>
            <div className={'container'}>
                <div className={'wrapper'}>
                    <header className={'header'}>
                        <input
                            className={'Header__item'}
                            onChange={onChange}
                            value={inputText}
                            type="text"
                            placeholder={'введите тег'}
                        />
                        {loading ? (
                            <Button className={'header__item'} disabled variant="success">
                                Загрузка...
                            </Button>
                        ) : (
                            <Button className={'header__item'} onClick={loadImages} variant="success">
                                Загрузить
                            </Button>
                        )}
                        <Button className={'header__item'} onClick={clearImages} variant="danger">
                            Очистить
                        </Button>
                        {!group ? (
                            <Button className={'header__item'} onClick={onGroup} variant="primary">
                                Группировать
                            </Button>
                        ) : (
                            <Button className={'header__item'} onClick={onGroup} variant="primary">
                                Разгуппировать
                            </Button>
                        )}
                    </header>

                    <div>
                        {group ? (
                            <div>
                                {tags.map((tag, index) => (
                                    <div className='content' key={index}>
                                        <p className='content__tag'>{tag}</p>
                                        {images
                                            .filter((img) => img.categories === tag)
                                            .map((i, index) => (
                                                <img className='content__img' key={index} alt="image" src={i.url}/>
                                            ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='content'>
                                {images.map((image, index) => (
                                    <img
                                        className='content__img'
                                        alt={'photo'}
                                        onClick={() => setInputText(image.categories)}
                                        key={index}
                                        src={image.url}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
