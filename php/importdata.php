<?php
   require 'userinformation.php';
   $username = $_POST['username'];
   $password = md5($_POST['password']);
   $query = "insert into user(username,password) value('$username','$password');";
   mysql_query($query);
?>