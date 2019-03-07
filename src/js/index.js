import _ from 'lodash';
require('isomorphic-fetch');

// This is a test function to make sure webpack has compiled assets
function component() {
    let element = document.createElement('div');

    element.innerHTML = 'Brought to you by the Domain.com team.';

    return element;
}

document.body.appendChild(component());

function hgComponent() {
  let element = document.createElement('div');

  element.innerHTML = 'and now HostGators screwin with it';

  return element;
}

document.body.appendChild(hgComponent());

document.addEventListener('DOMContentLoaded', () => {

    const allBreweriesButton = document.getElementById('get-all-breweries');

    allBreweriesButton.addEventListener('click', () => {

      fetch('http://localhost:3500/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query: '{ brewery {brewery_name } }'}),
      })
        .then(res => res.json())
        .then(res => {

          //build brewery elements with res.data
          const breweries = res.data.brewery.map(item => {
            let element = document.createElement('div');
            element.className = 'brewery-card';
            element.innerHTML = item.brewery_name;
            return element;
          })

          let container = document.getElementById('container');
          for(let brewery of breweries){
            container.appendChild(brewery);
          }
        });

    });
});
