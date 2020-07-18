import React, { useState, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap';

function MakeFavorite(props) {

  return (
    <>
      {props.username && (
        <>
          {props.media.userFavorite
            ?
            <Button
              className='btn btn-success'
              onClick={() => props.makeFavorite(props.media)} >
              UNFAVE
            </Button>
            :
            <Button
              className='btn btn-success'
              onClick={() => props.makeFavorite(props.media)} >
              MAKE FAVE
            </Button>
          }
        </>
      )}
    </>
  )
}

export default MakeFavorite;