import React from 'react';

const Content = ({images, setInputText}) => {

  return (
      <div className='content'>
          {images.map((image, index) => (
              <img
                  className='content__img'
                  alt='image'
                  onClick={() => setInputText(image.categories)}
                  key={index}
                  src={image.url}
              />
          ))}
          <div>
              {}
          </div>
      </div>

  );
};

export default Content;
