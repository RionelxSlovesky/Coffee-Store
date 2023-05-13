import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CoffeeCard from './CoffeeCard/CoffeeCard';

const Home = () => {

    const loadedCoffees = useLoaderData();
    const [coffees, setCoffees] = useState(loadedCoffees)

    const handleUpdateCoffees = updatedCoffees => {
        setCoffees([...updatedCoffees])
    }

    return (
        <div className='py-16 md:py-32 md:px-14 bg-amber-200 min-h-screen'>
            <h1 className='text-center text-4xl font-bold text-amber-950 mb-16'>O'Mar's Coffee</h1>
            {
                coffees.map(coffee => <CoffeeCard key={coffee._id} 
                coffee={coffee}
                coffees={coffees} 
                handleUpdateCoffees={handleUpdateCoffees}></CoffeeCard>)
            }
        </div>
    );
};

export default Home;