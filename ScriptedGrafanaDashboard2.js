'use strict';

var app_query = "";
var env_query = "";
var metric_query = "";
var metric_array = [];
var metric_dict = {};
metric_dict['cpu'] = 'usage_system';
metric_dict['disk'] = 'used_percent';
metric_dict['diskio'] = 'io_time';
metric_dict['mem'] = 'used_percent';
metric_dict['processes'] = 'running';
metric_dict['swap'] = 'used_percent';
metric_dict['system'] = 'uptime';

// Grab application type from url param
if(!_.isUndefined(ARGS.appType)) {
  app_query = ARGS.appType.toLowerCase();
  console.log("Set application_type to "+app_query);
}
else {
  alert('Enter ApplicationType. appType=author or appType=publish. Exiting');
  return;
}

// Grab metric name from url param
if(!_.isUndefined(ARGS.metric)) {
  metric_query = ARGS.metric.toLowerCase();
  console.log("Set metric to "+metric_query);
}
else {
  console.log('No metrics passed. Showing default metrics');
  metric_query = "cpu,disk,diskio,system,mem";
  console.log("Set metric to "+metric_array);
}

// Grab environment from url param
if (!_.isUndefined(ARGS.env)) {
//  env_query = ARGS.env.toLowerCase();
  env_query = ARGS.env;
  console.log("Set environment to "+env_query);
}
else {
  alert('Enter Environment. Eg: env=aws-app-qa04. Exiting');
  return;
}

function cpu_panel(application_type,metric_query,env_query) {
  console.log('Making '+metric_query+' Panel for '+env_query+' of '+application_type+' type.');
  return {
    title: 'Chart',
    height: '200px',
    panels: [
{
  "aliasColors": {},
  "bars": false,
  "datasource": null,
  "fill": 1,
  "id": 1,
  "legend": {
    "avg": false,
    "current": false,
    "max": false,
    "min": false,
    "show": true,
    "total": false,
    "values": false
  },
  "lines": true,
  "linewidth": 1,
  "links": [],
  "nullPointMode": "null",
  "percentage": false,
  "pointradius": 5,
  "points": false,
  "renderer": "flot",
  "seriesOverrides": [],
  "span": 12,
  "stack": false,
  "steppedLine": false,
  "targets": [
    {
      "dsType": "influxdb",
      "groupBy": [
        {
          "params": [
            "10s"
          ],
          "type": "time"
        },
        {
          "params": [
            "host"
          ],
          "type": "tag"
        },
        {
          "params": [
            "null"
          ],
          "type": "fill"
        }
      ],
      "hide": false,
      "measurement": "cpu",
      "policy": "default",
      "refId": "A",
      "resultFormat": "time_series",
      "select": [
        [
          {
            "params": [
              "usage_system"
            ],
            "type": "field"
          },
          {
            "params": [],
            "type": "sum"
          },
          {
            "params": [
              "usage"
            ],
            "type": "alias"
          }
        ]
      ],
      "tags": [
        {
          "key": "app",
          "operator": "=",
          "value": app_query
        },
        {
          "condition": "AND",
          "key": "env",
          "operator": "=",
          "value": env_query
        }
      ]
    }
  ],
  "thresholds": [],
  "timeFrom": null,
  "timeShift": null,
  "title": "Cpu Usage System",
  "tooltip": {
    "shared": true,
    "sort": 0,
    "value_type": "individual"
  },
  "type": "graph",
  "xaxis": {
    "mode": "time",
    "name": null,
    "show": true,
    "values": []
  },
  "yaxes": [
    {
      "format": "short",
      "label": null,
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    },
    {
      "format": "short",
      "label": null,
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    }
  ]
}
]
}
}


// Generate a panel per metric for the application_type and environment.
function disk_panel(application_type,metric_query,env_query) {
  console.log('Making '+metric_query+' Panel for '+env_query+' of '+application_type+' type.');
  return {
    title: 'Chart',
    height: '200px',
    panels: [
{
  "aliasColors": {},
  "bars": false,
  "datasource": null,
  "fill": 1,
  "id": 2,
  "legend": {
    "avg": false,
    "current": false,
    "max": false,
    "min": false,
    "show": true,
    "total": false,
    "values": false
  },
  "lines": true,
  "linewidth": 1,
  "links": [],
  "nullPointMode": "null",
  "percentage": false,
  "pointradius": 5,
  "points": false,
  "renderer": "flot",
  "seriesOverrides": [],
  "span": 12,
  "stack": false,
  "steppedLine": false,
  "targets": [
    {
      "dsType": "influxdb",
      "groupBy": [
        {
          "params": [
            "10s"
          ],
          "type": "time"
        },
        {
          "params": [
            "host"
          ],
          "type": "tag"
        },
        {
          "params": [
            "path"
          ],
          "type": "tag"
        },
        {
          "params": [
            "null"
          ],
          "type": "fill"
        }
      ],
      "measurement": "disk",
      "policy": "default",
      "refId": "A",
      "resultFormat": "time_series",
      "select": [
        [
          {
            "params": [
              "used_percent"
            ],
            "type": "field"
          },
          {
            "params": [],
            "type": "mean"
          }
        ]
      ],
      "tags": [
        {
          "key": "app",
          "operator": "=",
          "value": app_query
        },
        {
          "condition": "AND",
          "key": "env",
          "operator": "=",
          "value": env_query
        },
        {
          "condition": "AND",
          "key": "path",
          "operator": "=",
          "value": "/apps"
        }
      ]
    }
  ],
  "thresholds": [],
  "timeFrom": null,
  "timeShift": null,
  "title": "Disk Used(%)",
  "tooltip": {
    "shared": true,
    "sort": 0,
    "value_type": "individual"
  },
  "type": "graph",
  "xaxis": {
    "mode": "time",
    "name": null,
    "show": true,
    "values": []
  },
  "yaxes": [
    {
      "format": "short",
      "label": null,
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    },
    {
      "format": "short",
      "label": null,
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    }
  ]
}
    ]
  }
}

function diskio_panel(application_type,metric_query,env_query) {
  console.log('Making '+metric_query+' Panel for '+env_query+' of '+application_type+' type.');
  return {
    title: 'Chart',
    height: '200px',
    panels: [
{
  "aliasColors": {},
  "bars": false,
  "datasource": null,
  "fill": 1,
  "id": 3,
  "legend": {
    "avg": false,
    "current": false,
    "max": false,
    "min": false,
    "show": true,
    "total": false,
    "values": false
  },
  "lines": true,
  "linewidth": 1,
  "links": [],
  "nullPointMode": "null",
  "percentage": false,
  "pointradius": 5,
  "points": false,
  "renderer": "flot",
  "seriesOverrides": [],
  "span": 12,
  "stack": false,
  "steppedLine": false,
  "targets": [
    {
      "dsType": "influxdb",
      "groupBy": [
        {
          "params": [
            "10s"
          ],
          "type": "time"
        },
        {
          "params": [
            "host"
          ],
          "type": "tag"
        },
        {
          "params": [
            "null"
          ],
          "type": "fill"
        }
      ],
      "measurement": "diskio",
      "policy": "default",
      "refId": "A",
      "resultFormat": "time_series",
      "select": [
        [
          {
            "params": [
              "io_time"
            ],
            "type": "field"
          },
          {
            "params": [],
            "type": "mean"
          }
        ]
      ],
      "tags": [
        {
          "key": "app",
          "operator": "=",
          "value": app_query
        },
        {
          "condition": "AND",
          "key": "env",
          "operator": "=",
          "value": env_query
        }
      ]
    }
  ],
  "thresholds": [],
  "timeFrom": null,
  "timeShift": null,
  "title": "I/O Time (Diskio)",
  "tooltip": {
    "shared": true,
    "sort": 0,
    "value_type": "individual"
  },
  "type": "graph",
  "xaxis": {
    "mode": "time",
    "name": null,
    "show": true,
    "values": []
  },
  "yaxes": [
    {
      "format": "short",
      "label": null,
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    },
    {
      "format": "short",
      "label": null,
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    }
  ]
}
    ]
  }
}

function system_panel(application_type,metric_query,env_query) {
  console.log('Making '+metric_query+' Panel for '+env_query+' of '+application_type+' type.');
  return {
    title: 'Chart',
    height: '200px',
    panels: [
{
  "aliasColors": {},
  "bars": false,
  "datasource": "influxDB",
  "fill": 1,
  "id": 4,
  "legend": {
    "avg": false,
    "current": false,
    "max": false,
    "min": false,
    "show": true,
    "total": false,
    "values": false
  },
  "lines": true,
  "linewidth": 1,
  "links": [],
  "nullPointMode": "null",
  "percentage": false,
  "pointradius": 5,
  "points": false,
  "renderer": "flot",
  "seriesOverrides": [],
  "span": 12,
  "stack": false,
  "steppedLine": false,
  "targets": [
    {
      "dsType": "influxdb",
      "groupBy": [
        {
          "params": [
            "10s"
          ],
          "type": "time"
        },
        {
          "params": [
            "host"
          ],
          "type": "tag"
        },
        {
          "params": [
            "null"
          ],
          "type": "fill"
        }
      ],
      "measurement": "system",
      "policy": "default",
      "refId": "A",
      "resultFormat": "time_series",
      "select": [
        [
          {
            "params": [
              "load1"
            ],
            "type": "field"
          },
          {
            "params": [],
            "type": "mean"
          },
          {
            "params": [
              "load1"
            ],
            "type": "alias"
          }
        ]
      ],
      "tags": [
        {
          "key": "app",
          "operator": "=",
          "value": app_query
        },
        {
          "condition": "AND",
          "key": "env",
          "operator": "=",
          "value": env_query
        }
      ]
    }
  ],
  "thresholds": [],
  "timeFrom": null,
  "timeShift": null,
  "title": "Load Avg",
  "tooltip": {
    "shared": true,
    "sort": 0,
    "value_type": "individual"
  },
  "type": "graph",
  "xaxis": {
    "mode": "time",
    "name": null,
    "show": true,
    "values": []
  },
  "yaxes": [
    {
      "format": "short",
      "label": null,
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    },
    {
      "format": "short",
      "label": null,
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    }
  ]
}
    ]
  }
}

function mem_panel(application_type,metric_query,env_query) {
  console.log('Making '+metric_query+' Panel for '+env_query+' of '+application_type+' type.');
  return {
    title: 'Chart',
    height: '200px',
    panels: [
{
  "aliasColors": {},
  "bars": false,
  "datasource": null,
  "fill": 1,
  "id": 5,
  "legend": {
    "avg": false,
    "current": false,
    "max": false,
    "min": false,
    "show": true,
    "total": false,
    "values": false
  },
  "lines": true,
  "linewidth": 1,
  "links": [],
  "nullPointMode": "null",
  "percentage": false,
  "pointradius": 5,
  "points": false,
  "renderer": "flot",
  "seriesOverrides": [],
  "span": 12,
  "stack": false,
  "steppedLine": false,
  "targets": [
    {
      "dsType": "influxdb",
      "groupBy": [
        {
          "params": [
            "10s"
          ],
          "type": "time"
        },
        {
          "params": [
            "host"
          ],
          "type": "tag"
        },
        {
          "params": [
            "null"
          ],
          "type": "fill"
        }
      ],
      "measurement": "mem",
      "policy": "default",
      "refId": "A",
      "resultFormat": "time_series",
      "select": [
        [
          {
            "params": [
              "used_percent"
            ],
            "type": "field"
          },
          {
            "params": [],
            "type": "mean"
          }
        ]
      ],
      "tags": [
        {
          "key": "app",
          "operator": "=",
          "value": app_query
        },
        {
          "condition": "AND",
          "key": "env",
          "operator": "=",
          "value": env_query
        }
      ]
    }
  ],
  "thresholds": [],
  "timeFrom": null,
  "timeShift": null,
  "title": "Memory Util (%)",
  "tooltip": {
    "shared": true,
    "sort": 0,
    "value_type": "individual"
  },
  "type": "graph",
  "xaxis": {
    "mode": "time",
    "name": null,
    "show": true,
    "values": []
  },
  "yaxes": [
    {
      "format": "short",
      "label": null,
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    },
    {
      "format": "short",
      "label": null,
      "logBase": 1,
      "max": null,
      "min": null,
      "show": true
    }
  ]
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

   dashboard.title = env_query+' '+app_query;

   dashboard.time = {
     from: "now-3h",     // Last 3 hours
     to: "now"
   };
   var rows = 1;
//   var base_url = window.location.application_type;
   var base_url = 'or1010050158193.corp.adobe.com';
//   var query_url = "http://" + base_url+':8086/query?db=telegraf&q=SHOW TAG VALUES WITH KEY=\"host\"';
//   var query_url = "http://" + base_url+':8086/query?db=telegraf&q=show tag values with key in (\"app\",\"env\")';
   var query_url = "http://" + base_url+':8086/query?db=telegraf&q=show tag values from '+metric_query+' with key in (\"app\",\"env\")';
   console.log(query_url);
   metric_array = metric_query.split(",");
   for (var i = 0; i < metric_array.length; i++) {
     if (metric_array[i] == "disk") {
       dashboard.rows.push(disk_panel(app_query,metric_array[i],env_query));

//       $.getScript('/dashboard/script/DiskPanel.js', function () {
//        console.log('Calling '+metric_array[i]);
//        dashboard.rows.push(disk_panel(app_query,metric_array[i],env_query));
//       });
     }
     if (metric_array[i] == "cpu") {
       dashboard.rows.push(cpu_panel(app_query,metric_array[i],env_query));
     }
     if (metric_array[i] == "diskio") {
       dashboard.rows.push(diskio_panel(app_query,metric_array[i],env_query));
     }
     if (metric_array[i] == "system") {
       dashboard.rows.push(system_panel(app_query,metric_array[i],env_query));
     }
     if (metric_array[i] == "mem") {
       dashboard.rows.push(mem_panel(app_query,metric_array[i],env_query));
     }
   }
 callback(dashboard);
}
