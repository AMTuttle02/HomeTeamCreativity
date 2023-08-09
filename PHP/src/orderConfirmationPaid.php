<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Content-Type: application/json');

require 'vendor/autoload.php';
require_once 'secrets.php';
use PHPMailer\PHPMailer\PHPMailer;
$mail = new PHPMailer;

if (session_status() === PHP_SESSION_ACTIVE) {
} else {
    session_start();
}

include 'conn.php';

date_default_timezone_set('America/New_York');

// Obtain cart
$inputs = json_decode(file_get_contents('php://input'), true);

function setPrice ($price, $type, $size) {
    $price = $price * 1;
    if ($type == "Crewneck Sweatshirt") {
      $price += 8;
      if ($size == "Youth Small" || $size == "Youth Medium" || $size == "Youth Large" || $size == "Youth X-Large") {
        $price -= 2;
      }
      else if ($size == "Adult XX-Large" || $size == "Adult XXX-Large") {
        $price += 2;
      }
    }
    else if ($type == "Hooded Sweatshirt") {
      $price += 12;
      if ($size == "Youth Small" || $size == "Youth Medium" || $size == "Youth Large" || $size == "Youth X-Large") {
        $price -= 2;
      }
      else if ($size == "Adult XX-Large" || $size == "Adult XXX-Large") {
        $price += 2;
      }
    }
    else if ($type == "Long Sleeve T-Shirt") {
      $price += 4;
      if ($size == "Youth Small" || $size == "Youth Medium" || $size == "Youth Large" || $size == "Youth X-Large") {
        $price -= 2;
      }
      else if ($size == "Adult XX-Large" || $size == "Adult XXX-Large") {
        $price += 2;
      }
    }
    else {
      if ($size == "Youth Small" || $size == "Youth Medium" || $size == "Youth Large" || $size == "Youth X-Large") {
        $price -= 2;
      }
      else if ($size == "Adult XX-Large" || $size == "Adult XXX-Large") {
        $price += 2;
      }
    }
    return $price;
  }

$query = $conn->prepare(
                        "SELECT *
                        FROM users
                        WHERE user_id = ?");
$query->bind_param(
        "s",
        $_SESSION["userId"]
    );
if (!$query->execute()) {
    die("Query failed: " . $stmt->error);
}

$result = mysqli_fetch_assoc($query->get_result());

$first = $result['first_name'];
$last = $result['last_name'];
$email = $result['email'];

$userId = $_SESSION["userId"];

// Obtain order details
$query = $conn->prepare(
    "SELECT *
    FROM orders
    WHERE user_id = ? AND is_active = 1 AND is_cart = 0 AND order_date = 
        (SELECT MAX(order_date)
        FROM orders
        WHERE user_id = ? AND is_active = 1 AND is_cart = 0)"
);
$query->bind_param("ss", $userId, $userId);
if (!$query->execute()) {
    die("Query failed: " . $query->error);
}

$result = mysqli_fetch_assoc($query->get_result());

if (!$result) {
    die("Result set failed: " . $conn->error);
}

$orderId = $result['order_id'];
$subTotal = number_format($result['total_cost'], 2);
$temp = number_format(($result['total_cost'] * 1) + ($result['total_cost'] * 0.029 + 0.31), 2);
$total_cost = number_format(($temp * 1) + ($temp * 0.0725), 2);
$processingFee = number_format($result['total_cost'] * 0.029 + 0.31, 2);
$tax = number_format(($temp * 0.0725), 2);

$query = $conn->prepare(
    "SELECT *
    FROM product_orders
    JOIN products ON product_orders.product_id = products.product_id
    WHERE product_orders.order_id = ?"
);
$query->bind_param("i", $orderId);
if (!$query->execute()) {
    die("Query failed: " . $query->error);
}

$result = $query->get_result();

$productHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <!--[if !mso]><!-- -->
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">
    <!--<![endif]-->
</head>

<body>
    <div class="es-wrapper-color">
        <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#eff7f6"></v:fill>
			</v:background>
		<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <table class="es-content" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure" align="left" esd-custom-block-id="794034">
                                                        <table cellspacing="0" cellpadding="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p0r esd-container-frame" width="600" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-banner" style="position: relative;" esdev-config="h1"><a target="_blank"><img class="adapt-img esdev-stretch-width esdev-banner-rendered" src="https://tlr.stripocdn.email/content/guids/bannerImgGuid/images/image16788672966342121.png" alt title width="600" style="display: block;"></a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p30t es-p30b es-p20r es-p20l" align="left" esd-custom-block-id="794035" bgcolor="#6a994e" style="background-color: #4e8a99;">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p10 es-m-txt-c">
                                                                                        <h3 style="color: #ffffff;">Hello '.$first.',</h3>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-m-txt-c es-p20t">
                                                                                        <p style="color: #ffffff;">Thank you for your recent order. We are pleased to confirm that we have received your order and it is currently being processed.</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-button es-p30t es-m-txt-c">
                                                                                        <!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
                style="height:39px; v-text-anchor:middle; width:142px" arcsize="13%" strokecolor="#ffffff" strokeweight="1px" fillcolor="#ffffff">
		<w:anchorlock></w:anchorlock>
		<center style="color:#386641; font-family:Raleway, Arial, sans-serif; font-size:14px; font-weight:400; line-height:14px;  mso-text-raise:1px">View Order</center>
	</v:roundrect></a>
<![endif]-->
                                                                                        <!--[if !mso]><span class="msohide es-button-border" style="background: #ffffff; border-color: #ffffff;"><a href="https://hometeamcreativity.com/orderComplete" class="es-button" target="_blank" style="background: #ffffff; mso-border-alt: 10px solid  #ffffff; color: #386641">View Order</a></span>
                                                                                        <!--<![endif]-->
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p40t es-p30b es-p20r es-p20l" align="left" esd-custom-block-id="794038">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text">
                                                                                        <h1>Order Summary</h1>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p40t es-p20r es-p20l es-m-p10t">
                                                                                        <h3 class="b_title">ORDER NO.&nbsp;'.$orderId.'<br>'.date("m/d/Y").'</h3>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p40b es-p20r es-p20l" align="left" esd-custom-block-id="794047" esdev-config="h4">
                                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="195" valign="top"><![endif]-->
                                                        <!--[if mso]></td><td width="20"></td><td width="345" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="center">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="345" align="left" class="esd-container-frame">';
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $price = setPrice($row['price'], $row['product_type'], $row['size']) * $row['product_quantity'];
        $productHTML.='                                                 <table cellpadding="0" cellspacing="0" width="100%" style="border-left:1px solid #4e8a99;border-right:1px solid #4e8a99;border-top:1px solid #4e8a99;border-bottom:1px solid #4e8a99;border-radius: 10px; border-collapse: separate;">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text es-p25t es-p25b es-p20r es-p20l es-m-txt-c">
                                                                                        <h3 class="p_name" style="line-height: 150%;">'.$row['product_name'].'</h3>
                                                                                        <p style="line-height: 150%;">Style: '.$row['product_type'].'</p>
                                                                                        <p class="p_description" style="line-height: 150%;">Color: '.$row['color'].'</p>
                                                                                        <p style="line-height: 150%;">Size: '.$row['size'].'</p>
                                                                                        <p style="line-height: 150%;">Additional Details: '.$row['product_details'].'</p>
                                                                                        <p style="line-height: 150%;">Quantity:&nbsp;'.$row['product_quantity'].'</p>
                                                                                        <h3 style="line-height: 150%;" class="p_price">$'.$price.'</h3>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <br>';
    }
}
$productHTML.='                                                      </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p40t es-p30b es-p20r es-p20l" align="left" esd-custom-block-id="794038">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text">
                                                                                        <h1>Order Total</h1>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p20 esdev-adapt-off" align="left">
                                                        <table width="560" cellpadding="0" cellspacing="0" class="esdev-mso-table">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esdev-mso-td" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="270" class="esd-container-frame" align="left">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="left" class="esd-block-text">
                                                                                                        <p>Subtotal<br>Discount<br>Shipping<br>Online Processing Fee<br>Estimated Tax</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td width="20"></td>
                                                                    <td class="esdev-mso-td" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="270" align="left" class="esd-container-frame">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="right" class="esd-block-text">
                                                                                                        <p>$'.$subTotal.'<br>$00.00<br>$00.00<br>$'.$processingFee.'<br>$'.$tax.'</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-spacer es-p5t es-p5b" style="font-size:0">
                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="border-bottom: 5px dotted #4e8a99; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p20 esdev-adapt-off" align="left">
                                                        <table width="560" cellpadding="0" cellspacing="0" class="esdev-mso-table">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esdev-mso-td" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="270" class="esd-container-frame" align="left">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="left" class="esd-block-text es-m-txt-l">
                                                                                                        <h3>Total</h3>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td width="20"></td>
                                                                    <td class="esdev-mso-td" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td width="270" align="left" class="esd-container-frame">
                                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td align="right" class="esd-block-text es-m-txt-r">
                                                                                                        <h3>$'.$total_cost.'</h3>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p30t es-p40b es-p20r es-p20l" align="left" esd-custom-block-id="794041">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" align="left" class="esd-container-frame">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-button es-m-txt-c">
                                                                                        <!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
                style="height:39px; v-text-anchor:middle; width:145px" arcsize="13%" strokecolor="#386641" strokeweight="1px" fillcolor="#6a994e">
		<w:anchorlock></w:anchorlock>
		<center style="color:#ffffff; font-family:Raleway, Arial, sans-serif; font-size:14px; font-weight:400; line-height:14px;  mso-text-raise:1px">View Order</center>
	</v:roundrect></a>
<![endif]-->
                                                                                        <!--[if !mso]><!-- --><span class="msohide es-button-border"><a href="https://hometeamcreativity.com/orderComplete" class="es-button" target="_blank">View Order</a></span>
                                                                                        <!--<![endif]-->
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" class="es-content" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p40t es-p20b es-p20r es-p20l" align="left" esd-custom-block-id="794048">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-text">
                                                                                        <h1>Shop Information</h1>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p15t es-p15b es-p20r es-p20l" align="left" esd-custom-block-id="794037">
                                                        <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="129" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="109" class="es-m-p20b esd-container-frame" align="left">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="right" class="esd-block-image es-m-txt-c" style="font-size: 0px;"><a target="_blank" href="https://hometeamcreativity.com"><img src="https://media.licdn.com/dms/image/C4E03AQFUA3Lo6N9fXA/profile-displayphoto-shrink_800_800/0/1652451758739?e=2147483647&v=beta&t=Bn0OpXtbXtbDkH-rskgthgnuEqnHblGWGtZF8K80UQA" alt style="display: block;" width="109"></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td class="es-hidden" width="20"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="178" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-left" align="left">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-m-p0r esd-container-frame es-m-p20b" width="178" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-m-txt-c es-p5b es-m-p5t">
                                                                                        <h3>Maggie Tuttle</h3>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text es-p5t es-m-txt-c">
                                                                                        <p>CEO of the company</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width="20"></td><td width="233" valign="top"><![endif]-->
                                                        <table cellpadding="0" cellspacing="0" class="es-right" align="right">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="233" align="left" class="esd-container-frame">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-button">
                                                                                        <!--[if mso]><a href="https://viewstripo.email" target="_blank" hidden>
	<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email" 
                style="height:39px; v-text-anchor:middle; width:177px" arcsize="13%" strokecolor="#386641" strokeweight="1px" fillcolor="#6a994e">
		<w:anchorlock></w:anchorlock>
		<center style="color:#ffffff; font-family:Raleway, Arial, sans-serif; font-size:14px; font-weight:400; line-height:14px;  mso-text-raise:1px">Help With Order</center>
	</v:roundrect></a>
<![endif]-->
                                                                                        <!--[if !mso]><!-- --><span class="msohide es-button-border"><a href="https://linktr.ee/hometeamcreativity" class="es-button" target="_blank">Help With Order</a></span>
                                                                                        <!--<![endif]-->
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure esdev-adapt-off es-p20" align="left" esd-custom-block-id="794049">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" align="left" class="esd-container-frame" esdev-config="h2">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="left" class="esd-block-text">
                                                                                        <p class="b_description">Hello there!<br><br></p>
                                                                                        <p class="b_description">Thank you for your recent order. We are pleased to confirm that we have received your order and it is currently being processed.<a target="_blank" style="font-size: 14px;"></a></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure es-p20r es-p20l" align="left">
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="560" class="esd-container-frame" align="center" valign="top">
                                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align="center" class="esd-block-spacer es-p5t es-p5b" style="font-size:0">
                                                                                        <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style="border-bottom: 5px dotted #4e8a99; background: unset; height: 1px; width: 100%; margin: 0px;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-structure esdev-adapt-off es-p20" align="left" esd-custom-block-id="794050">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>';


$mail->isSMTP();
$mail->SMTPDebug = 0;
$mail->Host = 'smtp.titan.email';
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->Username = 'orderconfirmation@hometeamcreativity.com';
$mail->Password = 'ConfirmationOfOrder1!';
$mail->setFrom('orderconfirmation@hometeamcreativity.com', 'HomeTeam Creativity Order Confirmation');
$mail->addReplyTo('IT@hometeamcreativity.com', 'HomeTeam Creativity IT');
$mail->addAddress($email, $first .' '. $last);
$mail->addBCC('admin@hometeamcreativity.com', 'Admin');
$mail->Subject = 'HomeTeam Creativity Order Confirmation';
//$mail->msgHTML(file_get_contents('message.html'), __DIR__);
$mail->isHTML(true);
$mail->Body = $productHTML;
if (!$mail->send()) {
    echo json_encode('Mailer Error: ' . $mail->ErrorInfo);
}
?>