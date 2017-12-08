<?php
   header('content-type:text/html;charset=utf-8');
   mysql_connect('localhost','root','123456');
   mysql_select_db('sasa');
   mysql_query('SET NAMES UTF8');
   $result = mysql_query('SELECT * FROM lunbo');
   $arr=array();
   for($i=0;$i<mysql_num_rows($result);$i++){
   	$arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
   }
   echo json_encode($arr);
?>