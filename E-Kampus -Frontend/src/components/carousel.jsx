import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './carousel.css';
import { Carousel } from 'react-responsive-carousel';
import Title from '../components/Title'
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import { AiFillTag } from "react-icons/ai";
import { FiEye } from "react-icons/fi";
import { BiShoppingBag } from "react-icons/bi";

// Direct imports for product images
import p_img1 from '../assets/p_img1.png';
import p_img4 from '../assets/p_img4.png';
import p_img5 from '../assets/p_img5.png';
import p_img6 from '../assets/p_img6.png';
import p_img7 from '../assets/p_img7.png';
import p_img60 from '../assets/p_img60.png';

const ProductCarousel = () => {
    // Custom arrow components
    const CustomPrevArrow = (onClickHandler, hasPrev, label) => (
        hasPrev && (
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
                <SlArrowLeftCircle size={40} />
            </button>
        )
    );

    const CustomNextArrow = (onClickHandler, hasNext, label) => (
        hasNext && (
            <button
                type="button"
                onClick={onClickHandler}
                title={label}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
                <SlArrowRightCircle size={40} />
            </button>
        )
    );

    ///Placeholder for the jojo's images and other media
    const products = [
        { 
            id: 1,
            image: p_img1,
            name: "2-piecer",
            price: "$3.00/ 90 ZWL",
            originalPrice: "$3.50"
        },
        { 
            id: 2,
            image: p_img60,
            name: "Rice + Beef",
            price: "$2.50 / 70 ZWL",
            originalPrice: "$44.99"
        },
        { 
            id: 3,
            image: p_img4,
            name: "Elite Quality Product 3",
            price: "$24.99",
            originalPrice: "$34.99"
        },
        { 
            id: 4,
            image: p_img5,
            name: "Professional Grade Product 4",
            price: "$39.99",
            originalPrice: "$49.99"
        },
        { 
            id: 5,
            image: p_img6,
            name: "Superior Quality Product 5",
            price: "$27.99",
            originalPrice: "$37.99"
        },
        { 
            id: 6,
            image: p_img7,
            name: "Deluxe Product 6",
            price: "$32.99",
            originalPrice: "$42.99"
        },
        { 
            id: 7,
            image: p_img60,
            name: "Premium Collection Product 7",
            price: "$36.99",
            originalPrice: "$46.99"
        }
    ];

    const handleProductClick = (productId) => {
        console.log(`Clicked on product ${productId}`);
        // You can add navigation logic here later
        // For example: navigate(`/product/${productId}`)
    };

    return (
        <div className="w-full mx-auto my-10 px-4">
            <div className="text-center mb-5 text-2xl">
                <Title text1={'BEST'} text2={'SPOTS'}/>
                <p className="text-gray-600 text-base">
                    Discover the best places for a quick bite on campus.
                </p>
            </div>
            <Carousel
                showArrows={true}
                showStatus={false}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                transitionTime={900}
                className="product-carousel"
                swipeable={true}
                emulateTouch={true}
                //renderArrowPrev={CustomPrevArrow}
                //renderArrowNext={CustomNextArrow}
            >
                {products.map((product) => (
                    <div key={product.id} className="carousel-slide">
                        <div 
                            className="bg-white rounded-lg shadow-md p-4 mx-2 cursor-pointer transform transition-all duration-300 hover:scale-105"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="relative overflow-hidden rounded-lg mb-3">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-16 md:h-20 object-cover transition-transform duration-300 hover:scale-110"
                                />
                                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                    <AiFillTag size={12} />
                                    Sale
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {product.name}
                                </h3>
                                <div className="flex justify-center items-center gap-2 mb-3">
                                    <span className="text-lg md:text-xl font-bold text-blue-600">
                                        {product.price}
                                    </span>
                                    <span className="text-xs text-gray-500 line-through">
                                        {product.originalPrice}
                                    </span>
                                </div>
                                <button className="w-full bg-gradient-to-r from-black to-gray-800 text-white px-4 py-2 rounded-lg hover:from-gray-800 hover:to-black transition duration-300 font-medium shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2">
                                    <FiEye size={16} />
                                    View Product
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ProductCarousel;