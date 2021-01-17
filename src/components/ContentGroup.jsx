import React from 'react';

const ContentGroup = ({tags, images, setInputText}) => {

    return (
        <div className='content'>
            {tags.map((tag, index) => (
                <div className='block' key={index}>
                    <p className='block__tag'>{tag}</p>
                    {images
                        .filter((img) => img.categories === tag)
                        .map((image, index) => (
                            <img className='block__img' onClick={() => setInputText(image.categories)} key={index} alt="image" src={image.url}/>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default ContentGroup;
