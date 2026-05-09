import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();

  const {booking, isLoading} = useBooking()
  const {checkin, isCheckedIn} = useCheckin();
  const {settings, isLoading: isLoadingSettings} = useSettings()

  useEffect(() => setConfirmPaid(booking?.isPaid || false), [booking?.isPaid]); 

  if(isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};

  const guestsWithS = numGuests > 1 ? "guests" : "guest";
  const nightsWithS = numNights > 1 ? "nights" : "night";
  const optionalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;


  function handleCheckin() {
    if(!confirmPaid) return;

    if(addBreakfast) {
      checkin({
        bookingId, breakfast: {
          totalPrice: totalPrice + optionalBreakfastPrice,
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
        }
      }
      );
    }
    else {
      checkin({bookingId, breakfast: {}});
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox id="breakfast" checked={addBreakfast} onChange={()=> {
          setAddBreakfast((add) => !add)
          setConfirmPaid(false);
        }}>
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
        </Checkbox> 
      </Box>

      <Box>
        <Checkbox id="confirm" checked={confirmPaid} disabled={confirmPaid || isCheckedIn}
          onChange={() => setConfirmPaid(!confirmPaid)}
        >
          I confirm that {guests?.fullName} has paid the total amount of 
          {addBreakfast ? ` ${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`  : ` ${formatCurrency(totalPrice)} `}
          for {numGuests} {guestsWithS} and {numNights} {nightsWithS} {hasBreakfast && "with breakfast included"}
          </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckedIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
