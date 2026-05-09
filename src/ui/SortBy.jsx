import { useSearchParams } from 'react-router-dom';
import Select from './Select';

const SortBy = ({options}) => {
    const [searchParam, setSearchParam] = useSearchParams();
    const value = searchParam.get(`sortBy`) || ``;

    function handleChange(e) {
        searchParam.set(`sortBy`, e.target.value); 
        setSearchParam(searchParam);
    } 

    return (
    <Select options={options} onChange={handleChange} value={value} type="white"/>
  );
};

export default SortBy;