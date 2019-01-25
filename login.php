<?php
include "conn.php";

$user = 1;
$user_email = "";

if (isset($_COOKIE["session"])) {
	$user_temp = verifySession($connection, $_COOKIE["session"] );
	$user = $user_temp[0];
	$user_email = $user_temp[1];
}

if (isset($_GET["logout"])){
	logout($user);
}

if (isset($_POST["createUser"])) {
	createUser($connection, $_POST);
}

if (!empty($_POST) && empty($_POST["json"])){
	# attempt to login
	$login = login($connection, $_POST);
	if ($login == "success") {
		header('Location: '."index.php");
		// echo "success";
	}
	if ($login == "wrong password") {
		echo "Wrong password";
		echo createLoginForm($user);
	}
	if ($login == "user does not exist") {
		echo "You are not a registered user, create a new account here: ";
		echo createLoginForm($user, "", true);
	}
}

function createUser($connection, $postvars){
	$password_hashed = password_hash($postvars["password"], PASSWORD_DEFAULT);
	// echo $password_hashed;
	$stmt = mysqli_prepare($connection, "
		INSERT INTO `life_cycle_cost`.`users`
		(`email`,
		`password`,
		`password_recovery`,
		`password_recovery_timestamp`)
		VALUES
		(?,?,'','CURRENT_TIMESTAMP')
		"
	);
	mysqli_stmt_bind_param($stmt, 'ss', $postvars["email"], $password_hashed );  // Bind "$email" to parameter.
	mysqli_stmt_execute($stmt);
	$insert_id = mysqli_insert_id($connection);
	mysqli_stmt_close($stmt);

	if (mysqli_connect_errno($connection)) {
		echo(mysqli_error($connection));
	}
	else{
		populateNewUserData($connection, $insert_id);
	}
}

function verifySession($connection, $session){
	$stmt = mysqli_prepare($connection, "SELECT id, email FROM users WHERE session = ? LIMIT 1");
	mysqli_stmt_bind_param($stmt, 's', $session);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_bind_result($stmt, $user_id, $user_email);
	mysqli_stmt_fetch($stmt);
	mysqli_stmt_close($stmt);

	if ($user_id > 1) {
		setcookie("session", $session, time() + (60*60*24*30), "/"); #30 days till expiration
		return [$user_id, $user_email];
	}
	else{
		return 0;
	}
}

function login($connection, $postvars){
	$stmt = mysqli_prepare($connection, "SELECT id, password FROM users WHERE email = ? LIMIT 1");
	mysqli_stmt_bind_param($stmt, 's', $_POST["email"]);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_bind_result($stmt, $user_id, $hash);
	mysqli_stmt_fetch($stmt);
	mysqli_stmt_close($stmt);

	if ($user_id){
		if (password_verify($postvars["password"], $hash)) { //if the login is valid
			$session = generateRandomString(20);
			$stmt2 = mysqli_prepare($connection, "UPDATE users SET session = '$session' WHERE id = ?");
			echo mysqli_stmt_error($stmt2);
			mysqli_stmt_bind_param($stmt2, 's', $user_id);
			mysqli_stmt_execute($stmt2);
			mysqli_stmt_close($stmt2);

			setcookie("session", $session, time() + (60*60*24*30), "/"); #30 days till expiration
			return 'success';
		}
		else {
			return "wrong password";
		}
	}
	else {
		return "user does not exist";
	}
}

function createLoginForm($user, $user_email="@", $create_user=false){
	$loginform = "";
	if ($user > 1){
		$loginform = 
		"<div class='login_form'>" .
		explode("@", $user_email)[0] .
		"<br>
		<a href='login.php?logout=true'>
		<button id='logout_button'>Logout</button>
		</a>
		</div>";
	}
	else {
		$loginform = 
		"<form action='login.php' method='post' class='login_form'>
		login:
		<input class='login_input' placeholder='email' type='email' name='email'>
		<input class='login_input' placeholder='password' type='password' name='password'>
		<input type='submit'>
		</form>"


		// <br>
		// <form action='login.php' method='post' class='login_form'>
		// Reset Password:
		// <input class='login_input' placeholder='email' type='email' name='email'>
		// <input class='login_input' type='hidden' name='resetPassword' value='true'>
		// <input type='submit'>
		// </form>

		;
	}
	if ($create_user == true){
		$loginform = 
		"<form action='login.php' method='post' class='login_form'>
		<input class='login_input' placeholder='email' type='email' name='email'>
		<input class='login_input' placeholder='password' type='password' name='password'>
		<input class='login_input' type='hidden' name='createUser' value='true'>
		<input type='submit'>
		</form>";
	}

	return $loginform;
}

function logout($user_id){
	$stmt = mysqli_prepare($connection, "UPDATE users SET session = null WHERE id = ?");
	mysqli_stmt_bind_param($stmt, 's', $user_id);
	mysqli_stmt_execute($stmt);

	setcookie('session', null, -1, '/');
	header('Location: '."index.php");
}

function generateRandomString($length = 10) {
    return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}

function populateNewUserData($connection, $insert_id){
	// inserts the default data for the new user

	$tables = ["generic", "corrective", "preventive", "external", "renewal", "repair"];
	foreach ($tables as $key => $value) {
		$data = [];
		$sql_statement = "
			SELECT column_name
			from INFORMATION_SCHEMA.COLUMNS
			where TABLE_NAME='$value'
		";
		$result = $connection->query($sql_statement);
		while($row = $result->fetch_assoc()) {
			$data[] = $row["column_name"];
		}

		$insert_goy = implode(", ", $data);
		$select_goy = implode(", ", array_slice($data, 0,-1));

		$sql_statement2 = "
			INSERT INTO $value ($insert_goy)
			SELECT $select_goy, $insert_id as UserId
			FROM $value
			WHERE UserId = 1;
		";
		$result = $connection->query($sql_statement2);
	}
}


?>

