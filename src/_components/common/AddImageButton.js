import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import './style.scss'


export default function UploadButtons(props) {
    const {onChange, name} = props;

    const change = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function () {
            onChange(reader.result)
        };
        reader.readAsDataURL(file)
    };

    return (
        <div className={'root'}>
            <input accept="image/*"
                   className={'input'}
                   id="icon-button-file"
                   type="file"
                   onChange={change}
                   name={name}
            />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera/>
                </IconButton>
            </label>
        </div>
    );
}