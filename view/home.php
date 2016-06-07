<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Webapp</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>

  <link href='https://fonts.googleapis.com/css?family=Droid+Serif:700|Lato:400,900' rel='stylesheet' type='text/css'>

  <link rel="stylesheet" type="text/css" href="<?php echo $basePath;?>/css/style.css"/>
</head>
<body>
  <div class="react-app">
  </div>
  <script>
  window.app = window.app || {};
  window.app.basename = '<?php echo $basePath;?>';
  </script>
  <script src="<?php echo $basePath;?>/js/script.js"></script>
</body>
</html>
