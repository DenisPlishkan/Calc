import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

const maxPrice = 1000000;

// Инпуты
const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');

const form = document.querySelector('#form');
const totalCost = document.querySelector('#total-cost');
const totalMonthPayment = document.querySelector('#total-month-payment');

// Cleave опции форматирования
const cleavePriceSetting = {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter: ' '
}

// Запускаем форматирование Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownPayMent = new Cleave(inputDownPayment, cleavePriceSetting);

const cleaveTerm = new Cleave(inputTerm, cleavePriceSetting);

// Сумма кредита
calcMortgage();
   

// Отображение и расчет суммы кредита
form.addEventListener('input', function() {
    calcMortgage();
})

function calcMortgage() {

    // Проверка чтобы стоимость недвижимости не была больше максимальной
    let cost = +cleaveCost.getRawValue();
    if(cost > maxPrice) {
        cost = maxPrice;
    }

    // Общая сумма кредита
    const totalAmount = cost - cleaveDownPayMent.getRawValue();
    totalCost.innerText = priceFormatter.format(totalAmount);

    // Ставка по кредиту
    const creditRate = +document.querySelector('input[name="program"]:checked').value;
    const monthRate = (creditRate * 100) / 12;

    // Срок ипотеки в годах
    const years = +cleaveTerm.getRawValue();

    // Срок в месяцах
    const month = years * 12;

    // Рассчет ежемесячного платежа
    // const monthPayment = (totalAmount * monthRate) / (1 - (1 + monthRate) * (1 - month));

    const monthPayment = (totalAmount / month) * monthRate;

    // Отображение ежемесячного платежа
    totalMonthPayment.innerText = priceFormatterDecimals.format(monthPayment);
    
}

// Slider Cost
const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 100000,
    connect: 'lower',
    step: 2000,
    tooltips: true,
    range: {
        'min': 0,
        '50%': [100000, 18000],
        'max': 1000000
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});


sliderCost.noUiSlider.on('slide', function(){

    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));
    cleaveCost.setRawValue(sliderValue);
    calcMortgage();

});

// Slider Downpayment
const sliderDownpayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 15000,
    connect: 'lower',
    step: 1000,
    tooltips: true,
    range: {
        'min': 0,
        '50%': [100000, 18000],
        'max': 1000000
    },
    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '',
    }),
});


sliderDownpayment.noUiSlider.on('slide', function(){

    const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true));
    cleaveDownPayMent.setRawValue(sliderValue);
    calcMortgage();

});

// Slider Term
const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    step: 1,
    tooltips: true,
    range: {
        'min': 1,
        'max': 30
    },
    format: wNumb({
        decimals: 0,
        thousand: '',
        suffix: '',
    }),
});


sliderTerm.noUiSlider.on('slide', function(){

    const sliderValue = parseInt(sliderTerm.noUiSlider.get(true));
    cleaveTerm.setRawValue(sliderValue);
    calcMortgage();

});

// Форматирование inputCost
inputCost.addEventListener('input', function() {
    const value = +cleaveCost.getRawValue();

    // Обновляем range slider
    sliderCost.noUiSlider.set(value);

    //Проверки на макс цену
    if(value > maxPrice) {
        inputCost.closest('.param__details').classList.add('param__details--error');    
    }

    if(value <= maxPrice) {
        inputCost.closest('.param__details').classList.remove('param__details--error');
    }

    // Зависиость значений downPayMent от inputCost
    const percentMin = value * 0.15;
    const percentMax = value * 0.90;

    sliderDownpayment.noUiSlider.updateOptions({
        range: {
            min: percentMin,
            max: percentMax
        }
    });

});


inputCost.addEventListener('change', function() {
    const value = +cleaveCost.getRawValue();
    if(value > maxPrice) {
        inputCost.closest('.param__details').classList.remove('param__details--error');
        cleaveCost.setRawValue(maxPrice);    
    }

    
});