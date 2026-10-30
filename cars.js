const cars = [
    {
        name: "Ford Focus Turnier Ambient",
        model: "1.8 TD",

        photos: [
            "cars/focus/focus_outside.jpg",
			"cars/focus/focus_back.jpg",
            "cars/focus/focus_inside.jpg",
            "cars/focus/focus_inside_2.jpg"
        ],

        facts: {
			price: 1400,
			power: 75,
			fuel: 5.1,
			boot: 520,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 900,
			year: 2003,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 85
		}
	},
	
	{
        name: "Ford Focus Turnier Style",
        model: "1.8L Benzin",

        photos: [
            "cars/focus2/focus2_outside.jpg",
			"cars/focus2/focus2_back.jpg",
            "cars/focus2/focus2_inside.jpg",
            "cars/focus2/focus2_inside_2.jpg"
        ],

        facts: {
			price: 1290,
			power: 125,
			fuel: 7.6,
			boot: 475,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 850,
			year: 2008,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 90
		}
	},
	
	{
        name: "Volkswagen Touran Highline",
        model: "2L Benzin",

        photos: [
            "cars/touran/touran_outside.jpg",
			"cars/touran/touran_back.jpg",
            "cars/touran/touran_inside.jpg",
            "cars/touran/touran_inside_2.jpg"
        ],

        facts: {
			price: 1480,
			power: 150,
			fuel: 8.6,
			boot: 695,
            sleeping: 5, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 950,
			year: 2006,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 95
		}
	},
	
	{
        name: "Skoda Octavia",
        model: "1.8 TSI 4x4 Scout",

        photos: [
            "cars/octavia/outside.jpg",
			"cars/octavia/back.jpg",
            "cars/octavia/inside.jpg",
            "cars/octavia/inside_2.jpg"
        ],

        facts: {
			price: 1300,
			power: 160,
			fuel: 7.9,
			boot: 580,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 1000,
			year: 2009,
			seats: 5,
			transmission: "Manual",
			drive: "All-wheel drive",
			insurance: 105
		}
	},
	
	{
        name: "Skoda Octavia Ambient",
        model: "1.8L TSI",

        photos: [
            "cars/octavia2/outside.jpg",
			"cars/octavia2/back.jpg",
            "cars/octavia2/inside.jpg",
            "cars/octavia2/inside_2.jpg"
        ],

        facts: {
			price: 1450,
			power: 160,
			fuel: 7.0,
			boot: 560,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 850,
			year: 2009,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 90
		}
	},
	
	{
        name: "Skoda Octavia",
        model: "1.8L TSI",

        photos: [
            "cars/octavia3/outside.jpg",
			"cars/octavia3/back.jpg",
            "cars/octavia3/inside.jpg",
            "cars/octavia3/inside_2.jpg"
        ],

        facts: {
			price: 1450,
			power: 160,
			fuel: 7.0,
			boot: 560,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 850,
			year: 2007,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 90
		}
	},
	
	{
        name: "Volvo V50",
        model: "2.0 D Momentum",

        photos: [
            "cars/volvo/outside.jpg",
			"cars/volvo/back.jpg",
        ],

        facts: {
			price: 999,
			power: 136,
			fuel: 5.8,
			boot: 417,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 950,
			year: 2006,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 95
		}
	},
	
	{
        name: "Mazda 5",
        model: "2.0 CD",

        photos: [
            "cars/mazda/outside.jpg",
			"cars/mazda/back.jpg",
			"cars/mazda/inside.jpg"
        ],

        facts: {
			price: 650,
			power: 136,
			fuel: 6.0,
			boot: 426,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 950,
			year: 2007,
			seats: 7,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 90
		}
	},
	
	{
        name: "Mazda 6",
        model: "",

        photos: [
            "cars/mazda2/outside.jpg",
			"cars/mazda2/back.jpg",
			"cars/mazda2/inside.jpg",
			"cars/mazda2/inside_2.jpg"
        ],

        facts: {
			price: 799,
			power: 121,
			fuel: 6.1,
			boot: 505,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 950,
			year: 2007,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 95
		}
	},
	
	{
        name: "Subaru Forester Trend",
        model: "2.0 X",

        photos: [
            "cars/subaru/outside.jpg",
			"cars/subaru/outside_2.jpg",
			"cars/subaru/back.jpg"
        ],

        facts: {
			price: 1300,
			power: 125,
			fuel: 8.0,
			boot: 450,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 1050,
			year: 2004,
			seats: 5,
			transmission: "Manual",
			drive: "All-wheel drive",
			insurance: 105
		}
	},
	
	{
        name: "Opel Astra H Caravan",
        model: "1.8L Benzin",

        photos: [
            "cars/opel/outside.jpg",
			"cars/opel/back.jpg",
			"cars/opel/inside.jpg",
			"cars/opel/inside_2.jpg"
        ],

        facts: {
			price: 999,
			power: 140,
			fuel: 7.8,
			boot: 500,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 850,
			year: 2008,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 90
		}
	},
	
	{
        name: "Opel Astra H Caravan Edition",
        model: "1.8L Benzin",

        photos: [
            "cars/opel2/outside.jpg",
			"cars/opel2/back.jpg",
			"cars/opel2/inside.jpg",
			"cars/opel2/inside_2.jpg"
        ],

        facts: {
			price: 699,
			power: 125,
			fuel: 7.8,
			boot: 500,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 850,
			year: 2005,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 85
		}
	},
	
	{
        name: "Opel Astra H Caravan Edition",
        model: "1.7L Diesel `111 Jahre` ",

        photos: [
            "cars/opel3/outside.jpg",
			"cars/opel3/back.jpg",
			"cars/opel3/inside.jpg",
			"cars/opel3/inside_2.jpg"
        ],

        facts: {
			price: 500,
			power: 110,
			fuel: 5.5,
			boot: 505,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 900,
			year: 2010,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 85
		}
	},
	
	{
        name: "Opel Vectra Elegance",
        model: "2.2 DTI",

        photos: [
            "cars/opel4/outside.jpg",
			"cars/opel4/back.jpg",
			"cars/opel4/inside.jpg",
			"cars/opel4/inside_2.jpg"
        ],

        facts: {
			price: 250,
			power: 125,
			fuel: 7.7,
			boot: 460,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 1000,
			year: 2002,
			seats: 5,
			transmission: "Automatic",
			drive: "Front-wheel drive",
			insurance: 80
		}
	},
	
	{
        name: "Ford Focus",
        model: "1.6 Diesel",

        photos: [
            "cars/focus3/outside.jpg",
			"cars/focus3/back.jpg",
			"cars/focus3/inside.jpg",
			"cars/focus3/inside_2.jpg"
        ],

        facts: {
			price: 1000,
			power: 110,
			fuel: 5.0,
			boot: 396,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 850,
			year: 2011,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 85
		}
	},
	
	{
        name: "Ford Focus Turnier Fun",
        model: "1.6 Diesel",

        photos: [
            "cars/focus4/outside.jpg",
			"cars/focus4/back.jpg",
			"cars/focus4/inside.jpg",
			"cars/focus4/inside_2.jpg"
        ],

        facts: {
			price: 750,
			power: 109,
			fuel: 4.8,
			boot: 482,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 850,
			year: 2010,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 80
		}
	},
	
	{
        name: "Ford Mondeo",
        model: "2.5L Benzin",

        photos: [
            "cars/mondeo/outside.jpg",
			"cars/mondeo/back.jpg",
			"cars/mondeo/inside.jpg",
			"cars/mondeo/inside_2.jpg"
        ],

        facts: {
			price: 999,
			power: 220,
			fuel: 9.3,
			boot: 500,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 1150,
			year: 2011,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 120
		}
	},
	
	{
        name: "Volkswagen Golf V Variant",
        model: "1.4L Benzin Comfortline",

        photos: [
            "cars/golf/outside.jpg",
			"cars/golf/back.jpg",
			"cars/golf/inside.jpg",
			"cars/golf/inside_2.jpg"
        ],

        facts: {
			price: 999,
			power: 122,
			fuel: 6.4,
			boot: 505,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 800,
			year: 2011,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 85
		}
	},
	
	{
        name: "Volkswagen Golf IV Variant",
        model: "1.4L Benzin",

        photos: [
            "cars/golf2/outside.jpg",
			"cars/golf2/back.jpg",
			"cars/golf2/inside.jpg"
        ],

        facts: {
			price: 950,
			power: 75,
			fuel: 6.8,
			boot: 460,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 750,
			year: 2000,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 75
		}
	},
	
	{
        name: "Audi A4 Avant",
        model: "2.7 TDI",

        photos: [
            "cars/audi/outside.jpg",
			"cars/audi/back.jpg",
			"cars/audi/inside.jpg",
			"cars/audi/inside_2.jpg"
        ],

        facts: {
			price: 999,
			power: 179,
			fuel: 6.5,
			boot: 442,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 1100,
			year: 2006,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 115
		}
	},
	
	{
        name: "Audi A4 Avant",
        model: "2.0",

        photos: [
            "cars/audi2/outside.jpg",
			"cars/audi2/back.jpg",
			"cars/audi2/inside.jpg",
			"cars/audi2/inside_2.jpg"
        ],

        facts: {
			price: 499,
			power: 131,
			fuel: 8.0,
			boot: 442,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 950,
			year: 2003,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 90
		}
	},
	
	{
        name: "BMW 316",
        model: "1.8L Benzin",

        photos: [
            "cars/bmw/outside.jpg",
			"cars/bmw/back.jpg",
			"cars/bmw/inside.jpg",
			"cars/bmw/inside_2.jpg"
        ],

        facts: {
			price: 800,
			power: 116,
			fuel: 7.4,
			boot: 440,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 1000,
			year: 2005,
			seats: 5,
			transmission: "Manual",
			drive: "Rear-wheel drive",
			insurance: 100
		}
	},
	
	{
        name: "BMW 318",
        model: "1.8L Benzin",

        photos: [
            "cars/bmw2/outside.jpg",
			"cars/bmw2/back.jpg",
			"cars/bmw2/inside.jpg",
			"cars/bmw2/inside_2.jpg"
        ],

        facts: {
			price: 999,
			power: 118,
			fuel: 7.4,
			boot: 440,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 950,
			year: 2001,
			seats: 5,
			transmission: "Manual",
			drive: "Rear-wheel drive",
			insurance: 95
		}
	},
	
	{
        name: "BMW 316",
        model: "1.8L Benzin",

        photos: [
            "cars/bmw3/outside.jpg",
			"cars/bmw3/back.jpg",
			"cars/bmw3/inside.jpg",
			"cars/bmw3/inside_2.jpg"
        ],

        facts: {
			price: 650,
			power: 116,
			fuel: 7.4,
			boot: 440,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 1000,
			year: 2003,
			seats: 5,
			transmission: "Manual",
			drive: "Rear-wheel drive",
			insurance: 100
		}
	},
	
	{
        name: "BMW 320",
        model: "2.2L Benzin",

        photos: [
            "cars/bmw4/outside.jpg",
			"cars/bmw4/back.jpg",
			"cars/bmw4/inside.jpg",
			"cars/bmw4/inside_2.jpg"
        ],

        facts: {
			price: 990,
			power: 170,
			fuel: 8.9,
			boot: 440,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 1000,
			year: 2002,
			seats: 5,
			transmission: "Manual",
			drive: "Rear-wheel drive",
			insurance: 110
		}
	},
	
	{
        name: "Opel Insignia",
        model: "2L Diesel Sports Tourer",

        photos: [
            "cars/opel5/outside.jpg",
			"cars/opel5/back.jpg",
			"cars/opel5/inside.jpg",
			"cars/opel5/inside_2.jpg"
        ],

        facts: {
			price: 950,
			power: 160,
			fuel: 6.2,
			boot: 540,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 1050,
			year: 2011,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 105
		}
	},
	
	{
        name: "Skoda Fabia",
        model: "1.2L Benzin",

        photos: [
            "cars/skoda2/outside.jpg",
			"cars/skoda2/back.jpg",
			"cars/skoda2/inside.jpg",
			"cars/skoda2/inside_2.jpg"
        ],

        facts: {
			price: 999,
			power: 86,
			fuel: 5.7,
			boot: 315,
            sleeping: 2, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 750,
			year: 2010,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 75
		}
	},
	
	{
        name: "Hyundai i30",
        model: "1.4L Benzin",

        photos: [
            "cars/hyundai/outside.jpg",
			"cars/hyundai/back.jpg",
			"cars/hyundai/inside.jpg",
			"cars/hyundai/inside_2.jpg"
        ],

        facts: {
			price: 999,
			power: 109,
			fuel: 6.5,
			boot: 340,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 800,
			year: 2011,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 80
		}
	},
	
	{
        name: "Ford Mondeo",
        model: "2.0L Benzin Titanium",

        photos: [
            "cars/ford/outside.jpg",
			"cars/ford/back.jpg",
			"cars/ford/inside.jpg"
        ],

        facts: {
			price: 800,
			power: 145,
			fuel: 8.0,
			boot: 500,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 950,
			year: 2010,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 100
		}
	},
	
	{
        name: "Skoda Fabia",
        model: "1.2L Benzin",

        photos: [
            "cars/skoda3/outside.jpg",
			"cars/skoda3/back.jpg",
			"cars/skoda3/inside.jpg",
			"cars/skoda3/inside_2.jpg"
        ],

        facts: {
			price: 490,
			power: 60,
			fuel: 5.7,
			boot: 315,
            sleeping: 2, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 750,
			year: 2009,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 75
		}
	},
	
	{
        name: "Opel Vectra",
        model: "1.9 CDTI",

        photos: [
            "cars/opel6/outside.jpg",
			"cars/opel6/back.jpg",
			"cars/opel6/inside.jpg",
			"cars/opel6/inside_2.jpg"
        ],

        facts: {
			price: 450,
			power: 120,
			fuel: 5.9,
			boot: 500,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 950,
			year: 2007,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 85
		}
	},
	
	{
        name: "Opel Astra",
        model: "1.8L Benzin",

        photos: [
            "cars/opel7/outside.jpg",
			"cars/opel7/back.jpg",
			"cars/opel7/inside.jpg",
			"cars/opel7/inside_2.jpg"
        ],

        facts: {
			price: 499,
			power: 140,
			fuel: 7.7,
			boot: 500,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 850,
			year: 2008,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 85
		}
	},
	
	{
        name: "Ford Mondeo",
        model: "1.8L Benzin",

        photos: [
            "cars/ford2/outside.jpg",
			"cars/ford2/back.jpg",
			"cars/ford2/inside.jpg",
			"cars/ford2/inside_2.jpg"
        ],

        facts: {
			price: 299,
			power: 125,
			fuel: 8.2,
			boot: 500,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 900,
			year: 2006,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 80
		}
	},
	
	{
        name: "Volvo V70",
        model: "2.4L Benzin",

        photos: [
            "cars/volvo2/outside.jpg",
			"cars/volvo2/back.jpg",
			"cars/volvo2/inside.jpg",
			"cars/volvo2/inside_2.jpg"
        ],

        facts: {
			price: 490,
			power: 140,
			fuel: 8.9,
			boot: 485,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 1050,
			year: 2000,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 90
		}
	},
	
	{
        name: "Volkswagen Passat",
        model: "2.0L Benzin",

        photos: [
            "cars/vw/outside.jpg",
			"cars/vw/back.jpg",
			"cars/vw/inside.jpg",
			"cars/vw/inside_2.jpg"
        ],

        facts: {
			price: 490,
			power: 116,
			fuel: 8.9,
			boot: 495,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 950,
			year: 2002,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 85
		}
	},
	
	{
        name: "Volkswagen Passat",
        model: "1.9L Diesel",

        photos: [
            "cars/vw2/outside.jpg",
			"cars/vw2/back.jpg",
			"cars/vw2/inside.jpg",
			"cars/vw2/inside_2.jpg"
        ],

        facts: {
			price: 399,
			power: 131,
			fuel: 5.5,
			boot: 495,
            sleeping: 4, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 900,
			year: 2002,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 85
		}
	},
	
	{
        name: "Volvo V50",
        model: "2.0 D",

        photos: [
            "cars/volvo3/outside.jpg",
			"cars/volvo3/back.jpg",
			"cars/volvo3/inside.jpg",
			"cars/volvo3/inside_2.jpg"
        ],

        facts: {
			price: 499,
			power: 136,
			fuel: 5.8,
			boot: 417,
            sleeping: 3, // Estimated 0–5 score for two adults sleeping inside
			maintenance: 950,
			year: 2007,
			seats: 5,
			transmission: "Manual",
			drive: "Front-wheel drive",
			insurance: 95
		}
	}
];