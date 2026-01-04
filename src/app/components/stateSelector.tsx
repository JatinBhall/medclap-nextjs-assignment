"use client"

import React, { useState } from 'react'
import data from "@data/states.json"
import { useRouter } from 'next/navigation';
import MapPinIcon from './icons/mapPinIcon';

const StateSelector = () => {

    const [selectedState, setSelectedState] = useState<string>(data[0].slug);
    const router = useRouter();
    const optionComponents: Array<React.ReactNode> = [];

    data.map((obj) => {
        optionComponents.push(<SelectOptionComponent
            key={obj.slug}
            text={obj.name}
            value={obj.slug}/>);
    })

    const handleCheckEligibility = () => {
        if (selectedState) {
            router.push(`/state/${selectedState}`);
        }
    };


    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8 border-4 border-[#0000001a]">
            <div className="flex items-center justify-center mb-6">
                <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-full p-3">
                    <MapPinIcon className="h-8 w-8 text-white" />
                </div>
            </div>
            <h2 className="text-2xl font-semibold text-center mb-6 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Select Your State
            </h2>
            <div className="space-y-4">
                <select
                    className='w-full focus:outline-none rounded-lg bg-[#f3f3f5] py-2 px-3'
                    value={selectedState}
                    onChange={(e) => { setSelectedState(e.target.value) }}
                >
                    {optionComponents}
                </select>
                <button
                    onClick={handleCheckEligibility}
                    disabled={!selectedState}
                    className="w-full h-12 bg-linear-to-r font-semibold rounded-lg from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer text-lg shadow-lg">
                    Check Eligibility
                </button>
            </div>
        </div>
    );
}

export default StateSelector

function SelectOptionComponent({
    text,
    value,
}: {
    text: string;
    value: string;
}) {
    return (
        <option
            className='flex justify-between'
            value={value}>
            {text}
        </option>
    )
}