import { Modal, Button } from 'react-bootstrap';

export default function CartModal({saladId, showModal, setShowModal}) {

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bekräftelse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Din sallad är tillagd i varukorgen!</p>
          <p>Din sallad har id: ${saladId}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Stäng
          </Button>
        </Modal.Footer>
      </Modal>
      );
}