import React, { useState, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import './style.css';

function MakeFavorite(props) {

  console.log(props.media);

  return (
    <>
      {props.username && (
        <>
          {props.media.userFavorite
            ?
            <div id='center-wrap'>
              <Button
                className='btn btn-success'
                onClick={() => props.makeFavorite(props.media)} >
                UNFAVE
            </Button>
            </div>
            :
            <div id='center-wrap'>
              <Button
                className='btn btn-success'
                onClick={() => props.makeFavorite(props.media)} >
                MAKE FAVE
            </Button>
            </div>
          }
        </>
      )}
    </>
  )
}

export default MakeFavorite;