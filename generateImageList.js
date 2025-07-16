const fs = require('fs');
const path = require('path');

const baseDir = './sprites/pokemon/versions';
const output = {};

function walk(dir, gen, game) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!game) walk(fullPath, gen || file, game || file);
            else walk(fullPath, gen, file);
        } else if (file.endsWith('.png')) {
            // Extract Pokémon number (before "-" or ".png")
            const match = file.match(/^(\d+)/);
            if (match) {
                const num = match[1];
                const key = `${gen}/${game}`;
                if (!output[key]) output[key] = {};
                if (!output[key][num]) output[key][num] = [];
                output[key][num].push(file);
            }
        }
    });
}

walk(baseDir);

fs.writeFileSync('./imageList.json', JSON.stringify(output, null, 2));
console.log('Image list generated!');