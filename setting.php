<?php 
    $mysql_server 	= '127.0.0.1';
	$mysql_user		= 'ddqixjxt_Omodox';
	$mysql_password	= 'js19&ILM#fVh';
	$mysql_db_name  = 'ddqixjxt_audio';


$link = mysqli_connect("$mysql_server", "$mysql_user", "$mysql_password", "$mysql_db_name");

function TextObr($txt)
{     $txt= stripslashes($txt); // удаляем слэши
      $txt= trim($txt); // удаляем пробелы по бокам (если нужно только с одного бока удалить пробелы есть функции ltrim() и rtrim()
      $txt= htmlspecialchars($txt); // переводим HTML в текст	  
      $txt= preg_replace("~ +~", " ", $txt); // множественные пробелы заменяем на одинарные
      $txt= preg_replace("/(\r\n){3,}/", "\r\n\r\n", $txt); // убираем лишние переводы строк
      # Если точно знаете, что в форме ничего кроме цифр и текста не будет снимите комментарий
      # $txt= preg_replace ("/[^a-zA-Zа-яА-Я0-9-_.]/","",$txt);
	  $txt=str_replace ("'",'',$txt);
		$txt=str_replace ('"','',$txt);
      return $txt; //возвращаем переменную
}	


?>