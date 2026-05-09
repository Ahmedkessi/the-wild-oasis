import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking, isLoading} = useBooking(); 
  const {deleteBookingMutation, isDeleting} = useDeleteBooking(); 
  const {checkout} = useCheckout();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const {status, id: bookingId} = booking || {};

  if(isLoading) return <Spinner />;
  if(!booking) return <Empty resourceName={"Booking"} />

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        { status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              <HiArrowDownOnSquare />
              Check in
            </Button>
          )
        }

        { status === "checked-in" && (
            <Button onClick={() => checkout(bookingId)}>
              <HiArrowUpOnSquare />
              Check out
            </Button>
          )
        }

        <Modal>
          <Modal.Open opens="delete">
            <Button variations="danger" icon={<HiTrash />}>Delete booking </Button>
          </Modal.Open>

          <Modal.Window name="delete">
           <ConfirmDelete resourceName={`Booking`} disabled={isDeleting} onConfirm={()=> deleteBookingMutation(bookingId, {
            onSettled: ()=> navigate(-1)
           })} />
          </Modal.Window>
        </Modal>
        
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
