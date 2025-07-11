import React, { useEffect } from "react";

import Button from "../ui/button/Button";
import LoansServices from '../../services/LoansService'
import Slider from "react-slick";
import LoansService from "../../services/LoansService";

const cards = [
  { id: 1, title: "Card 1", description: "Descripción 1" },
  { id: 2, title: "Card 2", description: "Descripción 2" },
  { id: 3, title: "Card 3", description: "Descripción 3" },
  { id: 4, title: "Card 4", description: "Descripción 4" },
  { id: 5, title: "Card 5", description: "Descripción 5" },
];


const LoansList = ({ client, handleEdit }) => {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // para pantallas más pequeñas
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {

    const fetchLoans = async (params) => {
      
      const loansSerive = new LoansService()

      const loansData  = loansSerive.getClientLoans()
    }

    return () => {

    }
  }, [])


  return (
    <div className="w-full px-4 ">
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id} className="px-2 py-2">
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}



export default LoansList