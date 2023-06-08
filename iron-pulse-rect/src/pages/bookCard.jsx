import React from 'react'
import { Container, Row, Col } from "reactstrap";
import cardBook from '../shared/card';

const bookCard = () => {
  return <>
    <section>
      <Container>
        <Row className='card_book'>
          <Col lg='3'>
            <cardBook />
          </Col>
        </Row>
      </Container>
    </section>
  </>
}

export default bookCard