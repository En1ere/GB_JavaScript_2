const moment = require('moment');
const fs = require('fs');

const cartLog = (name, action,) => {
    fs.readFile('./server/db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const statistic = JSON.parse(data);
            statistic.push({
                name: name,
                action: action,
                time: moment().format('h:mm:ss a, DD MMM YYYY'),
            });
            fs.writeFile('./server/db/stats.json', JSON.stringify(statistic, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
};

module.exports = cartLog;
