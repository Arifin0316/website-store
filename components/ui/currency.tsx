'use client'

import { useEffect, useState } from "react";

const formater = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'IDR',
  });

  interface CurrencyProps{
    value?: string | number
  }
const Currency: React.FC<CurrencyProps> = ({ value }) => {
    const [isMonten, setIsMonten] = useState(false)

    useEffect(() => {
        setIsMonten(true)
    },[])

    if(!isMonten) {
        return null
    }
    return ( 
        <div className="text-lg font-bold text-gray-800">
            {formater.format(Number(value))}
        </div>
     );
}
 
export default Currency;