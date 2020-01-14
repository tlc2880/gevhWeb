<!--  Name: Tommy Cao
      Date: 6/10/13
      Company: GEVH
      Description: Great Entertainment Vacation Rental Website -->

<?php
	// Message Vars
	$msg = '';
	$msgClass = '';

	// Check For Submit
	if(filter_has_var(INPUT_POST, 'submit')){
		// Get Form Data
		$name = htmlspecialchars($_POST['name']);
		$email = htmlspecialchars($_POST['email']);
		$message = htmlspecialchars($_POST['message']);

		// Check Required Fields
		if(!empty($email) && !empty($name) && !empty($message)){
			// Passed
			// Check Email
			if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
				// Failed
				$msg = 'Please use a valid email';
				$msgClass = 'alert-danger';
			} else {
				// Passed
				$toEmail = 'tommy@gevh.net';
				$subject = 'Contact Request From '.$name;
				$body = '<h2>Contact Request</h2>
					<h4>Name</h4><p>'.$name.'</p>
					<h4>Email</h4><p>'.$email.'</p>
					<h4>Message</h4><p>'.$message.'</p>
				';

				// Email Headers
				$headers = "MIME-Version: 1.0" ."\r\n";
				$headers .="Content-Type:text/html;charset=UTF-8" . "\r\n";

				// Additional Headers
				$headers .= "From: " .$name. "<".$email.">". "\r\n";

				if(mail($toEmail, $subject, $body, $headers)){
					// Email Sent
					$msg = 'Submit success.';
					$msgClass = 'alert-success';
				} else {
					// Failed
					$msg = 'Submit failed.';
					$msgClass = 'alert-danger';
				}
			}
		} else {
			// Failed
			$msg = 'Please fill in all fields';
			$msgClass = 'alert-danger';
		}
	}
?>

<!DOCTYPE HTML>  
<html>
<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<style>
.error {color: #FF0000;}
</style>
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar navbar-light" style="background-color: #2780E3;">
    <a href="index.html" class="navbar-brand"><img src="./images/logo16.gif"></a>
    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse5">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarCollapse5">
      <form class="form-inline ml-auto">
        <a class="btn btn-outline-light" href="index.html" role="button">Home</a>        
        <a class="btn btn-outline-secondary active" href="about.php" role="button">About</a>
        <a class="btn btn-outline-light" href="http://gevh1.com" role="button">Rental Reviews</a>
        <a class="btn btn-outline-light" href="https://gevh-booking-feedback.herokuapp.com" role="button">Booking Feedback</a>
      </form>
    </div>
  </nav>

  <div class="container">
    <div class="row ">
      <div class="col-md-6">
        <!-- Top -->
        <div class="profile-top bg-muted p-2">
          <br/>
          <h1 class="large">Anaheim, California</h1>
          <p class="lead">The Happiest Place on Earth</p>
          <!-- <div class="icons my-1">
            <a href="#">
              <i class="fas fa-star"></i>
            </a>
            <a href="#">
              <i class="fas fa-facebook fa-2x"></i>
            </a>
            <a href="#">
              <i class="fas fa-linkedin fa-2x"></i>
            </a>
            <a href="#">
              <i class="fas fa-instagram fa-2x"></i>
            </a>
          </div> -->
        </div>

                    <!-- About -->
        <div class="profile-about bg-light p-2">
          <h2 class="text-primary">Owner's Bio</h2>
          <p>
            We love Anaheim; it is truly the happiest place on earth. 
            This city and this home is the place where our dreams can become reality and where the greatest memories of our lives made imprints on our soul.
          </p>
          <h2 class="text-primary"></h2>
          <div class="skills">
            <p class="p-1"><i class="fas fa-check"></i> Private Pool</p>
            <p class="p-1"><i class="fas fa-check"></i> Hot Tub</p>
            <p class="p-1"><i class="fas fa-check"></i> Satellite TV in all rooms</p>
            <p class="p-1"><i class="fas fa-check"></i> Game room</p>
          </div>
        </div>

        <!-- Why this house -->
        <div class="profile-exp bg-white p-2">
          <p>
          <strong>Why we chose this house </strong>This cute house has everything you need to enjoy the vacation of a lifetime. 
          A very private little compound and it'll take you less than 15 minutes to walk to Disneyland. 
          You won't likely see any neighbors during your stay as this corner lot house is quite secluded and fenced in. 
          Just bring your clothes, the kids and your food. We have everything else covered.
          </p>
        </div>

        <!-- Description -->
        <div class="profile-edu bg-white p-2">
          <p>
            <strong>Description: </strong>This house is just one mile away from the front gate of Disneyland.
          </p>
        </div>  
        <hr>            
        </div> <!-- col-md-6 -->

        <div class="col-md-6"><br>
          <div class="list-item"> 
            <div class="container">	
              <?php if($msg != ''): ?>
                <div class="alert <?php echo $msgClass; ?>"><?php echo $msg; ?></div>
              <?php endif; ?>
              <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" name="name" class="form-control" value="<?php echo isset($_POST['name']) ? $name : ''; ?>">
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="text" name="email" class="form-control" value="<?php echo isset($_POST['email']) ? $email : ''; ?>">
                </div>
                <div class="form-group">
                  <label>Message</label>
                  <textarea name="message" class="form-control"><?php echo isset($_POST['message']) ? $message : ''; ?></textarea>
                </div>
                <br>
                <button type="submit" name="submit" class="btn btn-outline-secondary">Submit</button>
              </form>
            </div> <!--container -->
          </div>  <!-- list-item -->
        </div> <!-- col-6 because col-9 is too big for iPad Safari Check In/Out inputs -->
    </div> <!-- big row -->
</div> <!--Container -->

  <div class="container">
    <div class="row center-xs center-sm center-md center-lg">
      <div id = "footerDiv" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <p class="text-center">Copyright &copy; 2020 | Great Entertainment Vacation Home</p class="text-center">
      </div>
    </div>
  </div>    
</body>
</html>