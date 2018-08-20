<?php

$origin=isset($_SERVER['HTTP_ORIGIN'])?$_SERVER['HTTP_ORIGIN']:$_SERVER['HTTP_HOST'];
// header('Access-Control-Allow-Origin: '.$origin);       
header("Access-Control-Allow-Origin', '*'");     
// header('Access-Control-Allow-Methods: POST, OPTIONS, GET, PUT');
// header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Allow-Headers: Authorization, X-Requested-With');
// header('P3P: CP="NON DSP LAW CUR ADM DEV TAI PSA PSD HIS OUR DEL IND UNI PUR COM NAV INT DEM CNT STA POL HEA PRE LOC IVD SAM IVA OTC"');
// header('Access-Control-Max-Age: 1');


 include_once('setting.php');   
$set =  $_GET['set'];



$sid = $_GET['sid'];
if ($sid) {
    $im =  mysqli_query($link,"select id,sts from users where hash='$sid'") or die(mysqli_error($link));
    $im =  mysqli_fetch_assoc($im);
    $im_id = $im[id];
}




if ($set == 'audio')  {
  $post_q = mysqli_query($link,"select id,name,performer_name,duration,genre,url from audio where sts = 1 order by rand() limit 150");
  $post_n = mysqli_num_rows($post_q);
  for ($i = 0; $i < $post_n; $i++ ) {
      $post = mysqli_fetch_assoc($post_q);
  $band_name = $post['performer_name'];
  $ch = mysqli_query($link,"select * from performers where name = '$band_name';");
  $ch = mysqli_fetch_assoc($ch);
  $band_url = $ch['url'];
  $post['performer_url'] = $band_url;
      
      $ar[$i] = $post;
  }

 echo json_encode($ar);
} 


if ($set == "band")  {
    $band = $_GET['name'];
    
    $ch = mysqli_query($link,"select * from performers where url = '$band';");
    $ch = mysqli_fetch_assoc($ch);
    $band_name = $ch['name'];
    
  $post_q = mysqli_query($link,"select * from audio where performer_name like '%$band_name%';") ;
    $post_n = mysqli_num_rows($post_q);
    
    for ($i = 0; $i < $post_n; $i++ ) {
        $post = mysqli_fetch_assoc($post_q);
        $ar[$i] = $post;
    }
    
   echo json_encode($ar);
}



if ($set == "search")  {

    $search = $_GET['q'];


  $post_q =  mysqli_query($link,"select * from audio where sts = 1 and name like '%$search%' or sts = 1 and performer_name like '%$search%' order by id desc;");
    $post_n = mysqli_num_rows($post_q);
    
    for ($i = 0; $i < $post_n; $i++ ) {
        $post = mysqli_fetch_assoc($post_q);
        $band_name = $post['performer_name'];
  $ch = mysqli_query($link,"select * from performers where name = '$band_name';");
  $ch = mysqli_fetch_assoc($ch);
  $band_url = $ch['url'];
  $post['performer_url'] = $band_url;
        $ar[$i] = $post;
    }
    
   echo json_encode($ar);
}

if ($set == "login")  { 

    $email =  $_GET['email'];
    $password = $_GET['password'];
    
    $hash =  md5($password.'omodoxdex');

    $q =  mysqli_query($link,"select * from users where email = '$email' and hash = '$hash' limit 1");
    $qp = mysqli_fetch_assoc($q);


    $ar['sid'] = $qp[hash];
    $ar['status'] =  $qp[sts];
    echo json_encode($ar);

}


if ($set == "reg")  { 
    
    $email =  $_GET['email'];
    $password = $_GET['password'];
    $password2 = $_GET['password2'];

    if ($password == $password2) {
        
     $hash =  md5($password.'omodoxdex');

   $ch =  mysqli_query($link,"select email from users where email = '$email'");
   $ch = mysqli_num_rows($ch);

   if ($ch <= 0) {
       
    mysqli_query($link,"INSERT INTO users (email, hash)
    VALUES ('$email','$hash')") or die(mysqli_error($link));

    $ar['st'] = 'ok';
    echo json_encode($ar);

   }

    }
 

}


if ($set == "like")  {

    $track = $_GET['track'];
    $sid = $_GET['sid'];



   $im =  mysqli_query($link,"select id from users where hash='$sid'") or die(mysqli_error($link));
   $im =  mysqli_fetch_assoc($im);
   $im_id = $im[id];

    $ch =  mysqli_query($link,"select id from track_list where avt = '$im_id' and track='$track'");
    $ch_n = mysqli_num_rows($ch);


    if ($ch_n <= 0) {

        mysqli_query($link,"INSERT INTO track_list (avt, track,sts)
        VALUES ('$im_id','$track','1')");

    }
    else {
        $che = mysqli_fetch_assoc($ch);
     
            mysqli_query($link,"UPDATE track_list Set sts = !sts where id = '$che[id]'");
  
     
    }

 } 


 if ($set == "disclike")  {

    $track = $_GET['track'];
    $sid = $_GET['sid'];



   $im =  mysqli_query($link,"select id from users where hash='$sid'") or die(mysqli_error($link));
   $im =  mysqli_fetch_assoc($im);
   $im_id = $im[id];

    $ch =  mysqli_query($link,"select id from track_blacklist where avt = '$im_id' and track='$track'");
    $ch_n = mysqli_num_rows($ch);


    if ($ch_n <= 0) {

        mysqli_query($link,"INSERT INTO track_blacklist (avt, track,sts)
        VALUES ('$im_id','$track','1')");

    }
    else {
        $che = mysqli_fetch_assoc($ch);
     
            mysqli_query($link,"UPDATE track_blacklist Set sts = !sts where id = '$che[id]'");
  
     
    }

 } 


 if ($set == "my_list")  {

    $sid = $_GET['sid'];

   $im =  mysqli_query($link,"select id from users where hash='$sid'") or die(mysqli_error($link));
   $im =  mysqli_fetch_assoc($im);
   $im_id = $im[id];

    $ch =  mysqli_query($link,"select * from track_list a, audio b where a.avt = '$im_id' and a.track = b.id order by a.id desc") or die(mysqli_erorr($link));

    $post_n = mysqli_num_rows($ch);
    
    for ($i = 0; $i < $post_n; $i++ ) {
        $post = mysqli_fetch_assoc($ch);
        $ar[$i] = $post;
        $ar[$i]['_id'] = $post['id'];

        $band_name = $post['performer_name'];
        $url = mysqli_query($link,"select * from performers where name = '$band_name';");
        $url = mysqli_fetch_assoc($url);
        $band_url = $url['url'];
        $ar[$i]['performer_url'] = $band_url;
    }
    
   echo json_encode($ar);


 } 


 if ($set == "my_blacklist")  {

    $sid = $_GET['sid'];

   $im =  mysqli_query($link,"select id from users where hash='$sid'") or die(mysqli_error($link));
   $im =  mysqli_fetch_assoc($im);
   $im_id = $im[id];

    $ch =  mysqli_query($link,"select * from track_blacklist a, audio b where a.avt = '$im_id' and a.track = b.id order by a.track desc") or die(mysqli_erorr($link));

    $post_n = mysqli_num_rows($ch);
    
    for ($i = 0; $i < $post_n; $i++ ) {
        $post = mysqli_fetch_assoc($ch);
        $ar[$i] = $post;
        $ar[$i]['_id'] = $post['id'];

        $band_name = $post['performer_name'];
        $url = mysqli_query($link,"select * from performers where name = '$band_name';");
        $url = mysqli_fetch_assoc($url);
        $band_url = $url['url'];
        $ar[$i]['performer_url'] = $band_url;
    }
    
   echo json_encode($ar);


 } 


 if ($set == "adm_add_track") {


    $sid = $_GET['sid'];

    $im =  mysqli_query($link,"select id,sts from users where hash='$sid'") or die(mysqli_error($link));
    $im =  mysqli_fetch_assoc($im);
    $im_id = $im[id];


    if ($im[sts] == 3) {

        $track_id = $_GET['track_id'];
        $name = $_GET['name'];
        $performer_name = $_GET['performer_name'];
        $genre = $_GET['genre'];
        $url = "https://zk.fm/download/".$track_id;

        $ch_track =  mysqli_query($link,"select id from audio where zf_id = '$track_id'");
        $ch_track =  mysqli_fetch_assoc($ch_track);
        $ch_track = $ch_track[id];
    
        if ($ch_track <= 0 || $ch_track == '') {

            mysqli_query($link,"INSERT INTO audio (name,sts,avt,performer_name,zf_id,url)
             values ('$name',1,$im_id,'$performer_name',$track_id,'$url')");

             $ch_performer = mysqli_query($link,"select url from performers where name = '$performer_name'");
            $ch_performer  =  mysqli_num_rows($ch_performer);

            if ($ch_performer <= 0) {

                $url = translit($performer_name);
                $url =  transliterate($url);

                mysqli_query($link,"insert into performers (name,url) values ('$performer_name','$url')");
            }
        }

    }

   
 }

 if ($set == "playlists") {

        $post_q = mysqli_query($link,"select name,url,img from playlists where sts = 2");
        $post_n = mysqli_num_rows($post_q);
        for ($i = 0; $i < $post_n; $i++ ) {
            $post = mysqli_fetch_assoc($post_q);            
            $ar[$i] = $post;
        }
      
       echo json_encode($ar);
      } 

      if ($set == "my_playlists") {

        $track  =  $_GET['track'];

        $post_q = mysqli_query($link,"select id,name,url,img from playlists where sts > 0 and avt = '$im_id'");
        $post_n = mysqli_num_rows($post_q);
        for ($i = 0; $i < $post_n; $i++ ) {
            $post = mysqli_fetch_assoc($post_q);    

            $playlist_id = $post[id];
            
            $tr_ch = mysqli_query($link,"select id from playlist_tracks where track='$track' and playlist='$playlist_id' and sts > 0");
            $tr_ch = mysqli_num_rows($tr_ch);  
            
            if  ($tr_ch > 0)  $post[active] = true;
            
            $ar[$i] = $post;
        }
      
       echo json_encode($ar);
      }   



      if ($set == "playlist") {

        $url = $_GET['url'];

        $post_q = mysqli_query($link,"
        select a.id, a.name, a.performer_name, a.duration , a.url  from audio a, playlists p, playlist_tracks tr 
        where p.url = '$url' and p.id = tr.playlist and tr.track = a.id
        ") or die(mysqli_error($link));
        $post_n = mysqli_num_rows($post_q);
        for ($i = 0; $i < $post_n; $i++ ) {
            $post = mysqli_fetch_assoc($post_q);   
            
            $band_name = $post['performer_name'];
            $ch = mysqli_query($link,"select * from performers where name = '$band_name';");
            $ch = mysqli_fetch_assoc($ch);
            $band_url = $ch['url'];
            $post['performer_url'] = $band_url;

            $ar[$i] = $post;
        }   
      
       echo json_encode($ar);
      } 


      if ($set == "set_playlist_track") {

        $track = $_GET['track'];
        $playlist = $_GET['playlist'];


            $track = $_GET['track'];
           

            if (!$sid) exit;
        
        
            $ch =  mysqli_query($link,"select id from playlist_tracks where  playlist = '$playlist' and track='$track'");
            $ch_n = mysqli_num_rows($ch);
        
        
            if ($ch_n <= 0) {
        
                mysqli_query($link,"INSERT INTO playlist_tracks (playlist, track,sts)
                VALUES ('$playlist','$track','1')");

                mysqli_query($link,"update playlists set tracks = tracks + 1 where id= $playlist ");
        
            }
            else {
                $che = mysqli_fetch_assoc($ch);
             
                    mysqli_query($link,"UPDATE playlist_tracks Set sts = !sts where id = '$che[id]'");


                    if ($ch[sts] == 0)   mysqli_query($link,"update playlists set tracks = tracks + 1 where id= $playlist ");
                    if ($ch[sts] == 1)   mysqli_query($link,"update playlists set tracks = tracks - 1 where id= $playlist ");


    
            }
        
      }





 function translit($s) {
    $s = (string) $s; // преобразуем в строковое значение
    $s = strip_tags($s); // убираем HTML-теги
    $s = str_replace(array("\n", "\r"), " ", $s); // убираем перевод каретки
    $s = preg_replace("/\s+/", ' ', $s); // удаляем повторяющие пробелы
    $s = trim($s); // убираем пробелы в начале и конце строки
    $s = function_exists('mb_strtolower') ? mb_strtolower($s) : strtolower($s); // переводим строку в нижний регистр (иногда надо задать локаль)
    $s = strtr($s, array('а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'e','ж'=>'j','з'=>'z','и'=>'i','й'=>'y','к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o','п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f','х'=>'h','ц'=>'c','ч'=>'ch','ш'=>'sh','щ'=>'shch','ы'=>'y','э'=>'e','ю'=>'yu','я'=>'ya','ъ'=>'','ь'=>''));
    $s = preg_replace("/[^0-9a-z-_ ]/i", "", $s); // очищаем строку от недопустимых символов
    $s = str_replace(" ", "-", $s); // заменяем пробелы знаком минус
    return $s; // возвращаем результат
  }


  function transliterate($st) {
    $st = strtr($st, 
      "абвгдежзийклмнопрстуфыэАБВГДЕЖЗИЙКЛМНОПРСТУФЫЭ",
      "abvgdegziyklmnoprstufieABVGDEGZIYKLMNOPRSTUFIE"
    );
    $st = strtr($st, array(
      'ё'=>"yo",    'х'=>"h",  'ц'=>"ts",  'ч'=>"ch", 'ш'=>"sh",  
      'щ'=>"shch",  'ъ'=>'',   'ь'=>'',    'ю'=>"yu", 'я'=>"ya",
      'Ё'=>"Yo",    'Х'=>"H",  'Ц'=>"Ts",  'Ч'=>"Ch", 'Ш'=>"Sh",
      'Щ'=>"Shch",  'Ъ'=>'',   'Ь'=>'',    'Ю'=>"Yu", 'Я'=>"Ya",
    ));
    return $st;
  }
  




?>