function TableToArray() {
    var dataTabelArray = [];

    $("#table .data-table tbody tr").each(function (index) {
        var ID = $(this).find("td:nth-child(1)").text();
        var SubSystem = $(this).find("td:nth-child(2)").text();
        var SubSystemModule = $(this).find("td:nth-child(3)").text();
        var Product = $(this).find("td:nth-child(4)").text();
        //var qty = Number($(this).find("td:nth-child(6)").text());

        dataTabelArray.push([SubSystem + '|' + SubSystemModule + '|' + Product, calcRowFunc($(this))]);
    });
    return dataTabelArray;
}
function toggleButtonFirst() {
    $("#firstChart").toggle();
    $("#firstTable").toggle();
}

function toggleButtonSecond() {
    $("#secondChart").toggle();
    $("#secondTable").toggle();
}

function toggleButtonTable(e) {
    $("#tableCalc").toggle();
    $("#table").toggle();
    $(e).find(".toggleDriver").toggleClass("selected");
}

function PDFprint(me){
  window.print();
}

function calcRowFunc(row){
  var result = 
    row.find(".Qty").text() *
    row.find(".UnitCost").text()
  return result;
}

$(".eye").on("click", function(){
  $(this).toggleClass("deselected");
  var id = $(this).attr('id');
  $(".sub_body_view." + id).fadeToggle();
});

$("#login_icon").on("click", function(){
  toastr.success('login');
});

function ExportToExcel(){
  var tx = TableExport($("#demo"), {
    headers: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
    footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
    formats: ['xlsx'],                          // (String[]), filetype(s) for the export, (default: ['xls', 'csv', 'txt'])
    filename: 'ExcelExport',                    // (id, String), filename for the downloaded file, (default: 'id')
    bootstrap: false,                           // (Boolean), style buttons using bootstrap, (default: true)
    exportButtons: false,                       // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
    position: 'bottom',                         // (top, bottom), position of the caption element relative to table, (default: 'bottom')
    ignoreRows: -1,                             // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
    ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
    trimWhitespace: true                        // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
  });

  var exportdata = tx.getExportData()['demo']['xlsx'];;
  tx.export2file(exportdata.data, exportdata.mimeType, exportdata.filename, exportdata.fileExtension);
}

function replaceVariables(){
  
  $(".extra_vars_input").val("")
}

$("#extra_vars_value").on('keyup', function (e) {
  if (e.keyCode == 13) {
    replaceVariables()
  }
});






// importing from excel

var X = XLSX;
var XW = {
  /* worker message */
  msg: 'xlsx',
  /* worker scripts */
  worker: './xlsxworker.js'
};

var global_wb;

var process_wb = (function() {
  var OUT = document.getElementById('out');
  var HTMLOUT = document.getElementById('htmlout');

  var get_format = (function() {
    var radios = document.getElementsByName( "format" );
    return function() {
      for(var i = 0; i < radios.length; ++i) if(radios[i].checked || radios.length === 1) return radios[i].value;
    };
  })();

  var to_json = function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
      var roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {header:1});
      if(roa.length) result[sheetName] = roa;
    });
    return result;
  };

  return function process_wb(wb) {
    global_wb = wb;
    var output = to_json(wb);
    console.log(output)
    $.ajax({
      url: "import_data.php",
      type: 'POST',
      data: {"json":JSON.stringify(output)},
    });
  };
})();


var do_file = (function() {
  var rABS = typeof FileReader !== "undefined" && (FileReader.prototype||{}).readAsBinaryString;
  var domrabs = document.getElementsByName("userabs")[0];
  if(!rABS) domrabs.disabled = !(domrabs.checked = false);
  domrabs = true

  var use_worker = typeof Worker !== 'undefined';
  var domwork = document.getElementsByName("useworker")[0];
  if(!use_worker) domwork.disabled = !(domwork.checked = false);

  var xw = function xw(data, cb) {
    var worker = new Worker(XW.worker);
    worker.onmessage = function(e) {
      switch(e.data.t) {
        case 'ready': break;
        case 'e': console.error(e.data.d); break;
        case XW.msg: cb(JSON.parse(e.data.d)); break;
      }
    };
    worker.postMessage({d:data,b:rABS?'binary':'array'});
  };

  return function do_file(files) {
    rABS = true
    use_worker = true
    var f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
      var data = e.target.result;
      if(!rABS) data = new Uint8Array(data);
      if(use_worker) xw(data, process_wb);
      else process_wb(X.read(data, {type: rABS ? 'binary' : 'array'}));
    };
    if(rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
  };
})();


(function() {
  var xlf = document.getElementById('xlf');
  if(!xlf.addEventListener) return;
  function handleFile(e) { do_file(e.target.files); }
  xlf.addEventListener('change', handleFile, false);
})();

