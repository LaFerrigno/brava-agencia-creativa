<?php
/**
 * @version 1.0
 */

require("class.phpmailer.php");
require("class.smtp.php");

// Valores enviados desde el formulario
if ( !isset($_POST["nombre"]) || !isset($_POST["email"]) || !isset($_POST["mensaje"]) ) {
    die ("Por favor completa el formulario");
}
$nombre = $_POST["nombre"];
$email = $_POST["email"];
$mensaje = $_POST["mensaje"];

// Datos de la cuenta de correo utilizada para enviar vía SMTP
$smtpHost = "mail.tudominio.com";  // servidor de correo SMTP 
$smtpUsuario = "florencia.ferrigno@davinci.edu.ar";  // cuenta de correo para envío
$smtpClave = "123456789";  // contraseña del correo

// Email donde se enviaran los datos cargados en el formulario de contacto
$emailDestino = "florencia.ferrigno@davinci.edu.ar"; // cuenta de correo para recibir el mensaje

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Port = 465; 
$mail->SMTPSecure = 'ssl';
$mail->IsHTML(true); 
$mail->CharSet = "utf-8";


// VALORES A MODIFICAR //
$mail->Host = $smtpHost; 
$mail->Username = $smtpUsuario; 
$mail->Password = $smtpClave;

$mail->From = $email; // Email desde donde envío el correo.
$mail->FromName = $nombre;
$mail->AddAddress($emailDestino); // Esta es la dirección a donde enviamos los datos del formulario

$mail->Subject = "Contacto"; // Este es el asunto del email.
$mensajeHtml = nl2br($mensaje);
$mail->Body = "{$mensajeHtml} "; // Texto del email en formato HTML
$mail->AltBody = "{$mensaje} \n\n "; // Texto sin formato HTML
// FIN - VALORES A MODIFICAR //

$estadoEnvio = $mail->Send(); 
if($estadoEnvio){
    echo "Gracias! su mensaje fue enviado";
} else {
    echo "Hubo un problema en el envío, por favor intente otra vez";
}
