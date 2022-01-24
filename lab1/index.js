const fs = require('fs') 
const csv = require('csv-parser');


try {
  fs.unlinkSync('Canada.txt')
  console.log('Canada.txt file deleted!')
  fs.unlinkSync('United States.txt')
    console.log('United States.txt file deleted!')
} catch(err) {
  console.error(err)
}

function getFilteredData(y, callback){ 
    const result = [];                 
    fs.createReadStream('input_countries.csv')
      .pipe(csv())
      .on('data', (row) => {
          const headers = Object.keys(row);
          if(row[headers[0]] == y )
              result.push(row)
       })
      .on('end', () => {
          console.log(result)
          callback(result,y)
          console.log('Filtered data successfully copied!');
       });
}

function putFilteredData(result,y){
    var writeStream =fs.createWriteStream(y+'.txt')

    result.map(i => {
        writeStream.write(`${i['country']}, ${i['year']}, ${i['population']}\n`)
     });
}

getFilteredData("Canada",putFilteredData)
getFilteredData("United States",putFilteredData)

