

import React from 'react';
import ProductStore from '../../store/ProductStore';
import StarRatings from "react-star-ratings/build/star-ratings.js";

const Reviews = () => {
    const {ReviewList} = ProductStore();
    return (
        <div>

            {
                (ReviewList!=null) ? (ReviewList.map((item,i) => {
                    return <li key={i} class="list-group-item">
                        <h5><i className='bi bi-person'></i> {item['profile']['cus_name']}</h5>
                        <p>{item['des']}</p>
                        <StarRatings rating={parseFloat(item['rating'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />
                    </li>
                })):(<span></span>)
            }
        </div>
    );
};

export default Reviews;