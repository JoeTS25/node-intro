const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, out) {
    fs.readFile(path, 'utf8', function(err, data) {  
        if (err) {
            console.log("ERROR:", err);
            process.exit(1);
        }
     else {
        handleOut(data, out);
     } 
     });
}

async function webCat(url, out) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
    } 
    catch (err) {
        console.error(`An error has occurred while fetching your URL: ${err}`);
        process.exit(1);
    }     
}

function handleOut(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(err) {
            if (err) {
                console.error(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} 
else {
    path = progress.argv[2];
}

if (path.slice(0,4) === 'http') {
    webCat(path);
}
else {
    cat(path);
}