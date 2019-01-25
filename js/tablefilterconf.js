var filtersConfig = {
  base_path: 'js/tablefilter/',
  grid_layout: false,
  alternate_rows: true,
  btn_reset: true,
  rows_counter: true,
  loader: false,
  status_bar: true,
  /*paging: {
    results_per_page: ['Records: ', [15, 25, 50, 100]]
  },*/
  col_1: `multiple` ,
  col_2: `multiple`,
  col_3: 'multiple',
  col_4: 'multiple',
  col_types: [
    'number', 'string', 'string',
    'string', 'string', 'number',
    'number', 'number', 'number'
  ],
  
  filters_row_index: 2,
  headers_row_index: 1,
  
  extensions:[
    {name: 'sort'},
    {name: 'colsVisibility', 
      enable_hover: false,
      on_after_col_hidden: function(o, colIndex) {
        ajust_colspan(colIndex, -1)
        console.log("TF: " + o);
      },
      on_after_col_displayed: function(o, colIndex){
        ajust_colspan(colIndex, 1)
        console.log("display: " + colIndex);
      }
    }
  ],

  status_bar: true,
  help_instructions: false,

  on_after_filter: function(o){
    calc_column();
  }
};

function ajust_colspan(colIndex, direction){
  if(colIndex >= 0 && colIndex <= 5){
    var colspan = $(".first_header th")[0].colSpan;
    $(".first_header th")[0].colSpan = colspan + direction;
    console.log("sap");
  }
  else if (colIndex >= 6 && colIndex <= 8){
    var colspan = $(".first_header th")[1].colSpan;
    $(".first_header th")[1].colSpan = colspan + direction;
    console.log("generic");
  }
  else if (colIndex >= 9 && colIndex <= 19){
    var colspan = $(".first_header th")[2].colSpan;
    $(".first_header th")[2].colSpan = colspan + direction;
    console.log("corrective");
  }
  else if (colIndex >= 20 && colIndex <= 29){
    var colspan = $(".first_header th")[3].colSpan;
    $(".first_header th")[3].colSpan = colspan + direction;
    console.log("preventive");
  }
  else if (colIndex >= 30 && colIndex <= 40){
    var colspan = $(".first_header th")[4].colSpan;
    $(".first_header th")[4].colSpan = colspan + direction;
    console.log("external");
  }
  else if (colIndex >= 41 && colIndex <= 45){
    var colspan = $(".first_header th")[5].colSpan;
    $(".first_header th")[5].colSpan = colspan + direction;
    console.log("renew");
  }
  else if (colIndex >= 46 && colIndex <= 50){
    var colspan = $(".first_header th")[6].colSpan;
    $(".first_header th")[6].colSpan = colspan + direction;
    console.log("repair");
  }
}