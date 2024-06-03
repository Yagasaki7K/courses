const fs = require('fs').promises
const { readdir } = require('fs/promises')
const path = require('path')

// fs.readdir(path.resolve(__dirname))
// .then(files => console.log(files))
// // index.js
// .catch(error => console.log(error))

async function Readdir(rootDir) {
    rootDir = rootDir || path.resolve(__dirname)
    const files = await fs.readdir(path.resolve(rootDir))
    Walk(files, rootDir)
}

async function Walk(files, rootDir) {
    for(let file of files) {
        const filePath = path.resolve(rootDir, file)
        const stats = await fs.stat(filePath)
        
        if (/\.git/g.test(filePath)) continue;
        if (/node_modules/g.test(filePath)) continue;

        if (stats.isDirectory()) {
            readdir(filePath)
            continue
        }

        // if(!/\.js$/g.test(filePath)) continue // to find JS files
        // if(!/\.css$/g.test(filePath)) continue // to find CSS files
        // if(!/\.html$/g.test(filePath)) continue // to find HTML files

        if (!/\.html$/g.test(filePath) && !/\.css$/g.test(filePath)) continue // to find HTML and CSS files

        console.log(filePath) // List all pastes, files and is directory?
    }
}

Readdir()