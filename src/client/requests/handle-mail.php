
<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-type");

    $errors = array();
    $user_name = htmlentities( strip_tags( $_POST['name'] ) );
    $user_email = htmlentities( strip_tags( $_POST['email'] ) );
    $user_content = htmlentities( strip_tags( $_POST['message'] ) );
    $subject = 'Mail test';

    if( !isset($user_name) || empty($user_name) ) {
        $errors['name'] = true;
    }
    if( !isset($user_email) || empty($user_email) || !filter_var($user_email, FILTER_VALIDATE_EMAIL) ) {
        $errors['email'] = true;
    }
    if( !isset($user_content) || empty($user_content) ) {
        $errors['message'] = true;
    }

    if(count($errors)) {
        echo json_encode( array('errors' => $errors, 'valid' => false, 'message' => 'Il y\'a eu une erreur lors de la validation, merci de vérifier votre saisie.') );
    } else {

        $to = 'williamharker@outlook.fr';
        $body = '<!doctype html><html><head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <title>La Prophétie du sang</title>
          </head>
          <body style="background: #f1f1f1;">
            <table style="max-width: 640px; width: 100%; background-color: #000000; border-spacing: 0; border-collapse: collapse; font-family: Arial, sans-serif; margin: 0 auto; line-height: 1.4;">
                <!-- Header -->
                <thead style="margin: 0 auto; text-align: center;">
                    <tr>
                        <td style="padding: 20px 0;">
                            <img src="http://laprophetiedusang.fr/images/cover/email-header.jpg" alt="Entête de l\'email" style="display: inline-block; width: 550px; height: 126px;">
                        </td>
                    </tr>
                </thead>
                <!-- Content -->
                <tbody>
                    <tr>
                        <td>
                            <table style="border-spacing: 0; border-collapse: collapse; margin: 0 auto; font-size: 18px; width: 100%; padding-bottom: 100px;">
                                <tr>
                                    <td>
                                        <div style="font-size: 22px; color: #f8f8f8; padding: 20px 50px;">
                                            <p style="margin-bottom: 25px; font-size: 26px;">Informations sur l\'expéditeur</p>
                                            <p style="margin-bottom: 15px; text-align: left;"><span style="color: #911913">Nom:</span> <strong>'.$user_name.'</strong></p>
                                            <p style="margin-bottom: 15px; text-align: left;"><span style="color: #911913">Email:</span> <strong>'.$user_email.'</strong></p>
                                            <p style="margin-bottom: 5px; text-align: left;"><span style="color: #911913">Son message:</span></p>
                                            <p style="margin-bottom: 15px; margin-top: 0; text-align: justify;">
                                                '.$user_content.'
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tbody>
                <!-- Footer -->
                <tfoot>
                    <tr>
                        <td style="text-align: center;">
                            <p style="color: #f1f1f1; font-size: 16px; padding: 20px 0; border-top: 1px solid #911913; border-bottom: 1px solid #911913; margin-bottom: 0;">
                                Message envoyé depuis le site de <a href="http://laprophetiedusang.fr" style="color: #911913" target="_blank">La Propétie du Sang</a>
                            </p>
                        </td>
                    </tr>
                </tfoot>
            </table>

          </body>
          </html>
          ';
        $headers = "From: ".$user_email." \r\n";
        $headers .= "Reply-To: ". strip_tags(''.$to) . "\r\n";
        $headers .= "CC: ". $to . "\r\n";
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

        if( mail($to, $subject, $body, $headers) ) {

            echo json_encode ( array('erros' => false, 'valid' => true, 'message' => 'Votre message à bien été envoyé, merci.') );
        } else {
            echo json_encode ( array('erros' => true, 'valid' => false, 'message' => 'Erreur serveur lors de l\'envoi du mail.') );
        }

    }
?>
