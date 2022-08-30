//4,752%
export const percentFormatter = new Intl.NumberFormat('ru-Ru', 
{
    style : 'percent', 
    maximumFractionDigits: 3
}
); 

// 7 000 000 $
export const priceFormatter = new Intl.NumberFormat('ru-Ru',
{
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 0
}
);

export const priceFormatterDecimals = new Intl.NumberFormat('ru-Ru',
{
    style: 'currency', 
    currency: 'USD', 
    maximumFractionDigits: 2
}
);

