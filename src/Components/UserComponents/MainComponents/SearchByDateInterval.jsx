import { forwardRef, useState } from "react";
import ContainersFetchingTable from "./ContainersFetchingTable";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS

export default function SearchByDateInterval(props) {

    let index = props.index;
    const page = props.page;

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className='flex justify-center border border-lightGrey rounded-md w-32 py-1'>
          <button className="example-custom-input text-lg" onClick={onClick} ref={ref}>
            {value}
          </button>
        </div>
    ));

    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());

    return (
        <div className="flex justify-center">
            <div className="bg-white min-h-searchbox flex-row justify-center rounded-lg shadow-md">
                <div className="flex justify-center mt-8">
                    <div className="flex mr-32">
                        <h1 className="pt-1 pr-2">From:</h1>
                        <DatePicker
                            selected={date1}
                            onChange={(newDate) => setDate1(newDate)}
                            customInput={<ExampleCustomInput />}
                            />
                    </div>
                    <div className="flex text-lg">
                        <h1 className="pt-1 pr-2">To:</h1>
                        <DatePicker
                            selected={date2}
                            onChange={(newDate) => {setDate2(newDate); console.log(date2)}}
                            customInput={<ExampleCustomInput />}
                            />
                    </div>    
                </div>
                <ContainersFetchingTable index={index} parameter={{date1, date2}} page={page}/>
            </div>
        </div>
    )
}
