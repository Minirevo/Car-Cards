const carGrid = document.getElementById("car-grid");
const carDetail = document.getElementById("car-detail");
const detailContent = document.getElementById("detail-content");
const backButton = document.getElementById("back-button");
const mainHeader = document.getElementById("main-header");

// Sort & filter controls
const sortSelect = document.getElementById("sort-select");
const carSearch = document.getElementById("car-search");
const priceFilter = document.getElementById("filter-price");
const fuelFilter = document.getElementById("filter-fuel");
const yearFilter = document.getElementById("filter-year");
const transmissionFilter = document.getElementById("filter-transmission");
const driveFilter = document.getElementById("filter-drive");
const clearFiltersButton = document.getElementById("clear-filters");

let currentCar = null;
let currentPhoto = 0;

const comparePage = document.getElementById("compare-page");
const compareContent = document.getElementById("compare-content");
const compareBackButton = document.getElementById("compare-back-button");

const discoverPage = document.getElementById("discover-page");
const discoverToggle = document.getElementById("discover-toggle");
const discoverBackButton = document.getElementById("discover-back-button");
const discoverCard = document.getElementById("discover-card");
const discoverProgress = document.getElementById("discover-progress");
const discoverUndoButton = document.getElementById("discover-undo");
const discoverSkipButton = document.getElementById("discover-skip");
const discoverKeepButton = document.getElementById("discover-keep");
const discoverShortlistToggle = document.getElementById("discover-shortlist-toggle");
const discoverShortlistPanel = document.getElementById("discover-shortlist");
const discoverShortlistGrid = document.getElementById("discover-shortlist-grid");
const discoverReview = document.getElementById("discover-review");

let discoverDecisions = {};
try { discoverDecisions = JSON.parse(localStorage.getItem("carDiscoverDecisions") || "{}"); }
catch { discoverDecisions = {}; }
let discoverShortlist = [];
try { discoverShortlist = JSON.parse(localStorage.getItem("carDiscoverShortlist") || "[]"); }
catch { discoverShortlist = []; }
let discoverUndoStack = [];
let showingDiscoverShortlist = false;
let currentDiscoverIndex = null;

let compareSelection = new Set();
const MAX_COMPARE = 4;

/* =========================
   FAVORITES
   ========================= */

// Load saved favorites
let favorites = new Set(
    JSON.parse(localStorage.getItem("carFavorites") || "[]")
);

// Are we currently showing only favorites?
let showFavoritesOnly = false;


// Save favorites
function saveFavorites() {
    localStorage.setItem(
        "carFavorites",
        JSON.stringify([...favorites])
    );
}


// Update favorites button
function updateFavoritesButton() {
    const button =
        document.getElementById("favorites-toggle") ||
        document.getElementById("favorites-filter");

    if (!button) return;

    button.textContent =
        `${showFavoritesOnly ? "♥" : "♡"} Favorites (${favorites.size})`;

    button.classList.toggle("active", showFavoritesOnly);
}

/* =========================
   RELATIVE STAR CALCULATION
   ========================= */

function getRelativeStars(category, value) {
    const values = cars
        .map(car => car.facts[category])
        .filter(v => typeof v === "number");

    if (values.length === 0) return 0;

    const lowest = Math.min(...values);
    const highest = Math.max(...values);

    // Only one car / identical values
    if (lowest === highest) return 3;

    let score;

    // Lower is better
    if (
        category === "price" ||
        category === "fuel" ||
        category === "maintenance"
    ) {
        score = ((highest - value) / (highest - lowest)) * 5;
    }

    // Higher is better
    else {
        score = ((value - lowest) / (highest - lowest)) * 5;
    }

    // Round to nearest quarter star
    return Math.round(score * 4) / 4;
}


/* =========================
   STARS
   ========================= */

function makeStars(amount) {
    return `${amount.toFixed(2)} / 5`;
}

function scoreRange(value, min, max, higherIsBetter = true) {
    const normalized = (value - min) / (max - min);

    const score = higherIsBetter
        ? normalized
        : 1 - normalized;

    return Math.round(
        Math.max(0, Math.min(1, score)) * 100
    );
}

function getTotalScore(car) {
    const f = car.facts;

    const scores = {
        price: scoreRange(f.price, 300, 2500, false),
        fuel: scoreRange(f.fuel, 4.5, 10, false),
        maintenance: scoreRange(f.maintenance, 500, 1200, false),
        boot: scoreRange(f.boot, 300, 700, true),
        power: scoreRange(f.power, 70, 220, true),
        insurance: scoreRange(f.insurance, 50, 120, false),
        year: scoreRange(f.year, 2000, 2015, true),
        sleeping: scoreRange(f.sleeping ?? 0, 0, 5, true)
    };

    // Existing criteria contribute 90%; sleeping practicality contributes 10%.
    return Math.round(
        scores.price * 0.18 +
        scores.fuel * 0.18 +
        scores.maintenance * 0.135 +
        scores.boot * 0.135 +
        scores.power * 0.09 +
        scores.insurance * 0.09 +
        scores.year * 0.09 +
        scores.sleeping * 0.10
    );
}

function getFilteredAndSortedCars() {
    let result = [...cars];

    const searchTerm = (carSearch?.value || "").trim().toLowerCase();
    if (searchTerm) {
        result = result.filter(car =>
            `${car.name} ${car.model}`.toLowerCase().includes(searchTerm)
        );
    }

    // -------------------------
    // FILTERS
    // -------------------------

    const maxPrice = parseFloat(priceFilter.value);
    const maxFuel = parseFloat(fuelFilter.value);
    const minYear = parseInt(yearFilter.value);

    if (!isNaN(maxPrice)) {
        result = result.filter(car =>
            car.facts.price <= maxPrice
        );
    }

    if (!isNaN(maxFuel)) {
        result = result.filter(car =>
            car.facts.fuel <= maxFuel
        );
    }

    if (!isNaN(minYear)) {
        result = result.filter(car =>
            car.facts.year >= minYear
        );
    }

    if (transmissionFilter.value !== "all") {
        result = result.filter(car =>
            car.facts.transmission === transmissionFilter.value
        );
    }

    if (driveFilter.value !== "all") {
        result = result.filter(car =>
            car.facts.drive === driveFilter.value
        );
    }

    // -------------------------
    // FAVORITES
    // -------------------------

    if (showFavoritesOnly) {
    result = result.filter(car =>
        favorites.has(getCarId(car))
    );
}

    // -------------------------
    // SORTING
    // -------------------------

    switch (sortSelect.value) {
		
		case "score-asc":
			result.sort((a, b) =>
				getTotalScore(a) - getTotalScore(b)
			);
			break;

		case "score-desc":
			result.sort((a, b) =>
				getTotalScore(b) - getTotalScore(a)
			);
		break;
		
        case "price-asc":
            result.sort((a, b) =>
                a.facts.price - b.facts.price
            );
            break;

        case "price-desc":
            result.sort((a, b) =>
                b.facts.price - a.facts.price
            );
            break;

        case "power-asc":
            result.sort((a, b) =>
                a.facts.power - b.facts.power
            );
            break;

        case "power-desc":
            result.sort((a, b) =>
                b.facts.power - a.facts.power
            );
            break;

        case "fuel-asc":
            result.sort((a, b) =>
                a.facts.fuel - b.facts.fuel
            );
            break;

        case "fuel-desc":
            result.sort((a, b) =>
                b.facts.fuel - a.facts.fuel
            );
            break;

        case "boot-asc":
            result.sort((a, b) =>
                a.facts.boot - b.facts.boot
            );
            break;

        case "boot-desc":
            result.sort((a, b) =>
                b.facts.boot - a.facts.boot
            );
            break;

        case "sleeping-asc":
            result.sort((a, b) => (a.facts.sleeping ?? 0) - (b.facts.sleeping ?? 0));
            break;

        case "sleeping-desc":
            result.sort((a, b) => (b.facts.sleeping ?? 0) - (a.facts.sleeping ?? 0));
            break;

        case "maintenance-asc":
            result.sort((a, b) =>
                a.facts.maintenance - b.facts.maintenance
            );
            break;

        case "maintenance-desc":
            result.sort((a, b) =>
                b.facts.maintenance - a.facts.maintenance
            );
            break;

        case "year-asc":
            result.sort((a, b) =>
                a.facts.year - b.facts.year
            );
            break;

        case "year-desc":
            result.sort((a, b) =>
                b.facts.year - a.facts.year
            );
            break;
    }

    return result;
}

/* =========================
   SHOW CAR GRID
   ========================= */

function showCarGrid() {
    carGrid.innerHTML = "";
    if (discoverPage) discoverPage.classList.add("hidden");
    if (comparePage) comparePage.classList.add("hidden");
    document.getElementById("car-controls")?.classList.remove("hidden");
	
	updateFavoritesButton();
	updateCompareButton();
    
	getFilteredAndSortedCars().forEach((car) => {
		const totalScore = getTotalScore(car);
		// Hide cars that aren't favorites when filter is active
		if (showFavoritesOnly && !favorites.has(getCarId(car))) {
			return;
		}
        const facts = car.facts;

        const card = document.createElement("div");
        card.className = "car-card";

        card.innerHTML = `
			<button class="favorite-button ${favorites.has(getCarId(car)) ? "selected" : ""}"
				title="Toggle favorite">
				${favorites.has(getCarId(car)) ? "♥" : "♡"}
			</button>
			
			<button class="compare-button ${compareSelection.has(getCarId(car)) ? "active" : ""}">
				${compareSelection.has(getCarId(car)) ? "✓" : "⚖"}
			</button>
			
			<div class="total-score">
				<span class="total-score-label">Total Score</span>
				<span class="total-score-value">${totalScore}/100</span>
			</div>
			
			<img
                src="${car.photos[0]}"
                alt="${car.name}"
                class="car-image"
            >

            <div class="car-info">
                <h2>${car.name}</h2>
                <h3>${car.model}</h3>

                <div class="stats">

                    <div class="stat">
                        <span>Price</span>
                        <span class="stars">
                            ${makeStars(
                                getRelativeStars("price", facts.price)
                            )}
                        </span>
                    </div>

                    <div class="stat">
                        <span>Power</span>
                        <span class="stars">
                            ${makeStars(
                                getRelativeStars("power", facts.power)
                            )}
                        </span>
                    </div>

                    <div class="stat">
                        <span>Fuel</span>
                        <span class="stars">
                            ${makeStars(
                                getRelativeStars("fuel", facts.fuel)
                            )}
                        </span>
                    </div>

                    <div class="stat">
                        <span>Space</span>
                        <span class="stars">
                            ${makeStars(
                                getRelativeStars("boot", facts.boot)
                            )}
                        </span>
                    </div>

                    <div class="stat">
                <span>Sleep inside</span>
                <span class="stars">${facts.sleeping ?? 0} / 5</span>
            </div>

            <div class="stat">
                        <span>Maintenance</span>
                        <span class="stars">
                            ${makeStars(
                                getRelativeStars(
                                    "maintenance",
                                    facts.maintenance
                                )
                            )}
                        </span>
                    </div>

                </div>
            </div>
        `;

        // Clicking the card opens details
		card.addEventListener("click", () => {
			const originalIndex = cars.indexOf(car);
			showCarDetail(originalIndex);
		});

		// Clicking the heart toggles favorite
		card.querySelector(".favorite-button").addEventListener("click", (event) => {
			event.stopPropagation();

			const carId = getCarId(car);

			if (favorites.has(carId)) {
				favorites.delete(carId);
			} else {
				favorites.add(carId);
			}

			saveFavorites();
			showCarGrid();
		});
		
		card.querySelector(".compare-button").addEventListener("click", (event) => {
			event.stopPropagation();
			toggleCompare(car);
		});

        carGrid.appendChild(card);
    });

    carGrid.classList.remove("hidden");
    carDetail.classList.add("hidden");
    mainHeader.classList.remove("hidden");
}


/* =========================
   SHOW DETAIL
   ========================= */

function showCarDetail(index) {
    currentCar = cars[index];
    if (discoverPage) discoverPage.classList.add("hidden");
    if (comparePage) comparePage.classList.add("hidden");
    document.getElementById("car-controls")?.classList.add("hidden");
    currentPhoto = 0;

    const car = currentCar;
    const facts = car.facts;

    carGrid.classList.add("hidden");
    carDetail.classList.remove("hidden");
    mainHeader.classList.add("hidden");

    detailContent.innerHTML = `
        <div class="detail-header">
            <h1>${car.name}</h1>
            <h2>${car.model}</h2>
        </div>

        <div class="gallery">

            <div class="gallery-main">
                <img
                    id="main-photo"
                    src="${car.photos[0]}"
                    alt="${car.name}"
                >

                <button id="prev-photo" class="gallery-button left">
                    ‹
                </button>

                <button id="next-photo" class="gallery-button right">
                    ›
                </button>
            </div>

            <div class="photo-counter">
                <span id="photo-counter">
                    1 / ${car.photos.length}
                </span>
            </div>

            <div class="thumbnails">
                ${car.photos.map((photo, i) => `
                    <img
                        src="${photo}"
                        alt="Photo ${i + 1}"
                        class="thumbnail ${i === 0 ? "active" : ""}"
                        data-index="${i}"
                    >
                `).join("")}
            </div>

        </div>

        <div class="stats detail-stats">

            <div class="stat">
                <span>Price</span>
                <span class="stars">
                    ${makeStars(
                        getRelativeStars("price", facts.price)
                    )}
                </span>
            </div>

            <div class="stat">
                <span>Power</span>
                <span class="stars">
                    ${makeStars(
                        getRelativeStars("power", facts.power)
                    )}
                </span>
            </div>

            <div class="stat">
                <span>Fuel</span>
                <span class="stars">
                    ${makeStars(
                        getRelativeStars("fuel", facts.fuel)
                    )}
                </span>
            </div>

            <div class="stat">
                <span>Space</span>
                <span class="stars">
                    ${makeStars(
                        getRelativeStars("boot", facts.boot)
                    )}
                </span>
            </div>

            <div class="stat">
                <span>Sleep inside</span>
                <span class="stars">${facts.sleeping ?? 0} / 5</span>
            </div>

            <div class="stat">
                <span>Maintenance</span>
                <span class="stars">
                    ${makeStars(
                        getRelativeStars(
                            "maintenance",
                            facts.maintenance
                        )
                    )}
                </span>
            </div>

        </div>

        <div class="facts">

            <h2>Facts</h2>

            <p><strong>Price:</strong> ${facts.price} €</p>
            <p><strong>Power:</strong> ${facts.power} hp</p>
            <p><strong>Fuel:</strong> ${facts.fuel} L/100 km</p>
            <p><strong>Boot:</strong> ${facts.boot} L</p>
            <p><strong>Sleeping inside:</strong> ${facts.sleeping ?? 0}/5 (estimated for two adults, rear seats folded)</p>
            <p><strong>Maintenance:</strong> ~€${facts.maintenance}/year</p>
            <p><strong>Year:</strong> ${facts.year}</p>
            <p><strong>Seats:</strong> ${facts.seats}</p>
            <p><strong>Transmission:</strong> ${facts.transmission}</p>
            <p><strong>Drive:</strong> ${facts.drive}</p>
			<p><strong>Insurance:</strong> ${facts.insurance} €</p>

        </div>
    `;

    setupGallery();
}


/* =========================
   GALLERY
   ========================= */

function setupGallery() {
    const mainPhoto = document.getElementById("main-photo");
    const counter = document.getElementById("photo-counter");
    const thumbnails = document.querySelectorAll(".thumbnail");

    function updatePhoto() {
        mainPhoto.src = currentCar.photos[currentPhoto];

        counter.textContent =
            `${currentPhoto + 1} / ${currentCar.photos.length}`;

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle(
                "active",
                index === currentPhoto
            );
        });
    }

    document
        .getElementById("prev-photo")
        .addEventListener("click", () => {
            currentPhoto--;

            if (currentPhoto < 0) {
                currentPhoto = currentCar.photos.length - 1;
            }

            updatePhoto();
        });

    document
        .getElementById("next-photo")
        .addEventListener("click", () => {
            currentPhoto++;

            if (currentPhoto >= currentCar.photos.length) {
                currentPhoto = 0;
            }

            updatePhoto();
        });

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", () => {
            currentPhoto = Number(thumbnail.dataset.index);
            updatePhoto();
        });
    });


    /* =========================
       SWIPE
       ========================= */

    let touchStartX = 0;

    mainPhoto.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].screenX;
    });

    mainPhoto.addEventListener("touchend", event => {
        const touchEndX = event.changedTouches[0].screenX;
        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) < 50) return;

        if (difference < 0) {
            currentPhoto++;

            if (currentPhoto >= currentCar.photos.length) {
                currentPhoto = 0;
            }
        } else {
            currentPhoto--;

            if (currentPhoto < 0) {
                currentPhoto = currentCar.photos.length - 1;
            }
        }

        updatePhoto();
    });
}


/* =========================
   BACK BUTTON
   ========================= */

backButton.addEventListener("click", () => {
    showCarGrid();
});


document.getElementById("favorites-toggle").addEventListener("click", () => {
    showFavoritesOnly = !showFavoritesOnly;
    showCarGrid();
});

function getCarId(car) {
    return `${car.name}-${car.model}`;
}

/*	========================
		Compare
	======================== */
	function updateCompareButton() {
		const button = document.getElementById("compare-toggle");

		if (!button) return;

		button.textContent = `⚖ Compare (${compareSelection.size})`;
		button.disabled = compareSelection.size < 2;
	}


function toggleCompare(car) {
    const id = getCarId(car);

    if (compareSelection.has(id)) {
        compareSelection.delete(id);
    } else {
        if (compareSelection.size >= MAX_COMPARE) {
            alert(`You can compare up to ${MAX_COMPARE} cars.`);
            return;
        }

        compareSelection.add(id);
    }

    showCarGrid();
}

function compareValue(category, value, carsBeingCompared) {
    const values = carsBeingCompared
        .map(car => car.facts[category])
        .filter(v => typeof v === "number");

    if (values.length === 0) {
        return {
            symbol: "=",
            className: "compare-equal"
        };
    }

    const best = ["price", "fuel", "maintenance"].includes(category)
        ? Math.min(...values)
        : Math.max(...values);

    const worst = ["price", "fuel", "maintenance"].includes(category)
        ? Math.max(...values)
        : Math.min(...values);

    if (best === worst) {
        return {
            symbol: "=",
            className: "compare-equal"
        };
    }

    if (value === best) {
        return {
            symbol: "+",
            className: "compare-better"
        };
    }

    if (value === worst) {
        return {
            symbol: "−",
            className: "compare-worse"
        };
    }

    return {
        symbol: "•",
        className: "compare-neutral"
    };
}

function showComparePage() {
    if (discoverPage) discoverPage.classList.add("hidden");
    document.getElementById("car-controls")?.classList.add("hidden");
    const selectedCars = cars.filter(car =>
        compareSelection.has(getCarId(car))
    );

    if (selectedCars.length < 2) {
        return;
    }

    mainHeader.classList.add("hidden");
    carGrid.classList.add("hidden");
    carDetail.classList.add("hidden");

    comparePage.classList.remove("hidden");

    compareContent.innerHTML = `
        <h1>Compare Cars</h1>
        <p class="compare-subtitle">
            Comparing ${selectedCars.length} cars
        </p>

        <div class="compare-actions">
            <button id="clear-compare-button">
                Clear comparison
            </button>
        </div>

        <div class="compare-table-wrapper">
            <table class="compare-table">

                <thead>
                    <tr>
                        <th>Category</th>

                        ${selectedCars.map(car => `
                            <th>
                                <img
                                    src="${car.photos[0]}"
                                    alt="${car.name}"
                                >

                                <strong>${car.name}</strong>
                                <span>${car.model}</span>
                            </th>
                        `).join("")}

                    </tr>
                </thead>

                <tbody>

                    <tr>
						<th>Price</th>
						${selectedCars.map(car => {
							const result = compareValue("price", car.facts.price, selectedCars);

							return `
								<td class="${result.className}">
									<span class="compare-value">
										€${car.facts.price.toLocaleString()}
									</span>
									<span class="compare-indicator">
										${result.symbol}
									</span>
								</td>
							`;
						}).join("")}
					</tr>

					<tr>
						<th>Power</th>
						${selectedCars.map(car => {
							const result = compareValue("power", car.facts.power, selectedCars);

							return `
								<td class="${result.className}">
									<span class="compare-value">
										${car.facts.power} hp
									</span>
									<span class="compare-indicator">
										${result.symbol}
									</span>
								</td>
							`;
						}).join("")}
					</tr>

					<tr>
						<th>Fuel</th>
						${selectedCars.map(car => {
							const result = compareValue("fuel", car.facts.fuel, selectedCars);

							return `
								<td class="${result.className}">
									<span class="compare-value">
										${car.facts.fuel} L/100 km
									</span>
									<span class="compare-indicator">
										${result.symbol}
									</span>
								</td>
							`;
						}).join("")}
					</tr>

					<tr>
						<th>Boot</th>
						${selectedCars.map(car => {
							const result = compareValue("boot", car.facts.boot, selectedCars);

							return `
								<td class="${result.className}">
									<span class="compare-value">
										${car.facts.boot} L
									</span>
									<span class="compare-indicator">
										${result.symbol}
									</span>
								</td>
							`;
						}).join("")}
					</tr>

					<tr>
                        <th>Sleeping inside (0–5)</th>
                        ${selectedCars.map(car => {
                            const value = car.facts.sleeping ?? 0;
                            const result = compareValue("sleeping", value, selectedCars);
                            return `
                                <td class="${result.className}">
                                    <span class="compare-value">${value}/5</span>
                                    <span class="compare-indicator">${result.symbol}</span>
                                </td>
                            `;
                        }).join("")}
                    </tr>

                    <tr>
						<th>Maintenance</th>
						${selectedCars.map(car => {
							const result = compareValue(
								"maintenance",
								car.facts.maintenance,
								selectedCars
							);

							return `
								<td class="${result.className}">
									<span class="compare-value">
										€${car.facts.maintenance.toLocaleString()}
									</span>
									<span class="compare-indicator">
										${result.symbol}
									</span>
								</td>
							`;
						}).join("")}
					</tr>

					<tr>
						<th>Year</th>
						${selectedCars.map(car => {
							const result = compareValue("year", car.facts.year, selectedCars);

							return `
								<td class="${result.className}">
									<span class="compare-value">
										${car.facts.year}
									</span>
									<span class="compare-indicator">
										${result.symbol}
									</span>
								</td>
							`;
						}).join("")}
					</tr>

					<tr>
						<th>Seats</th>
						${selectedCars.map(car => {
							const result = compareValue("seats", car.facts.seats, selectedCars);

							return `
								<td class="${result.className}">
									<span class="compare-value">
										${car.facts.seats}
									</span>
									<span class="compare-indicator">
										${result.symbol}
									</span>
								</td>
							`;
						}).join("")}
					</tr>

					<tr>
						<th>Transmission</th>
						${selectedCars.map(car => `
							<td>${car.facts.transmission}</td>
						`).join("")}
					</tr>

					<tr>
						<th>Drive</th>
						${selectedCars.map(car => `
							<td>${car.facts.drive}</td>
						`).join("")}
					</tr>

                    <tr class="rating-row">
                        <th>Price rating</th>
                        ${selectedCars.map(car =>
                            `<td>${makeStars(getRelativeStars("price", car.facts.price))}</td>`
                        ).join("")}
                    </tr>

                    <tr class="rating-row">
                        <th>Power rating</th>
                        ${selectedCars.map(car =>
                            `<td>${makeStars(getRelativeStars("power", car.facts.power))}</td>`
                        ).join("")}
                    </tr>

                    <tr class="rating-row">
                        <th>Fuel rating</th>
                        ${selectedCars.map(car =>
                            `<td>${makeStars(getRelativeStars("fuel", car.facts.fuel))}</td>`
                        ).join("")}
                    </tr>

                    <tr class="rating-row">
                        <th>Boot rating</th>
                        ${selectedCars.map(car =>
                            `<td>${makeStars(getRelativeStars("boot", car.facts.boot))}</td>`
                        ).join("")}
                    </tr>

                    <tr class="rating-row">
                        <th>Maintenance rating</th>
                        ${selectedCars.map(car =>
                            `<td>${makeStars(getRelativeStars("maintenance", car.facts.maintenance))}</td>`
                        ).join("")}
                    </tr>

                </tbody>
            </table>
        </div>
    `;

    document
        .getElementById("clear-compare-button")
        .addEventListener("click", () => {
            compareSelection.clear();
            showComparePage();
        });
}


function hideComparePage() {
    comparePage.classList.add("hidden");
    document.getElementById("car-controls")?.classList.remove("hidden");
    mainHeader.classList.remove("hidden");
    carGrid.classList.remove("hidden");

    showCarGrid();
}


const compareToggle = document.getElementById("compare-toggle");

if (compareToggle) {
    compareToggle.addEventListener("click", () => {
        showComparePage();
    });
}

if (compareBackButton) {
    compareBackButton.addEventListener("click", () => {
        hideComparePage();
    });
}

if (sortSelect) {
    sortSelect.addEventListener("change", showCarGrid);
}

if (priceFilter) {
    priceFilter.addEventListener("input", showCarGrid);
}

if (fuelFilter) {
    fuelFilter.addEventListener("input", showCarGrid);
}

if (yearFilter) {
    yearFilter.addEventListener("input", showCarGrid);
}

if (transmissionFilter) {
    transmissionFilter.addEventListener("change", showCarGrid);
}

if (driveFilter) {
    driveFilter.addEventListener("change", showCarGrid);
}

if (clearFiltersButton) {
    clearFiltersButton.addEventListener("click", () => {
        sortSelect.value = "default";
        if (carSearch) carSearch.value = "";
        priceFilter.value = "";
        fuelFilter.value = "";
        yearFilter.value = "";
        transmissionFilter.value = "all";
        driveFilter.value = "all";

        showCarGrid();
    });
}



/* =========================
   DISCOVER / SHORTLIST
   ========================= */

function saveDiscoverState() {
    localStorage.setItem("carDiscoverDecisions", JSON.stringify(discoverDecisions));
    localStorage.setItem("carDiscoverShortlist", JSON.stringify(discoverShortlist));
    updateDiscoverShortlistButton();
}

function getDiscoverKey(index) {
    return String(index); // Index-based so duplicate name/model entries remain separate.
}

function updateDiscoverShortlistButton() {
    if (discoverShortlistToggle) {
        discoverShortlistToggle.textContent = `♡ Shortlist (${discoverShortlist.length})`;
    }
}

function getUndecidedDiscoverCars() {
    return cars.map((car, index) => ({ car, index }))
        .filter(item => !discoverDecisions[getDiscoverKey(item.index)]);
}

function openDiscover() {
    showingDiscoverShortlist = false;
    discoverReview?.classList.remove("hidden");
    discoverShortlistPanel?.classList.add("hidden");
    mainHeader.classList.add("hidden");
    carGrid.classList.add("hidden");
    carDetail.classList.add("hidden");
    comparePage.classList.add("hidden");
    document.getElementById("car-controls")?.classList.add("hidden");
    discoverPage?.classList.remove("hidden");
    renderDiscoverCard();
}

function renderDiscoverCard() {
    updateDiscoverShortlistButton();
    const remaining = getUndecidedDiscoverCars();

    if (!remaining.length) {
        currentDiscoverIndex = null;
        discoverProgress.textContent = "You've reviewed every car in the deck.";
        discoverCard.innerHTML = `
            <div class="discover-empty">
                <h2>That's the deck!</h2>
                <p>You've reached the end. Open your shortlist to revisit the cars you kept, or undo your last decision.</p>
            </div>`;
        discoverSkipButton.disabled = true;
        discoverKeepButton.disabled = true;
        discoverUndoButton.disabled = discoverUndoStack.length === 0;
        return;
    }

    const item = remaining[0];
    currentDiscoverIndex = item.index;
    const car = item.car;
    const f = car.facts;
    const reviewed = Object.keys(discoverDecisions).length;

    discoverProgress.textContent = `${remaining.length} left to review · ${reviewed} reviewed`;
    discoverSkipButton.disabled = false;
    discoverKeepButton.disabled = false;
    discoverUndoButton.disabled = discoverUndoStack.length === 0;

    discoverCard.innerHTML = `
        <article class="discover-car">
            <img class="discover-car-image" src="${car.photos[0]}" alt="${car.name}">
            <div class="discover-car-info">
                <div class="discover-title-line">
                    <div><h2>${car.name}</h2><p>${car.model}</p></div>
                    <div class="discover-score"><span>Total score</span><strong>${getTotalScore(car)}/100</strong></div>
                </div>
                <div class="discover-facts">
                    <span><strong>€${Number(f.price).toLocaleString()}</strong> price</span>
                    <span><strong>${f.year}</strong> year</span>
                    <span><strong>${f.fuel}</strong> L/100 km</span>
                    <span><strong>${f.boot}</strong> L boot</span>
                    <span><strong>${f.power}</strong> hp</span>
                    <span><strong>${f.sleeping ?? 0}/5</strong> sleep inside</span>
                </div>
                <button class="discover-details-button" type="button">View full details</button>
            </div>
        </article>`;

    discoverCard.querySelector(".discover-details-button").addEventListener("click", () => showCarDetail(item.index));
}

function decideDiscoverCar(decision) {
    if (currentDiscoverIndex === null) return;
    const key = getDiscoverKey(currentDiscoverIndex);
    const previousDecision = discoverDecisions[key] || null;
    const wasShortlisted = discoverShortlist.includes(currentDiscoverIndex);

    discoverUndoStack.push({ index: currentDiscoverIndex, previousDecision, wasShortlisted });
    discoverDecisions[key] = decision;

    if (decision === "keep") {
        if (!discoverShortlist.includes(currentDiscoverIndex)) discoverShortlist.push(currentDiscoverIndex);
    } else {
        discoverShortlist = discoverShortlist.filter(index => index !== currentDiscoverIndex);
    }

    saveDiscoverState();
    renderDiscoverCard();
}

function undoDiscoverDecision() {
    const last = discoverUndoStack.pop();
    if (!last) return;
    const key = getDiscoverKey(last.index);
    if (last.previousDecision) discoverDecisions[key] = last.previousDecision;
    else delete discoverDecisions[key];

    if (last.wasShortlisted) {
        if (!discoverShortlist.includes(last.index)) discoverShortlist.push(last.index);
    } else {
        discoverShortlist = discoverShortlist.filter(index => index !== last.index);
    }

    saveDiscoverState();
    renderDiscoverCard();
}

function showDiscoverShortlist() {
    showingDiscoverShortlist = true;
    discoverReview?.classList.add("hidden");
    discoverShortlistPanel?.classList.remove("hidden");
    discoverShortlistGrid.innerHTML = "";
    discoverShortlist = discoverShortlist.filter(index => Number.isInteger(index) && cars[index]);

    if (!discoverShortlist.length) {
        discoverShortlistGrid.innerHTML = `<div class="discover-empty"><h2>No cars saved yet</h2><p>Go back to Discover and press Keep on cars you want to consider.</p></div>`;
        saveDiscoverState();
        return;
    }

    discoverShortlist.forEach(index => {
        const car = cars[index];
        const card = document.createElement("article");
        card.className = "shortlist-card";
        card.innerHTML = `
            <img src="${car.photos[0]}" alt="${car.name}">
            <div class="shortlist-card-info">
                <h3>${car.name}</h3><p>${car.model}</p>
                <p>€${Number(car.facts.price).toLocaleString()} · ${car.facts.year} · ${getTotalScore(car)}/100</p>
                <div class="shortlist-card-actions">
                    <button type="button" class="shortlist-details">Details</button>
                    <button type="button" class="shortlist-favorite">${favorites.has(getCarId(car)) ? "♥ Favorited" : "♡ Add favorite"}</button>
                    <button type="button" class="shortlist-remove">Remove</button>
                </div>
            </div>`;
        card.querySelector(".shortlist-details").addEventListener("click", () => showCarDetail(index));
        card.querySelector(".shortlist-favorite").addEventListener("click", () => {
            const id = getCarId(car);
            if (favorites.has(id)) favorites.delete(id);
            else favorites.add(id);
            saveFavorites();
            showDiscoverShortlist();
        });
        card.querySelector(".shortlist-remove").addEventListener("click", () => {
            discoverShortlist = discoverShortlist.filter(savedIndex => savedIndex !== index);
            delete discoverDecisions[getDiscoverKey(index)];
            saveDiscoverState();
            showDiscoverShortlist();
        });
        discoverShortlistGrid.appendChild(card);
    });
    updateDiscoverShortlistButton();
}

if (carSearch) carSearch.addEventListener("input", showCarGrid);
if (discoverToggle) discoverToggle.addEventListener("click", openDiscover);
if (discoverBackButton) discoverBackButton.addEventListener("click", showCarGrid);
if (discoverKeepButton) discoverKeepButton.addEventListener("click", () => decideDiscoverCar("keep"));
if (discoverSkipButton) discoverSkipButton.addEventListener("click", () => decideDiscoverCar("skip"));
if (discoverUndoButton) discoverUndoButton.addEventListener("click", undoDiscoverDecision);
if (discoverShortlistToggle) discoverShortlistToggle.addEventListener("click", () => {
    if (showingDiscoverShortlist) {
        showingDiscoverShortlist = false;
        discoverShortlistPanel.classList.add("hidden");
        discoverReview.classList.remove("hidden");
        renderDiscoverCard();
    } else {
        showDiscoverShortlist();
    }
});

/* =========================
   START
   ========================= */

showCarGrid();