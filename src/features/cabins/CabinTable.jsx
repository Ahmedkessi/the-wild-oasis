import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";






const CabinTable = () => {
  const {cabins, isLoading} = useCabin()
  const [searchParam] = useSearchParams();  

  const discount = searchParam.get(`discount`) || `all`;
  let filteredCabins;

  //Filter
  if(discount === `all`) {
    filteredCabins = cabins;
  }
  if(discount === `with-discount`) {
    filteredCabins = cabins?.filter(cabin => cabin.discount > 0);
  }
  if(discount === `no-discount`) {
    filteredCabins = cabins?.filter(cabin => cabin.discount === 0);
  }


  //Sort
  const sort = searchParam.get(`sortBy`) || `startDate-asc`;
  const [field, direction] = sort.split(`-`);
  const modifier = direction === `asc` ? 1 : -1;

  const sortedCabins = filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier);


  if (isLoading) return <Spinner />;
  if(!cabins.length) return <Empty resourceName="cabins" />;

  return (
    <Table columns={`0.6fr 1.8fr 2.2fr 1fr 1fr 1fr`}>
      <Table.Header>
        <div></div>
        <div>CABIN</div>
        <div>CAPACITY</div>
        <div>PRICE</div>
        <div>DISCOUNT</div>
        <div></div>
      </Table.Header>

      <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
    </Table>
  );
};

export default CabinTable;