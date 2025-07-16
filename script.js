// Handling of the left side bar navigation.
// The pages are home-btn, pokedex-btn, tools-btn, and settings-btn
// Change tabs in nav bar
function showDiv(divId) {
    const divs = document.querySelectorAll('.left-nav-panel');
    divs.forEach(div => {
        div.style.display = div.id === divId ? 'block' : 'none';
    });
    // Save the current tab to localStorage
    localStorage.setItem('lastVisitedTab', divId);

    // Close sidebar after selecting a menu item (useful for mobile)
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.remove('open');
    }
}

// Restore the last visited tab when the page loads that was saved to localstorage above
function restoreLastVisitedTab() {
    const lastTab = localStorage.getItem('lastVisitedTab');
    const validTabs = ['home-page', 'pokedex', 'tools-page', 'settings-page'];

    // If we have a saved tab and it's valid, open saved tab, otherwise default to home-page
    const tabToShow = (lastTab && validTabs.includes(lastTab)) ? lastTab : 'home-page';
    showDiv(tabToShow);
}

document.addEventListener("DOMContentLoaded", function () {
    // Restore the last visited tab
    restoreLastVisitedTab();

    // Add sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('open');
        });
    }

    // Restore the saved theme
    const storedTheme = getStoredTheme();
    setTheme(storedTheme);
});

// Generation Selector dropdown information. This is used to change the generation of pokemon displayed. Currently will only display the pokemon introduced in that generation.
const generationGameData = {
    "all-generations": {
        start: 1,
        count: 1026,
    },
    "generation-i": {
        start: 1,
        count: 151
    },
    "generation-ii": {
        start: 152,
        count: 100
    },
    "generation-iii": {
        start: 252,
        count: 135
    },
    "generation-iv": {
        start: 387,
        count: 107
    },
    "generation-v": {
        start: 494,
        count: 156
    },
    "generation-vi": {
        start: 650,
        count: 72
    },
    "generation-vii": {
        start: 722,
        count: 88
    },
    "generation-viii": {
        start: 810,
        count: 96
    },
    "generation-ix": {
        start: 906,
        count: 120
    }
};

const typeColors = {
    Normal: "#A8A77A",
    Fire: "#EE8130",
    Water: "#6390F0",
    Electric: "#F7D02C",
    Grass: "#7AC74C",
    Ice: "#96D9D6",
    Fighting: "#C22E28",
    Poison: "#A33EA1",
    Ground: "#E2BF65",
    Flying: "#A98FF3",
    Psychic: "#F95587",
    Bug: "#A6B91A",
    Rock: "#B6A136",
    Ghost: "#735797",
    Dragon: "#6F35FC",
    Dark: "#705746",
    Steel: "#B7B7CE",
    Fairy: "#D685AD"
};

// This allows you to click on the type chart button to display the type chart details.
document.getElementById('type-chart-btn').onclick = function (e) {
    e.preventDefault();
    document.getElementById('type-chart-details').style.display = 'flex';
    renderTypeChart();
    document.querySelector('.right-dropdown').classList.remove('open');
};
document.getElementById('type-chart-close').onclick = function () {
    document.getElementById('type-chart-details').style.display = 'none';
};

function renderTypeChart() {
    const table = document.createElement('table');
    table.className = 'type-chart-table';
    // This assigns the top left cell, then fills the remainders.
    let thead = '<tr><th>Defense ↓<br>Attack →</th>';
    for (const [i, atkType] of typeList.entries()) {
        thead += `<th class="type-header-col" data-col="${i}">${atkType}</th>`;
    }
    thead += '</tr>';
    // This assigns the rows and columns of the type chart. Rows are the defense moves types and columns are the attack moves types.
    let tbody = '';
    for (let i = 0; i < typeList.length; i++) {
        const defType = typeList[i];
        tbody += `<tr><th class="type-header-row" data-row="${i}">${defType}</th>`;
        for (let j = 0; j < typeList.length; j++) {
            const atkType = typeList[j];
            const eff = typeEffectiveness[atkType][i];
            let cls = '';
            if (eff === 2) cls = 'super';
            else if (eff === 0.5) cls = 'notvery';
            else if (eff === 0) cls = 'immune';
            tbody += `<td data-row="${i}" data-col="${j}" class="${cls}"></td>`;
        }
        tbody += '</tr>';
    }
    table.innerHTML = thead + tbody;
    const container = document.getElementById('type-chart-table');
    container.innerHTML = '';
    container.appendChild(table);

    // This allows you to click on the column to hilight it.
    table.querySelectorAll('.type-header-col').forEach(th => {
        th.onclick = function () {
            const col = th.getAttribute('data-col');
            const isSelected = th.classList.contains('col-selected');
            table.querySelectorAll('.col-selected').forEach(cell => cell.classList.remove('col-selected'));
            if (!isSelected) {
                th.classList.add('col-selected');
                table.querySelectorAll(`td[data-col="${col}"]`).forEach(cell => cell.classList.add('col-selected'));
            }
        };
    });
    // This allows you to click on the row to hilight it.
    table.querySelectorAll('.type-header-row').forEach(th => {
        th.onclick = function () {
            const row = th.getAttribute('data-row');
            const isSelected = th.classList.contains('row-selected');
            table.querySelectorAll('.row-selected').forEach(cell => cell.classList.remove('row-selected'));
            if (!isSelected) {
                th.classList.add('row-selected');
                table.querySelectorAll(`td[data-row="${row}"]`).forEach(cell => cell.classList.add('row-selected'));
            }
        };
    });
}

//This is setting the color of the base stat bars.
//Might be a good idea to add the ability to set these colors/numbers in the settings page.
function getStatColor(value) {
    // 0-50: red, 51-90: yellow, 91+: green
    if (value <= 50) return "#e74c3c";
    if (value <= 90) return "#f1c40f";
    return "#2ecc40";
}

// Reset all Pokédex data (caught status, evolution needed flag, and origin marks)
function resetAllPokedexData() {
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
        if (key.startsWith('caught-') ||
            key.startsWith('evolution-') ||
            key.startsWith('origin-mark-') ||
            key.startsWith('origin-marks-')) {
            localStorage.removeItem(key);
        }
    });

    renderPokemonImages();
    updateCaughtCounter();

    alert('All Pokédex data has been reset successfully!');
}

// Function to update the caught counter for the current generation
function updateCaughtCounter() {
    const genData = generationGameData[currentGeneration];
    const start = genData.start;
    const count = genData.count;
    let caughtCount = 0;

    // Count how many Pokemon in the current generation are caught
    for (let i = start; i < start + count; i++) {
        if (localStorage.getItem('caught-' + i) === 'true') {
            caughtCount++;
        }
    }

    // Update the counter display
    const counter = document.getElementById('caught-counter');
    if (counter) {
        counter.textContent = `Caught: ${caughtCount}/${count}`;

        // Add some visual styling based on completion percentage
        const percentage = (caughtCount / count) * 100;
        if (percentage === 100) {
            counter.style.color = '#2ecc40'; // Green for 100%
        } else if (percentage >= 50) {
            counter.style.color = '#f1c40f'; // Yellow for 50%+
        } else {
            counter.style.color = '#fff'; // White for less than 50%
        }
    }
}

// Multi-select functionality
function toggleMultiSelectMode() {
    isMultiSelectMode = !isMultiSelectMode;
    selectedPokemon.clear();

    const toggleBtn = document.getElementById('toggle-multi-select');
    const controls = document.querySelectorAll('#mark-selected-caught, #mark-selected-uncaught, #clear-selection, #selection-count');

    if (isMultiSelectMode) {
        toggleBtn.textContent = 'Disable Multi-Select';
        toggleBtn.style.backgroundColor = '#e74c3c';
        controls.forEach(control => control.style.display = 'inline-block');
        updateSelectionCount();
    } else {
        toggleBtn.textContent = 'Enable Multi-Select';
        toggleBtn.style.backgroundColor = '#3498db';
        controls.forEach(control => control.style.display = 'none');
        // Remove selection styling from all Pokemon
        document.querySelectorAll('.pokemon-image.selected').forEach(img => {
            img.classList.remove('selected');
        });
    }
}

function updateSelectionCount() {
    const counter = document.getElementById('selection-count');
    if (counter) {
        counter.textContent = `Selected: ${selectedPokemon.size}`;
    }
}

function markSelectedAsCaught(caught) {
    selectedPokemon.forEach(pokemonId => {
        localStorage.setItem('caught-' + pokemonId, caught ? 'true' : 'false');
        const imgDiv = document.querySelector(`.pokemon-image[data-poke-index="${pokemonId}"]`);
        if (imgDiv) {
            imgDiv.classList.toggle('highlighted', caught);
        }
    });
    updateCaughtCounter();
}

function clearSelection() {
    selectedPokemon.clear();
    document.querySelectorAll('.pokemon-image.selected').forEach(img => {
        img.classList.remove('selected');
    });
    updateSelectionCount();
}

// This is creating the pokemon images in the pokedex. It is creating a div for each pokemon and then adding the image to it.
function renderPokemonImages() {
    const container = document.getElementById('pokemon-images');
    container.innerHTML = '';
    const genData = generationGameData[currentGeneration];
    const start = genData.start;
    const count = genData.count;
    for (let i = start; i < start + count; i++) {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'pokemon-image';
        imgDiv.setAttribute('data-poke-index', i);

        // Highlight if caught
        if (localStorage.getItem('caught-' + i) === 'true') {
            imgDiv.classList.add('highlighted');
        }
        // Add evolution class if evolution needed
        if (localStorage.getItem('evolution-' + i) === 'true') {
            imgDiv.classList.add('evolution');
        }

        const img = new Image();
        const pokeName = pokemonNames[i - 1] || '';
        img.src = `./sprites/pokemon/${i}.png`;
        img.alt = `#${i} ${pokeName}`;
        img.title = `#${i} ${pokeName}`;

        img.onerror = function () {
            imgDiv.innerHTML = '';
            const placeholder = document.createElement('div');
            placeholder.className = 'pokemon-placeholder';
            placeholder.textContent = '?';
            placeholder.title = `#${i} ${pokeName}`;
            imgDiv.appendChild(placeholder);
        };

        imgDiv.appendChild(img);

        // Add origin badges if set in localStorage
        const marksData = localStorage.getItem('origin-marks-' + i);
        if (marksData) {
            const marks = JSON.parse(marksData);
            marks.forEach(mark => {
                const badge = document.createElement('img');
                badge.src = `./origin-marks/${mark}.png`;
                badge.alt = mark.replace(/_/g, ' ');
                badge.className = 'origin-badge';
                imgDiv.appendChild(badge);
            });
        }

        container.appendChild(imgDiv);

        // details click event (modified for multi-select)
        imgDiv.addEventListener('click', function (e) {
            if (isMultiSelectMode) {
                // Multi-select mode: toggle selection
                e.stopPropagation();
                const pokemonId = parseInt(imgDiv.getAttribute('data-poke-index'));

                if (selectedPokemon.has(pokemonId)) {
                    selectedPokemon.delete(pokemonId);
                    imgDiv.classList.remove('selected');
                } else {
                    selectedPokemon.add(pokemonId);
                    imgDiv.classList.add('selected');
                }
                updateSelectionCount();
            } else {
                // Normal mode: open details
                const details = document.getElementById('pokemon-details');
                const detailsCaption = document.getElementById('details-caption');
                const detailsTyping = document.getElementById('details-typing');
                const detailsImg = document.getElementById('details-img');
                showPokemondetails(i);
                details.style.display = 'flex';
                detailsCaption.textContent = img.alt;
                lastdetailsPokemonIndex = i;

                // Show typing
                const types = pokemonTypes[i - 1] || [];
                detailsTyping.innerHTML = "Type: " + types.map(type =>
                    `<span style="background:${typeColors[type]};color:#fff;padding:2px 8px;border-radius:8px;margin:0 2px;display:inline-block;">${type}</span>`
                ).join(" / ");

                // Set details background
                if (types.length === 1) {
                    detailsImg.style.background = typeColors[types[0]];
                } else if (types.length === 2) {
                    detailsImg.style.background = `linear-gradient(135deg, ${typeColors[types[0]]} 0%, ${typeColors[types[1]]} 100%)`;
                } else {
                    detailsImg.style.background = "#fff";
                }
                const detailsStats = document.getElementById('details-stats');
                const stats = pokemonBaseStats[i - 1] || {};
                const statNames = [
                    { key: "hp", label: "HP" },
                    { key: "atk", label: "Atk" },
                    { key: "def", label: "Def" },
                    { key: "spa", label: "SpA" },
                    { key: "spd", label: "SpD" },
                    { key: "spe", label: "Spe" }
                ];

                detailsStats.innerHTML = `
    <div style="color:#fff;font-size:1.1rem;text-align:center;margin-top:8px;">
        <strong>Base Stats:</strong>
        <div style="margin-top:6px;">
            ${statNames.map(stat => {
                    const value = stats[stat.key] ?? '-';
                    const color = getStatColor(value);
                    const width = Math.max(10, Math.round((value / 180) * 100));
                    return `
                    <div style="display:flex;align-items:center;justify-content:flex-start;margin:2px 0;">
                        <span style="width:40px;display:inline-block;text-align:right;">${stat.label}:</span>
                        <span style="width:36px;display:inline-block;text-align:left;">${value}</span>
                        <span style="background:${color};height:12px;width:${width}px;display:inline-block;border-radius:6px;margin-left:6px;"></span>
                    </div>
                `;
                }).join("")}
        </div>
    </div>
`;

                // This is setting the checkboxes as well as restoring their state from localStorage.
                const highlightCheckbox = document.getElementById('details-highlight-checkbox');
                const caughtKey = 'caught-' + i;
                highlightCheckbox.checked = localStorage.getItem(caughtKey) === 'true';
                const detailsEvolutionCheckbox = document.getElementById('details-evolution-checkbox');
                detailsEvolutionCheckbox.checked = localStorage.getItem('evolution-' + i) === 'true';

                // Save the information when the checkbox is changed.
                detailsEvolutionCheckbox.addEventListener('change', function () {
                    if (lastdetailsPokemonIndex !== null) {
                        localStorage.setItem('evolution-' + lastdetailsPokemonIndex, this.checked ? 'true' : 'false');
                    }
                });

                const originCheckboxes = document.querySelectorAll('.details-origin-checkbox');

                function setOriginMarkCheckboxes(pokemonIndex) {
                    // Uncheck all first
                    originCheckboxes.forEach(cb => cb.checked = false);
                    const marksData = localStorage.getItem('origin-marks-' + pokemonIndex);
                    if (marksData) {
                        const marks = JSON.parse(marksData);
                        marks.forEach(mark => {
                            const cb = Array.from(originCheckboxes).find(cb => cb.value === mark);
                            if (cb) cb.checked = true;
                        });
                    }
                }

                //This allows multiple origin checkboxes to be checked at the same time, storing them as an array (max 4)
                originCheckboxes.forEach(cb => {
                    cb.addEventListener('change', function () {
                        if (lastdetailsPokemonIndex !== null) {
                            let marks = [];
                            const marksData = localStorage.getItem('origin-marks-' + lastdetailsPokemonIndex);
                            if (marksData) {
                                marks = JSON.parse(marksData);
                            }

                            if (this.checked) {
                                // Check if we already have 4 marks
                                if (marks.length >= 4) {
                                    this.checked = false; // Uncheck the checkbox
                                    alert('Maximum of 4 origin marks allowed per Pokémon.');
                                    return;
                                }
                                // Add mark if not already present
                                if (!marks.includes(this.value)) {
                                    marks.push(this.value);
                                }
                            } else {
                                // Remove mark
                                marks = marks.filter(mark => mark !== this.value);
                            }

                            if (marks.length > 0) {
                                localStorage.setItem('origin-marks-' + lastdetailsPokemonIndex, JSON.stringify(marks));
                            } else {
                                localStorage.removeItem('origin-marks-' + lastdetailsPokemonIndex);
                            }
                            updateOriginBadge(lastdetailsPokemonIndex);
                        }
                    });
                });

                function updateOriginBadge(pokemonIndex) {
                    const imgDiv = document.querySelector(`.pokemon-image[data-poke-index="${pokemonIndex}"]`);
                    if (!imgDiv) return;
                    // Remove all old badges
                    const oldBadges = imgDiv.querySelectorAll('.origin-badge');
                    oldBadges.forEach(badge => badge.remove());

                    // Add new badges if any exist
                    const marksData = localStorage.getItem('origin-marks-' + pokemonIndex);
                    if (marksData) {
                        const marks = JSON.parse(marksData);
                        marks.forEach(mark => {
                            const badge = document.createElement('img');
                            badge.src = `./origin-marks/${mark}.png`;
                            badge.alt = mark.replace(/_/g, ' ');
                            badge.className = 'origin-badge';
                            imgDiv.appendChild(badge);
                        });
                    }
                }

                setOriginMarkCheckboxes(i);
            }
        });
    }
}

// This is mostly everything related to the details view. 
window.onload = function () {
    // Close details logic
    document.getElementById('details-close').onclick = function () {
        document.getElementById('pokemon-details').style.display = 'none';
    };
    document.getElementById('pokemon-details').onclick = function (e) {
        if (e.target === this) this.style.display = 'none';
    };

    const genSelect = document.getElementById('generation-select');

    // Restore last selected generation if available and valid
    const savedGen = localStorage.getItem('selectedGeneration');
    if (savedGen && generationGameData[savedGen]) {
        genSelect.value = savedGen;
        currentGeneration = savedGen;
    } else {
        currentGeneration = genSelect.value;
    }

    genSelect.addEventListener('change', function () {
        currentGeneration = this.value;
        localStorage.setItem('selectedGeneration', currentGeneration);
        renderPokemonImages();
        updateCaughtCounter();
    });

    renderPokemonImages();
    updateCaughtCounter();

    // Checkbox event listeners (add these after renderPokemonImages is called)
    document.getElementById('details-highlight-checkbox').addEventListener('change', function () {
        if (lastdetailsPokemonIndex !== null) {
            localStorage.setItem('caught-' + lastdetailsPokemonIndex, this.checked ? 'true' : 'false');
            // Update the class live
            const imgDiv = document.querySelector(`.pokemon-image[data-poke-index="${lastdetailsPokemonIndex}"]`);
            if (imgDiv) {
                imgDiv.classList.toggle('highlighted', this.checked);
            }
            // Update the caught counter
            updateCaughtCounter();
        }
    });

    document.getElementById('details-evolution-checkbox').addEventListener('change', function () {
        if (lastdetailsPokemonIndex !== null) {
            localStorage.setItem('evolution-' + lastdetailsPokemonIndex, this.checked ? 'true' : 'false');
            // Update the class live
            const imgDiv = document.querySelector(`.pokemon-image[data-poke-index="${lastdetailsPokemonIndex}"]`);
            if (imgDiv) {
                imgDiv.classList.toggle('evolution', this.checked);
            }
        }
    });

    // Reset Pokédex Data button functionality
    document.getElementById('reset-pokedex-btn').addEventListener('click', function () {
        if (confirm('Are you sure you want to reset all Pokédex data? This will clear all caught status and origin marks for all Pokémon. This action CANNOT be undone.')) {
            resetAllPokedexData();
        }
    });

    // Multi-select functionality
    document.getElementById('multi-select-controls').style.display = 'block';

    document.getElementById('toggle-multi-select').addEventListener('click', toggleMultiSelectMode);

    document.getElementById('mark-selected-caught').addEventListener('click', function () {
        if (selectedPokemon.size > 0) {
            markSelectedAsCaught(true);
            clearSelection();
        } else {
            alert('No Pokémon selected!');
        }
    });

    document.getElementById('mark-selected-uncaught').addEventListener('click', function () {
        if (selectedPokemon.size > 0) {
            markSelectedAsCaught(false);
            clearSelection();
        } else {
            alert('No Pokémon selected!');
        }
    });

    document.getElementById('clear-selection').addEventListener('click', clearSelection);
};

function getAllImageFilenamesForPokemon(baseNum) {
    // Example: Try up to 5 forms, adjust as needed
    const images = [];
    for (let i = 0; i < 5; i++) {
        let filename = i === 0 ? `${baseNum}.png` : `${baseNum}-${i}.png`;
        // You may want to check if the file exists, or just try to load it and handle errors
        images.push(filename);
    }
    // Optionally, filter out images that don't exist (requires async check or pre-generated list)
    return images;
}

// 
let detailsImages = [];
let detailsImageIndex = 0;
let isMultiSelectMode = false;
let selectedPokemon = new Set();

// Used when opening the details
function showPokemondetails(pokemonNumber) {
    const baseNum = pokemonNumber.toString();
    detailsImages = getAllImageFilenamesForPokemon(baseNum);
    detailsImageIndex = 0;
    updatedetailsImage();
}

// Update the image in the details
function updatedetailsImage() {
    const img = document.getElementById('details-img');
    img.src = `./sprites/pokemon/${detailsImages[detailsImageIndex]}`;
}

document.querySelector('.dropdown-toggle').onclick = function (e) {
    e.stopPropagation();
    document.querySelector('.right-dropdown').classList.toggle('open');
};

// Close the dropdown menu when claicking somewhere else on the page.
document.body.addEventListener('click', function () {
    document.querySelector('.right-dropdown').classList.remove('open');
});
document.querySelector('.dropdown-content').onclick = function (e) {
    e.stopPropagation();
};

// Theme Management
const body = document.body;
const lightModeToggle = document.getElementById("light-mode");
const darkModeToggle = document.getElementById("dark-mode");
const pokeballModeToggle = document.getElementById("pokeball-mode");
const greatballModeToggle = document.getElementById("greatball-mode");
const ultraballModeToggle = document.getElementById("ultraball-mode");
const masterballModeToggle = document.getElementById("masterball-mode");

function findThemeName(theme) {
    const themeNames = {
        light: {
            textname: "Light",
        },
        dark: {
            textname: "Dark",
        },
        dark2: {
            textname: "Dark 2",
        },
        pokeball: {
            textname: "Poké Ball",
        },
        greatball: {
            textname: "Great Ball",
        },
        ultraball: {
            textname: "Ultra Ball",
        },
        masterball: {
            textname: "Master Ball",
        },
        catch: {
            textname: "Catch 'em All",
        },
    };

    return themeNames[theme]?.textname || "Unknown Theme";
}

function setTheme(theme) {
    let darkmodeSwitch = (body.dataset.theme === "dark" || body.dataset.theme === "dark2") && theme === "dark";
    const themeNameText = document.getElementById('cur-theme-name');
    const customThemeConfig = JSON.parse(localStorage.getItem('customThemeConfig') || '{}');

    if (darkmodeSwitch) {
        if (body.dataset.theme === "dark") {
            body.dataset.theme = "dark2";
            localStorage.setItem("theme", "dark2");
            updateActiveThemeButton("dark2");

            themeNameText.innerText = findThemeName("dark2");
        } else {
            body.dataset.theme = "dark";
            localStorage.setItem("theme", "dark");
            updateActiveThemeButton("dark");

            themeNameText.innerText = findThemeName("dark");
        }

        return;
    }

    body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    updateActiveThemeButton(theme);

    themeNameText.innerText = findThemeName(theme);

    if (theme === "custom" && localStorage.getItem('custThemeTitle')) {
        themeNameText.innerText = localStorage.getItem('custThemeTitle');
    }

    if (theme === "classic" || (localStorage.getItem('custThemeBackgroundsEnabled') === "true" && theme === "custom")) {
        let screenBackgrounds = document.querySelectorAll('.screen');
        screenBackgrounds.forEach(element => {
            element.style.backgroundImage = `url("images/${imageSelected}.jpg")`;
        });
    } else if (theme === "custom") {
        const selectedBackground = customThemeConfig.selectedBackgroundImage;

        let screenBackgrounds = document.querySelectorAll('.screen');
        screenBackgrounds.forEach(element => {
            if (selectedBackground && selectedBackground !== 'none') {
                element.style.backgroundImage = `url("images/${selectedBackground}.jpg")`;
            } else {
                element.style.backgroundImage = ``;
            }
        });
    } else {
        let screenBackgrounds = document.querySelectorAll('.screen');
        screenBackgrounds.forEach(element => {
            element.style.backgroundImage = ``;
        });
    }
}

function updateActiveThemeButton(theme) {
    const themeToggles = document.querySelectorAll('[id$="-mode"]');

    // if (theme === "custom") {
    //     document.getElementById('create-a-theme').classList.add("active-theme");
    // } else {
    //     document.getElementById('create-a-theme').classList.remove("active-theme");
    // }

    themeToggles.forEach((toggle) => {
        if (toggle.id === `${theme}-mode` || (theme === "dark2" && toggle.id === "dark-mode")) {
            toggle.classList.add("active-theme");
        } else {
            toggle.classList.remove("active-theme");
        }
    });
}

if (lightModeToggle) {
    lightModeToggle.addEventListener("click", () => setTheme("light"));
}

if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => setTheme("dark"));
}

if (pokeballModeToggle) {
    pokeballModeToggle.addEventListener("click", () => setTheme("pokeball"));
}

if (greatballModeToggle) {
    greatballModeToggle.addEventListener("click", () => setTheme("greatball"));
}

if (ultraballModeToggle) {
    ultraballModeToggle.addEventListener("click", () => setTheme("ultraball"));
}

if (masterballModeToggle) {
    masterballModeToggle.addEventListener("click", () => setTheme("masterball"));
}

function getStoredTheme() {
    return localStorage.getItem("theme") || "light";
}

// document.addEventListener("DOMContentLoaded", () => {
//     const hoverScreenCloseButton = document.querySelector(".hover-screen-close-button");
//     const hoverScreen = document.querySelector(".hover-screen-content");
//     const popupScreen = document.getElementById("popup-screen");

//     // Add the close button event listener here where variables are properly defined
//     if (hoverScreenCloseButton && popupScreen) {
//         hoverScreenCloseButton.addEventListener('click', function () {
//             popupScreen.style.display = "none";
//         });
//     }

//     const storedTheme = getStoredTheme();
//     setTheme(storedTheme);

//     const savedThemeConfig = localStorage.getItem('customThemeConfig');

//     if (savedThemeConfig) {
//         const themeConfig = JSON.parse(savedThemeConfig);

//         // Create or select the custom style element
//         let customStyleElement = document.getElementById('custom-theme-styles');
//         if (!customStyleElement) {
//             customStyleElement = document.createElement('style');
//             customStyleElement.id = 'custom-theme-styles';
//             document.head.appendChild(customStyleElement);
//         }

//         if (themeConfig.isDarkMode === true) {
//             customStyleElement.textContent = `
// 				[data-theme="custom"] {
// 					--font: ${themeConfig.fontColor};
// 					--subfont: ${themeConfig.subFontColor};
// 					--subfontlight: ${themeConfig.lightFontColor};
// 					--bordercolor: ${themeConfig.borderColor};
//                     --caughtcolor: ${themeConfig.caughtColor};
//                     --evolutioncolor: ${themeConfig.evolutionColor};
//                     --twoxeffective: ${themeConfig.twoxeffectiveColor};
//                     --onexeffective: ${themeConfig.onexeffectiveColor};
//                     --pointfivexeffective: ${themeConfig.pointfivexeffectiveColor};
// 					--bodycolor: ${themeConfig.bodyColor};
// 					--maincolor: ${themeConfig.mainColor};
// 					--altbg: ${themeConfig.altBodyColor};
// 					--subbg: ${themeConfig.subBodyColor};
// 					--buttoncolor: ${themeConfig.buttonColor};
// 					--buttonhover: ${themeConfig.buttonHoverColor};
// 				}
// 			`;
//         } else {
//             customStyleElement.textContent = `
// 				[data-theme="custom"] {
// 					--font: ${themeConfig.fontColor};
// 					--subfont: ${themeConfig.subFontColor};
// 					--subfontlight: ${themeConfig.lightFontColor};
// 					--bordercolor: ${themeConfig.borderColor};
//                     --caughtcolor: ${themeConfig.caughtColor};
//                     --evolutioncolor: ${themeConfig.evolutionColor};
//                     --twoxeffective: ${themeConfig.twoxeffectiveColor};
//                     --onexeffective: ${themeConfig.onexeffectiveColor};
//                     --pointfivexeffective: ${themeConfig.pointfivexeffectiveColor};
//                     --zeroeffective: ${themeConfig.zeroeffectiveColor};
// 					--bodycolor: ${themeConfig.bodyColor};
// 					--maincolor: ${themeConfig.mainColor};
// 					--altbg: ${themeConfig.altBodyColor};
// 					--subbg: ${themeConfig.subBodyColor};
// 					--buttoncolor: ${themeConfig.buttonColor};
// 					--buttonhover: ${themeConfig.buttonHoverColor};
// 				}
// 			`;
//         }
//     }

// });

let typedWord = '';
const themeBar = document.getElementById('themes-bar');

const pkmThemeDiv = document.createElement('div');
pkmThemeDiv.id = 'catch-mode';

// Function to check if catch theme is unlocked
function isPkmUnlocked() {
    return localStorage.getItem('catchThemeUnlocked') === 'true';
}

// Function to unlock catch theme
function unlockPkmTheme() {
    localStorage.setItem('catchThemeUnlocked', 'true');
    addPkmThemeToBar();
}

// Function to add catch theme to the theme bar
function addPkmThemeToBar() {
    if (!document.getElementById('catch-mode')) {
        themeBar.appendChild(pkmThemeDiv);
        pkmThemeDiv.addEventListener("click", () => setTheme("catch"));
    }
}

// Check if catch theme is unlocked on page load
if (isPkmUnlocked()) {
    addPkmThemeToBar();
}

document.addEventListener('keydown', (event) => {
    if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        typedWord += event.key.toLowerCase();

        if (typedWord.includes('pokemon') && !isPkmUnlocked()) {
            unlockPkmTheme();
            setTheme("catch");
            typedWord = '';
        }

        if (typedWord.length >= 12) {
            typedWord = '';
        }
    }
});

