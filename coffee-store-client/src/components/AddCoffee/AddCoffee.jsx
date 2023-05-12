import React from 'react';
import Swal from 'sweetalert2'

const AddCoffee = () => {

    const handleAddCoffee = event => {
        event.preventDefault()
        const form = event.target

        const name = form.name.value
        const quantity = form.quantity.value
        const category = form.category.value
        const photoURL = form.photoURL.value
        const details = form.details.value

        const newCoffee = { name, quantity, category, photoURL, details }

        fetch('http://localhost:5000/coffee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCoffee)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Sweet!',
                        text: 'Coffee Added.',
                        icon: 'success',
                        confirmButtonText:'Cool'
                    })
                }
            })

        form.reset()


    }

    return (
        <div className='p-16 md:p-32 bg-amber-200 min-h-screen'>
            <h1 className='text-center text-4xl font-bold text-amber-950 mb-6'>Add New Coffee</h1>
            <p className='text-center mb-20'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus corporis inventore temporibus vero. Sequi eos ex quam illum. Culpa quis assumenda dicta nostrum eaque fuga quas, quaerat ad ipsam atque modi repellat autem cum molestias, aperiam saepe ipsum, sunt excepturi delectus ratione! Assumenda fugiat est perferendis iusto, neque optio repudiandae?</p>
            <form onSubmit={handleAddCoffee}>
                <div className='md:flex md:justify-between md:gap-10 mb-14'>
                    <div className='flex flex-col gap-8 w-full'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Coffee Name</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name='name' placeholder="Coffee Name" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Available Quantity</span>
                            </label>
                            <label className="input-group">
                                <input type="number" name='quantity' placeholder="Available Quantity" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8 w-full'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name='category' placeholder="Category" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name='photoURL' placeholder="Photo URL" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                </div>
                <p className="text-center">Details</p>
                <textarea name="details" className='w-full p-4 mb-6' placeholder='Details...'></textarea>

                <div className='text-center'>
                    <input type="submit" value="ADD" className="btn btn-circle bg-amber-950 hover:bg-amber-800" />
                </div>

            </form>
        </div>
    );
};

export default AddCoffee;