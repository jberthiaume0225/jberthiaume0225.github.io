let savedThemes = JSON.parse(localStorage.getItem('saved-themes')) || [];
const createAThemeButton = document.getElementById("create-a-theme");
let customStyleElement;

// Define all theme properties in a single configuration object
const themeProperties = {
    // Colors section
    colors: {
        sectionTitle: "Background Colors",
        properties: [
            {
                id: "bodyColor",
                name: "body",
                label: "Body Color",
                cssVar: "--bodycolor",
                defaultValue: "#f1f1f1"
            },
            {
                id: "altBodyColor",
                name: "alt-body",
                label: "Alt Body Color",
                cssVar: "--altbg",
                defaultValue: "#f5f5f5"
            },
            {
                id: "mainColor",
                name: "main",
                label: "Sub Body Color",
                cssVar: "--maincolor",
                defaultValue: "#fcfcfc"
            },
            {
                id: "subBodyColor",
                name: "sub-body",
                label: "Sub Alt Body Color",
                cssVar: "--subbg",
                defaultValue: "#f0f0f0"
            },
            {
                id: "buttonColor",
                name: "button",
                label: "Button Color",
                cssVar: "--buttoncolor",
                defaultValue: "#fcfcfc"
            },
            {
                id: "buttonHoverColor",
                name: "button-hover",
                label: "Button Hover Color",
                cssVar: "--buttonhover",
                defaultValue: "#c5eeff"
            },
            {
                id: "borderColor",
                name: "border",
                label: "Border Color",
                cssVar: "--bordercolor",
                defaultValue: "#c5c5c5"
            }
        ]
    },

    // Fonts section
    fonts: {
        sectionTitle: "Font Colors",
        properties: [
            {
                id: "fontColor",
                name: "font",
                label: "Main Font Color",
                cssVar: "--font",
                defaultValue: "#363636"
            },
            {
                id: "subFontColor",
                name: "sub-font",
                label: "Alternate Font Color",
                cssVar: "--subfont",
                defaultValue: "#00629b"
            },
            {
                id: "lightFontColor",
                name: "light-font",
                label: "Light Font Color",
                cssVar: "--subfontlight",
                defaultValue: "#60bef5"
            },
        ]
    }
};

// Options that aren't directly tied to CSS variables
const themeOptions = [
    {
        id: "isDarkMode",
        name: "define-dark-mode-theme",
        label: "Dark Mode Theme"
    },
    {
        id: "usesBackgroundImages",
        name: "theme-uses-background-images",
        label: "Use Randomized Background Images"
    },
    {
        id: "selectedBackgroundImage",
        name: "selected-background-image",
        label: "Selected Background Image",
        type: "background-selector"
    },
];

// Pre-defined starter themes
const starterThemes = [
    {
        title: "Dark Theme",
        bodyColor: "#1a1a1a",
        altBodyColor: "#2d2d2d",
        mainColor: "#242424",
        subBodyColor: "#1e1e1e",
        buttonColor: "#2d2d2d",
        buttonHoverColor: "#404040",
        borderColor: "#555555",
        fontColor: "#e0e0e0",
        subFontColor: "#4a9eff",
        lightFontColor: "#7bb3ff",
        isDarkMode: true,
        usesBackgroundImages: false,
        selectedBackgroundImage: "none"
    },
    {
        title: "Rivers Theme",
        bodyColor: "#e6f3ff",
        altBodyColor: "#cce7ff",
        mainColor: "#f0f8ff",
        subBodyColor: "#d9edff",
        buttonColor: "#e6f3ff",
        buttonHoverColor: "#b3d9ff",
        borderColor: "#80bfff",
        fontColor: "#2c5282",
        subFontColor: "#1a365d",
        lightFontColor: "#4299e1",
        isDarkMode: false,
        usesBackgroundImages: false,
        selectedBackgroundImage: 11
    },
    {
        title: "Sunset Theme",
        bodyColor: "#fff5e6",
        altBodyColor: "#ffe6cc",
        mainColor: "#fff8f0",
        subBodyColor: "#ffebdb",
        buttonColor: "#fff5e6",
        buttonHoverColor: "#ffd9b3",
        borderColor: "#ffb366",
        fontColor: "#8b4513",
        subFontColor: "#d2691e",
        lightFontColor: "#ff8c42",
        isDarkMode: false,
        usesBackgroundImages: false,
        selectedBackgroundImage: "none"
    }
];

function mergeWithDefaults(themeConfig) {
    const defaultConfig = createDefaultThemeConfig();
    const mergedConfig = { ...defaultConfig, ...themeConfig };
    return mergedConfig;
}

function generateBackgroundSelectorHTML(themeConfig) {
    const selectedImage = themeConfig.selectedBackgroundImage || 'none';

    let html = `
        <h2 style="margin-bottom: 5px; margin-top: 20px; font-weight: bold;">Background Image</h2>
        <div style="display: flex; flex-direction: column; background: var(--altbg); padding: 10px; border-radius: 0.25em;">
            <p style="color: var(--font); margin-bottom: 10px; font-size: 12px;">Select a background image for your theme:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 5px; max-height: 200px; overflow-y: auto;">
                <div class="background-option ${selectedImage === 'none' ? 'selected' : ''}" 
                     data-image="none" 
                     style="width: 50px; height: 35px; border: 2px solid ${selectedImage === 'none' ? 'var(--subfont)' : 'var(--bordercolor)'}; 
                            border-radius: 0.25em; display: flex; align-items: center; justify-content: center; 
                            background: var(--maincolor); cursor: pointer; font-size: 8px; color: var(--font);">
                    None
                </div>
    `;

    // Generate preview images for backgrounds 1-20
    for (let i = 1; i <= 20; i++) {
        const isSelected = selectedImage === i.toString();
        html += `
            <div class="background-option ${isSelected ? 'selected' : ''}" 
                 data-image="${i}" 
                 style="width: 50px; height: 35px; border: 2px solid ${isSelected ? 'var(--subfont)' : 'var(--bordercolor)'}; 
                        border-radius: 0.25em; background-image: url('images/thumbnails/${i}.jpg'); 
                        background-size: cover; background-position: center; cursor: pointer;" loading="lazy">
            </div>
        `;
    }

    html += `
            </div>
        </div>
    `;

    return html;
}

// Generate CSS for the theme
function generateThemeCSS(themeConfig) {
    let cssContent = `[data-theme="custom"] {\n`;

    // Add all CSS variables
    Object.values(themeProperties).forEach(section => {
        section.properties.forEach(prop => {
            // Use the value from themeConfig or fall back to default value
            const value = themeConfig[prop.id] !== undefined ?
                themeConfig[prop.id] :
                prop.defaultValue;

            cssContent += `    ${prop.cssVar}: ${value};\n`;
        });
    });

    cssContent += `}`;
    return cssContent;
}

// Build and return a theme configuration object from inputs
function buildThemeConfig() {
    const config = {};

    // Get all color and font properties
    Object.values(themeProperties).forEach(section => {
        section.properties.forEach(prop => {
            const input = document.getElementById(prop.name);
            if (input) {
                config[prop.id] = input.value;
            } else {
                // If input doesn't exist, use default value
                config[prop.id] = prop.defaultValue;
            }
        });
    });

    // Get options
    themeOptions.forEach(option => {
        if (option.type === 'background-selector') {
            const selectedOption = document.querySelector('.background-option.selected');
            config[option.id] = selectedOption ? selectedOption.dataset.image : 'none';
        } else {
            const input = document.getElementById(option.name);
            if (input) {
                config[option.id] = input.checked;
            } else {
                // If input doesn't exist, use default (false)
                config[option.id] = false;
            }
        }
    });

    return config;
}

// Update the custom theme CSS based on the inputs
function updateCustomThemeVariables() {
    const themeConfig = buildThemeConfig();
    customStyleElement.textContent = generateThemeCSS(themeConfig);
    localStorage.setItem('customThemeConfig', JSON.stringify(themeConfig));
}

// Generate HTML for property input
function generatePropertyInputHTML(property, themeConfig) {
    const value = themeConfig[property.id] !== undefined ?
        themeConfig[property.id] :
        property.defaultValue;

    return `
        <label style="color: var(--font); margin-right: 5px;" for="${property.name}">${property.label}</label>
        <input style="margin-right: 20px;" type="color" id="${property.name}" name="${property.name}" value="${value}" />
    `;
}

// Generate HTML for a section of properties
function generateSectionHTML(section, themeConfig) {
    let html = `
        <h2 style="margin-bottom: 5px; font-weight: bold;">${section.sectionTitle}</h2>
    `;

    // Group properties by 2 per row
    for (let i = 0; i < section.properties.length; i += 2) {
        html += `
            <div style="display: flex; flex-direction: row; justify-content: start; align-items: center; background: var(--altbg); padding: 5px 10px; border-radius: 0.25em;">
                ${generatePropertyInputHTML(section.properties[i], themeConfig)}
                ${i + 1 < section.properties.length ?
                generatePropertyInputHTML(section.properties[i + 1], themeConfig) : ''}
            </div>
        `;
    }

    return html;
}

// Generate HTML for theme options
function generateOptionsHTML(options, themeConfig) {
    return options.map(option => {
        if (option.type === 'background-selector') {
            return generateBackgroundSelectorHTML(themeConfig);
        }

        const checked = themeConfig[option.id] !== undefined ?
            themeConfig[option.id] :
            false;

        return `
            <div style="flex; justify-content: center; align-items: center; margin-top: 5px;">
                <input type="checkbox" name="${option.name}" id="${option.name}"
                style="margin-right: 5px;" ${checked ? 'checked' : ''}>
                <label style="color: var(--font);" for="${option.name}">${option.label}</label>
            </div>
        `;
    }).join('');
}

// Set imported theme from string
function setImportedTheme(importString) {
    try {
        const themeArray = JSON.parse(importString);

        if (!themeArray || !Array.isArray(themeArray) || themeArray.length < 2) {
            console.error("Invalid theme import string");
            return;
        }

        let themeConfig = themeArray[0];
        const themeTitle = themeArray[1];
        const backgroundImages = themeArray[2];

        // Ensure all properties have values by merging with default config
        themeConfig = mergeWithDefaults(themeConfig);

        if (backgroundImages) {
            localStorage.setItem('custThemeBackgroundsEnabled', backgroundImages);
        }

        if (themeTitle) {
            localStorage.setItem('custThemeTitle', themeTitle);
            const themeNameText = document.getElementById('cur-theme-name');
            if (themeNameText) {
                themeNameText.innerText = themeTitle;
            }
        }

        // Apply the theme
        customStyleElement.textContent = generateThemeCSS(themeConfig);
        localStorage.setItem('customThemeConfig', JSON.stringify(themeConfig));
        setTheme("custom");
    } catch (e) {
        console.error("Error importing theme:", e);
    }
}

// Set a saved theme
function setSavedTheme(themeString) {
    try {
        let themeConfig = JSON.parse(themeString);

        // Ensure all properties have values by merging with default config
        themeConfig = mergeWithDefaults(themeConfig);

        if (themeConfig.usesBackgroundImages) {
            localStorage.setItem('custThemeBackgroundsEnabled', "true");
        }

        if (themeConfig.title) {
            localStorage.setItem('custThemeTitle', themeConfig.title);
            const themeNameText = document.getElementById('cur-theme-name');
            if (themeNameText) {
                themeNameText.innerText = themeConfig.title;
            }
        }

        // Apply the theme
        customStyleElement.textContent = generateThemeCSS(themeConfig);
        localStorage.setItem('customThemeConfig', JSON.stringify(themeConfig));
        setTheme("custom");
    } catch (e) {
        console.error("Error setting saved theme:", e);
    }
}

// Create a default theme config
function createDefaultThemeConfig() {
    const config = {};

    // Set default values
    Object.values(themeProperties).forEach(section => {
        section.properties.forEach(prop => {
            config[prop.id] = prop.defaultValue;
        });
    });

    // Set default options
    themeOptions.forEach(option => {
        if (option.type === 'background-selector') {
            config[option.id] = 'none';
        } else {
            config[option.id] = false;
        }
    });

    return config;
}

// Initialize the theme editor
function initThemeEditor(themeConfig) {
    const popupScreen = document.getElementById("popup-screen");
    const hoverScreen = document.querySelector(".hover-screen-content");

    // Generate HTML for the theme editor
    let themeEditorHTML = `
        <h1>
            Agent Dashboard Theme Creation
            <span class="hint--large hint--bottom hint--no-shadow hint--rounded"
                aria-label="This feature is advanced and experimental, and you may encounter some bugs while using it. Report any issues you may encounter to your supervisor for immediate attention."
                style="color: var(--subfont); margin-top: 5px;"><span
                class="material-symbols-outlined filled">info</span>
            </span>
        </h1>
        
        <p style="margin-top: 5px; text-align: center;">Create your own theme for your dashboard. Your theme will update instantly upon changing a color.</p>
        <p style="margin-top: 5px; text-align: center; margin-bottom: 30px;">If you are not creating multiple themes, you don't need to explicity save your theme, it will do so automatically.</p>
        <div style="display: flex; gap: 5px;">
            <input type="text" name="theme-title" id="theme-title" class="search-bar altbg" style="width: 250px; height: 45px; margin-bottom: 20px;" placeholder="Set a theme title..." maxlength="24" value="${localStorage.getItem('custThemeTitle') || ''}">
            <div class="main-button but-hover hint--top hint--medium hint--no-shadow" aria-label="Save this theme so you can load it later. Themes are saved and stored based on the set theme name." id="save-theme" style="height: 45px;">
                Save Current Theme
            </div>
            <div class="main-button but-hover" id="load-saved-theme" style="height: 45px;">
                Load Saved Theme
            </div>
            <div class="main-button but-hover" id="load-starter-theme" style="height: 45px;">
                Starter Themes
            </div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-around; width: 100%;">
            <div style="display: flex; flex-direction: column; justify-content: start; gap: 5px;">
    `;

    // Add each property section
    Object.values(themeProperties).forEach(section => {
        themeEditorHTML += generateSectionHTML(section, themeConfig);
    });

    // Add options section
    themeEditorHTML += `
                <h2 style="margin-bottom: 5px; margin-top: 20px; font-weight: bold;">Theme Options</h2>
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background: var(--altbg); padding: 5px 10px; border-radius: 0.25em;">
                    ${generateOptionsHTML(themeOptions, themeConfig)}
                </div>
    `;

    // Add buttons and preview
    themeEditorHTML += `
                <div class="main-button but-hover hint--top hint--medium hint--no-shadow" aria-label="This will reset your theme back to default after a confirmation." id="reset-theme" style="height: 45px; margin-top: 10px;">
                    <span class="material-symbols-outlined margin-right-icon" style="font-size: 35px;">
                        reset_settings
                    </span>
                    Reset Theme to Default
                </div>
                <div style="display: flex; flex-direction: column; gap: 5px; justify-content: center; align-items: center; width: 100%;">
                    <div style="display: flex; flex-direction: row; width: 100%; gap: 5px;">
                        <div class="main-button but-hover hint--top hint--medium hint--no-shadow" aria-label="Import a saved theme string to set your current theme to it." id="import-theme" style="height: 45px; margin-top: 10px; width: 100% !important;">
                            Import Theme
                        </div>
                        <div class="main-button but-hover hint--top hint--medium hint--no-shadow" aria-label="Export a theme string you can then share with others or save." id="export-theme" style="height: 45px; margin-top: 10px; width: 100% !important;">
                            Export Theme
                        </div>
                    </div>
                    <div id="theme-string-window" style="visibility: hidden; user-select: none;" class="hint--top hint--no-shadow" aria-label="Click here to copy this theme string.">
                        <div id="export-string" name="theme-title" id="theme-title" class="search-bar altbg" style="text-wrap: nowrap; overflow: hidden; width: 350px; height: 30px; margin-top: 5px; cursor: pointer; user-select: none;"></div>
                    </div>
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px; margin: 5px; text-align: center; margin-left: 25px;">
                <div class="nav-logo" style="font-size: 16px;"></div>
                <p style="color: var(--font);">This is a sentence using <b>main font color</b>.</p>
                <p style="color: var(--subfont);">This is a sentence using <b>alternate font color</b>.</p>
                <p style="color: var(--subfontlight);">This is a sentence using <b>light font color</b>.</p>
                <div class="tool-button">Button</div>
                <div style="border: 1px solid var(--bordercolor); border-radius: 0.25em; height: 100px; width: 250px;">
                    <div class="notes-header">
                        <div style="display: flex; flex-direction: row;"><span id="notes-icon" class="material-symbols-sharp margin-right-icon" style="font-size: 20px; opacity: 0.66; color: var(--subfont);">description</span>
                            <h4 id="notes-title">Notepad</h4>
                        </div>
                        <button id="minimize-btn"><span class="material-symbols-sharp" style="font-size: 28px;">close</span></button>
                    </div>
                    <div class="notes-textarea" style="height: 100px;">These are how notes look.</div>
                </div>
            </div>
        </div>
    `;

    // Set the HTML content
    hoverScreen.innerHTML = themeEditorHTML;
    popupScreen.style.display = "";

    // Setup event listeners
    setupEventListeners();

    // Initialize input elements after they are added to the DOM
    initializeInputElements();

    // Create or select the custom style element
    customStyleElement = document.getElementById('custom-theme-styles');
    if (!customStyleElement) {
        customStyleElement = document.createElement('style');
        customStyleElement.id = 'custom-theme-styles';
        document.head.appendChild(customStyleElement);
    }

    // Apply the current theme
    updateCustomThemeVariables();
}

// Setup event listeners for all theme editor controls
function setupEventListeners() {
    const themeTitleBox = document.getElementById('theme-title');
    const resetThemeButton = document.getElementById('reset-theme');
    const exportThemeButton = document.getElementById('export-theme');
    const importThemeButton = document.getElementById('import-theme');
    const themeStringWindow = document.getElementById('theme-string-window');
    const exportStringField = document.getElementById('export-string');
    const loadSavedThemeButton = document.getElementById('load-saved-theme');
    const saveThemeButton = document.getElementById('save-theme');
    const hoverScreenCloseButton = document.querySelector(".hover-screen-close-button");
    const hoverScreenSmallCloseButton = document.querySelector('.hover-screen-small-close-button');
    const themeUsesBackgroundImages = document.getElementById('theme-uses-background-images');
    const themeUsesColorfulLOBButtons = document.getElementById('colorful-lob-buttons');
    const loadStarterThemeButton = document.getElementById('load-starter-theme');

    // Save Theme
    if (saveThemeButton) {
        saveThemeButton.addEventListener('click', function () {
            const themeConfig = buildThemeConfig();
            const themeTitle = themeTitleBox.value;
            let foundTheme = savedThemes && savedThemes.find(theme => theme.title === themeTitle);
            const foundThemeIndex = savedThemes.findIndex(theme => theme.title === themeTitle);

            if (savedThemes && savedThemes.length > 0 && foundTheme) {
                if (confirm("Proceeding will overwrite the current theme with the same name. Are you sure you want to do this?")) {
                    themeConfig.title = themeTitle;
                    savedThemes.splice(foundThemeIndex, 1);
                    savedThemes.push(themeConfig);
                    localStorage.setItem('saved-themes', JSON.stringify(savedThemes));
                    saveThemeButton.innerText = 'Theme Updated!';
                    setTimeout(() => {
                        saveThemeButton.innerText = 'Save Theme';
                    }, 1000);
                }
                return;
            }

            if (themeTitle !== 'Custom Theme' && themeTitle !== '' && themeTitle.length >= 3 && themeTitle.length <= 24) {
                themeConfig.title = themeTitle;
                savedThemes.push(themeConfig);
                localStorage.setItem('saved-themes', JSON.stringify(savedThemes));
                saveThemeButton.innerText = 'Theme Saved!';
                setTimeout(() => {
                    saveThemeButton.innerText = 'Save Theme';
                }, 1000);
                return;
            }

            saveThemeButton.innerText = 'Error saving theme!';
            saveThemeButton.ariaLabel = 'Your theme must include a unique title consisting of at least 3 characters.';
            setTimeout(() => {
                saveThemeButton.innerText = 'Save Theme';
                saveThemeButton.ariaLabel = 'Save this theme so you can load it later. Themes are saved and stored based on the set theme name.';
            }, 2000);
        });
    }

    // Load Saved Theme
    if (loadSavedThemeButton) {
        loadSavedThemeButton.addEventListener('click', function () {
            const popupScreen = document.getElementById("popup-screen-small");
            const hoverScreen = document.querySelector(".hover-screen-small-content");

            hoverScreen.innerHTML = `
                <h1>Load a Theme</h1>
                <p>Select a saved theme in order to load it and manage it.</p>
                <h2 style="margin-top: 10px;">My Saved Themes</h2>
                <p style="color: var(--hint); font-size: 10px; margin-bottom: 10px;">Ctrl + Click a theme to delete it from your storage.</p>
                <div id="saved-themes" style="display: flex; flex-direction: row; gap: 5px; flex-wrap: wrap; justify-content: center;"></div>
            `;

            function loadSavedThemes() {
                document.getElementById('saved-themes').innerHTML = '';
                savedThemes.forEach((theme) => {
                    const loadThemeButton = document.createElement('div');
                    loadThemeButton.classList.add('tool-button');
                    loadThemeButton.innerText = theme.title;

                    loadThemeButton.addEventListener('click', function (e) {
                        if (e.ctrlKey) {
                            const foundThemeIndex = savedThemes.findIndex(theme => theme.title === loadThemeButton.innerText);
                            savedThemes.splice(foundThemeIndex, 1);
                            localStorage.setItem('saved-themes', JSON.stringify(savedThemes));
                            loadSavedThemes();
                        } else {
                            setSavedTheme(JSON.stringify(theme));
                            hoverScreenSmallCloseButton.click();
                            hoverScreenCloseButton.click();
                        }
                    });

                    document.getElementById('saved-themes').appendChild(loadThemeButton);
                });
            }

            loadSavedThemes();
            popupScreen.style.display = "";
        });
    }

    if (loadStarterThemeButton) {
        loadStarterThemeButton.addEventListener('click', function () {
            const popupScreen = document.getElementById("popup-screen-small");
            const hoverScreen = document.querySelector(".hover-screen-small-content");

            hoverScreen.innerHTML = `
            <h1>Starter Themes</h1>
                <p>Choose a pre-made theme as your starting point for customization.</p>
                <div id="starter-themes" style="display: flex; flex-direction: row; gap: 5px; flex-wrap: wrap; justify-content: center; margin-top: 15px;"></div>
            `;

            const starterThemesContainer = document.getElementById('starter-themes');
            starterThemes.forEach((theme) => {
                const loadThemeButton = document.createElement('div');
                loadThemeButton.classList.add('tool-button');
                loadThemeButton.style.backgroundColor = theme.buttonColor;
                loadThemeButton.style.color = theme.fontColor;
                loadThemeButton.style.border = `1px solid ${theme.borderColor}`;
                loadThemeButton.innerText = theme.title;

                loadThemeButton.addEventListener('click', function () {
                    setSavedTheme(JSON.stringify(theme));
                    hoverScreenSmallCloseButton.click();
                    hoverScreenCloseButton.click();
                });

                starterThemesContainer.appendChild(loadThemeButton);
            });

            popupScreen.style.display = "";
        });
    }

    // Export Theme
    if (exportThemeButton) {
        exportThemeButton.addEventListener('click', function () {
            themeStringWindow.style.visibility = 'visible';

            const themeConfig = buildThemeConfig();
            const themeTitle = localStorage.getItem('custThemeTitle');
            const themeBackgroundsEnabled = localStorage.getItem('custThemeBackgroundsEnabled');

            let exportArray = [themeConfig, themeTitle, themeBackgroundsEnabled];
            const exportedString = JSON.stringify(exportArray);
            exportStringField.innerText = exportedString;

            if (themeStringWindow) {
                themeStringWindow.addEventListener('click', function () {
                    themeStringWindow.ariaLabel = 'Theme string copied!';
                    navigator.clipboard.writeText(exportedString)
                        .catch(err => window.prompt("Your browser can't copy the link, please manually copy:", exportedString));
                    setTimeout(() => {
                        themeStringWindow.ariaLabel = 'Click here to copy this theme string.';
                    }, 1000);
                });
            }
        });
    }

    // Import Theme
    if (importThemeButton) {
        importThemeButton.addEventListener('click', function () {
            const importString = prompt("Enter your theme import string.");
            if (importString) {
                setImportedTheme(importString);
                hoverScreenCloseButton.click();
            }
        });
    }

    // Theme Title
    if (themeTitleBox) {
        themeTitleBox.addEventListener('keyup', function () {
            if (themeTitleBox.value !== '') {
                localStorage.setItem('custThemeTitle', themeTitleBox.value);
                const themeNameText = document.getElementById('cur-theme-name');
                if (themeNameText) {
                    themeNameText.innerText = themeTitleBox.value;
                }
            }
        });
    }

    // Reset Theme
    if (resetThemeButton) {
        resetThemeButton.addEventListener('click', function () {
            if (confirm('Are you sure you want to reset your custom theme?')) {
                localStorage.removeItem('customThemeConfig');
                localStorage.removeItem('custThemeTitle');
                localStorage.removeItem('custThemeBackgroundsEnabled');
                localStorage.removeItem('custThemeUsesColorfulLOBButtons');

                const defaultConfig = createDefaultThemeConfig();
                customStyleElement.textContent = generateThemeCSS(defaultConfig);

                if (hoverScreenCloseButton) {
                    hoverScreenCloseButton.click();
                }

                const themeNameText = document.getElementById('cur-theme-name');
                if (themeNameText) {
                    themeNameText.innerText = 'Custom Theme';
                }

                setTheme("custom");
            }
        });
    }

    // Background Images
    if (themeUsesBackgroundImages) {
        themeUsesBackgroundImages.addEventListener('click', function () {
            if (themeUsesBackgroundImages.checked) {
                localStorage.setItem('custThemeBackgroundsEnabled', "true");
            } else {
                localStorage.removeItem('custThemeBackgroundsEnabled');
            }

            setTheme("custom");
        });
    }

    const backgroundOptions = document.querySelectorAll('.background-option');
    backgroundOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove selected class from all options
            backgroundOptions.forEach(opt => {
                opt.classList.remove('selected');
                opt.style.border = '2px solid var(--bordercolor)';
            });

            // Add selected class to clicked option
            this.classList.add('selected');
            this.style.border = '2px solid var(--subfont)';

            // Update the theme
            updateCustomThemeVariables();
            setTheme("custom");
        });
    });
}

// Initialize all input elements with event listeners
function initializeInputElements() {
    // Add event listeners to all color inputs
    Object.values(themeProperties).forEach(section => {
        section.properties.forEach(prop => {
            const input = document.getElementById(prop.name);
            if (input) {
                input.addEventListener('input', updateCustomThemeVariables);
            }
        });
    });

    // Add event listeners to option checkboxes
    themeOptions.forEach(option => {
        const input = document.getElementById(option.name);
        if (input) {
            input.addEventListener('input', updateCustomThemeVariables);
        }
    });
}

// Main initialization code
if (createAThemeButton) {
    createAThemeButton.addEventListener("click", function () {
        if (getStoredTheme() !== "custom" || localStorage.getItem(`dashboard_tutorial_started`) !== null) {
            setTheme('custom');
            return;
        }

        // Load saved theme config or create default
        let themeConfig;
        const savedThemeConfig = localStorage.getItem('customThemeConfig');
        if (savedThemeConfig) {
            themeConfig = JSON.parse(savedThemeConfig);
        } else {
            themeConfig = createDefaultThemeConfig();
        }

        // Initialize the theme editor with current config
        initThemeEditor(themeConfig);
    });
}