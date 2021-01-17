import React, {useState} from "react";
import {Button} from "react-bootstrap";

const Header = ({onChange, inputText, loading, loadImages, clearImages, onGroup, group }) => {

    return (
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
    )
}

export default Header;