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
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);    
    $address1 = htmlspecialchars($_POST['address1']);
    $address2 = htmlspecialchars($_POST['address2']);
    $city = htmlspecialchars($_POST['city']);
    $zip = htmlspecialchars($_POST['zip']);          
    $email = htmlspecialchars($_POST['email']);
		$phone = htmlspecialchars($_POST['phone']);    
		$state = htmlspecialchars($_POST['state']);

		// Check Required Fields
    if(!empty($email) && 
       !empty($firstName) && 
       !empty($lastName) && 
       !empty($address1) && 
       !empty($address2) &&
       !empty($city) &&
       !empty($zip) &&
       !empty($phone) &&                         
       !empty($state)){
			// Passed
			// Check Email
			if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
				// Failed
				$msg = 'Please use a valid email';
				$msgClass = 'alert-danger';
			} else {
				// Passed
				$toEmail = 'tommy@gevh.net';
				$subject = 'Contact Request From '.$firstName .$lastName;
				$body = '<h2>Contact Request</h2>
          <h4>First Name</h4><p>'.$firstName.'</p>
          <h4>Last Name</h4><p>'.$lastName.'</p>
          <h4>Address1</h4><p>'.$address1.'</p>
          <h4>Address2</h4><p>'.$address2.'</p>
          <h4>City</h4><p>'.$city.'</p> 
          <h4>Zip</h4><p>'.$zip.'</p>                           
          <h4>Email</h4><p>'.$email.'</p>
          <h4>Phone</h4><p>'.$phone.'</p>          
					<h4>State</h4><p>'.$state.'</p>
				';

				// Email Headers
				$headers = "MIME-Version: 1.0" ."\r\n";
				$headers .="Content-Type:text/html;charset=UTF-8" . "\r\n";

				// Additional Headers
				$headers .= "From: " .$firstName . $lastName."<".$email.">". "\r\n";

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
    <br/>
    <div class="list-item">
      <h2>Book your rental</h2>
      <hr>
      <?php if($msg != ''): ?>
        <div class="alert <?php echo $msgClass; ?>"><?php echo $msg; ?></div>
      <?php endif; ?>
      <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">

        <div class="form-row">
          <div class="form-group col-md-6">
              <label for="firstName">First name</label>
              <input type="text" name="firstName" class="form-control" 
                value="<?php echo isset($_POST['firstName']) ? $firstName : ''; ?>">
          </div>
          <div class="form-group col-md-6">
              <label for="lastName">Last name</label>
              <input type="text" name="lastName" class="form-control" 
                value="<?php echo isset($_POST['lastName']) ? $lastName : ''; ?>">
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input type="email" class="form-control" name="email" placeholder="Email" 
              value="<?php echo isset($_POST['email']) ? $email : ''; ?>">
          </div>
          <div class="form-group col-md-6">
            <label for="phone">Mobile phone</label>
            <input type="tel" class="form-control" name="phone" placeholder="Mobile phone" 
              value="<?php echo isset($_POST['phone']) ? $phone : ''; ?>">
          </div>
        </div>
          
        <div class="form-group">
          <label for="address1">Address 1</label>
          <input type="text" class="form-control" name="address1" placeholder="1234 Main St" 
            value="<?php echo isset($_POST['address1']) ? $address1 : ''; ?>">
        </div>
        <div class="form-group">
          <label for="address2">Address 2</label>
          <input type="text" class="form-control" name="address2" placeholder="Apartment, studio, or floor" 
            value="<?php echo isset($_POST['address2']) ? $address2 : ''; ?>">
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="city">City</label>
            <input type="text" class="form-control" name="city" 
              value="<?php echo isset($_POST['city']) ? $city : ''; ?>">
          </div>
          <div class="form-group col-md-4">
            <label for="state">State</label>
            <input type="text" class="form-control" name="state" 
              value="<?php echo isset($_POST['state']) ? $state : ''; ?>">
          </div>
          <div class="form-group col-md-2">
            <label for="zip">Zip</label>
            <input type="number" class="form-control" name="zip" 
              value="<?php echo isset($_POST['zip']) ? $zip : ''; ?>">
          </div>                  
        </div>

          <br>
          <button type="submit" name="submit" class="btn btn-outline-secondary">Submit</button>
        </form>
      </div> <!--container -->
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
  <div class="container">
    <div class="row center-xs center-sm center-md center-lg">
      <div id = "footerDiv" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <p class="text-center">Copyright &copy; 2020 | Great Entertainment Vacation Home</p class="text-center">
      </div>
    </div>
  </div>    
</body>
</html>