const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var app = new express();
var axios = require("axios").default;
const port = process.env.port || 3000;

//set ejs view
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname +'/public'));

//set ejs engine
app.set('view engine' ,'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//render view of dashboard
app.get('/',(req,res)=>{
var options = {
  method: 'GET',
  url: 'https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaTotalCounts',
  headers: {
    'x-rapidapi-key': 'b411216a50msh8d8175de8ed0a80p10b817jsn1726c69a7300',
    'x-rapidapi-host': 'covid-19-india-data-by-zt.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
res.render('index',{
    title : 'Coronavirus (COVID 19) India Live Updates',
    results: response.data.data[0]
});
//	console.log(response.data.data[0]);
}).catch(function (error) {
	console.error(error);
});

});

// //state waise data

// app.get('/stateWise',(req,res)=>{
//   res.render('state_data_list',{
//     title :'State wise Covide Data List'
//   });
// });

//state data list

app.get('/stateWise',(req,res)=>{
    var options = {
        method: 'GET',
        url: 'https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaStateWiseData',
        headers: {
          'x-rapidapi-key': 'b411216a50msh8d8175de8ed0a80p10b817jsn1726c69a7300',
          'x-rapidapi-host': 'covid-19-india-data-by-zt.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
         // console.log(response.data);
         res.render('state_data_list',{
              title :'State wise Covide Data List',
              results : response.data.data
            });
      }).catch(function (error) {
          console.error(error);
      });
})


//district data list

app.get('/districtWise/:stateCode',(req,res)=>{
  let stateCode =req.params.stateCode;
  
  var options = {
    method: 'GET',
    url: 'https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaDistrictWiseDataForState',
    params: {statecode: stateCode},
    headers: {
      'x-rapidapi-key': 'b411216a50msh8d8175de8ed0a80p10b817jsn1726c69a7300',
      'x-rapidapi-host': 'covid-19-india-data-by-zt.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
   // console.log(response.data);
   res.render('district_data_list',{
    title :'District wise Covide Data List',
    results : response.data.data
  });
  }).catch(function (error) {
    console.error(error);
  });
});


//zone state data list

app.get('/zonelist',(req,res)=>{
  var options = {
    method: 'GET',
    url: 'https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaStateWiseZonesCount',
    headers: {
      'x-rapidapi-key': 'b411216a50msh8d8175de8ed0a80p10b817jsn1726c69a7300',
      'x-rapidapi-host': 'covid-19-india-data-by-zt.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    res.render('state_data_list',{
      title : 'Zone data within the State',
      results : response.data.data
    })
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

});


//district zone data list

app.get('/districtWiseZone/:stateCode',(req,res)=>{
  let stateCode =req.params.stateCode;
  
  var options = {
    method: 'GET',
    url: 'https://covid-19-india-data-by-zt.p.rapidapi.com/GetIndiaDistrictWiseZonesForState',
    params: {statecode: stateCode},
    headers: {
      'x-rapidapi-key': 'b411216a50msh8d8175de8ed0a80p10b817jsn1726c69a7300',
      'x-rapidapi-host': 'covid-19-india-data-by-zt.p.rapidapi.com'
    }
  };
  
  
  axios.request(options).then(function (response) {
   // console.log(response.data);
   res.render('zone_district_list',{
    title :'District wise Zone Covide Data List',
    results : response.data.data
  });
  }).catch(function (error) {
    console.error(error);
  });
});

app.listen(port,()=>{
    console.log('port running');
})