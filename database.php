<?php
include "login.php";

// echo $user;
// echo "<br><br>";

$stmt = mysqli_prepare($connection, "
SELECT 
    `pbs`.`ID` AS `s.ID`,
    `pbs`.`Location` AS `s.Location`,
    `pbs`.`SubSystem` AS `s.SubSystem`,
    `pbs`.`Module` AS `s.Module`,
    `pbs`.`AlstomPN` AS `s.AlstomPN`,
    `pbs`.`Quantity` AS `s.Quantity`,
    `generic`.`AlstomDescriptionName` AS `g.AlstomDescriptionName`,
    `generic`.`NamingConvention` AS `g.NamingConvention`,
    `generic`.`TypeOfInstallation` AS `g.TypeOfInstallation`,
    `corrective`.`MissionProfile` AS `c.MissionProfile`,
    `corrective`.`MTBF` AS `c.MTBF`,
    `corrective`.`MTTR` AS `c.MTTR`,
    `corrective`.`WaitingTime` AS `c.WaitingTime`,
    `corrective`.`NumberOfMaintainerNeeded` AS `c.NumberOfMaintainerNeeded`,
    `corrective`.`ProfileOfMaintainer` AS `c.ProfileOfMaintainer`,
    `corrective`.`PossessionTime` AS `c.PossessionTime`,
    `corrective`.`CostOfConsumables` AS `c.CostOfConsumables`,
    `corrective`.`OtherCost` AS `c.OtherCost`,
    `corrective`.`LogisticTime` AS `c.LogisticTime`,
    `corrective`.`ServiceDesk` AS `c.ServiceDesk`,
    `preventive`.`MissionProfile` AS `p.MissionProfile`,
    `preventive`.`MTBM` AS `p.MTBM`,
    `preventive`.`MTTM` AS `p.MTTM`,
    `preventive`.`NumberOfMaintainerNeeded` AS `p.NumberOfMaintainerNeeded`,
    `preventive`.`ProfileOfMaintainer` AS `p.ProfileOfMaintainer`,
    `preventive`.`PossessionTime` AS `p.PossessionTime`,
    `preventive`.`CostOfConsumables` AS `p.CostOfConsumables`,
    `preventive`.`OtherCost` AS `p.OtherCost`,
    `preventive`.`LogisticTime` AS `p.LogisticTime`,
    `preventive`.`ServiceDesk` AS `p.ServiceDesk`,
    `external`.`MissionProfile` AS `e.MissionProfile`,
    `external`.`MTBEF` AS `e.MTBEF`,
    `external`.`MTTR` AS `e.MTTR`,
    `external`.`WaitingTime` AS `e.WaitingTime`,
    `external`.`NumberOfMaintainerNeeded` AS `e.NumberOfMaintainerNeeded`,
    `external`.`ProfileOfMaintainer` AS `e.ProfileOfMaintainer`,
    `external`.`PossessionTime` AS `e.PossessionTime`,
    `external`.`CostOfConsumables` AS `e.CostOfConsumables`,
    `external`.`OtherCost` AS `e.OtherCost`,
    `external`.`LogisticTime` AS `e.LogisticTime`,
    `external`.`ServiceDesk` AS `e.ServiceDesk`,
    `renewal`.`RenewalPeriod` AS `rn.RenewalPeriod`,
    `renewal`.`NewPrice` AS `rn.NewPrice`,
    `renewal`.`InstallationCost` AS `rn.InstallationCost`,
    `renewal`.`PossessionCost` AS `rn.PossessionCost`,
    `renewal`.`DecommissioningCost` AS `rn.DecommissioningCost`,
    `repair`.`DiscardRate` AS `rp.DiscardRate`,
    `repair`.`RepairPrice` AS `rp.RepairPrice`,
    `repair`.`RepairRate` AS `rp.RepairRate`,
    `repair`.`DeliveryCost` AS `rp.DeliveryCost`,
    `repair`.`NewPrice` AS `rp.NewPrice`
FROM
    `pbs`
    LEFT JOIN `users` ON `pbs`.`UserId` = 1
    LEFT JOIN `generic` on `pbs`.`AlstomPN` = `generic`.`AlstomPN` and generic.UserId = users.id
    LEFT JOIN `corrective` on `pbs`.`AlstomPN` = `corrective`.`AlstomPN` and corrective.UserId = users.id
    LEFT JOIN `preventive` on `pbs`.`AlstomPN` = `preventive`.`AlstomPN` and preventive.UserId = users.id
    LEFT JOIN `external` on `pbs`.`AlstomPN` = `external`.`AlstomPN` and external.UserId = users.id
    LEFT JOIN `renewal` on `pbs`.`AlstomPN` = `renewal`.`AlstomPN` and renewal.UserId = users.id
    LEFT JOIN `repair` on `pbs`.`AlstomPN` = `repair`.`AlstomPN` and repair.UserId = users.id
where users.id = $user
ORDER BY `pbs`.`Location` , `pbs`.`SubSystem` , `pbs`.`Module`");
echo mysqli_error($connection);
#mysqli_stmt_bind_param($stmt, 's', $user);
mysqli_stmt_execute($stmt);

$result = $stmt->get_result();
$headers = mysqli_fetch_fields($result);

while ($myrow = $result->fetch_assoc()) {
    $data[] = $myrow;
}
echo json_encode(array("headers" => $headers, "query_result_rows" => $data));

exit();

/*
echo "<br><br><br><br><br><br><br><br><br>";

$query = "SELECT * FROM full_table;";

if($result = mysqli_query($connection, $query)){
  $headers = mysqli_fetch_fields($result);
  while($row = $result->fetch_array(MYSQL_ASSOC)) {
    $data[] = $row;
  }
  echo json_encode(array("headers" => $headers, "query_result_rows" => $data));
}
else{
    echo "error";
}
$result->close();
$connection->close();

exit();
*/

?>
