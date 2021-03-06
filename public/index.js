'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 46,
  'commission': {
    'insurance': 6.9,
    'treasury': 1,
    'virtuo': 5.9
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 237,
  'commission': {
    'insurance': 32.55,
    'treasury': 5,
    'virtuo': 47.55
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'options': {
    'deductibleReduction': true
  },
  'price': 450,
  'commission': {
    'insurance': 58.5,
    'treasury': 15,
    'virtuo': 103.5
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 46
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 32.2
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 6.9
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 1
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 5.9
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 237
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 151.9
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 32.55
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 5
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 47.55
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 450
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 273
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 58.5
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 15
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 103.5
  }]
}];

console.log(cars);
console.log(rentals);
console.log(actors);

function rental_price(rental)
{
	var date1 = new Date (rental.pickupDate);
	var date2= new Date (rental.returnDate);
	var days = (date2.getTime()-date1.getTime())/(1000 * 3600 * 24);
	var time = days+1;
	var distance = rental.distance;
	if (distance == null)
		{ distance = 0;}
	var car = fetchcar(rental.carId);
	var timeprice = time * car.pricePerDay;
	distance = distance * car.pricePerKm;
	if (time>10)
	{ return (timeprice+distance)*0.5;}
	if (time>4)
	{ return (timeprice+distance)*0.7;}
	if (time >1)
	{ return (timeprice+distance)*0.9;}
	return timeprice+distance
	
	
}
function fetchcar(ID)
{
	for (var i = 0; i < cars.length ; i++) 
	{
		if (ID == cars[i].id)
		{
			return cars[i];
		}
	}
	return 1;
}
function commission(rental)
{
	var price = rental.price*0.3;
	var insurance = price/2;
	var date1 = new Date (rental.pickupDate);
	var date2= new Date (rental.returnDate);
	var treasury = (date2.getTime()-date1.getTime())/(1000 * 3600 * 24)+1;
	var virtuo = price - insurance - treasury;
	return [insurance,treasury,virtuo];
}
function rental_price_deductible(rental)
{
	var date1 = new Date (rental.pickupDate);
	var date2= new Date (rental.returnDate);
	var days = (date2.getTime()-date1.getTime())/(1000 * 3600 * 24);
	var time = days+1;
	var distance = rental.distance;
	if (distance == null)
		{ distance = 0;}
	var car = fetchcar(rental.carId);
	var timeprice = time * car.pricePerDay;
	distance = distance * car.pricePerKm;
	var price;
	if (time>10)
	{ price =  (timeprice+distance)*0.5;}
	if (time>4 && time<10)
	{ price = (timeprice+distance)*0.7;}
	if (time >1 && time<4)
	{ price =  (timeprice+distance)*0.9;}
	if (time <=1)
	{ price = timeprice + distance;}
	if(rental.options.deductibleReduction == true)
	{
		price = price + 4*time;
	}
	return price;	
}
function commission_deductible(rental)
{
	if(rental.options.deductibleReduction == true)
	{
		var date1 = new Date (rental.pickupDate);
		var date2= new Date (rental.returnDate);
		var price = (rental.price - ((date2.getTime()-date1.getTime())/(1000 * 3600 * 24)+1)*4)*0.3;
		var insurance = price/2;
		var treasury = (date2.getTime()-date1.getTime())/(1000 * 3600 * 24)+1;
		var virtuo = price - insurance - treasury+ ((date2.getTime()-date1.getTime())/(1000 * 3600 * 24)+1)*4;
		return [insurance,treasury,virtuo];

	}
	else 
	{
		var price = rental.price*0.3;
		var insurance = price/2;
		var date1 = new Date (rental.pickupDate);
		var date2= new Date (rental.returnDate);
		var treasury = (date2.getTime()-date1.getTime())/(1000 * 3600 * 24)+1;
		var virtuo = price - insurance - treasury;
		return [insurance,treasury,virtuo];
	}
}
function debit_credit(rental)
{
	var driver = rental.price;
	var virtuo = rental.commission.virtuo;
	var insurance =rental.commission.insurance;
	var treasury = rental.commission.treasury;
	var partner = driver - virtuo - insurance - treasury;
	return [driver,partner,insurance,treasury,virtuo]
}