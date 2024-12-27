
const axios = require('axios');

async function  getInformationAboutClient(url, property, isResponseProperty){
    let result = 'not found';
    axios.get(url)
        .then(response => {
            result = (isResponseProperty)? response.data[property]: response.data;
        })
        .catch(error => {
            console.error(`Summary: get ${property} results in error: ${error}`);
        });
        return result;
     
       
}

async function getInformationAboutOrder(url){
    let result = 'not found';
    axios.get(url)
        .then(response => {
            result = response.data
        })
        .catch(error => {
            console.error(`Summary: get detailed info about order/jobs results in error: ${error}`);
        });
        return result;
        
}

module.exports = {getInformationAboutClient,  getInformationAboutOrder}
