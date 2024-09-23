import { Modal, Button } from 'react-bootstrap';

export default function OrderConfirmation({orderDetails, showModal, setShowModal}) {

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Orderdetaljer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Din beställning är mottagen!</p>
          <p>Status: {orderDetails.status}</p>
          <p>Order ID: {orderDetails.uuid}</p>
          <p>Totalt pris: {orderDetails.price}kr</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>
      );
}