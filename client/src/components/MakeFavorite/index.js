import React, { useState, useEffect } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import './style.css';

function MakeFavorite(props) {

  let type = props.media.mediaType.toLowerCase();
  return (
    <>
      {props.username && (
        <>
          {props.media.userFavorite
            ?
            <div id='center-wrap'>
              <Button
                className={`${type}-color ${type}-hover`}
                onClick={() => props.makeFavorite(props.media)} >
                UNFAVE
            </Button>
            </div>
            :
            <div id='center-wrap'>
              <Button
                className={`${type}-color ${type}-hover`}
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