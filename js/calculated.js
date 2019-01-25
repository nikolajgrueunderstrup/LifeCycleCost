var calculated_json = {"test":"test"}
var calculated_json_titles = [
        {"title":"s.ID", "text":"s.ID"},
        {"title":"s.Location", "text":"s.Location"},
        {"title":"s.SubSystem", "text":"s.SubSystem"},
        {"title":"s.Module", "text":"s.Module"},
        {"title":"s.AlstomPN", "text":"s.AlstomPN"},
        {"title":"s.Quantity", "text":"s.Quantity"},

        {"title":"number of interventions per year", "text":"c.AA"},
        {"title":"active man-hours required per each intervention", "text":"c.AB"},
        {"title":"cost of active man-hours required per each intervention (formula to be updated)", "text":"c.AC"},
        {"title":"total time required per each intervention", "text":"c.AD"},
        {"title":"total man-hours required per each intervention", "text":"c.AE"},
        {"title":"total cost of man-hours required per each intervention (formula to be updated)", "text":"c.AF"},
        {"title":"cost of possession per each intervention", "text":"c.AG"},
        {"title":"total cost no man-hours per each intervention (formula to be updated)", "text":"c.AH"},
        {"title":"total cost per each intervention (formula to be updated)", "text":"c.AI"},
        {"title":"active man-hours required per each year", "text":"c.AJ"},
        {"title":"cost of active man-hours required per each year (formula to be updated)", "text":"c.AK"},
        {"title":"total time required per each year (formula to be updated)", "text":"c.AL"},
        {"title":"total man-hours required per each year (formula to be updated)", "text":"c.AM"},
        {"title":"total cost of man-hours required per each year (formula to be updated)", "text":"c.AN"},
        {"title":"cost of possession per each year (formula to be updated)", "text":"c.AO"},
        {"title":"total cost no man-hours per each year (formula to be updated)", "text":"c.AP"},
        {"title":"total cost per each year (formula to be updated)", "text":"c.AQ"},

        {"title":"number of intervention per year", "text":"p.AA"},
        {"title":"active man-hours required per each intervention", "text":"p.AB"},
        {"title":"cost of active man-hours required per each intervention", "text":"p.AC"},
        {"title":"total time required per each intervention", "text":"p.AD"},
        {"title":"total man-hours required per each intervention", "text":"p.AE"},
        {"title":"total cost of man-hours required per each intervention", "text":"p.AF"},
        {"title":"cost of possession per each intervention", "text":"p.AG"},
        {"title":"total cost no man-hours per each intervention", "text":"p.AH"},
        {"title":"total cost per each intervention", "text":"p.AI"},
        {"title":"active man-hours required per each year", "text":"p.AJ"},
        {"title":"cost of active man-hours required per each year", "text":"p.AK"},
        {"title":"total time required per each year", "text":"p.AL"},
        {"title":"total man-hours required per each year", "text":"p.AM"},
        {"title":"total cost of man-hours required per each year", "text":"p.AN"},
        {"title":"cost of possession per each year", "text":"p.AO"},
        {"title":"total cost no man-hours per each year", "text":"p.AP"},
        {"title":"total cost per each year", "text":"p.AQ"},

        {"title":"number of intervention per year", "text":"e.AA"},
        {"title":"active man-hours required per each intervention", "text":"e.AB"},
        {"title":"cost of active man-hours required per each intervention", "text":"e.AC"},
        {"title":"total time required per each intervention", "text":"e.AD"},
        {"title":"total man-hours required per each intervention", "text":"e.AE"},
        {"title":"total cost of man-hours required per each intervention", "text":"e.AF"},
        {"title":"cost of possession per each intervention", "text":"e.AG"},
        {"title":"total cost no man-hours per each intervention", "text":"e.AH"},
        {"title":"total cost per each intervention", "text":"e.AI"},
        {"title":"active man-hours required per each year", "text":"e.AJ"},
        {"title":"cost of active man-hours required per each year", "text":"e.AK"},
        {"title":"total time required per each year", "text":"e.AL"},
        {"title":"total man-hours required per each year", "text":"e.AM"},
        {"title":"total cost of man-hours required per each year", "text":"e.AN"},
        {"title":"cost of possession per each year", "text":"e.AO"},
        {"title":"total cost no man-hours per each year", "text":"e.AP"},
        {"title":"total cost per each year", "text":"e.AQ"},

        {"title":"repair price for each discarded reparation", "text":"rp.AA"},
        {"title":"repair price for each not discarded reparation", "text":"rp.AB"},
        {"title":"total repair price for each reparation", "text":"rp.AC"},

]

function calculate_json() {
  tf.getFilteredValues().forEach(function(value, index){
    var col = value[1];
    console.log(col)
  })
}

function calculate() {
  calculated_json = calculate_json()

  var tableHTML = "";

  var maintainer = {
    "main1": 300,
    "man2": 250
  }

  tableHTML += `
  <table class="data-table TF">
    <caption>
      <div class="inf"></div>
    </caption>
    <thead>
      <tr>
        <th colspan='6'>SAP</th>
        <th colspan='17'>Corrective maintenance data information</th>
        <th colspan='17'>Preventive maintenance data information</th>
        <th colspan='17'>External failure maintenance data information</th>
        <th colspan='3'>Repair data information</th>
      </tr>
      <tr>
      `
    for (i=0; i<calculated_json_titles.length; i++) {
        tableHTML += "<th title='" + calculated_json_titles[i]["title"] +"'>" + calculated_json_titles[i]["text"] + "</th>"
    }

    tableHTML += `
      </tr>
    </thead>
    <tbody>`;

  tf.getFilteredValues().forEach(function(value, index){
    var col = value[1];
    tableHTML += `
      <tr class="${oddOrEven(index)}">
        <td>${col[0].toString()}</td>
        <td>${col[1].toString()}</td>
        <td>${col[2].toString()}</td>
        <td>${col[3].toString()}</td>
        <td>${col[4].toString()}</td>
        <td>${col[5].toString()}</td>

        <td>${col[9] / col[10]}</td>
        <td>${col[11] * col[13]}</td>
        <td>${col[11] * 4}</td>
        <td>${Number(col[11]) + Number(col[12]) + Number(col[28])}</td>
        <td>${(Number(col[11]) + Number(col[12]) + Number(col[28]))*col[13]}</td>
        <td>${(Number(col[11]) + Number(col[12]) + Number(col[28]))*col[13] *3}</td>
        <td>${col[15]}</td>
        <td>${Number(col[15]) + Number(col[16]) + Number(col[17]) + Number(col[18])}</td>
        <td>${Number(col[15]) + Number(col[16]) + Number(col[17]) + Number(col[18]) + (Number(col[11]) + Number(col[12]) + Number(col[28]))*col[13] *3}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>

        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>

        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>

        <td>${col[12]}</td>
        <td>${col[12]}</td>
        <td>${col[12]}</td>
      </tr>`;  
  });

  tableHTML += `
    </tbody>
  </table>`;

  $("#fragment-2").html(tableHTML);
  // return calculated_json
}

function oddOrEven(num){
  if(num % 2 == 0)
      return "even";
  return "odd";
}

function switch_header_text(e) {
  
}

//creates a json structure to be used in the zoomable diagram
function calculate_json() {
  var pie_json = {"name": "Life Cycle Cost", "children": [
    {"name": "SAP", children: []},
    {"name": "Corrective maintenance", children: []},
    {"name": "Preventive maintenance", children: []},
    {"name": "External failure maintenance", children: []},
    {"name": "Repair", children: []},
    ]
  }

  var dumpster_trash = [5,22,39,56,59]
  var dumpster_trash2 = 0

  for (i=0; i < calculated_json_titles.length; i++) {
    if (i > dumpster_trash[dumpster_trash2]) {
        dumpster_trash2 += 1
    }
    pie_json["children"][dumpster_trash2]["children"].push( {"name": calculated_json_titles[i]["text"], "size": 0 } )
  }

  var calculated_json_local = {"s":[], "c":[], "p":[], "e":[], "rp":[]}
  tf.getFilteredValues().forEach(function(value, index){
    var col = value[1];
    // dumpster_trash2 = 0
    // for (i in col) {
    //     if (i > dumpster_trash[dumpster_trash2]) {
    //         dumpster_trash2 += 1
    //     }
    // }

    // console.log(pie_json["children"][0]["children"])

    for (y=0; y<pie_json["children"][0]["children"].length; y++){
        col[y] = parseInt(col[y])
        if (!Number.isNaN(col[y])) {
            pie_json["children"][0]["children"][y]["size"] += col[y]
        }
    }
    
    calculated_json_local["s"][index] = col.slice(0,5)

    calculated_json_local["c"][index] = [
        col[9]/col[10], 
        col[11]*col[13], 
        col[11]*4, 
        Number(col[11]) + Number(col[12]) + Number(col[28]),
        (Number(col[11]) + Number(col[12]) + Number(col[28]))*col[13], 
        (Number(col[11]) + Number(col[12]) + Number(col[28]))*col[13] *3,
        col[15],
        Number(col[15]) + Number(col[16]) + Number(col[17]) + Number(col[18]),
        Number(col[15]) + Number(col[16]) + Number(col[17]) + Number(col[18]) + (Number(col[11]) + Number(col[12]) + Number(col[28]))*col[13] *3
    ]
    calculated_json_local["c"][index] = calculated_json_local["c"][index].concat( Array.apply(null, {length: 8}).map(function(){return col[15]}) )

    calculated_json_local["p"][index] = Array.apply(null, {length: 17}).map(function(){return col[11]})

    calculated_json_local["e"][index] = Array.apply(null, {length: 17}).map(function(){return col[13]})

    calculated_json_local["rp"][index] = Array.apply(null, {length: 3}).map(function(){return col[12]})
  });
  console.log(pie_json["children"])
  console.log(calculated_json_local)

  return pie_json
}


