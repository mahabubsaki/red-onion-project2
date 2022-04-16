import { MinusIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiContext } from '../../../App';
import NotFound from '../NotFound/NotFound';
import './SingleFood.css'

const SingleFood = () => {
    const navigate = useNavigate()
    const { foods, handleAddtoCart } = useContext(ApiContext)
    let loadingFood;
    let tempArray;
    const [quantity, setQuantity] = useState(1)
    const decrease = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1)
        }
    }
    const { id } = useParams()
    const food = foods.find(food => food.id === id)
    if (food) {
        loadingFood = food
    }
    else {
        tempArray = JSON.parse(localStorage.getItem('allFoods'))
        loadingFood = tempArray.find(f => f.id === id)
    }
    if (loadingFood === undefined) {
        return <NotFound></NotFound>
    }
    const { name, description, prices, img, category } = loadingFood
    return (
        <div className="h-auto">
            <h1 className="text-center">Category : {category}</h1>
            <div className="d-flex align-items-center">
                <div className="w-50 ps-4">
                    <h1 className="fw-bold">{name}</h1>
                    <p>{description}</p>
                    <div className="d-flex w-75 justify-content-between align-items-start flex-column flex-md-row">
                        <h1 className="fw-bolder">${prices}</h1>
                        <div className="d-inline fs-2 p-2" id='single-food-quantity'>
                            <button className="me-3" onClick={decrease}>
                                <MinusIcon style={{ height: '32px' }}></MinusIcon>
                            </button>
                            <span style={{ height: '32px' }}>{quantity}</span>
                            <button className="ms-3" onClick={() => setQuantity(quantity + 1)}>
                                <PlusIcon style={{ height: '32px' }}></PlusIcon>
                            </button>
                        </div>
                    </div>
                    <button className="text-white bg-danger rounded-pill py-2 px-3" onClick={() => handleAddtoCart(id, quantity)}>
                        <ShoppingCartIcon className="me-2" style={{ height: '32px' }}></ShoppingCartIcon>
                        <span>Add to Cart</span>
                    </button>
                </div>
                <div className="w-50">
                    <img src={img} alt="food" className="img-fluid" />
                </div>
            </div>
        </div>
    );
};

export default SingleFood;