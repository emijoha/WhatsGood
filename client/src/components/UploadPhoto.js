import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import UserInfoContext from '../utils/UserInfoContext';
import AuthService from '../utils/auth';
import { savePicture } from '../utils/API';


var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxrhczeo9/upload/";
var CLOUDINARY_UPLOAD_PRESET = "fzl0siot";


function UploadPhoto({ handleModalClose }) {
 
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")

    const userData = useContext(UserInfoContext);

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        setLoading(true)

        const res = await fetch(CLOUDINARY_URL,
            {
                method:'POST',
                body: data
            })

            const file = await res.json()

            console.log(file)

            setImage(file.secure_url)
            setLoading(false)
    }

    const handleSavePicture = (image) => {
      

        const token = AuthService.loggedIn() ? AuthService.getToken() : null;
    
        if (!token) {
          return false;
        }

        
      
        // send the books data to our api
        savePicture({image}, token)
          .then(() => userData.getUserData())
          .catch((err) => console.log(err));
      };

  return (
    <div>
        <input type="file" name="file" placeholder="Upload a photo"
        onChange={uploadImage}/>

        {
            loading? (
                <h3>Loading ...</h3>
            ): (
                <img src={image} style={{width: '300px'}} />
            )
        }
        <Button
       
       className='btn-block btn-info'
       onClick={() => handleSavePicture(image)}>Save Picture
     </Button>
    </div>
      
  )
}

export default UploadPhoto;