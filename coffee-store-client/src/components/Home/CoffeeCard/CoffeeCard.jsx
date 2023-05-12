import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const CoffeeCard = ({ coffee }) => {


    const handleDelete = _id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {


                fetch(`http://localhost:5000/coffee/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Coffee has been deleted.',
                                'success'
                            )
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    return (
        <>
            <div className="card card-side bg-base-100 shadow-xl mb-6">
                <figure><img src={coffee?.photoURL} alt="Movie" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-amber-950">{coffee?.name}</h2>
                    <p>Category: {coffee?.category}</p>
                    <p>Quantity: {coffee?.quantity}</p>
                    <p>Details: {coffee?.details}</p>
                    <div className="card-actions justify-end">
                        <div className="btn-group btn-group-vertical">
                            <button className="btn bg-amber-950 hover:bg-amber-800">View</button>
                            <Link className="btn bg-amber-950 hover:bg-amber-800" to={`/updateCoffee/${coffee._id}`}>Edit</Link>
                            <button className="btn bg-amber-950 hover:bg-amber-800" onClick={() => handleDelete(coffee._id)}>X</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoffeeCard;