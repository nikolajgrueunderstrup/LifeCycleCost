<?php
include "login.php";
$localhost = array(
    '127.0.0.1',
    '::1'
);

?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Life Cycle Cost</title>
  <link rel="icon" href="images/favicon.png">
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600">
  <link rel="stylesheet" type="text/css" href="css/normalize.css">
  <link rel="stylesheet" type="text/css" href="css/milligram.css">
  <link rel="stylesheet" type="text/css" href="css/sequences.css" />
  <link rel="stylesheet" type="text/css" href="css/toastr.min.css"/>
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
  <link rel="stylesheet" type="text/css" href="css/jquery.contextMenu.css">
  <?php
  $random = 0;
  if(in_array($_SERVER['REMOTE_ADDR'], $localhost)){
    $random = rand(0,10000);
  }
  echo "<link rel='stylesheet' type='text/css' href='css/overwrite.css?q=$random'>";
  ?>
</head>

<body>
  <div> 
    <img src="images/alstom.png" style="height:15px">

    <?php
      echo createLoginForm($user, $user_email);
    ?>

    <h1>Life cycle cost: <span id="total_cost_var"></span> | Developing sandbox <img src="images/sandbox-icon-icon-sandbox-400x400.png" style="height:80px; margin-bottom:-0.3em"></h1> 
    <div id="editor">

      <div id="topmenu">
        <div id="excelmenu">
          <div class="extra_vars">
            <div class="export_import" onclick="ExportToExcel()" title="Export table to Excel"><img src="images/excel.png" style="height:30px"></div>
            <input class="export_import" type="file" name="xlfile" id="xlf" /> 
          </div>
          <!--
          <div>Export</div>
          <div>Import</div>
          -->
          <div class="extra_vars">
            Replace variables in excel sheet: 
            <input id="extra_vars_name" placeholder="variable name" class="extra_vars_input" type="text" name="">
            <input id="extra_vars_value" placeholder="variable value" class="extra_vars_input" type="text" name="">
          </div>
        </div>
      </div>
      <!--
      <div id="myProgress">
        <div id="myBar"></div>
      </div>
    -->
      <div id="tabs">
        <ul>
          <li title="edit filters and parameters to calculate the life cycle costs"><a href="#fragment-1"><span>Parameters</span></a></li>
          <li title="calculated values from parameter selection" onclick="var calculated_json = calculate()" ><a href="#fragment-2"><span>Calculated</span></a></li>
          <li title="plots and diagrams based on selection" onclick="restart_circular_chart()"><a href="#fragment-3"><span>Plots</span></a></li>
          <li title="compare two tables to see the difference"><a href="#fragment-4"><span>Compare</span></a></li>
        </ul>

        <div class="sub_body_view parameters" id="fragment-1">
          <div id="table"></div>
        </div>

        <div class="sub_body_view calculated" id="fragment-2"></div>

        <div class="sub_body_view plot" id="fragment-3">
          <h5 class="table_title">Cumulative Total Maintenance Cost (k€) | interpolated years</h5>
          <div id="firstChart">
            <form>
              <label>
                <input type="radio" name="mode" value="grouped"> Grouped</label>
              <label>
                <input type="radio" name="mode" value="stacked" checked> Stacked</label>
            </form>
            <svg width="1100" height="220"></svg>
          </div>

          <h5 class="table_title">Subsystems contribution to the total maintenance cost</img></h5>
          <div id="secondChart">
            <form>
              <label>
                <input type="radio" name="mode" value="grouped"> Grouped</label>
              <label>
                <input type="radio" name="mode" value="stacked" checked> Stacked</label>
            </form>
            <svg width="1100" height="220"></svg>
          </div>

          <!--Circular treeview-->
          <h5 class="table_title">Circular cost distribution (hoover the mouse on the areas for updated values)</h5>
          <div class="sub_body_view visualization">
            <div id="sequence"></div>
            <div id="chart">
              <!--<div id="sequence"></div> -->
              <div id="explanation" style="visibility: hidden;">
                <span id="percentage"></span> <br/> of total 'Life Cycle Cost'
              </div>
            </div>
          </div>
          
          <h5 class="table_title">Circular interactive cost distribution (mouse click the areas for zoom)</h5>
          <div id="zoomable"><svg><g></g></svg></div>

        </div>

        <div id="fragment-4">
          <span>(compare section)</span>
        </div>

      </div>
    </div>
  </div>
  
  <script src="js/jquery.min.js"></script>
  <script src="js/jquery.contextMenu.js" type="text/javascript"></script>

  <script src="js/calculated.js"></script>
  <script src="js/d3.v4.min.js"></script>
  
  <script src="js/toastr.min.js"></script>
  <script src="js/tablefilter/tablefilter.js"></script>
  <script src="js/tablefilterconf.js"></script>
  <script src="js/jquery-ui.js"></script>
  <?php
  echo "<script src='js/table.js?q=$random'></script>";
  echo "<script type='text/javascript' src='js/zoomable.js?q=$random'></script>";
  ?>
  <!-- Excel export dependencies -->
  <script src="js/xlsx.core.min.js"></script>
  <script src="js/FileSaver.js"></script>
  <script src="js/tableexport.js"></script>

  <!-- Plot dependencies -->
  <script type="text/javascript" src="js/stackedBarChartFirst.js"></script>
  <script type="text/javascript" src="js/stackedBarChartSecond.js"></script>
  <script type="text/javascript" src="js/sequences.js"></script>

  
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-110088493-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-110088493-1');
  </script>

  <?php
  echo '<script src="js/scripts.js?q='.$random.'"></script>';
  ?>

  <script>
    $("#tabs").tabs();

    // setTimeout(function() {
    //   $("#ui-id-3").click()
    //   window.scrollTo(0,document.body.scrollHeight);
    // }, 500);

  </script>
</body>

</html>