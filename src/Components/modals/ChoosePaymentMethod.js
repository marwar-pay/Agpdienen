import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ChoosePaymentMethod(props) {
    const [modalShow, setModalShow] = React.useState(false);

    const PAYMENT_GATEWAY = Object.freeze({
        PHONEPE: 'PHONEPE',
        CASHFREE: 'CASHFREE'
    })

    function handleSubmit(e, paymentGateway) {
        setModalShow(false)
        if (paymentGateway === PAYMENT_GATEWAY.PHONEPE) {
            props.phonepe(e);
        } else if (paymentGateway === PAYMENT_GATEWAY.CASHFREE) {
            props.cashfree(e);
        }
    }

    return (
        <>
            <Button variant='success' className='btn-block mt-3' onClick={() => setModalShow(true)}>
                Submit Order
            </Button>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Choose payment gateway
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer className='justify-content-around'>
                    <Button onClick={(e) => handleSubmit(e, PAYMENT_GATEWAY.PHONEPE)}>Phonepe</Button>
                    <Button onClick={(e) => handleSubmit(e, PAYMENT_GATEWAY.CASHFREE)}>Cashfree</Button>
                    <Button onClick={() => setModalShow(false)} variant='danger'>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
