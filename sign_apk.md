# Guía para Firmar APK de Market Sur

## Requisitos
- Java JDK instalado (viene con Android Studio o descarga desde https://www.oracle.com/java/technologies/downloads/)
- La APK generada por PWA Builder

## Paso 1: Crear una Keystore (solo la primera vez)

Abre una terminal y ejecuta:

```bash
keytool -genkey -v -keystore marketsur.keystore -alias marketsur -keyalg RSA -keysize 2048 -validity 10000
```

Te pedirá:
- **Contraseña del keystore**: Elige una contraseña segura (guárdala bien)
- **Nombre y apellido**: Tu nombre o "Market Sur"
- **Unidad organizativa**: "Market Sur"
- **Organización**: "Market Sur"
- **Ciudad**: "Cienfuegos"
- **Estado/Provincia**: "Cienfuegos"
- **Código de país**: "CU"

Esto creará el archivo `marketsur.keystore` - **GUÁRDALO EN UN LUGAR SEGURO**

## Paso 2: Firmar la APK

### En Windows (PowerShell):

```powershell
# Navega a la carpeta donde está tu APK
cd "ruta/a/tu/apk"

# Firma la APK (reemplaza los nombres de archivo según corresponda)
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore marketsur.keystore app-release-unsigned.apk marketsur

# Verifica la firma
jarsigner -verify -verbose -certs app-release-unsigned.apk
```

### En Linux/Mac:

```bash
# Navega a la carpeta donde está tu APK
cd ruta/a/tu/apk

# Firma la APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore marketsur.keystore app-release-unsigned.apk marketsur

# Verifica la firma
jarsigner -verify -verbose -certs app-release-unsigned.apk
```

## Paso 3: Optimizar la APK (Opcional pero recomendado)

Si tienes Android SDK instalado:

```bash
# Windows
%ANDROID_HOME%\build-tools\34.0.0\zipalign -v 4 app-release-unsigned.apk marketsur-signed.apk

# Linux/Mac
$ANDROID_HOME/build-tools/34.0.0/zipalign -v 4 app-release-unsigned.apk marketsur-signed.apk
```

## Paso 4: Instalar en Android

Ahora puedes instalar la APK firmada:

1. Copia `marketsur-signed.apk` (o `app-release-unsigned.apk` si no hiciste zipalign) a tu teléfono
2. En el teléfono, ve a **Configuración > Seguridad > Instalar apps desconocidas**
3. Habilita la instalación desde el explorador de archivos
4. Abre el archivo APK y toca "Instalar"

## Notas Importantes

⚠️ **GUARDA TU KEYSTORE**: Si pierdes el archivo `marketsur.keystore` o la contraseña, no podrás actualizar la app en el futuro. Haz backup.

⚠️ **No compartas tu keystore**: Es como la llave privada de tu app.

## Alternativa: Usar PWA Builder con firma automática

PWA Builder puede generar APKs firmadas si:
1. Vas a "Package for stores" → Android
2. Seleccionas "Signed APK" en lugar de "Unsigned APK"
3. Subes tu keystore o dejas que PWA Builder genere una nueva

---

## Opción más fácil: Instalar como PWA directamente

Si solo quieres probar la app sin compilar APK:

1. Abre tu app en Chrome en el móvil: https://marketsur.vercel.app
2. Toca el menú (⋮) → "Instalar aplicación" o "Añadir a pantalla de inicio"
3. La app se instalará como PWA nativa sin necesidad de APK

Esto funciona igual que una app nativa y es más fácil de actualizar.
