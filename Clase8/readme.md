### Iniciar sesión
Ejecutar `npx eas-cli@latest login` en la terminal e ingresar las credenciales de la cuenta de Expo. Sirve para autenticar la terminal con la plataforma y permitir que EAS realice acciones en nombre del usuario.

https://expo.dev

### Vincular el proyecto
Ejecutar `npx eas-cli@latest init` y aceptar la creación de un nuevo proyecto. Sirve para asociar el proyecto local con la cuenta de Expo y generar automáticamente la URL del proyecto (`projectId`) en el archivo `app.json`.

### Configurar el perfil de compilación
Asegurar que el archivo `eas.json` contenga `"buildType": "apk"` dentro de un perfil (por ejemplo, "preview"). Sirve para indicarle a EAS que genere un archivo instalable en lugar de un paquete para la tienda.

### Compilar
Ejecutar `npx eas-cli@latest build --platform android --profile preview`, aceptar el Application ID sugerido y confirmar la generación del Keystore. Sirve para iniciar el proceso de compilación en la nube de Expo.

### Obtener el enlace
Al finalizar, la terminal muestra la URL de descarga directa del APK. Sirve para descargar el archivo instalable generado, el cual también está disponible en el panel del proyecto en expo.dev.

### Plataforma

Entrá a https://expo.dev e iniciá sesión.

Andá a tu proyecto (TaskFlow).

Hacé clic en la pestaña "Builds" .

Ahí vas a ver la lista de compilaciones. Cuando la compilación termine, va a aparecer la opción "Download" para bajar el archivo APK .