<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitbabeef3220a44256e566ea29800d1d51
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitbabeef3220a44256e566ea29800d1d51::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitbabeef3220a44256e566ea29800d1d51::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitbabeef3220a44256e566ea29800d1d51::$classMap;

        }, null, ClassLoader::class);
    }
}