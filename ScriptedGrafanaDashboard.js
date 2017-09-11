'use strict';

var host_query = "";
var metric_query = "cpu,disk";
var metric_dict = {};
metric_dict['cpu'] = 'usage_system';
metric_dict['disk'] = 'used_percent';

// Grab host name from url param
if(!_.isUndefined(ARGS.host)) {
  host_query = ARGS.host;
  console.log("Set hostname to "+host_query);
}
else {
  alert('Enter One Host');
  return;
}

// Grab metric name from url param
if(!_.isUndefined(ARGS.metric)) {
  metric_query = ARGS.metric;
  console.log("Set metric to "+metric_query);
}
else {
  alert('No metrics passed. Showing default metrics');
  alert('Default metrics not supported yet. Hence exiting');
  return;
}

// Generate a panel per metric for the host
function make_panel(hostname,metric_query) {
  console.log('Making Panel');
  console.log(hostname);
  return {
    title: 'Chart',
    height: '200px',
    panels: [
      {
        title: metric_query+" for host "+hostname,
        type: 'graph',
        span: 6,
        spaceLength: 6,
        dashLength: 10,
        fill: 1,
        linewidth: 1,
  legend: [{
    avg: false,
    current: false,
    max: false,
    min: false,
    show: true,
    total: false,
    values: false
  }],
        targets: [
          {
            hide : false,
            measurement : metric_query,
            dsType: "influxdb",
            "groupBy": [
              {
                "type": "time",
                "params": [
                  "1m"
                ]
              }
            ],
            orderByTime: "ASC",
            query : "SELECT \""+metric_dict[metric_query]+"\" FROM \""+metric_query+"\" WHERE host = '"+hostname+"' AND $timeFilter",
            refId :"A",
            resultFormat : "time_series",
            select :[
               [
                  {"params":[metric_dict[metric_query]],
                     "type":"field"
                  },
          {
            "params": [],
            "type": "mean"
          }
               ]
             ],
             tags : [],
          }
        ],
        tooltip: {
          shared: true,
          sort: 0
        },
        "lines" : true,
        "points": false,
        "pointradius" : 5,
        "percentage": false,
        "stack" : false
      }
    ]
  }
}

return function(callback) {
   var dashboard;
   dashboard = {
      rows : [],
      "style": "light",
      "timezone": "browser",
      "editable": false,
      "hideControls": true,
   };

   dashboard.title = 'Host';
   if (metric_query)
      dashboard.title += " "+metric_query;

   dashboard.time = {
     from: "now-3h",     // Last 3 hours
     to: "now"
   };

   var rows = 1;
   var base_url = window.location.hostname;
   var query_url = "http://" + base_url+':8086/query?db=telegraf&q=SHOW TAG VALUES WITH KEY=\"host\"';
   console.log(query_url);
   $.ajax({
     method: 'GET',
     url: query_url
   })
   .done(function(resp) {
      if (resp.hasOwnProperty('results'))
      {
         resp.results[0].series.forEach( function (s) {
           if (s.name.match(metric_query)) {
             var obj = s
             if (obj.hasOwnProperty('values')) {
               var values = obj.values;
               for (var i in values) {
                 var hostname = values[i][1].toString();   // Make sure we have a string here.
                 if (hostname.match(host_query))
                   dashboard.rows.push(make_panel(hostname,metric_query));
               }
             }
           }
         });
       }
      callback(dashboard);
  });
}

