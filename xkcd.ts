import fs from 'fs'
import * as cheerio from 'cheerio';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));


if(!fs.existsSync('./cache')) {
    fs.mkdirSync('./cache');
}


for (let i = 3216 ; i > 3206; i--)     {
    let html = '';
    if(fs.existsSync(`./cache/${i}.html`)) {
        let html = fs.readFileSync(`./cache/${i}.html`, {encoding: 'utf-8'});

    } else {
        sleep(1000); // Sleep for 1 second
        let res = await fetch(`https://xkcd.com/${i}/`);
        html = await res.text();
        fs.writeFileSync(`./cache/${i}.html`, html);
    }



    const $ = cheerio.load(html);
    let img = $('#comic img');
    console.log(img.attr('src'));
    console.log(img.attr('title'));
    console.log(img.attr('alt'));
}