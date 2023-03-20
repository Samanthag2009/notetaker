const fs = require('fs');
const util = require('util');

//promise to receive data from notes

const readFromFile = util.promisify(fs.readFile);

// Writing the data to the file

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// /**
//  * @param {string} file
//  * @param {object} content
//  */

// const writeToFile = (file, content) => {
//     fs.writeFile(file, JSON.stringify, content), (err) =>
//     err ? console.error(err) : console.log(`Data written to ${file}`)
// };

//functions to read and append data from notes once parsed

/**
@param {object} content
@param {string} file
*/

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        // parsedData.push(content);
        parsedData[content['id']] = content
        writeToFile(file, parsedData);
      }
    });
  };

// DELETE request

/**
 *
 * @param {string} file
 * @param {string} id
 */

const readAndDelete = (id, file)  => {
    console.log(id);
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) 
        {
            console.error(err);
        }else{
            const parsedData = JSON.parse(data);
            delete parsedData[id];
            writeToFile(file, parsedData);
            console.log(parsedData);
        }
    })
};

  module.exports = {readFromFile, writeToFile, readAndAppend, readAndDelete}