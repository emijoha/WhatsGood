import React, { useState, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap';

function Favorite(props) {

  return (
    <>
      {props.username && (
        <>
          {props.media.userFavorite

          ?
            <p>This is your favorite {props.media.mediaType.toLowerCase()}</p>

          :
            <Button

            >

            </Button>
          
          }


        </>
      )}




    </>
  )
}

export default Favorite;