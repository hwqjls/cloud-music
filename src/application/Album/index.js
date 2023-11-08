import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { CSSTransition } from 'react-transition-group'
import { Container } from './style';
import Header from './../../baseUI/header/index'

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate()
  const nodeRef = useRef(null);

  const goBack = () => {
    navigate('/recommend')
  }

  const handleClick = () => {
    setShowStatus(false)
  }

  return (
    <CSSTransition
      in={showStatus}
      nodeRef={nodeRef}
      timeout={300}
      classNames='fly'
      appear={true}
      unmountOnExit
      onExited={goBack}
    >
      <Container ref={nodeRef}>
        <Header title={'返回'} handleClick={handleClick}></Header>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Album);