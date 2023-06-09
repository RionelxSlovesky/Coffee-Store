import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2'

const UpdateCoffee = () => {

    const coffee = useLoaderData()
    
    const handleUpdate = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const quantity = form.quantity.value
        const category = form.category.value
        const photoURL = form.photoURL.value
        const details = form.details.value

        const updatedCoffee = { name, quantity, category, photoURL, details }

        fetch(`http://localhost:5000/coffee/${coffee._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCoffee)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Sweet!',
                        text: 'Coffee Updated.',
                        icon: 'success',
                        confirmButtonText:'Cool'
                    })
                }
            })

    }

    return (
        <div className='p-16 md:p-32 bg-amber-200 min-h-screen'>
            <h1 className='text-center text-4xl font-bold text-amber-950 mb-6'>Update {coffee.name}</h1>
            <form onSubmit={handleUpdate}>
                <div className='md:flex md:justify-between md:gap-10 mb-14'>
                    <div className='flex flex-col gap-8 w-full'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Coffee Name</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={coffee.name} type="text" name='name' placeholder="Coffee Name" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Available Quantity</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={coffee.quantity} type="number" name='quantity' placeholder="Available Quantity" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 w-full'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={coffee.category} type="text" name='category' placeholder="Category" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={coffee.photoURL} type="text" name='photoURL' placeholder="Photo URL" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                </div>
                <p className="text-center">Details</p>
                <textarea defaultValue={coffee.details} name="details" className='w-full p-4 mb-6' placeholder='Details...'></textarea>

                <div className='text-center'>
                    <input type="submit" value="UPDATE" className="btn btn-circle bg-amber-950 hover:bg-amber-800 w-16 h-16" />
                </div>
                


            </form>
        </div>
    );
};

export default UpdateCoffee;