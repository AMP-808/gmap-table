const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const airOpsTestList = [
  {
    dsgn_code: "TSAA",
    company_name: "Aloha Air Cargo",
    address: "50 Elliott Street",
    city: "Honolulu",
    state: "HI",
    zip: "96819",
    number_of_planes: "3",
    yib: "2008-05-15",
    ops_type: "PUB",
    link_to_apply: "https://www.alohaaircargo.com/careers/",
    coordinates: {
      lat: 21.338280,
      lng: -157.926730
    }
},
{
    dsgn_code: "I5PA",
    company_name: "Asia Pacific Airlines",
    address: "155 Kapalulu Place, Suite 203",
    city: "Honolulu",
    state: "HI",
    zip: "96819",
    number_of_planes: "3",
    yib: "1999-06-03",
    ops_type: "PUB",
    link_to_apply: "https://www.asiapacificairlines.com/careers/",
    coordinates: {
      lat: 21.320590,
      lng: -157.910800
    }
},
{
    dsgn_code: "JRAA",
    company_name: "Trans Executive Airlines",
    address: "100 Iolana Place",
    city: "Honolulu",
    state: "HI",
    zip: "96819",
    number_of_planes: "10",
    yib: "1982-06-15",
    ops_type: "PUB",
    link_to_apply: "http://transairhawaii.com/careers",
    coordinates: {
      lat: 21.322830,
      lng: -157.908900
    }
},
{
    dsgn_code: "HALA",
    company_name: "Hawaiian Airlines",
    address: "3375 Koapaka Street, G-350",
    city: "Honolulu",
    state: "HI",
    zip: "96819",
    number_of_planes: "62",
    yib: "1929-10-06",
    ops_type: "PUB",
    link_to_apply: "https://rn11.ultipro.com/HAW1000/JobBoard",
    coordinates: {
      lat: 21.336300,
      lng: -157.917420
    }
},
{
    dsgn_code: "MK9A",
    company_name: "Mokulele Airlines",
    address: "355 Hukilike Street, Suite 103",
    city: "Kahului",
    state: "HI",
    zip: "96732",
    number_of_planes: "12",
    yib: "1994-06-15",
    ops_type: "PUB",
    link_to_apply:
    "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=fbb94cb3-cbb5-4d4b-8225-770829b92d51&ccId=19000101_000001&lang=en_US",
    coordinates: {
      lat: 20.884690,
      lng: -156.459110
    }
},
{
  dsgn_code: "TSAA",
  company_name: "Aloha Air Cargo",
  address: "50 Elliott Street",
  city: "Honolulu",
  state: "HI",
  zip: "96819",
  number_of_planes: "3",
  yib: "2008-05-15",
  ops_type: "PUB",
  link_to_apply: "https://www.alohaaircargo.com/careers/",
  coordinates: {
    lat: 21.338280,
    lng: -157.926730
  }
},
{
  dsgn_code: "I5PA",
  company_name: "Asia Pacific Airlines",
  address: "155 Kapalulu Place, Suite 203",
  city: "Honolulu",
  state: "HI",
  zip: "96819",
  number_of_planes: "3",
  yib: "1999-06-03",
  ops_type: "PUB",
  link_to_apply: "https://www.asiapacificairlines.com/careers/",
  coordinates: {
    lat: 21.320590,
    lng: -157.910800
  }
},
{
  dsgn_code: "JRAA",
  company_name: "Trans Executive Airlines",
  address: "100 Iolana Place",
  city: "Honolulu",
  state: "HI",
  zip: "96819",
  number_of_planes: "10",
  yib: "1982-06-15",
  ops_type: "PUB",
  link_to_apply: "http://transairhawaii.com/careers",
  coordinates: {
    lat: 21.322830,
    lng: -157.908900
  }
},
{
  dsgn_code: "HALA",
  company_name: "Hawaiian Airlines",
  address: "3375 Koapaka Street, G-350",
  city: "Honolulu",
  state: "HI",
  zip: "96819",
  number_of_planes: "62",
  yib: "1929-10-06",
  ops_type: "PUB",
  link_to_apply: "https://rn11.ultipro.com/HAW1000/JobBoard",
  coordinates: {
    lat: 21.336300,
    lng: -157.917420
  }
},
{
  dsgn_code: "MK9A",
  company_name: "Mokulele Airlines",
  address: "355 Hukilike Street, Suite 103",
  city: "Kahului",
  state: "HI",
  zip: "96732",
  number_of_planes: "12",
  yib: "1994-06-15",
  ops_type: "PUB",
  link_to_apply:
  "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=fbb94cb3-cbb5-4d4b-8225-770829b92d51&ccId=19000101_000001&lang=en_US",
  coordinates: {
    lat: 20.884690,
    lng: -156.459110
  }
},
{
  dsgn_code: "TSAA",
  company_name: "Aloha Air Cargo",
  address: "50 Elliott Street",
  city: "Honolulu",
  state: "HI",
  zip: "96819",
  number_of_planes: "3",
  yib: "2008-05-15",
  ops_type: "PUB",
  link_to_apply: "https://www.alohaaircargo.com/careers/",
  coordinates: {
    lat: 21.338280,
    lng: -157.926730
  }
},
{
  dsgn_code: "I5PA",
  company_name: "Asia Pacific Airlines",
  address: "155 Kapalulu Place, Suite 203",
  city: "Honolulu",
  state: "HI",
  zip: "96819",
  number_of_planes: "3",
  yib: "1999-06-03",
  ops_type: "PUB",
  link_to_apply: "https://www.asiapacificairlines.com/careers/",
  coordinates: {
    lat: 21.320590,
    lng: -157.910800
  }
},
{
  dsgn_code: "JRAA",
  company_name: "Trans Executive Airlines",
  address: "100 Iolana Place",
  city: "Honolulu",
  state: "HI",
  zip: "96819",
  number_of_planes: "10",
  yib: "1982-06-15",
  ops_type: "PUB",
  link_to_apply: "http://transairhawaii.com/careers",
  coordinates: {
    lat: 21.322830,
    lng: -157.908900
  }
},
{
  dsgn_code: "HALA",
  company_name: "Hawaiian Airlines",
  address: "3375 Koapaka Street, G-350",
  city: "Honolulu",
  state: "HI",
  zip: "96819",
  number_of_planes: "62",
  yib: "1929-10-06",
  ops_type: "PUB",
  link_to_apply: "https://rn11.ultipro.com/HAW1000/JobBoard",
  coordinates: {
    lat: 21.336300,
    lng: -157.917420
  }
},
{
  dsgn_code: "MK9A",
  company_name: "Mokulele Airlines",
  address: "355 Hukilike Street, Suite 103",
  city: "Kahului",
  state: "HI",
  zip: "96732",
  number_of_planes: "12",
  yib: "1994-06-15",
  ops_type: "PUB",
  link_to_apply:
  "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=fbb94cb3-cbb5-4d4b-8225-770829b92d51&ccId=19000101_000001&lang=en_US",
  coordinates: {
    lat: 20.884690,
    lng: -156.459110
  }
},
];

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Return them as json
  res.json(airOpsTestList);

  console.log(`Sent Ops`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);